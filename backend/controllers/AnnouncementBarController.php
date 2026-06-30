<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\AnnouncementBar;

require_once __DIR__ . '/BaseCrudController.php';
require_once __DIR__ . '/../models/AnnouncementBar.php';

final class AnnouncementBarController extends BaseCrudController
{
    protected string $modelClass = AnnouncementBar::class;
    protected string $resourceName = 'announcement_bar';
    protected array $requiredCreateFields = ['text'];
}
