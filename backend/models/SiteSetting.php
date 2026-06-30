<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/ArionBaseModel.php';

final class SiteSetting extends ArionBaseModel
{
    protected string $table = 'site_settings';
    protected array $fillable = [
        'logo_url', 'site_name', 'hot_deals_link',
        'hot_deals_enabled', 'country', 'license_number',
    ];
}
