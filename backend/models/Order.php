<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/BaseModel.php';

final class Order extends BaseModel
{
    protected string $table = 'customer_orders';
    protected array $fillable = ['user_id', 'total_amount', 'status', 'shipping_address_json', 'payment_method'];

    public function findByUserId(int $userId): array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM customer_orders WHERE user_id = :user_id ORDER BY created_at DESC');
        $stmt->execute([':user_id' => $userId]);

        return $stmt->fetchAll() ?: [];
    }
}
