<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/BaseModel.php';

final class PharmacyProductBenefit extends BaseModel
{
    protected string $table = 'pharmacy_product_benefits';
    protected array $fillable = ['product_id', 'benefit_text', 'sort_order'];

    public function forProduct(int $productId): array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM ' . $this->table . ' WHERE product_id = :pid ORDER BY sort_order ASC, id ASC');
        $stmt->execute([':pid' => $productId]);
        return $stmt->fetchAll() ?: [];
    }

    /** @param array<int,string> $benefitTexts */
    public function replaceForProduct(int $productId, array $benefitTexts): void
    {
        $this->pdo->beginTransaction();
        try {
            $this->pdo->prepare('DELETE FROM ' . $this->table . ' WHERE product_id = :pid')->execute([':pid' => $productId]);

            if ($benefitTexts !== []) {
                $insert = $this->pdo->prepare('INSERT INTO ' . $this->table . ' (product_id, benefit_text, sort_order) VALUES (:pid, :text, :sort)');
                foreach (array_values($benefitTexts) as $index => $text) {
                    if (trim((string) $text) === '') {
                        continue;
                    }
                    $insert->execute([':pid' => $productId, ':text' => $text, ':sort' => $index + 1]);
                }
            }
            $this->pdo->commit();
        } catch (\Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }
}
