-- Migration: Add an admin-editable business/contact name used when the
-- "Save Contact" button builds the downloadable .vcf vCard file.

ALTER TABLE `contact_page_settings`
  ADD COLUMN `vcard_business_name` VARCHAR(150) DEFAULT NULL AFTER `save_contact_button_text`;

UPDATE `contact_page_settings` SET `vcard_business_name` = 'Arion Pharmacy' WHERE `id` = 1;
