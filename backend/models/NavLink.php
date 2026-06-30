<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/ArionBaseModel.php';

final class NavLink extends ArionBaseModel
{
    protected string $table = 'nav_links';
    protected array $fillable = ['label', 'url', 'sort_order', 'is_active'];

    protected function defaultOrderBy(): string
    {
        return 'sort_order ASC, id ASC';
    }
}
