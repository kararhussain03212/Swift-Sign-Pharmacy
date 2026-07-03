USE `arion-pharmacy`;

INSERT INTO `store_branches` (`name`, `address`, `area`, `city`, `latitude`, `longitude`, `phone`, `hours_display`, `detail_slug`, `is_active`, `sort_order`) VALUES
('Swift Pharmacy - Johar Town', '12 Block C, Johar Town, Lahore, Punjab - 54000', 'Johar Town', 'Lahore', 31.4827000, 74.3036000, '0300-1234567', 'Mon–Sat: 8:00 AM – 11:00 PM | Sun: 9:00 AM – 10:00 PM', 'swift-pharmacy-johar-town', 1, 1),
('Swift Pharmacy - DHA Phase 5', 'Commercial Area, Phase 5, DHA, Lahore', 'DHA Phase 5', 'Lahore', 31.4697000, 74.3939000, '0301-7654321', 'Mon–Sat: 9:00 AM – 12:00 AM | Sun: 10:00 AM – 11:00 PM', 'swift-pharmacy-dha-phase-5', 1, 2),
('Swift Pharmacy - Gulberg III', 'Main Boulevard, Gulberg III, Lahore', 'Gulberg III', 'Lahore', 31.5025000, 74.3416000, '0302-9876543', 'Open 24 Hours', 'swift-pharmacy-gulberg-iii', 1, 3),
('Swift Pharmacy - Model Town', 'Garden Block, Model Town, Lahore', 'Model Town', 'Lahore', 31.5097000, 74.3219000, '0303-1122334', 'Mon–Sun: 8:00 AM – 10:00 PM', 'swift-pharmacy-model-town', 1, 4)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

INSERT INTO `store_network_stats` (`value`, `label`, `sort_order`) VALUES
('238', 'Retail Outlets', 1),
('2', 'Countries', 2),
('19.5M', 'Customers/Year', 3),
('600+', 'Pharmacists', 4);

INSERT INTO `store_locator_content` (`id`, `page_title`, `page_subtitle`, `network_eyebrow`, `network_heading`, `network_paragraph`, `outlets_eyebrow`, `outlets_heading`, `outlets_paragraph`) VALUES
(1, 'Store Locator', 'Find your nearest Swift Pharmacy outlet for quality healthcare services, 24/7.', 'Our Network', 'Pharmacy Chain In The GCC', 'Swift Pharmacy is known as the region''s leading pharmacy retail chain. Recognised as the leading pharmacy for customer care and quality healthcare — our neighbourhood pharmacies are easily accessible.', 'Our Retail Outlets', 'Supportive Personal Care In A Comfortable Environment', 'With a growing network of over 200 pharmacies, we are committed to bringing reliable & quality healthcare closer to our consumers with a pharmacy in every neighbourhood & the services of a knowledgeable pharmacist available 24/7 for every household.')
ON DUPLICATE KEY UPDATE `page_title` = VALUES(`page_title`);

INSERT INTO `store_gallery_images` (`image_url`, `alt_text`, `sort_order`) VALUES
('store1.png', 'Pharmacy Store - Main Floor', 1),
('store2.png', 'Pharmacy Store - Skincare Section', 2),
('store3.png', 'Pharmacy Store - Nutrition Section', 3),
('store4.png', 'Pharmacy Store - Baby Care Section', 4),
('store5.png', 'Pharmacy Store - Prescription Counter', 5);
