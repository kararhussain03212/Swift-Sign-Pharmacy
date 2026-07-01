-- Add customizable text fields for Hot Deals and Prescription buttons
-- This migration adds two new columns to the site_settings table to allow
-- customizing the button labels in the admin panel.

USE `arion_pharmacy`;

-- Add hot_deals_text column (after hot_deals_link)
ALTER TABLE `site_settings`
ADD COLUMN `hot_deals_text` VARCHAR(180) DEFAULT 'Hot Deals' AFTER `hot_deals_link`;

-- Add prescription_text column (after prescription_link)
ALTER TABLE `site_settings`
ADD COLUMN `prescription_text` VARCHAR(180) DEFAULT 'Prescription' AFTER `prescription_link`;

-- Update existing row with default values if they're NULL
UPDATE `site_settings`
SET
  `hot_deals_text` = COALESCE(`hot_deals_text`, 'Hot Deals'),
  `prescription_text` = COALESCE(`prescription_text`, 'Prescription')
WHERE `id` = 1;
