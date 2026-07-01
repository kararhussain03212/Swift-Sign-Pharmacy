<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/BaseModel.php';

final class FeaturedBrand extends BaseModel
{
    protected string $table = 'featured_brands';
    protected array $fillable = ['name', 'logo_url', 'link_url', 'is_active', 'sort_order'];

    protected function defaultOrderBy(): string
    {
        return 'sort_order ASC, id ASC';
    }

    public function activeOrdered(): array
    {
        $stmt = $this->pdo->query(
            'SELECT * FROM ' . $this->table . ' WHERE is_active = 1 ORDER BY ' . $this->defaultOrderBy()
        );

        return $stmt->fetchAll() ?: [];
    }
}
