-- Migration: Footer module — quick links, company info, app download links,
-- social links, and copyright/funding settings, all admin-configurable.
-- Footer categories intentionally reuse the existing `categories` table
-- (same source as the Navbar/Shop pages) rather than a separate table.

USE `arion_pharmacy`;

CREATE TABLE IF NOT EXISTS `footer_quick_links` (
    `id`         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `label`      VARCHAR(120) NOT NULL,
    `url`        VARCHAR(500) NOT NULL,
    `sort_order` SMALLINT NOT NULL DEFAULT 0,
    `is_active`  TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY `footer_quick_links_active_sort_index` (`is_active`, `sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `footer_company_info` (
    `id`         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `logo_url`   VARCHAR(500) DEFAULT NULL,
    `address`    VARCHAR(500) NOT NULL,
    `email`      VARCHAR(150) NOT NULL,
    `phone`      VARCHAR(50) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `footer_app_links` (
    `id`               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `platform`         VARCHAR(50) NOT NULL,
    `label`            VARCHAR(150) NOT NULL,
    `url`              VARCHAR(500) NOT NULL,
    `badge_image_url`  VARCHAR(500) NOT NULL,
    `sort_order`       SMALLINT NOT NULL DEFAULT 0,
    `is_active`        TINYINT(1) NOT NULL DEFAULT 1,
    `created_at`       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY `footer_app_links_active_sort_index` (`is_active`, `sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `footer_social_links` (
    `id`         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `platform`   VARCHAR(50) NOT NULL,
    `icon_key`   VARCHAR(50) NOT NULL,
    `url`        VARCHAR(500) NOT NULL,
    `sort_order` SMALLINT NOT NULL DEFAULT 0,
    `is_active`  TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY `footer_social_links_active_sort_index` (`is_active`, `sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `footer_settings` (
    `id`                  INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `copyright_text`      VARCHAR(255) NOT NULL,
    `funded_by_text`      VARCHAR(255) DEFAULT NULL,
    `app_download_title`  VARCHAR(150) DEFAULT 'Download Our App',
    `created_at`          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
