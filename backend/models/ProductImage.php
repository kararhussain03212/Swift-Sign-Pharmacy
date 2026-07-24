<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/BaseModel.php';

final class ProductImage extends BaseModel
{
    protected string $table = 'catalog_product_images';
    protected array $fillable = ['product_id', 'image_url', 'sort_order'];

    public function forProduct(int $productId): array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM ' . $this->table . ' WHERE product_id = :pid ORDER BY sort_order ASC, id ASC');
        $stmt->execute([':pid' => $productId]);
        return $stmt->fetchAll() ?: [];
    }

    /** @param array<int,string> $imageUrls */
    public function replaceForProduct(int $productId, array $imageUrls): void
    {
        $this->pdo->beginTransaction();
        try {
            $del = $this->pdo->prepare('DELETE FROM ' . $this->table . ' WHERE product_id = :pid');
            $del->execute([':pid' => $productId]);

            if ($imageUrls !== []) {
                $insert = $this->pdo->prepare('INSERT INTO ' . $this->table . ' (product_id, image_url, sort_order) VALUES (:pid, :url, :sort)');
                foreach (array_values($imageUrls) as $index => $url) {
                    if (trim((string) $url) === '') {
                        continue;
                    }
                    $insert->execute([':pid' => $productId, ':url' => $url, ':sort' => $index + 1]);
                }
            }
            $this->pdo->commit();
        } catch (\Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }
}
