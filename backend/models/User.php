<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/BaseModel.php';

final class User extends BaseModel
{
    protected string $table = 'customer_users';
    protected array $fillable = ['name', 'email', 'phone', 'password'];

    public function findByEmail(string $email): ?array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM customer_users WHERE email = :email LIMIT 1');
        $stmt->execute([':email' => strtolower(trim($email))]);
        $row = $stmt->fetch();

        return $row !== false ? $row : null;
    }
}
