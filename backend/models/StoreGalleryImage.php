<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/ArionBaseModel.php';

final class StoreGalleryImage extends ArionBaseModel
{
    protected string $table = 'store_gallery_images';
    protected array $fillable = ['image_url', 'alt_text', 'sort_order'];

    protected function defaultOrderBy(): string
    {
        return 'sort_order ASC, id ASC';
    }
}
