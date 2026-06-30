<?php

declare(strict_types=1);

namespace Backend\Models;

use Backend\Config\ArionDatabase;
use PDO;

require_once __DIR__ . '/BaseModel.php';
require_once __DIR__ . '/../config/arion_database.php';

/**
 * Base for models backed by the separate `arion_pharmacy` database
 * (the "Header" module: announcement_bar, site_settings, nav_links,
 * categories, locations).
 */
abstract class ArionBaseModel extends BaseModel
{
    protected function connection(): PDO
    {
        return ArionDatabase::connection();
    }
}
