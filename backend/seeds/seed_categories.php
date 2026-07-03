<?php

declare(strict_types=1);

/**
 * Seeds the `categories` table (arion_pharmacy database) from the
 * canonical frontend data in src/data/categories.js.
 *
 * Clears existing rows and re-inserts top-level categories followed by
 * their subcategories (linked via parent_id), so the DB exactly mirrors
 * the static frontend data. Safe to re-run.
 *
 * Run from CLI:  php backend/seeds/seed_categories.php
 */

require_once __DIR__ . '/../config/env.php';

use Backend\Config\Env;

Env::load(__DIR__ . '/../.env');

$host = Env::get('ARION_DB_HOST', Env::get('DB_HOST', 'localhost'));
$port = Env::get('ARION_DB_PORT', Env::get('DB_PORT', '3306'));
$name = Env::get('ARION_DB_NAME', 'arion-pharmacy');
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

// Mirrors src/data/categories.js (the `categories` export) exactly.
$categories = [
    ['id' => 1, 'name' => 'Medicines', 'slug' => 'medicines', 'image' => '/jellybee_gummies.png', 'subCategories' => [
        ['name' => 'All Medicines', 'slug' => 'all-medicines'],
        ['name' => 'Prescription Medicines', 'slug' => 'prescription-medicines'],
        ['name' => 'Over the Counter (OTC)', 'slug' => 'otc'],
        ['name' => 'Homeopathic', 'slug' => 'homeopathic'],
        ['name' => 'Ayurvedic', 'slug' => 'ayurvedic'],
        ['name' => 'Pain Relief', 'slug' => 'pain-relief'],
        ['name' => 'First Aid', 'slug' => 'first-aid'],
    ]],
    ['id' => 2, 'name' => 'Vitamins', 'slug' => 'vitamins', 'image' => '/generic_vitamin_bottle.png', 'subCategories' => [
        ['name' => 'Multivitamins', 'slug' => 'multivitamins'],
        ['name' => 'Omega 3 & Fish Oil', 'slug' => 'omega-3'],
        ['name' => 'Calcium & Minerals', 'slug' => 'minerals'],
        ['name' => 'Vitamin D', 'slug' => 'vitamin-d'],
        ['name' => 'Vitamin C', 'slug' => 'vitamin-c'],
        ['name' => 'Immunity Boosters', 'slug' => 'immunity-boosters'],
    ]],
    ['id' => 3, 'name' => 'Personal Care', 'slug' => 'personal-care', 'image' => '/generic_serum_dropper.png', 'subCategories' => [
        ['name' => 'Oral Hygiene', 'slug' => 'oral-hygiene'],
        ['name' => 'Skin Care', 'slug' => 'skin-care'],
        ['name' => 'Hair & Nail Care', 'slug' => 'hair-nail-care'],
        ['name' => 'Fragrances', 'slug' => 'fragrances'],
    ]],
    ['id' => 4, 'name' => 'Baby Care', 'slug' => 'baby-care', 'image' => '/generic_baby_care.png', 'subCategories' => [
        ['name' => 'Baby Nutrition', 'slug' => 'baby-nutrition'],
        ['name' => 'Baby Bath', 'slug' => 'baby-bath'],
        ['name' => 'Baby Essentials', 'slug' => 'baby-essentials'],
    ]],
    ['id' => 5, 'name' => 'Lifestyle & Fitness', 'slug' => 'lifestyle-fitness', 'image' => '/generic_supplement_tub.png', 'subCategories' => [
        ['name' => 'Daily Well-being', 'slug' => 'daily-wellbeing'],
        ['name' => "Men's Health", 'slug' => 'mens-health'],
        ['name' => "Women's Health", 'slug' => 'womens-health'],
        ['name' => 'Elder Care', 'slug' => 'elder-care'],
    ]],
    ['id' => 6, 'name' => 'Sexual Wellness', 'slug' => 'sexual-wellness', 'image' => '/la_shield_sunscreen.png', 'subCategories' => [
        ['name' => 'Condoms', 'slug' => 'condoms'],
        ['name' => 'Lubricants', 'slug' => 'lubricants'],
        ['name' => 'Massagers', 'slug' => 'massagers'],
        ['name' => 'Performance Enhancers', 'slug' => 'performance-enhancers'],
        ['name' => 'Pregnancy Test Kits', 'slug' => 'pregnancy-test-kits'],
    ]],
    ['id' => 7, 'name' => 'Organic', 'slug' => 'organic', 'image' => '/detox_facial_oil.png', 'subCategories' => [
        ['name' => 'Homeopathic', 'slug' => 'homeopathic'],
        ['name' => 'Organic Health', 'slug' => 'organic-health'],
        ['name' => 'Herbal Care', 'slug' => 'herbal-care'],
    ]],
    ['id' => 8, 'name' => 'Healthcare Device', 'slug' => 'healthcare-device', 'image' => '/jellybee_gummies.png', 'subCategories' => [
        ['name' => 'Medical Equipment', 'slug' => 'medical-equipment'],
        ['name' => 'Supports & Braces', 'slug' => 'supports-braces'],
        ['name' => 'Hospital Supplies', 'slug' => 'hospital-supplies'],
    ]],
    ['id' => 9, 'name' => 'Obesity', 'slug' => 'obesity', 'image' => '/jellybee_gummies.png', 'subCategories' => [
        ['name' => 'Weight Loss Supplements', 'slug' => 'weight-loss-supplements'],
        ['name' => 'Fat Burners', 'slug' => 'fat-burners'],
        ['name' => 'Appetite Suppressants', 'slug' => 'appetite-suppressants'],
        ['name' => 'Metabolism Boosters', 'slug' => 'metabolism-boosters'],
        ['name' => 'Diet Plans & Programs', 'slug' => 'diet-plans-programs'],
        ['name' => 'Fitness Equipment', 'slug' => 'fitness-equipment'],
    ]],
    ['id' => 10, 'name' => 'Performance and Wellness', 'slug' => 'performance-and-wellness', 'image' => '/jellybee_gummies.png', 'subCategories' => []],
    ['id' => 11, 'name' => 'Laboratory Chemicals', 'slug' => 'laboratory-chemicals', 'image' => '/jellybee_gummies.png', 'subCategories' => [
        ['name' => 'General Laboratory Chemicals', 'slug' => 'general-laboratory-chemicals'],
        ['name' => 'Salts', 'slug' => 'salts'],
        ['name' => 'Solvents', 'slug' => 'solvents'],
        ['name' => 'Buffers & Reagents', 'slug' => 'buffers-reagents'],
        ['name' => 'Indicators & Stains', 'slug' => 'indicators-stains'],
        ['name' => 'Microbiology Media', 'slug' => 'microbiology-media'],
        ['name' => 'HPLC & Analytical Grade Solvents', 'slug' => 'hplc-analytical-solvents'],
        ['name' => 'Diagnostic & Hospital Lab Chemicals', 'slug' => 'diagnostic-hospital-chemicals'],
    ]],
];

// TRUNCATE is DDL and implicitly commits, so it must run outside the
// insert transaction below.
$pdo->exec('SET FOREIGN_KEY_CHECKS = 0');
$pdo->exec('TRUNCATE TABLE categories');
$pdo->exec('SET FOREIGN_KEY_CHECKS = 1');

$pdo->beginTransaction();

try {
    $insert = $pdo->prepare(
        'INSERT INTO categories (id, name, slug, parent_id, icon_url, sort_order, is_active)
         VALUES (:id, :name, :slug, :parent_id, :icon_url, :sort_order, 1)'
    );
    $insertAuto = $pdo->prepare(
        'INSERT INTO categories (name, slug, parent_id, icon_url, sort_order, is_active)
         VALUES (:name, :slug, :parent_id, :icon_url, :sort_order, 1)'
    );

    $usedSlugs = [];
    $topCount = 0;
    $subCount = 0;

    // Insert all top-level categories first (explicit ids 1-11), so the
    // auto-increment counter clears them before any subcategory grabs an id.
    foreach ($categories as $index => $cat) {
        $usedSlugs[$cat['slug']] = true;

        $insert->execute([
            ':id' => $cat['id'],
            ':name' => $cat['name'],
            ':slug' => $cat['slug'],
            ':parent_id' => null,
            ':icon_url' => $cat['image'],
            ':sort_order' => $index + 1,
        ]);
        $topCount++;
    }

    foreach ($categories as $cat) {
        foreach ($cat['subCategories'] as $subIndex => $sub) {
            $subSlug = $sub['slug'];
            if (isset($usedSlugs[$subSlug])) {
                // categories.slug has a global UNIQUE constraint; disambiguate
                // collisions across parents (e.g. "Homeopathic" under both
                // Medicines and Organic) while keeping the display name intact.
                $subSlug = $subSlug . '-' . $cat['slug'];
            }
            $usedSlugs[$subSlug] = true;

            $insertAuto->execute([
                ':name' => $sub['name'],
                ':slug' => $subSlug,
                ':parent_id' => $cat['id'],
                ':icon_url' => null,
                ':sort_order' => $subIndex + 1,
            ]);
            $subCount++;
        }
    }

    $pdo->commit();

    // ALTER TABLE is DDL (implicit commit), so it runs after the transaction.
    $pdo->exec('ALTER TABLE categories AUTO_INCREMENT = 1000');

    echo "Seeded {$topCount} top-level categories and {$subCount} subcategories into `categories`.\n";
} catch (Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    exit('Seeding failed: ' . $e->getMessage() . "\n");
}
