<?php
require_once 'backend/config/database.php';

use Backend\Config\Database;

$pdo = Database::connection();
$stmt = $pdo->query("SHOW TABLES");
$tables = $stmt->fetchAll(PDO::FETCH_COLUMN);

echo "✅ Database Tables After Migration:\n\n";

// Group tables by prefix
$groups = [];
foreach ($tables as $table) {
    $prefix = explode('_', $table)[0];
    if (!isset($groups[$prefix])) {
        $groups[$prefix] = [];
    }
    $groups[$prefix][] = $table;
}

ksort($groups);
foreach ($groups as $prefix => $tableList) {
    echo "📦 $prefix/\n";
    foreach ($tableList as $table) {
        echo "   └─ $table\n";
    }
    echo "\n";
}

echo "Total tables: " . count($tables) . "\n";
