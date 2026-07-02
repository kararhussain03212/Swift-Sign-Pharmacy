<?php
require_once __DIR__ . '/config/database.php';
use Backend\Config\Database;

$db = Database::connection();
$row = $db->query("SELECT id, name, email, password, role, is_super_admin, status FROM admins LIMIT 5")->fetchAll();

foreach ($row as $admin) {
    echo "ID: {$admin['id']}\n";
    echo "Name: {$admin['name']}\n";
    echo "Email: {$admin['email']}\n";
    echo "Role: {$admin['role']}\n";
    echo "Super: {$admin['is_super_admin']}\n";
    echo "Status: {$admin['status']}\n";
    echo "Password hash: {$admin['password']}\n";
    echo "Test 'admin123': " . (password_verify('admin123', $admin['password']) ? '✅ MATCH' : '❌ NO MATCH') . "\n";
    echo "---\n";
}
