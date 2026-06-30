-- Arion Pharmacy — Header module schema
-- Database: arion_pharmacy
-- Tables: announcement_bar, site_settings, nav_links, categories, locations

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
    `hot_deals_enabled` TINYINT(1) NOT NULL DEFAULT 1,
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
    `icon_url`   VARCHAR(500) DEFAULT NULL,
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
