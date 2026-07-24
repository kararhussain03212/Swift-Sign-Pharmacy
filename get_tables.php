<?php
require_once 'backend/config/database.php';

use Backend\Config\Database;

$pdo = Database::connection();
$stmt = $pdo->query("SHOW TABLES");
$tables = $stmt->fetchAll(PDO::FETCH_COLUMN);

echo json_encode($tables, JSON_PRETTY_PRINT);
?>
