<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/ArionBaseModel.php';

final class StoreNetworkStat extends ArionBaseModel
{
    protected string $table = 'store_network_stats';
    protected array $fillable = ['value', 'label', 'sort_order'];

    protected function defaultOrderBy(): string
    {
        return 'sort_order ASC, id ASC';
    }
}
