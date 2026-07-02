-- Seed: the 4 sliders that previously existed as hardcoded homepage sections.
-- Titles/order only — category linking is done via the admin panel since it
-- depends on this project's arion_pharmacy category IDs, not something a raw
-- SQL seed should hardcode. Each slider will render nothing (and stay hidden
-- on the homepage) until an admin assigns categories to it.

INSERT INTO `homepage_product_sliders`
  (`title`, `max_products`, `sort_criteria`, `is_active`, `sort_order`)
VALUES
  ('Popular Product',    10, 'newest', 1, 1),
  ('Daily Well-being',   10, 'newest', 1, 2),
  ('Sexual Wellness',    10, 'newest', 1, 3),
  ('Medical Equipments', 10, 'newest', 1, 4);
