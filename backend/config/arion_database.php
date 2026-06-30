<?php

declare(strict_types=1);

namespace Backend\Config;

use PDO;
use PDOException;
use RuntimeException;

require_once __DIR__ . '/env.php';

/**
 * Separate PDO connection for the Arion Pharmacy "Header" module tables
 * (announcement_bar, site_settings, nav_links, categories, locations),
 * which live in their own `arion_pharmacy` database rather than the
 * shared database used by the rest of this backend.
 */
final class ArionDatabase
{
    private static ?PDO $pdo = null;

    public static function connection(): PDO
    {
        if (self::$pdo instanceof PDO) {
            return self::$pdo;
        }

        Env::load(dirname(__DIR__) . '/.env');

        $host = Env::get('ARION_DB_HOST', Env::get('DB_HOST', '127.0.0.1'));
        $port = Env::get('ARION_DB_PORT', Env::get('DB_PORT', '3306'));
        $name = Env::get('ARION_DB_NAME', 'arion_pharmacy');
        $user = Env::get('ARION_DB_USER', Env::get('DB_USER', 'root'));
        $pass = Env::get('ARION_DB_PASS', Env::get('DB_PASS', ''));

        $dsn = sprintf('mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4', $host, $port, $name);

        try {
            self::$pdo = new PDO($dsn, $user, $pass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
        } catch (PDOException $e) {
            throw new RuntimeException('Arion Pharmacy database connection failed: ' . $e->getMessage(), 500);
        }

        return self::$pdo;
    }
}
