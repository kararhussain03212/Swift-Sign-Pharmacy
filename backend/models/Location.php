<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/ArionBaseModel.php';

final class Location extends ArionBaseModel
{
    protected string $table = 'locations';
    protected array $fillable = ['name', 'is_active'];

    protected function defaultOrderBy(): string
    {
        return 'id ASC';
    }
}
