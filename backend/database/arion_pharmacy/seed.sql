-- Arion Pharmacy — Header module seed data
-- Mirrors the current hardcoded header content so the live site is unchanged after the data-source swap.
USE `arion_pharmacy`;

-- Announcement bar (TopBar.jsx marquee messages)
INSERT IGNORE INTO `announcement_bar` (`id`, `text`, `icon`, `is_active`, `sort_order`) VALUES
(1, 'Get up to 10% off + extra 15% off on medicines & more offers.', NULL, 1, 1),
(2, 'Flash Deals Every Monday - Free Shipping on Orders Above $50', NULL, 1, 2),
(3, '100% Organic & Certified Products - New Member? Extra 15% Off First Order', NULL, 1, 3),
(4, 'Limited Period Offer: Get up to 10% off + extra 15% off on medicines & more offers.', NULL, 1, 4);

-- Site settings (single row)
INSERT IGNORE INTO `site_settings` (`id`, `logo_url`, `site_name`, `hot_deals_link`, `hot_deals_text`, `hot_deals_enabled`, `prescription_link`, `prescription_text`, `prescription_enabled`, `country`, `license_number`) VALUES
(1, NULL, 'Arion Pharmacy', '/shop/deals', 'Hot Deals', 1, '/asaan-order', 'Prescription', 1, 'Pakistan', '2659-A/2014-PC');

-- Nav links (Navbar.jsx primary links)
INSERT IGNORE INTO `nav_links` (`id`, `label`, `url`, `sort_order`, `is_active`) VALUES
(1, 'Home', '/', 1, 1),
(2, 'Blog', '/blog', 2, 1),
(3, 'Certification', '/certification', 3, 1),
(4, 'Store Locator', '/store-locator', 4, 1),
(5, 'Contact', '/contact', 5, 1);

-- Categories: seeded separately by backend/seeds/seed_categories.php, which is the
-- single source of truth (mirrors src/data/categories.js, including subcategories).
-- Run it after this file: php backend/seeds/seed_categories.php

-- Locations (placeholder + sample cities)
INSERT IGNORE INTO `locations` (`id`, `name`, `is_active`) VALUES
(1, 'Select Location', 1),
(2, 'Islamabad', 1),
(3, 'Lahore', 1),
(4, 'Karachi', 1);

-- Hero banner slides: seeded separately by backend/seeds/seed_hero_slides.php, which is
-- the single source of truth (mirrors the slides previously hardcoded in HeroBanner.jsx).
-- Run it after this file: php backend/seeds/seed_hero_slides.php
