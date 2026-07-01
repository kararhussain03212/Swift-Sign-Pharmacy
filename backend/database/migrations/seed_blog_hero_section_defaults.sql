-- Migration: Seed default values for the Articles/Blog page hero & search section
-- Purpose: Make the Articles hero (heading/subheading/search placeholder/button text)
--          admin-editable via the existing `settings` key-value table (blog_* keys),
--          reusing the Blog Page Settings admin form instead of a new table.
-- Date: 2026-07-01

USE `organic_food`;

INSERT IGNORE INTO `settings` (`setting_key`, `setting_value`, `setting_type`, `order_position`, `status`, `created_at`, `updated_at`) VALUES
('blog_hero_title', 'Health Articles & Wellness Tips', 'text', 0, 'active', NOW(), NOW()),
('blog_hero_description', 'Expert-written guides on medicine, nutrition, skincare, and living your healthiest life.', 'text', 0, 'active', NOW(), NOW()),
('blog_search_placeholder', 'Search articles...', 'text', 0, 'active', NOW(), NOW()),
('blog_button_text', 'Search', 'text', 0, 'active', NOW(), NOW());
