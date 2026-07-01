<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/ArionBaseModel.php';

final class StoreLocatorContent extends ArionBaseModel
{
    protected string $table = 'store_locator_content';
    protected array $fillable = [
        'page_title', 'page_subtitle',
        'network_eyebrow', 'network_heading', 'network_paragraph',
        'outlets_eyebrow', 'outlets_heading', 'outlets_paragraph',
    ];
}
