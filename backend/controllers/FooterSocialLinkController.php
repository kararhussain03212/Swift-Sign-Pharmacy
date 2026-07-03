<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\FooterSocialLink;

require_once __DIR__ . '/BaseCrudController.php';
require_once __DIR__ . '/../models/FooterSocialLink.php';

final class FooterSocialLinkController extends BaseCrudController
{
    protected string $modelClass = FooterSocialLink::class;
    protected string $resourceName = 'footer_social_links';
    protected array $requiredCreateFields = ['platform', 'icon_key', 'url'];
}
