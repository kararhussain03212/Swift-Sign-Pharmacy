<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/BaseModel.php';

final class ChemicalProductQuantityOption extends BaseModel
{
    protected string $table = 'chemical_product_quantity_options';
    protected array $fillable = ['product_id', 'label', 'price_override', 'is_default', 'sort_order'];

    public function forProduct(int $productId): array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM ' . $this->table . ' WHERE product_id = :pid ORDER BY sort_order ASC, id ASC');
        $stmt->execute([':pid' => $productId]);
        return $stmt->fetchAll() ?: [];
    }

    /** @param array<int,array{label:string,price_override?:?float,is_default?:bool}> $options */
    public function replaceForProduct(int $productId, array $options): void
    {
        $this->pdo->beginTransaction();
        try {
            $this->pdo->prepare('DELETE FROM ' . $this->table . ' WHERE product_id = :pid')->execute([':pid' => $productId]);

            if ($options !== []) {
                $insert = $this->pdo->prepare(
                    'INSERT INTO ' . $this->table . ' (product_id, label, price_override, is_default, sort_order) VALUES (:pid, :label, :price, :is_default, :sort)'
                );
                foreach (array_values($options) as $index => $opt) {
                    $label = trim((string) ($opt['label'] ?? ''));
                    if ($label === '') {
                        continue;
                    }
                    $insert->execute([
                        ':pid' => $productId,
                        ':label' => $label,
                        ':price' => isset($opt['price_override']) && $opt['price_override'] !== '' ? (float) $opt['price_override'] : null,
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
