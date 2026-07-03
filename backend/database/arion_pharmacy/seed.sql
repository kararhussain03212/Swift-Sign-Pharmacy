-- Arion Pharmacy — Header module seed data
-- Mirrors the current hardcoded header content so the live site is unchanged after the data-source swap.
USE `arion-pharmacy`;

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

-- Footer quick links (Footer.jsx "Quick Links" column)
INSERT IGNORE INTO `footer_quick_links` (`id`, `label`, `url`, `sort_order`, `is_active`) VALUES
(1, 'Asaan Order', '/asaan-order', 1, 1),
(2, 'Support', '/contact', 2, 1),
(3, 'About Us', '/', 3, 1),
(4, 'Blogs', '/blog', 4, 1),
(5, 'Contact Us', '/contact', 5, 1);

-- Footer company info (single row) — mirrors src/data/contactInfo.js
INSERT IGNORE INTO `footer_company_info` (`id`, `logo_url`, `address`, `email`, `phone`) VALUES
(1, NULL, 'Office 22, 4th Floor, Pakland City Center, I-8 Markaz, Islamabad, Pakistan', 'contactus@arion.pk', '+92 333 8399480');

-- Footer app download badges
INSERT IGNORE INTO `footer_app_links` (`id`, `platform`, `label`, `url`, `badge_image_url`, `sort_order`, `is_active`) VALUES
(1, 'app_store', 'Download on the App Store', '#', 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg', 1, 1),
(2, 'google_play', 'Get it on Google Play', '#', 'https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg', 2, 1);

-- Footer social links
INSERT IGNORE INTO `footer_social_links` (`id`, `platform`, `icon_key`, `url`, `sort_order`, `is_active`) VALUES
(1, 'Facebook', 'facebook', 'https://www.facebook.com', 1, 1),
(2, 'Instagram', 'instagram', 'https://www.instagram.com', 2, 1),
(3, 'X', 'x', '#', 3, 1),
(4, 'LinkedIn', 'linkedin', '#', 4, 1);

-- Footer settings (single row)
INSERT IGNORE INTO `footer_settings` (`id`, `copyright_text`, `funded_by_text`) VALUES
(1, '© 2026 Arion Pharmacy - Commercial Market, Powered by Swift Sign Group Of Companies', 'Funded By Swift Sign Business Management');
