-- Migration: Certifications page — hero/trust copy, certificate categories
-- (Academic / Professional), individual certificate records, and trust badges.
-- Lives in the `arion_pharmacy` (underscore) database, same as the Header/Footer
-- modules, since it follows the same category+items+singleton pattern.

USE `arion-pharmacy`;

CREATE TABLE IF NOT EXISTS `certification_page_content` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `hero_badge_text` VARCHAR(100) NOT NULL,
  `hero_heading` VARCHAR(150) NOT NULL,
  `hero_subheading` TEXT NOT NULL,
  `trust_heading` VARCHAR(150) NOT NULL,
  `trust_paragraph` TEXT NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `certification_categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL COMMENT 'e.g. "Academic Certifications", "Professional Certifications"',
  `icon_key` VARCHAR(50) NOT NULL DEFAULT 'award' COMMENT 'used on the group''s pill label',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `sort_order` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `certifications` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_id` INT UNSIGNED NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `type_tag` VARCHAR(100) DEFAULT NULL COMMENT 'free text, e.g. License, Diploma, Credential, Registration, Compliance, Specialization, University',
  `certificate_image_url` VARCHAR(500) NOT NULL,
  `license_number` VARCHAR(100) DEFAULT NULL COMMENT 'populated only for the record flagged is_primary_license, mirrors the header PCP License Number',
  `is_primary_license` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'flags the one record that mirrors the header''s PCP License Number, if consolidating',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `sort_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `certifications_category_index` (`category_id`),
  KEY `certifications_active_sort_index` (`is_active`, `sort_order`),
  CONSTRAINT `fk_certifications_category` FOREIGN KEY (`category_id`) REFERENCES `certification_categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `certification_trust_badges` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `label` VARCHAR(100) NOT NULL COMMENT 'e.g. "DRAP Registered", "PCP Licensed", "ISO Certified", "Quality Assured"',
  `icon_key` VARCHAR(50) NOT NULL DEFAULT 'check-circle',
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
