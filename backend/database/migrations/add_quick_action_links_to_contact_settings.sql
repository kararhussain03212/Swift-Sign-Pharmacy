-- Migration: Add per-tile link overrides for the Contact page's quick-action
-- grid (Call/SMS/Email/WhatsApp/Website/Location). When set, these take
-- priority over the shared phone/email/whatsapp/website/map fields so an
-- admin can point a tile somewhere different without touching those.

ALTER TABLE `contact_page_settings`
  ADD COLUMN `call_action_link` VARCHAR(255) DEFAULT NULL AFTER `call_action_label`,
  ADD COLUMN `sms_action_link` VARCHAR(255) DEFAULT NULL AFTER `sms_action_label`,
  ADD COLUMN `email_action_link` VARCHAR(255) DEFAULT NULL AFTER `email_action_label`,
  ADD COLUMN `whatsapp_action_link` VARCHAR(255) DEFAULT NULL AFTER `whatsapp_action_label`,
  ADD COLUMN `website_action_link` VARCHAR(255) DEFAULT NULL AFTER `website_action_label`,
  ADD COLUMN `location_action_link` VARCHAR(255) DEFAULT NULL AFTER `location_action_label`;
