<?php
require_once 'backend/config/database.php';

use Backend\Config\Database;

$pdo = Database::connection();

$renames = [
    'users' => 'customer_users',
    'products' => 'catalog_products',
    'admins' => 'admin_users',
    'activity_logs' => 'system_activity_logs',
    'product_reviews' => 'catalog_product_reviews',
];

echo "Completing remaining table renames...\n\n";

foreach ($renames as $old => $new) {
    try {
        $pdo->exec("ALTER TABLE `$old` RENAME TO `$new`");
        echo "✅ Renamed: $old → $new\n";
    } catch (\Exception $e) {
        if (str_contains($e->getMessage(), 'already exists')) {
            echo "⚠️  $new already exists (skipped)\n";
        } else {
            echo "❌ Error renaming $old: " . $e->getMessage() . "\n";
        }
    }
}

echo "\n✅ All table renames completed!\n";

// Show final structure
$stmt = $pdo->query("SHOW TABLES");
$tables = $stmt->fetchAll(PDO::FETCH_COLUMN);

$groups = [];
foreach ($tables as $table) {
    $prefix = explode('_', $table)[0];
    if (!isset($groups[$prefix])) {
        $groups[$prefix] = [];
    }
    $groups[$prefix][] = $table;
}

echo "\n📊 Final Database Structure:\n";
ksort($groups);
foreach ($groups as $prefix => $tableList) {
    echo "   📦 $prefix/ (" . count($tableList) . " tables)\n";
}
echo "\nTotal tables: " . count($tables) . "\n";
