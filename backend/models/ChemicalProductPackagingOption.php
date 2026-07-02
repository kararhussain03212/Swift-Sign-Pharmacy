<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/BaseModel.php';

final class ChemicalProductPackagingOption extends BaseModel
{
    protected string $table = 'chemical_product_packaging_options';
    protected array $fillable = ['product_id', 'label', 'is_default', 'sort_order'];

    public function forProduct(int $productId): array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM ' . $this->table . ' WHERE product_id = :pid ORDER BY sort_order ASC, id ASC');
        $stmt->execute([':pid' => $productId]);
        return $stmt->fetchAll() ?: [];
    }

    /** @param array<int,array{label:string,is_default?:bool}> $options */
    public function replaceForProduct(int $productId, array $options): void
    {
        $this->pdo->beginTransaction();
        try {
            $this->pdo->prepare('DELETE FROM ' . $this->table . ' WHERE product_id = :pid')->execute([':pid' => $productId]);

            if ($options !== []) {
                $insert = $this->pdo->prepare(
                    'INSERT INTO ' . $this->table . ' (product_id, label, is_default, sort_order) VALUES (:pid, :label, :is_default, :sort)'
                );
                foreach (array_values($options) as $index => $opt) {
                    $label = trim((string) ($opt['label'] ?? ''));
                    if ($label === '') {
                        continue;
                    }
                    $insert->execute([
                        ':pid' => $productId,
                        ':label' => $label,
                        ':is_default' => !empty($opt['is_default']) ? 1 : 0,
                        ':sort' => $index + 1,
                    ]);
                }
            }
            $this->pdo->commit();
        } catch (\Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }
}
