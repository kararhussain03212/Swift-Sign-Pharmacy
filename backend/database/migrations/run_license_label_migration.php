<?php
// Run the migration to add license_label column to site_settings table

$migrationFile = __DIR__ . '/add_license_label_to_site_settings.sql';

if (!file_exists($migrationFile)) {
    die("Migration file not found: $migrationFile\n");
}

try {
    $sql = file_get_contents($migrationFile);

    $pdo = new PDO(
        'mysql:host=localhost;dbname=arion-pharmacy;charset=utf8mb4',
        'root',
        '',
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $pdo->exec($sql);

    echo "Migration successful! license_label column added to site_settings table.\n";
} catch (Exception $e) {
    echo "Migration failed: " . $e->getMessage() . "\n";
    exit(1);
}
