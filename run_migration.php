<?php
require_once 'backend/config/database.php';

use Backend\Config\Database;

$pdo = Database::connection();

// Read the migration file
$sql = file_get_contents('backend/database/migrations/reorganize_database.sql');

// Split by semicolons and execute each statement
$statements = array_filter(
    array_map('trim', explode(';', $sql)),
    fn($stmt) => !empty($stmt) && !str_starts_with($stmt, '--')
);

echo "Running database migration...\n\n";

try {
    foreach ($statements as $statement) {
        if (str_starts_with($statement, 'SHOW TABLES')) {
            $result = $pdo->query($statement)->fetchAll(PDO::FETCH_COLUMN);
            echo "✓ Database tables after migration:\n";
            foreach ($result as $table) {
                echo "  - $table\n";
            }
        } else {
            $pdo->exec($statement);
            echo "✓ Executed: " . substr($statement, 0, 60) . "...\n";
        }
    }
    echo "\n✓ Migration completed successfully!\n";
} catch (Exception $e) {
    echo "✗ Migration failed: " . $e->getMessage() . "\n";
    exit(1);
}
?>
