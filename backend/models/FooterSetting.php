<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/ArionBaseModel.php';

final class FooterSetting extends ArionBaseModel
{
    protected string $table = 'footer_settings';
    protected array $fillable = ['copyright_text', 'funded_by_text', 'app_download_title'];
}
