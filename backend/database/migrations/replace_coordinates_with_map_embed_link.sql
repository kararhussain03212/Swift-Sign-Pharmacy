-- Replace latitude/longitude with map embed link in store_branches
USE `arion-pharmacy`;

ALTER TABLE `store_branches`
  DROP COLUMN `latitude`,
  DROP COLUMN `longitude`,
  ADD COLUMN `map_embed_link` LONGTEXT NOT NULL AFTER `city`;
