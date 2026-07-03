<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\FooterQuickLink;

require_once __DIR__ . '/BaseCrudController.php';
require_once __DIR__ . '/../models/FooterQuickLink.php';

final class FooterQuickLinkController extends BaseCrudController
{
    protected string $modelClass = FooterQuickLink::class;
    protected string $resourceName = 'footer_quick_links';
    protected array $requiredCreateFields = ['label', 'url'];
}
