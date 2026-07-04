<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/ArionBaseModel.php';

final class PrescriptionPageContent extends ArionBaseModel
{
    protected string $table = 'prescription_page_content';
    protected array $fillable = [
        'hero_badge_text', 'hero_heading', 'hero_subheading',
        'upload_badge_text', 'upload_heading', 'upload_subtext',
        'dropzone_instruction_text', 'dropzone_hint_text',
        'howto_heading', 'sample_section_heading',
        'help_heading', 'help_subtext', 'help_phone_number',
        'max_file_size_mb', 'allowed_file_types',
    ];
}
