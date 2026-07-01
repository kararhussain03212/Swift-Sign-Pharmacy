<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/BaseModel.php';

final class HomepageHeroBannerImage extends BaseModel
{
    protected string $table = 'homepage_hero_banner_images';
    protected array $fillable = ['image_url', 'alt_text', 'sort_order'];

    protected function defaultOrderBy(): string
    {
        return 'sort_order ASC, id ASC';
    }
}
