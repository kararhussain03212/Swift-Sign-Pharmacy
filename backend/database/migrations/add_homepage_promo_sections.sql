-- Migration: Make the homepage promo sections dynamic
-- Covers: WideBanner ("Up To 25% Off" dark-teal banner), PromoCards (3-card grid),
-- HealthierBanner ("Care Plan" CTA), FeaturedBrands strip, and TrustBadges bar.
-- Note: the Swiper-based HeroBanner/hero_slides carousel is a separate, already-dynamic
-- section and is NOT touched by this migration.

CREATE TABLE IF NOT EXISTS `homepage_hero_banner` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `heading` VARCHAR(150) NOT NULL,
  `subheading` VARCHAR(150) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `button_text` VARCHAR(50) NOT NULL,
  `button_link` VARCHAR(255) NOT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `homepage_hero_banner_images` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `image_url` VARCHAR(500) NOT NULL,
  `alt_text` VARCHAR(255) DEFAULT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `homepage_promo_cards` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `heading` VARCHAR(150) NOT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `highlight_text` VARCHAR(100) DEFAULT NULL,
  `button_text` VARCHAR(50) NOT NULL,
  `button_link` VARCHAR(255) NOT NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `image_alt` VARCHAR(255) DEFAULT NULL,
  `layout_key` VARCHAR(30) NOT NULL DEFAULT 'image_right',
  `theme_key` VARCHAR(30) NOT NULL DEFAULT 'light-teal',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `sort_order` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `homepage_care_plan_banner` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `eyebrow` VARCHAR(100) NOT NULL,
  `heading` VARCHAR(200) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `button_text` VARCHAR(50) NOT NULL,
  `button_link` VARCHAR(255) NOT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `featured_brands` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `logo_url` VARCHAR(500) DEFAULT NULL,
  `link_url` VARCHAR(255) DEFAULT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `sort_order` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- No existing shared "features/trust bar" table renders this exact 4-column
-- shipping/guarantee/support/payment content anywhere else in the project
-- (commitment_items is a different, unrelated "Our Commitment" content set
-- that isn't currently rendered on the public site) — so this is a new table.
CREATE TABLE IF NOT EXISTS `trust_badges` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `icon_key` VARCHAR(50) NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `subtitle` VARCHAR(150) NOT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 1. Hero banner (singleton, id = 1) — matches WideBanner.jsx current copy
INSERT INTO `homepage_hero_banner`
  (`id`, `heading`, `subheading`, `description`, `button_text`, `button_link`)
VALUES
  (1, 'Up To 25% Off', 'On Top Brands', 'Extra 8% Off on the Healthcare Range', 'SHOP NOW', '/shop')
ON DUPLICATE KEY UPDATE
  `heading` = VALUES(`heading`),
  `subheading` = VALUES(`subheading`),
  `description` = VALUES(`description`),
  `button_text` = VALUES(`button_text`);

INSERT INTO `homepage_hero_banner_images` (`image_url`, `alt_text`, `sort_order`) VALUES
  ('/generic_vitamin_bottle.png', 'Product 1', 1),
  ('/jellybee_gummies.png', 'Product 2', 2),
  ('/generic_serum_dropper.png', 'Product 3', 3);

-- 2. Promo cards — matches PromoCards.jsx current copy
INSERT INTO `homepage_promo_cards`
  (`heading`, `description`, `highlight_text`, `button_text`, `button_link`, `image_url`,
   `image_alt`, `layout_key`, `theme_key`, `is_active`, `sort_order`)
VALUES
  (
    'Discount 50% Up To',
    'Vitamins & General Supplements From 59k Products',
    NULL,
    'Book Now',
    '/shop',
    '/jellybee_gummies.png',
    'Jellybee Gummies',
    'image_right',
    'light-teal',
    1, 1
  ),
  (
    'Best Item Chance',
    'Extra 20% Off Select Health Care Care With Code HEALTH20',
    NULL,
    'Book Now',
    '/shop',
    '/marine_collagen.png',
    'Marine Collagen',
    'image_left',
    'dark-teal',
    1, 2
  ),
  (
    'Refreshing & Healthy Beauty',
    NULL,
    'EXTRA 15% OFF',
    'Book Now',
    '/shop',
    '/detox_facial_oil.png',
    'Detox Facial Oil',
    'image_bottom',
    'pink-teal',
    1, 3
  );

-- 3. Care plan banner (singleton, id = 1) — matches HealthierBanner.jsx current copy
INSERT INTO `homepage_care_plan_banner`
  (`id`, `eyebrow`, `heading`, `description`, `button_text`, `button_link`)
VALUES
  (1, 'CARE PLAN', 'Get Healthier Together', 'Book 2 Packages And Get Flat 25% Off On the Second Package', 'BOOK NOW', '/care-plans')
ON DUPLICATE KEY UPDATE
  `eyebrow` = VALUES(`eyebrow`),
  `heading` = VALUES(`heading`),
  `description` = VALUES(`description`),
  `button_text` = VALUES(`button_text`);

-- 4. Featured brands — matches src/data/brands.js current copy (placeholder logos)
INSERT INTO `featured_brands` (`name`, `logo_url`, `link_url`, `is_active`, `sort_order`) VALUES
  ('NutriPlus', 'https://placehold.co/140x50/F5F5F5/1A9E6E?text=NutriPlus', '/brands/nutriplus', 1, 1),
  ('SunVita', 'https://placehold.co/140x50/F5F5F5/F59E0B?text=SunVita', '/brands/sunvita', 1, 2),
  ('OceanHealth', 'https://placehold.co/140x50/F5F5F5/3B82F6?text=OceanHealth', '/brands/oceanhealth', 1, 3),
  ('ProFit', 'https://placehold.co/140x50/F5F5F5/E53E3E?text=ProFit', '/brands/profit', 1, 4),
  ('GlowLab', 'https://placehold.co/140x50/F5F5F5/F57C44?text=GlowLab', '/brands/glowlab', 1, 5),
  ('TinyHealth', 'https://placehold.co/140x50/F5F5F5/1A9E6E?text=TinyHealth', '/brands/tinyhealth', 1, 6),
  ('DreamWell', 'https://placehold.co/140x50/F5F5F5/6366F1?text=DreamWell', '/brands/dreamwell', 1, 7),
  ('GutGuard', 'https://placehold.co/140x50/F5F5F5/10B981?text=GutGuard', '/brands/gutguard', 1, 8);

-- 5. Trust badges — matches TrustBadges.jsx current copy
INSERT INTO `trust_badges` (`icon_key`, `title`, `subtitle`, `sort_order`, `is_active`) VALUES
  ('truck', 'FREE SHIPPING', 'Orders over $130', 1, 1),
  ('dollar-sign', 'MONEY GUARANTEE', '30-day exchange', 2, 1),
  ('headset', 'ONLINE SUPPORT', '24/7 Support care', 3, 1),
  ('credit-card', 'FLEXIBLE PAYMENT', 'Multi-card payment', 4, 1);
