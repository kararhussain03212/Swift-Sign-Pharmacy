<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/BaseModel.php';

final class CartItem extends BaseModel
{
    protected string $table = 'customer_cart_items';
    protected array $fillable = ['user_id', 'product_id', 'quantity'];

    public function findByUserAndProduct(int $userId, int $productId): ?array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM customer_cart_items WHERE user_id = :user_id AND product_id = :product_id LIMIT 1');
        $stmt->execute([':user_id' => $userId, ':product_id' => $productId]);
        $row = $stmt->fetch();

        return $row !== false ? $row : null;
    }

    public function findByUserId(int $userId): array
    {
        $stmt = $this->pdo->prepare('
            SELECT
                ci.id, ci.product_id, ci.quantity, ci.created_at,
                p.name AS product_name, p.slug AS product_slug, p.base_price,
                p.stock_status, p.manufacturer_or_brand,
                (SELECT pi.image_url FROM catalog_product_images pi WHERE pi.product_id = p.id ORDER BY pi.sort_order ASC LIMIT 1) AS image_url
            FROM customer_cart_items ci
            JOIN catalog_products p ON p.id = ci.product_id
            WHERE ci.user_id = :user_id
            ORDER BY ci.created_at DESC
        ');
        $stmt->execute([':user_id' => $userId]);

        return $stmt->fetchAll() ?: [];
    }

    public function clearForUser(int $userId): bool
    {
        $stmt = $this->pdo->prepare('DELETE FROM customer_cart_items WHERE user_id = :user_id');
        return $stmt->execute([':user_id' => $userId]);
    }
}
