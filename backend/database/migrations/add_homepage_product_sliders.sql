-- Migration: Dynamic, admin-configurable homepage product slider sections.
-- Replaces the hardcoded "Popular Product" / "Daily Well-being" / "Sexual Wellness" /
-- "Medical Equipments" components with admin-managed sliders that pull products from
-- whichever existing product categories the admin links to each slider.
--
-- Lives in the same database as `products` (organic_food) so the public slider query
-- can join/filter products in a single connection. `categories` lives in the separate
-- arion_pharmacy database (see backend/config/arion_database.php), so there is no real
-- FK from homepage_slider_categories.category_id to it — category_slug is denormalized
-- at write time (resolved server-side from the real categories table) and used to match
-- against products.category, which already stores the same slug values.

CREATE TABLE IF NOT EXISTS `homepage_product_sliders` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(150) NOT NULL,
  `view_all_link` VARCHAR(255) DEFAULT NULL COMMENT 'if null, auto-built from the first linked category''s slug as /shop/{slug}',
  `max_products` TINYINT UNSIGNED NOT NULL DEFAULT 10,
  `sort_criteria` ENUM('newest','best_selling','random','price_low_high','price_high_low') NOT NULL DEFAULT 'newest',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `sort_order` INT NOT NULL DEFAULT 0 COMMENT 'controls vertical position among sliders on the homepage — lower shows first',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `homepage_slider_categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slider_id` INT UNSIGNED NOT NULL,
  `category_id` INT UNSIGNED NOT NULL COMMENT 'id in the separate arion_pharmacy.categories table (no cross-db FK)',
  `category_slug` VARCHAR(120) NOT NULL COMMENT 'denormalized from arion_pharmacy.categories.slug at write time; matched against products.category',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_slider_category` (`slider_id`, `category_id`),
  CONSTRAINT `fk_slider_categories_slider` FOREIGN KEY (`slider_id`)
    REFERENCES `homepage_product_sliders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
