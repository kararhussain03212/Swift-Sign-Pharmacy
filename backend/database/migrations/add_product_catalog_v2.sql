-- Migration: category-driven product catalog with type-specific extension tables
-- (pharmacy vs chemical). Replaces the old flat `products` table (renamed to
-- `products_legacy_v1` as a backup, not dropped) with a schema where each
-- product's `product_type` is derived from its category (see the `product_type`
-- column added to arion_pharmacy.categories) rather than chosen manually.
--
-- Lives in organic_food (same DB as the rest of this backend's product-adjacent
-- tables); category_id is a real cross-database FK into arion_pharmacy.categories
-- since both databases live on the same MySQL server.

CREATE TABLE IF NOT EXISTS `products` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `category_id` INT UNSIGNED NOT NULL,
  `product_type` ENUM('pharmacy','chemical') NOT NULL COMMENT 'derived from category at save time, not chosen manually',
  `manufacturer_or_brand` VARCHAR(150) NOT NULL COMMENT 'labeled "Brand" on pharmacy pages, "Manufacturer" on chemical pages',
  `form` VARCHAR(100) DEFAULT NULL,
  `sku` VARCHAR(100) DEFAULT NULL,
  `base_price` DECIMAL(10,2) NOT NULL,
  `badge_label` VARCHAR(50) DEFAULT NULL,
  `description_text` TEXT DEFAULT NULL,
  `stock_status` ENUM('in_stock','out_of_stock','preorder') NOT NULL DEFAULT 'in_stock',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_slug` (`slug`),
  KEY `idx_category_id` (`category_id`),
  CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `arion_pharmacy`.`categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `product_images` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_product_images_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `product_reviews` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `rating` TINYINT UNSIGNED NOT NULL,
  `reviewer_name` VARCHAR(150) DEFAULT NULL,
  `review_text` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_product_reviews_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===== Pharmacy-type extension =====
CREATE TABLE IF NOT EXISTS `pharmacy_product_details` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `net_weight` VARCHAR(50) DEFAULT NULL,
  `original_price` DECIMAL(10,2) DEFAULT NULL,
  `discount_percent` TINYINT UNSIGNED DEFAULT NULL,
  `directions_for_use` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_pharmacy_product` (`product_id`),
  CONSTRAINT `fk_pharmacy_details_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `pharmacy_product_benefits` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `benefit_text` VARCHAR(255) NOT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_pharmacy_benefits_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===== Chemical-type extension =====
CREATE TABLE IF NOT EXISTS `chemical_product_details` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `cas_number` VARCHAR(50) DEFAULT NULL,
  `chemical_name_of_material` VARCHAR(255) DEFAULT NULL,
  `boiling_point` VARCHAR(100) DEFAULT NULL,
  `melting_point` VARCHAR(100) DEFAULT NULL,
  `molecular_formula` VARCHAR(150) DEFAULT NULL,
  `molecular_weight` VARCHAR(50) DEFAULT NULL,
  `percent_purity` VARCHAR(50) DEFAULT NULL,
  `color` VARCHAR(100) DEFAULT NULL,
  `synonym` VARCHAR(255) DEFAULT NULL,
  `grade` VARCHAR(100) DEFAULT NULL,
  `unit_size` VARCHAR(50) DEFAULT NULL,
  `molecule_diagram_url` VARCHAR(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_chemical_product` (`product_id`),
  CONSTRAINT `fk_chemical_details_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `chemical_product_quantity_options` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `label` VARCHAR(50) NOT NULL,
  `price_override` DECIMAL(10,2) DEFAULT NULL,
  `is_default` TINYINT(1) NOT NULL DEFAULT 0,
  `sort_order` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_chem_qty_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `chemical_product_packaging_options` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `label` VARCHAR(150) NOT NULL,
  `is_default` TINYINT(1) NOT NULL DEFAULT 0,
  `sort_order` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_chem_pkg_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `chemical_product_documents` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `doc_group` ENUM('certificate','safety_data_sheet','product_information','scientific_resource') NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `lot_number` VARCHAR(100) DEFAULT NULL,
  `certificate_type` VARCHAR(100) DEFAULT NULL,
  `document_date` DATE DEFAULT NULL,
  `catalog_numbers` VARCHAR(255) DEFAULT NULL,
  `file_url` VARCHAR(500) NOT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_chem_docs_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
