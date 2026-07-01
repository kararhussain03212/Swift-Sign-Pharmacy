<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\StoreNetworkStat;

require_once __DIR__ . '/BaseCrudController.php';
require_once __DIR__ . '/../models/StoreNetworkStat.php';

final class StoreNetworkStatController extends BaseCrudController
{
    protected string $modelClass = StoreNetworkStat::class;
    protected string $resourceName = 'store_network_stats';
    protected array $requiredCreateFields = ['value', 'label'];
}
