<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\HeroBannerSlide;

require_once __DIR__ . '/BaseCrudController.php';
require_once __DIR__ . '/../models/HeroBannerSlide.php';

final class HeroBannerController extends BaseCrudController
{
    protected string $modelClass = HeroBannerSlide::class;
    protected string $resourceName = 'hero_slides';
    protected array $requiredCreateFields = ['heading'];
}
