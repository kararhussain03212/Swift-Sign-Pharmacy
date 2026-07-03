<?php

declare(strict_types=1);

namespace Backend\Config;

use PDO;

require_once __DIR__ . '/env.php';
require_once __DIR__ . '/database.php';

/**
 * The Arion Pharmacy "Header" module tables (announcement_bar, site_settings,
 * nav_links, categories, locations, footer_*, certification_*, hero_slides,
 * store_*) used to live in a separate `arion_pharmacy` database. They were
 * merged into the main `arion-pharmacy` database (no table-name collisions),
 * so this now simply proxies to the same connection as Database::connection().
 * Kept as its own class so ArionBaseModel subclasses don't need to change.
 */
final class ArionDatabase
{
    public static function connection(): PDO
    {
        return Database::connection();
    }
}
