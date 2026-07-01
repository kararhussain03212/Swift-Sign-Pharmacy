<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/BaseModel.php';

final class HomepageCarePlanBanner extends BaseModel
{
    protected string $table = 'homepage_care_plan_banner';
    protected array $fillable = [
        'eyebrow', 'heading', 'description', 'button_text', 'button_link', 'is_active',
    ];
}
