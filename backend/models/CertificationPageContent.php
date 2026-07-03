<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/ArionBaseModel.php';

final class CertificationPageContent extends ArionBaseModel
{
    protected string $table = 'certification_page_content';
    protected array $fillable = [
        'hero_badge_text',
        'hero_heading',
        'hero_subheading',
        'trust_heading',
        'trust_paragraph',
    ];
}
