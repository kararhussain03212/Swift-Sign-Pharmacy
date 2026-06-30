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
INSERT IGNORE INTO `site_settings` (`id`, `logo_url`, `site_name`, `hot_deals_link`, `hot_deals_enabled`, `country`, `license_number`) VALUES
(1, NULL, 'Arion Pharmacy', '/shop?deals=true', 1, 'Pakistan', '2659-A/2014-PC');

-- Nav links (Navbar.jsx primary links)
INSERT IGNORE INTO `nav_links` (`id`, `label`, `url`, `sort_order`, `is_active`) VALUES
(1, 'Home', '/', 1, 1),
(2, 'Blog', '/blog', 2, 1),
(3, 'Certification', '/certification', 3, 1),
(4, 'Store Locator', '/store-locator', 4, 1),
(5, 'Contact', '/contact', 5, 1);

-- Categories (top-level)
INSERT IGNORE INTO `categories` (`id`, `name`, `slug`, `parent_id`, `icon_url`, `sort_order`, `is_active`) VALUES
(1, 'Diseases', 'diseases', NULL, NULL, 1, 1),
(2, 'Medicines', 'medicines', NULL, NULL, 2, 1),
(3, 'Vitamins & Supplements', 'vitamins-supplements', NULL, NULL, 3, 1),
(4, 'Personal Care', 'personal-care', NULL, NULL, 4, 1),
(5, 'Baby Care', 'baby-care', NULL, NULL, 5, 1),
(6, 'Lifestyle & Fitness', 'lifestyle-fitness', NULL, NULL, 6, 1),
(7, 'Organic', 'organic', NULL, NULL, 7, 1),
(8, 'Healthcare Device', 'healthcare-device', NULL, NULL, 8, 1),
(9, 'Obesity', 'obesity', NULL, NULL, 9, 1);

-- Categories (sample subcategories)
INSERT IGNORE INTO `categories` (`id`, `name`, `slug`, `parent_id`, `icon_url`, `sort_order`, `is_active`) VALUES
(10, 'Prescription Medicines', 'prescription-medicines', 2, NULL, 1, 1),
(11, 'Over the Counter (OTC)', 'otc', 2, NULL, 2, 1),
(12, 'Pain Relief', 'pain-relief', 2, NULL, 3, 1),
(13, 'Oral Hygiene', 'oral-hygiene', 4, NULL, 1, 1),
(14, 'Skin Care', 'skin-care', 4, NULL, 2, 1);

-- Locations (placeholder + sample cities)
INSERT IGNORE INTO `locations` (`id`, `name`, `is_active`) VALUES
(1, 'Select Location', 1),
(2, 'Islamabad', 1),
(3, 'Lahore', 1),
(4, 'Karachi', 1);
