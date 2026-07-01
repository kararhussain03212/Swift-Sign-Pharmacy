-- Migration: Add prescription button settings to site_settings table (arion_pharmacy DB)
-- Purpose: Make the header "Prescription" CTA button admin-editable (link + show/hide)
-- Date: 2026-06-30

ALTER TABLE `site_settings`
    ADD COLUMN `prescription_link` VARCHAR(500) DEFAULT '/asaan-order' AFTER `hot_deals_enabled`,
    ADD COLUMN `prescription_enabled` TINYINT(1) NOT NULL DEFAULT 1 AFTER `prescription_link`;
