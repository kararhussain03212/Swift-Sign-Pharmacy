-- Database Organization - Rename tables with prefixes for clarity
-- This groups related tables together in the database view

-- CUSTOMER/ACCOUNT TABLES
ALTER TABLE users RENAME TO customer_users;
ALTER TABLE addresses RENAME TO customer_addresses;
ALTER TABLE cart_items RENAME TO customer_cart_items;
ALTER TABLE wishlist_items RENAME TO customer_wishlist_items;
ALTER TABLE orders RENAME TO customer_orders;
ALTER TABLE order_items RENAME TO customer_order_items;

-- ADMIN TABLES
ALTER TABLE admins RENAME TO admin_users;

-- ACTIVITY & LOGS
ALTER TABLE activity_logs RENAME TO system_activity_logs;

-- PRODUCTS & CATALOG
ALTER TABLE products RENAME TO catalog_products;
ALTER TABLE categories RENAME TO catalog_categories;
ALTER TABLE product_images RENAME TO catalog_product_images;

-- BLOG SYSTEM
ALTER TABLE blog_posts RENAME TO blog_articles;

-- CERTIFICATION SYSTEM
ALTER TABLE certification_categories RENAME TO certification_categories;
ALTER TABLE certifications RENAME TO certification_items;
ALTER TABLE certification_page_content RENAME TO certification_content;
ALTER TABLE certification_trust_badges RENAME TO certification_badges;

-- CHEMICAL PRODUCTS
ALTER TABLE chemical_product_details RENAME TO chemical_products_details;
ALTER TABLE chemical_product_documents RENAME TO chemical_products_documents;

-- CONTACT & MESSAGING
ALTER TABLE contact_messages RENAME TO contact_inquiries;
ALTER TABLE contact_faqs RENAME TO contact_faq_items;
ALTER TABLE contact_info_cards RENAME TO contact_card_items;
ALTER TABLE contact_page_settings RENAME TO contact_settings;

-- PAGES & CONTENT
ALTER TABLE about_page_settings RENAME TO page_about_settings;
ALTER TABLE about_comparison_cards RENAME TO page_about_comparison_cards;
ALTER TABLE about_comparison_section RENAME TO page_about_comparison_section;
ALTER TABLE about_core_values RENAME TO page_about_core_values;
ALTER TABLE about_cta_section RENAME TO page_about_cta_section;
ALTER TABLE about_mission_section RENAME TO page_about_mission_section;
ALTER TABLE about_problem_cards RENAME TO page_about_problem_cards;
ALTER TABLE about_story_section RENAME TO page_about_story_section;

-- GENERAL CONTENT
ALTER TABLE announcement_bar RENAME TO content_announcement_bar;
ALTER TABLE featured_brands RENAME TO content_featured_brands;
ALTER TABLE commitment_items RENAME TO content_commitment_items;

-- Verify all tables were renamed successfully
SHOW TABLES;
