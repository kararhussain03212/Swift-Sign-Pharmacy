<?php
// Run the migration to add text fields to site_settings table

$migrationFile = __DIR__ . '/add_text_fields_to_site_settings.sql';

if (!file_exists($migrationFile)) {
    die("Migration file not found: $migrationFile\n");
}

try {
    // Read the SQL file
    $sql = file_get_contents($migrationFile);

    // Create PDO connection
    $pdo = new PDO(
        'mysql:host=localhost;',
        'root',
        '',
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    // Execute the migration
    $pdo->exec($sql);

    echo "✅ Migration successful! Columns added to site_settings table.\n";

} catch (Exception $e) {
    echo "❌ Migration failed: " . $e->getMessage() . "\n";
    exit(1);
}
