<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/ArionBaseModel.php';

final class HeroBannerSlide extends ArionBaseModel
{
    protected string $table = 'hero_slides';
    protected array $fillable = [
        'heading', 'firsttext', 'secondtext',
        'image',
        'heading_color', 'subtext_color',
        'centered', 'sort_order', 'is_active',
    ];

    protected function defaultOrderBy(): string
    {
        return 'sort_order ASC, id ASC';
    }
}
