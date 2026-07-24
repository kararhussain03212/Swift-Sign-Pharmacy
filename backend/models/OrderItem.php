<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/BaseModel.php';

final class OrderItem extends BaseModel
{
    protected string $table = 'customer_order_items';
    protected array $fillable = ['order_id', 'product_id', 'product_name', 'quantity', 'price', 'product_image'];

    public function findByOrderId(int $orderId): array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM customer_order_items WHERE order_id = :order_id ORDER BY id ASC');
        $stmt->execute([':order_id' => $orderId]);

        return $stmt->fetchAll() ?: [];
    }
}
