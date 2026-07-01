-- Migration: Make the Contact Us page fully dynamic
-- Extends contact_page_settings with the copy fields the live page actually
-- renders (hero, form, location card, save-contact, follow-us, FAQ header),
-- drops columns that belonged to an older/unused Contact layout, adds
-- newsletter opt-in tracking to contact_messages, and introduces
-- contact_info_cards + contact_faqs for the two sections that were still
-- hardcoded in JSX.

ALTER TABLE `contact_page_settings`
  CHANGE COLUMN `hero_badge` `form_eyebrow` VARCHAR(120) DEFAULT NULL,
  ADD COLUMN `form_subtext` TEXT DEFAULT NULL AFTER `form_title`,
  ADD COLUMN `newsletter_checkbox_label` VARCHAR(255) DEFAULT NULL AFTER `form_subtext`,
  ADD COLUMN `location_card_heading` VARCHAR(100) DEFAULT NULL AFTER `submit_button_text`,
  ADD COLUMN `save_contact_button_text` VARCHAR(50) DEFAULT NULL AFTER `location_card_heading`,
  ADD COLUMN `follow_us_heading` VARCHAR(100) DEFAULT NULL AFTER `save_contact_button_text`,
  ADD COLUMN `faq_eyebrow` VARCHAR(100) DEFAULT NULL AFTER `follow_us_heading`,
  ADD COLUMN `faq_heading` VARCHAR(200) DEFAULT NULL AFTER `faq_eyebrow`,
  ADD COLUMN `faq_subtext` TEXT DEFAULT NULL AFTER `faq_heading`,
  ADD COLUMN `map_embed_url` VARCHAR(500) DEFAULT NULL AFTER `google_map_url`,
  ADD COLUMN `website_url` VARCHAR(255) DEFAULT NULL AFTER `tiktok_url`,
  DROP COLUMN `hero_highlight`,
  DROP COLUMN `name_placeholder`,
  DROP COLUMN `email_placeholder`,
  DROP COLUMN `phone_placeholder`,
  DROP COLUMN `subject_placeholder`,
  DROP COLUMN `message_placeholder`,
  DROP COLUMN `availability_text`,
  DROP COLUMN `contact_heading`,
  DROP COLUMN `contact_description`,
  DROP COLUMN `locations`;

UPDATE `contact_page_settings` SET
  `form_eyebrow` = 'GET IN TOUCH',
  `hero_heading` = 'Let''s Talk Health',
  `hero_description` = 'Have questions about medicines, products, or your order? Our expert pharmacists are here to help you.',
  `form_title` = 'Send Us a Message',
  `form_subtext` = 'Fill out the form below and our team will respond within 24 hours.',
  `newsletter_checkbox_label` = 'Subscribe to our health newsletter for tips, deals, and updates.',
  `submit_button_text` = 'Send Message',
  `location_card_heading` = 'Our Location',
  `save_contact_button_text` = 'Save Contact',
  `follow_us_heading` = 'Follow Us',
  `faq_eyebrow` = 'FAQ',
  `faq_heading` = 'Frequently Asked Questions',
  `faq_subtext` = 'Quick answers to the most common questions.',
  `phone_number` = '+92 333 8399480',
  `email` = 'contactus@arion.pk',
  `address` = 'Office 22, 4th Floor, Pakland City Center, I-8 Markaz, Islamabad, Pakistan',
  `google_map_url` = 'https://www.google.com/maps/search/?api=1&query=Pakland+City+Center+I-8+Markaz+Islamabad',
  `map_embed_url` = 'https://www.google.com/maps?q=Pakland+City+Center+I-8+Markaz+Islamabad&output=embed',
  `website_url` = 'https://arion.pk',
  `whatsapp_number` = '+923338399480',
  `facebook_url` = 'https://facebook.com/',
  `instagram_url` = 'https://instagram.com/',
  `youtube_url` = 'https://youtube.com/',
  `tiktok_url` = 'https://tiktok.com/'
WHERE `id` = 1;

ALTER TABLE `contact_messages`
  ADD COLUMN `subscribed_to_newsletter` TINYINT(1) NOT NULL DEFAULT 0 AFTER `message`;

CREATE TABLE IF NOT EXISTS `contact_info_cards` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `icon_key`   VARCHAR(50)  NOT NULL COMMENT 'phone, mail, map-pin, clock',
  `title`      VARCHAR(100) NOT NULL,
  `value_text` TEXT         NOT NULL COMMENT 'primary line(s), \n separated for multi-line',
  `note_text`  VARCHAR(150) DEFAULT NULL,
  `sort_order` INT          NOT NULL DEFAULT 0,
  `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `contact_faqs` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `question`   VARCHAR(255) NOT NULL,
  `answer`     TEXT         NOT NULL,
  `is_active`  TINYINT(1)   NOT NULL DEFAULT 1,
  `sort_order` INT          NOT NULL DEFAULT 0,
  `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `contact_info_cards` (`icon_key`, `title`, `value_text`, `note_text`, `sort_order`) VALUES
  ('phone',   'Call Us',        '+92 333 8399480', 'Mon-Sat, 9am-9pm', 1),
  ('mail',    'Email Us',       'contactus@arion.pk', 'Reply within 24 hours', 2),
  ('map-pin', 'Visit Us',       'Office 22, 4th Floor, Pakland City Center\nI-8 Markaz, Islamabad, Pakistan', 'Open for walk-ins', 3),
  ('clock',   'Working Hours',  'Mon–Sat: 9am–9pm\nSunday: 10am–5pm', 'Public holidays: closed', 4);

INSERT INTO `contact_faqs` (`question`, `answer`, `is_active`, `sort_order`) VALUES
  ('How do I track my order?', 'Once your order is dispatched, you will receive a tracking number via email and SMS. Use it on our Track Order page or the courier website to follow your delivery in real time.', 1, 1),
  ('Can I return a product if I''m not satisfied?', 'Yes. We offer a 30-day hassle-free return policy on most products. Items must be unused, sealed, and in original packaging. Contact us and we''ll arrange the pickup at no cost to you.', 1, 2),
  ('Do you require a prescription for medicines?', 'Prescription medicines are clearly marked on the product page. You will be prompted to upload a valid prescription at checkout for those products. Our pharmacists verify every prescription within 2 hours.', 1, 3),
  ('How long does delivery take?', 'Standard delivery takes 2–4 business days. Express delivery (next-day) is available in major cities. Free shipping is available on orders above $50. Same-day delivery is available in select areas.', 1, 4),
  ('Are all products genuine and certified?', 'Absolutely. Every product on DCare is sourced directly from certified manufacturers and authorized distributors. We carry the DRAP certification for all pharmaceutical products and conduct regular quality audits.', 1, 5),
  ('Can I speak with a pharmacist online?', 'Yes! Our licensed pharmacists are available 9am–9pm Monday to Saturday via live chat and phone. Just click the chat button or call our helpline. Emergency consultations are available outside of business hours.', 1, 6);
