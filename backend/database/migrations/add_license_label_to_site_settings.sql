-- Migration: Add license label to site_settings table
-- Purpose: Make the header "PCP License Number:" label admin-editable
-- Date: 2026-07-03

ALTER TABLE `site_settings`
    ADD COLUMN `license_label` VARCHAR(180) DEFAULT 'PCP License Number' AFTER `license_number`;
