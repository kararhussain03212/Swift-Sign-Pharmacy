<?php

declare(strict_types=1);

/**
 * Seeds the `hero_slides` table (arion_pharmacy database) from the slides
 * that were previously hardcoded in src/components/sections/HeroBanner.jsx.
 *
 * Clears existing rows and re-inserts the canonical slides with explicit
 * ids, so the DB exactly mirrors the original static frontend data.
 * Safe to re-run.
 *
 * Run from CLI:  php backend/seeds/seed_hero_slides.php
 */

require_once __DIR__ . '/../config/env.php';

use Backend\Config\Env;

Env::load(__DIR__ . '/../.env');

$host = Env::get('ARION_DB_HOST', Env::get('DB_HOST', 'localhost'));
$port = Env::get('ARION_DB_PORT', Env::get('DB_PORT', '3306'));
$name = Env::get('ARION_DB_NAME', 'arion_pharmacy');
$user = Env::get('ARION_DB_USER', Env::get('DB_USER', 'root'));
$pass = Env::get('ARION_DB_PASS', Env::get('DB_PASS', ''));

try {
    $pdo = new PDO(
        sprintf('mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4', $host, $port, $name),
        $user,
        $pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    exit('Connection failed: ' . $e->getMessage() . "\n");
}

$pdo->exec(
    'CREATE TABLE IF NOT EXISTS `hero_slides` (
        `id`             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        `heading`        VARCHAR(255) NOT NULL,
        `firsttext`      VARCHAR(255) DEFAULT NULL,
        `secondtext`     VARCHAR(255) DEFAULT NULL,
        `image`          VARCHAR(500) DEFAULT NULL,
        `heading_color`  VARCHAR(20) DEFAULT \'#1a365d\',
        `subtext_color`  VARCHAR(20) DEFAULT \'#2c5282\',
        `centered`       TINYINT(1) NOT NULL DEFAULT 0,
        `sort_order`     SMALLINT NOT NULL DEFAULT 0,
        `is_active`      TINYINT(1) NOT NULL DEFAULT 1,
        `created_at`     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated_at`     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci'
);

// Drop the legacy bg_gradient column if it still exists from an earlier run.
$existingColumns = array_column($pdo->query('SHOW COLUMNS FROM hero_slides')->fetchAll(PDO::FETCH_ASSOC), 'Field');
if (in_array('bg_gradient', $existingColumns, true)) {
    $pdo->exec('ALTER TABLE hero_slides DROP COLUMN bg_gradient');
}

// Mirrors the `slides` array that was hardcoded in HeroBanner.jsx.
$slides = [
    ['id' => 1, 'heading' => 'Your Trusted Pharmacy, Online', 'firsttext' => 'Bringing the store experience', 'secondtext' => 'to your screen'],
    ['id' => 2, 'heading' => 'Free Pharmacist Support', 'firsttext' => 'Upload your prescription and get expert', 'secondtext' => 'guidance before ordering'],
    ['id' => 3, 'heading' => 'Same Day Delivery', 'firsttext' => 'Urgent delivery currently only available', 'secondtext' => 'in Islamabad'],
    ['id' => 4, 'heading' => 'Fast & Reliable Delivery', 'firsttext' => 'On-time delivery you', 'secondtext' => 'can count on'],
];

$pdo->exec('TRUNCATE TABLE hero_slides');

$pdo->beginTransaction();

try {
    $insert = $pdo->prepare(
        'INSERT INTO hero_slides (id, heading, firsttext, secondtext, heading_color, subtext_color, centered, sort_order, is_active)
         VALUES (:id, :heading, :firsttext, :secondtext, :heading_color, :subtext_color, 0, :sort_order, 1)'
    );

    foreach ($slides as $index => $slide) {
        $insert->execute([
            ':id' => $slide['id'],
            ':heading' => $slide['heading'],
            ':firsttext' => $slide['firsttext'],
            ':secondtext' => $slide['secondtext'],
            ':heading_color' => '#1a365d',
            ':subtext_color' => '#2c5282',
            ':sort_order' => $index + 1,
        ]);
    }

    $pdo->commit();

    $pdo->exec('ALTER TABLE hero_slides AUTO_INCREMENT = 100');

    echo 'Seeded ' . count($slides) . " hero slides into `hero_slides`.\n";
} catch (Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    exit('Seeding failed: ' . $e->getMessage() . "\n");
}
