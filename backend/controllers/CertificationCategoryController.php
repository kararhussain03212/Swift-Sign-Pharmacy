<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\CertificationCategory;

require_once __DIR__ . '/BaseCrudController.php';
require_once __DIR__ . '/../models/CertificationCategory.php';

final class CertificationCategoryController extends BaseCrudController
{
    protected string $modelClass = CertificationCategory::class;
    protected string $resourceName = 'certification_categories';
    protected array $requiredCreateFields = ['name'];
}
