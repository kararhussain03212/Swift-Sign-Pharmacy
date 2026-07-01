<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/BaseModel.php';

final class HomepageHeroBanner extends BaseModel
{
    protected string $table = 'homepage_hero_banner';
    protected array $fillable = [
        'heading', 'subheading', 'description', 'button_text', 'button_link', 'is_active',
    ];
}
