<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/ArionBaseModel.php';

final class CertificationCategory extends ArionBaseModel
{
    protected string $table = 'certification_categories';
    protected array $fillable = ['name', 'icon_key', 'is_active', 'sort_order'];

    protected function defaultOrderBy(): string
    {
        return 'sort_order ASC, id ASC';
    }

    public function activeOrdered(): array
    {
        $stmt = $this->pdo->prepare(
            'SELECT * FROM ' . $this->table . ' WHERE is_active = 1 ORDER BY ' . $this->defaultOrderBy()
        );
        $stmt->execute();

        return $stmt->fetchAll() ?: [];
    }
}
