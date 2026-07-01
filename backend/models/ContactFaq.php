<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/BaseModel.php';

final class ContactFaq extends BaseModel
{
    protected string $table = 'contact_faqs';
    protected array $fillable = ['question', 'answer', 'is_active', 'sort_order'];

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
