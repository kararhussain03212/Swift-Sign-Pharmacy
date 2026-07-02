-- Migration: real multi-super-admin support for User Management.
--
-- The project already has a working admin/session system on the `admins`
-- table (name/email/password/role/status/permissions_json/...), used by
-- login, AuthMiddleware, and every other admin page — extended here rather
-- than creating a duplicate `admin_users` table.
--
-- Permissions already live as a JSON array on `admins.permissions_json`
-- (parsed into the JWT at login and checked by AuthMiddleware::can()).
-- A separate `admin_user_permissions` boolean table would just be a second,
-- driftable source of truth for the same data, so it is intentionally not
-- created — only the two genuinely missing pieces are added:
--   1. is_super_admin, replacing the old single-hardcoded-email protection
--      (UserController::isProtectedSuperAdmin() matched only $ADMIN_EMAIL)
--      with a real column supporting multiple super admins.
--   2. role_default_permissions, so "Apply Role Defaults" reads real data
--      instead of a hardcoded map in the frontend.

ALTER TABLE `admins`
  ADD COLUMN `is_super_admin` TINYINT(1) NOT NULL DEFAULT 0 AFTER `role`;

-- Promote whichever account matches this environment's ADMIN_EMAIL (the
-- account the old single-email protection used to guard) so at least one
-- super admin exists after migrating. Adjust the email below to match your
-- environment's backend/.env ADMIN_EMAIL if it differs.
UPDATE `admins` SET `is_super_admin` = 1 WHERE `email` = 'admin@gmail.com';

CREATE TABLE IF NOT EXISTS `role_default_permissions` (
  `role` ENUM('editor','admin') NOT NULL,
  `can_create_content` TINYINT(1) NOT NULL DEFAULT 0,
  `can_edit_content` TINYINT(1) NOT NULL DEFAULT 0,
  `can_delete_content` TINYINT(1) NOT NULL DEFAULT 0,
  `can_publish_content` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `role_default_permissions` (`role`, `can_create_content`, `can_edit_content`, `can_delete_content`, `can_publish_content`)
VALUES
  ('editor', 1, 1, 0, 0),
  ('admin', 1, 1, 1, 1)
ON DUPLICATE KEY UPDATE
  `can_create_content` = VALUES(`can_create_content`),
  `can_edit_content` = VALUES(`can_edit_content`),
  `can_delete_content` = VALUES(`can_delete_content`),
  `can_publish_content` = VALUES(`can_publish_content`);
-- Super Admins bypass this table entirely — is_super_admin = 1 always means
-- every permission, regardless of what's stored in permissions_json.
