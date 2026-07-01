<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/BaseModel.php';

final class HomepagePromoCard extends BaseModel
{
    protected string $table = 'homepage_promo_cards';
    protected array $fillable = [
        'heading', 'description', 'highlight_text', 'button_text', 'button_link',
        'image_url', 'image_alt', 'layout_key', 'theme_key', 'is_active', 'sort_order',
    ];

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
