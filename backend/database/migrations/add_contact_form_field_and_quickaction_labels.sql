-- Migration: Make the Contact form field labels/placeholders and the
-- quick-action tile labels (Call/SMS/Email/WhatsApp/Website/Location) editable.

ALTER TABLE `contact_page_settings`
  ADD COLUMN `name_label` VARCHAR(50) DEFAULT NULL AFTER `form_subtext`,
  ADD COLUMN `name_placeholder` VARCHAR(100) DEFAULT NULL AFTER `name_label`,
  ADD COLUMN `email_label` VARCHAR(50) DEFAULT NULL AFTER `name_placeholder`,
  ADD COLUMN `email_placeholder` VARCHAR(100) DEFAULT NULL AFTER `email_label`,
  ADD COLUMN `phone_label` VARCHAR(50) DEFAULT NULL AFTER `email_placeholder`,
  ADD COLUMN `phone_placeholder` VARCHAR(100) DEFAULT NULL AFTER `phone_label`,
  ADD COLUMN `subject_label` VARCHAR(50) DEFAULT NULL AFTER `phone_placeholder`,
  ADD COLUMN `subject_placeholder` VARCHAR(100) DEFAULT NULL AFTER `subject_label`,
  ADD COLUMN `message_label` VARCHAR(50) DEFAULT NULL AFTER `subject_placeholder`,
  ADD COLUMN `message_placeholder` VARCHAR(150) DEFAULT NULL AFTER `message_label`,
  ADD COLUMN `call_action_label` VARCHAR(30) DEFAULT NULL AFTER `save_contact_button_text`,
  ADD COLUMN `sms_action_label` VARCHAR(30) DEFAULT NULL AFTER `call_action_label`,
  ADD COLUMN `email_action_label` VARCHAR(30) DEFAULT NULL AFTER `sms_action_label`,
  ADD COLUMN `whatsapp_action_label` VARCHAR(30) DEFAULT NULL AFTER `email_action_label`,
  ADD COLUMN `website_action_label` VARCHAR(30) DEFAULT NULL AFTER `whatsapp_action_label`,
  ADD COLUMN `location_action_label` VARCHAR(30) DEFAULT NULL AFTER `website_action_label`;

UPDATE `contact_page_settings` SET
  `name_label` = 'Full Name',
  `name_placeholder` = 'John Doe',
  `email_label` = 'Email Address',
  `email_placeholder` = 'you@example.com',
  `phone_label` = 'Phone Number',
  `phone_placeholder` = '+92 311 000 0000',
  `subject_label` = 'Subject',
  `subject_placeholder` = 'e.g. Order Inquiry',
  `message_label` = 'Message',
  `message_placeholder` = 'Tell us how we can help you...',
  `call_action_label` = 'Call',
  `sms_action_label` = 'SMS',
  `email_action_label` = 'Email',
  `whatsapp_action_label` = 'WhatsApp',
  `website_action_label` = 'Website',
  `location_action_label` = 'Location'
WHERE `id` = 1;
