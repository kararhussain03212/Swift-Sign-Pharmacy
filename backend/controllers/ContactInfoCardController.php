<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\ContactInfoCard;

require_once __DIR__ . '/BaseCrudController.php';
require_once __DIR__ . '/../models/ContactInfoCard.php';

final class ContactInfoCardController extends BaseCrudController
{
    protected string $modelClass = ContactInfoCard::class;
    protected string $resourceName = 'contact_info_cards';
    protected array $requiredCreateFields = ['icon_key', 'title', 'value_text'];
}
