<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\CertificationTrustBadge;

require_once __DIR__ . '/BaseCrudController.php';
require_once __DIR__ . '/../models/CertificationTrustBadge.php';

final class CertificationTrustBadgeController extends BaseCrudController
{
    protected string $modelClass = CertificationTrustBadge::class;
    protected string $resourceName = 'certification_trust_badges';
    protected array $requiredCreateFields = ['label'];
}
