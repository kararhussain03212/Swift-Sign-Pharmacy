<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/ArionBaseModel.php';

final class FooterQuickLink extends ArionBaseModel
{
    protected string $table = 'footer_quick_links';
    protected array $fillable = ['label', 'url', 'sort_order', 'is_active'];

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
