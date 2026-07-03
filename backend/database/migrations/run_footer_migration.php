<?php
// Runs the footer module migration: creates the footer tables (idempotent)
// then seeds them with the content that used to be hardcoded in Footer.jsx.
// Usage: php backend/database/migrations/run_footer_migration.php

$files = [
    __DIR__ . '/add_footer_tables.sql',
    __DIR__ . '/seed_footer_data.sql',
];

try {
    $pdo = new PDO(
        'mysql:host=localhost;',
        'root',
        '',
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    foreach ($files as $file) {
        if (!file_exists($file)) {
            echo "❌ Migration file not found: $file\n";
            exit(1);
        }

        $sql = file_get_contents($file);
        $withoutComments = preg_replace('/^\s*--.*$/m', '', $sql) ?? $sql;
        $statements = array_filter(array_map('trim', explode(';', $withoutComments)), static fn (string $s): bool => $s !== '');

        foreach ($statements as $statement) {
            $pdo->exec($statement);
        }

        echo "✅ Applied " . basename($file) . "\n";
    }

    echo "✅ Footer migration complete.\n";
} catch (Exception $e) {
    echo "❌ Migration failed: " . $e->getMessage() . "\n";
    exit(1);
}
