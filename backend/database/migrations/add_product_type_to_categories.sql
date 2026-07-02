-- Migration: lets the category-driven product form auto-detect whether a
-- category takes pharmacy-type or chemical-type product fields.
-- Lives in arion_pharmacy (the database the categories table belongs to).

ALTER TABLE `categories`
  ADD COLUMN `product_type` ENUM('pharmacy','chemical') NOT NULL DEFAULT 'pharmacy' AFTER `slug`;

-- Mark "Laboratory Chemicals" AND all of its subcategories as chemical-type,
-- not just the top-level row, so a product filed under e.g. "Salts" or
-- "Solvents" also gets the chemical detail-page/admin-form treatment.
UPDATE `categories` SET `product_type` = 'chemical'
WHERE `slug` = 'laboratory-chemicals'
   OR `parent_id` = (SELECT id FROM (SELECT id FROM `categories` WHERE `slug` = 'laboratory-chemicals') AS t);
