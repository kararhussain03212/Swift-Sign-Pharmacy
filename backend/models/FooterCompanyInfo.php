<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/ArionBaseModel.php';

final class FooterCompanyInfo extends ArionBaseModel
{
    protected string $table = 'footer_company_info';
    protected array $fillable = ['logo_url', 'address', 'email', 'phone'];
}
