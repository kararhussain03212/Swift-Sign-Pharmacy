-- Arion Pharmacy — Header module schema
-- Database: arion_pharmacy
-- Tables: announcement_bar, site_settings, nav_links, categories, locations, hero_slides

CREATE DATABASE IF NOT EXISTS `arion_pharmacy` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `arion_pharmacy`;

CREATE TABLE IF NOT EXISTS `announcement_bar` (
    `id`         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `text`       VARCHAR(500) NOT NULL,
    `icon`       VARCHAR(120) DEFAULT NULL,
    `is_active`  TINYINT(1) NOT NULL DEFAULT 1,
    `sort_order` SMALLINT NOT NULL DEFAULT 0,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `site_settings` (
    `id`                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `logo_url`          VARCHAR(500) DEFAULT NULL,
    `site_name`         VARCHAR(180) NOT NULL DEFAULT 'Arion Pharmacy',
    `hot_deals_link`    VARCHAR(500) DEFAULT NULL,
    `hot_deals_text`    VARCHAR(180) DEFAULT 'Hot Deals',
    `hot_deals_enabled` TINYINT(1) NOT NULL DEFAULT 1,
    `prescription_link`    VARCHAR(500) DEFAULT '/asaan-order',
    `prescription_text` VARCHAR(180) DEFAULT 'Prescription',
    `prescription_enabled` TINYINT(1) NOT NULL DEFAULT 1,
    `country`           VARCHAR(120) DEFAULT NULL,
    `license_number`    VARCHAR(120) DEFAULT NULL,
    `created_at`        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `nav_links` (
    `id`         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `label`      VARCHAR(120) NOT NULL,
    `url`        VARCHAR(500) NOT NULL,
    `sort_order` SMALLINT NOT NULL DEFAULT 0,
    `is_active`  TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `categories` (
    `id`         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name`       VARCHAR(180) NOT NULL,
    `slug`       VARCHAR(180) NOT NULL,
    `parent_id`  INT UNSIGNED DEFAULT NULL,
    `sort_order` SMALLINT NOT NULL DEFAULT 0,
    `is_active`  TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `categories_slug_unique` (`slug`),
    KEY `categories_parent_id_index` (`parent_id`),
    CONSTRAINT `categories_parent_id_fk` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `locations` (
    `id`         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name`       VARCHAR(180) NOT NULL,
    `is_active`  TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `hero_slides` (
    `id`             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `heading`        VARCHAR(255) NOT NULL,
    `firsttext`      VARCHAR(255) DEFAULT NULL,
    `secondtext`     VARCHAR(255) DEFAULT NULL,
    `image`          VARCHAR(500) DEFAULT NULL,
    `heading_color`  VARCHAR(20) DEFAULT '#1a365d',
    `subtext_color`  VARCHAR(20) DEFAULT '#2c5282',
    `centered`       TINYINT(1) NOT NULL DEFAULT 0,
    `sort_order`     SMALLINT NOT NULL DEFAULT 0,
    `is_active`      TINYINT(1) NOT NULL DEFAULT 1,
    `created_at`     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Store Locator module
CREATE TABLE IF NOT EXISTS `store_branches` (
    `id`             INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`           VARCHAR(150) NOT NULL,
    `address`        VARCHAR(255) NOT NULL,
    `area`           VARCHAR(150) NOT NULL,
    `city`           VARCHAR(100) NOT NULL,
    `latitude`       DECIMAL(10,7) NOT NULL,
    `longitude`      DECIMAL(10,7) NOT NULL,
    `phone`          VARCHAR(30) DEFAULT NULL,
    `hours_display`  VARCHAR(150) NOT NULL,
    `detail_slug`    VARCHAR(220) NOT NULL,
    `is_active`      TINYINT(1) NOT NULL DEFAULT 1,
    `sort_order`     INT NOT NULL DEFAULT 0,
    `created_at`     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_detail_slug` (`detail_slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `store_network_stats` (
    `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `value`      VARCHAR(20) NOT NULL,
    `label`      VARCHAR(100) NOT NULL,
    `sort_order` INT NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `store_locator_content` (
    `id`                 INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `page_title`         VARCHAR(150) NOT NULL,
    `page_subtitle`      TEXT NOT NULL,
    `network_eyebrow`    VARCHAR(100) NOT NULL,
    `network_heading`    VARCHAR(200) NOT NULL,
    `network_paragraph`  TEXT NOT NULL,
    `outlets_eyebrow`    VARCHAR(100) NOT NULL,
    `outlets_heading`    VARCHAR(200) NOT NULL,
    `outlets_paragraph`  TEXT NOT NULL,
    `updated_at`         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `store_gallery_images` (
    `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `image_url`  VARCHAR(500) NOT NULL,
    `alt_text`   VARCHAR(255) DEFAULT NULL,
    `sort_order` INT NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
