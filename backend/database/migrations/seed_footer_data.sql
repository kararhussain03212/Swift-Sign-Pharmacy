-- Seed: mirrors the footer content that was previously hardcoded in
-- src/components/layout/Footer.jsx, so the live site is unchanged after
-- the data-source swap to the /api/public/footer endpoint.
-- Run after add_footer_tables.sql. Uses INSERT IGNORE, safe to re-run.

USE `arion-pharmacy`;

-- Footer quick links (Footer.jsx "Quick Links" column)
INSERT IGNORE INTO `footer_quick_links` (`id`, `label`, `url`, `sort_order`, `is_active`) VALUES
(1, 'Asaan Order', '/asaan-order', 1, 1),
(2, 'Support', '/contact', 2, 1),
(3, 'About Us', '/', 3, 1),
(4, 'Blogs', '/blog', 4, 1),
(5, 'Contact Us', '/contact', 5, 1);

-- Footer company info (single row) — mirrors src/data/contactInfo.js
INSERT IGNORE INTO `footer_company_info` (`id`, `logo_url`, `address`, `email`, `phone`) VALUES
(1, NULL, 'Office 22, 4th Floor, Pakland City Center, I-8 Markaz, Islamabad, Pakistan', 'contactus@arion.pk', '+92 333 8399480');

-- Footer app download badges
INSERT IGNORE INTO `footer_app_links` (`id`, `platform`, `label`, `url`, `badge_image_url`, `sort_order`, `is_active`) VALUES
(1, 'app_store', 'Download on the App Store', '#', 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg', 1, 1),
(2, 'google_play', 'Get it on Google Play', '#', 'https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg', 2, 1);

-- Footer social links
INSERT IGNORE INTO `footer_social_links` (`id`, `platform`, `icon_key`, `url`, `sort_order`, `is_active`) VALUES
(1, 'Facebook', 'facebook', 'https://www.facebook.com', 1, 1),
(2, 'Instagram', 'instagram', 'https://www.instagram.com', 2, 1),
(3, 'X', 'x', '#', 3, 1),
(4, 'LinkedIn', 'linkedin', '#', 4, 1);

-- Footer settings (single row)
INSERT IGNORE INTO `footer_settings` (`id`, `copyright_text`, `funded_by_text`, `app_download_title`) VALUES
(1, '© 2026 Arion Pharmacy - Commercial Market, Powered by Swift Sign Group Of Companies', 'Funded By Swift Sign Business Management', 'Download Our App');
