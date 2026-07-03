<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\FooterAppLink;

require_once __DIR__ . '/BaseCrudController.php';
require_once __DIR__ . '/../models/FooterAppLink.php';

final class FooterAppLinkController extends BaseCrudController
{
    protected string $modelClass = FooterAppLink::class;
    protected string $resourceName = 'footer_app_links';
    protected array $requiredCreateFields = ['platform', 'label', 'url', 'badge_image_url'];
}
