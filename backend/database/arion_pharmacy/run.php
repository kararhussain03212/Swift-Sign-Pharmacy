<?php

declare(strict_types=1);

/**
 * Creates the arion_pharmacy database (if missing) and applies schema.sql + seed.sql.
 * Idempotent: CREATE TABLE IF NOT EXISTS + INSERT IGNORE, safe to re-run.
 * Localhost/CLI only, mirrors backend/seed.php's access guard.
 */

$ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
if (PHP_SAPI !== 'cli' && !in_array($ip, ['127.0.0.1', '::1'], true)) {
    http_response_code(403);
    exit('403 Forbidden — this runner is only accessible locally.');
}

require_once __DIR__ . '/../../config/env.php';

use Backend\Config\Env;

Env::load(__DIR__ . '/../../.env');

$host = Env::get('ARION_DB_HOST', Env::get('DB_HOST', 'localhost'));
$port = Env::get('ARION_DB_PORT', Env::get('DB_PORT', '3306'));
$user = Env::get('ARION_DB_USER', Env::get('DB_USER', 'root'));
$pass = Env::get('ARION_DB_PASS', Env::get('DB_PASS', ''));
$name = Env::get('ARION_DB_NAME', 'arion_pharmacy');

$log = [];
$errors = [];

try {
    // Connect without a database first so CREATE DATABASE can run.
    $rootPdo = new PDO(
        sprintf('mysql:host=%s;port=%s;charset=utf8mb4', $host, $port),
        $user,
        $pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $rootPdo->exec(sprintf(
        'CREATE DATABASE IF NOT EXISTS `%s` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci',
        $name
    ));
    $log[] = "Database `{$name}` ready.";

    $pdo = new PDO(
        sprintf('mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4', $host, $port, $name),
        $user,
        $pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $runSqlFile = static function (PDO $pdo, string $path, string $label) use (&$log, &$errors): void {
        $sql = file_get_contents($path);
        if ($sql === false) {
            $errors[] = "Could not read {$label}";
            return;
        }

        // Strip comment lines first (a statement may have a leading -- comment
        // on its own line before the SQL itself), then split into statements on ';'.
        $withoutComments = preg_replace('/^\s*--.*$/m', '', $sql) ?? $sql;
        $statements = array_filter(array_map('trim', explode(';', $withoutComments)), static function (string $stmt): bool {
            return $stmt !== '';
        });

        foreach ($statements as $statement) {
            if (stripos($statement, 'CREATE DATABASE') === 0 || stripos($statement, 'USE ') === 0) {
                continue;
            }
            try {
                $pdo->exec($statement);
            } catch (Throwable $e) {
                $errors[] = "{$label}: " . $e->getMessage();
            }
        }

        $log[] = "Applied {$label}";
    };

    $runSqlFile($pdo, __DIR__ . '/schema.sql', 'schema.sql');
    $runSqlFile($pdo, __DIR__ . '/seed.sql', 'seed.sql');
} catch (Throwable $e) {
    $errors[] = $e->getMessage();
}

if (PHP_SAPI === 'cli') {
    foreach ($log as $line) {
        echo "[OK] {$line}\n";
    }
    foreach ($errors as $line) {
        echo "[ERROR] {$line}\n";
    }
    exit($errors === [] ? 0 : 1);
}

header('Content-Type: text/plain; charset=utf-8');
echo "Arion Pharmacy DB setup\n\n";
foreach ($log as $line) {
    echo "[OK] {$line}\n";
}
foreach ($errors as $line) {
    echo "[ERROR] {$line}\n";
}
