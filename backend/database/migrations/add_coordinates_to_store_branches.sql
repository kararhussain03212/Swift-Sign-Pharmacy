-- Add back nullable latitude/longitude, auto-parsed server-side from the
-- admin-pasted map_embed_link, so the public store locator can render a
-- single interactive map with animated fly-to between branch pins.
USE `arion-pharmacy`;

ALTER TABLE `store_branches`
  ADD COLUMN `latitude` DECIMAL(10,7) NULL DEFAULT NULL AFTER `map_embed_link`,
  ADD COLUMN `longitude` DECIMAL(10,7) NULL DEFAULT NULL AFTER `latitude`;
