<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/BaseModel.php';

final class ContactInfoCard extends BaseModel
{
    protected string $table = 'contact_info_cards';
    protected array $fillable = ['icon_key', 'title', 'value_text', 'note_text', 'sort_order'];

    protected function defaultOrderBy(): string
    {
        return 'sort_order ASC, id ASC';
    }
}
