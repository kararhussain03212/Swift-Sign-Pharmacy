<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/ArionBaseModel.php';

final class AnnouncementBar extends ArionBaseModel
{
    protected string $table = 'announcement_bar';
    protected array $fillable = ['text', 'icon', 'is_active', 'sort_order'];

    protected function defaultOrderBy(): string
    {
        return 'sort_order ASC, id ASC';
    }
}
