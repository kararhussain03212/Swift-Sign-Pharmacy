<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\StoreGalleryImage;

require_once __DIR__ . '/BaseCrudController.php';
require_once __DIR__ . '/../models/StoreGalleryImage.php';

final class StoreGalleryController extends BaseCrudController
{
    protected string $modelClass = StoreGalleryImage::class;
    protected string $resourceName = 'store_gallery_images';
    protected array $requiredCreateFields = ['image_url'];
}
