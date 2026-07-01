-- Remove icon_url column from categories table
-- Categories no longer support icon uploads through the admin panel.

USE `arion_pharmacy`;

ALTER TABLE `categories`
DROP COLUMN `icon_url`;
