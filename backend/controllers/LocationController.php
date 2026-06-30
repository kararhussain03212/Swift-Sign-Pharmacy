<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\Location;

require_once __DIR__ . '/BaseCrudController.php';
require_once __DIR__ . '/../models/Location.php';

final class LocationController extends BaseCrudController
{
    protected string $modelClass = Location::class;
    protected string $resourceName = 'locations';
    protected array $requiredCreateFields = ['name'];
}
