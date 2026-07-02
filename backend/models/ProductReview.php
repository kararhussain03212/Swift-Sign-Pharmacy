<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/BaseModel.php';

final class ProductReview extends BaseModel
{
    protected string $table = 'product_reviews';
    protected array $fillable = ['product_id', 'rating', 'reviewer_name', 'review_text'];

    public function aggregateForProduct(int $productId): array
    {
        $stmt = $this->pdo->prepare(
            'SELECT AVG(rating) AS avg_rating, COUNT(*) AS review_count FROM ' . $this->table . ' WHERE product_id = :pid'
        );
        $stmt->execute([':pid' => $productId]);
        $row = $stmt->fetch() ?: [];

        return [
            'average' => $row['avg_rating'] !== null ? round((float) $row['avg_rating'], 1) : 0.0,
            'count' => (int) ($row['review_count'] ?? 0),
        ];
    }
}
