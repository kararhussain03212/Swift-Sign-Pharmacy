-- Seed: Certifications page — mirrors the content that was previously hardcoded
-- in src/pages/Certification.jsx, so the live site is unchanged after the
-- data-source swap to the /api/public/certifications/* endpoints.
--
-- Certificate images are NOT re-uploaded — they already exist as static files
-- under public/certification/ (served directly by the frontend), so
-- certificate_image_url stores those same relative paths unencoded. New
-- certificates added via the admin panel will instead get a real
-- /uploads/... path from the upload endpoint; the frontend resolves either
-- style correctly (see resolveCertImageUrl in the Certification page).
--
-- Run after add_certification_tables.sql. Uses INSERT IGNORE, safe to re-run.

USE `arion-pharmacy`;

-- Page content (singleton, id = 1)
INSERT IGNORE INTO `certification_page_content`
  (`id`, `hero_badge_text`, `hero_heading`, `hero_subheading`, `trust_heading`, `trust_paragraph`)
VALUES
  (
    1,
    'VERIFIED & LICENSED',
    'Our Certifications',
    'Fully licensed and certified by the relevant authorities. All certificates are original, verified, and kept up to date.',
    '100% Verified & Licensed',
    'Every product we sell is sourced from certified manufacturers. Our pharmacy is fully licensed by the Drug Regulatory Authority of Pakistan (DRAP) and the Pakistan Pharmacy Council (PCP).'
  );

-- Categories
INSERT IGNORE INTO `certification_categories` (`id`, `name`, `icon_key`, `is_active`, `sort_order`) VALUES
  (1, 'Academic Certifications', 'graduation-cap', 1, 1),
  (2, 'Professional Certifications', 'camera', 1, 2);

-- Academic Certifications (category_id = 1) — all 9, matching the current live page
-- Explicit ids (1-9) so INSERT IGNORE is actually idempotent on re-run.
INSERT IGNORE INTO `certifications` (`id`, `category_id`, `title`, `type_tag`, `certificate_image_url`, `sort_order`) VALUES
  (1, 1, 'Academic Certification 1', 'University',     '/certification/WhatsApp Image 2026-06-17 at 11.36.11 AM.jpeg', 1),
  (2, 1, 'Academic Certification 2', 'Diploma',        '/certification/WhatsApp Image 2026-06-17 at 11.36.12 AM.jpeg', 2),
  (3, 1, 'Academic Certification 3', 'Specialization', '/certification/aaaaaaaa.jpeg', 3),
  (4, 1, 'Academic Certification 4', 'Degree',         '/certification/aaaaaadd.jpeg', 4),
  (5, 1, 'Academic Certification 5', 'Diploma',        '/certification/ddddd.jpeg', 5),
  (6, 1, 'Academic Certification 6', 'Certificate',    '/certification/ddddddddddddddd.jpeg', 6),
  (7, 1, 'Academic Certification 7', 'Degree',         '/certification/dfgdfgdfgdfg.jpeg', 7),
  (8, 1, 'Academic Certification 8', 'Diploma',        '/certification/sdfdf.jpeg', 8),
  (9, 1, 'Academic Certification 9', 'Specialization', '/certification/sdfsdf.jpeg', 9);

-- Professional Certifications (category_id = 2) — all 33, matching the current live page
-- Explicit ids (10-42) so INSERT IGNORE is actually idempotent on re-run.
INSERT IGNORE INTO `certifications` (`id`, `category_id`, `title`, `type_tag`, `certificate_image_url`, `sort_order`) VALUES
  (10, 2, 'Professional Certification 1',  'License',     '/certification/Professional Certification/1.jpeg', 1),
  (11, 2, 'Professional Certification 2',  'Credential',  '/certification/Professional Certification/2.jpeg', 2),
  (12, 2, 'Professional Certification 3',  'Registration','/certification/Professional Certification/3.jpeg', 3),
  (13, 2, 'Professional Certification 4',  'Compliance',  '/certification/Professional Certification/4.jpeg', 4),
  (14, 2, 'Professional Certification 5',  'License',     '/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.30 PM.jpeg', 5),
  (15, 2, 'Professional Certification 6',  'Credential',  '/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.30 PM (1).jpeg', 6),
  (16, 2, 'Professional Certification 7',  'Registration','/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.30 PM (2).jpeg', 7),
  (17, 2, 'Professional Certification 8',  'Compliance',  '/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.30 PM (3).jpeg', 8),
  (18, 2, 'Professional Certification 9',  'License',     '/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.30 PM (4).jpeg', 9),
  (19, 2, 'Professional Certification 10', 'Credential',  '/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.30 PM (5).jpeg', 10),
  (20, 2, 'Professional Certification 11', 'Registration','/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.31 PM.jpeg', 11),
  (21, 2, 'Professional Certification 12', 'Compliance',  '/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.31 PM (1).jpeg', 12),
  (22, 2, 'Professional Certification 13', 'License',     '/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.31 PM (2).jpeg', 13),
  (23, 2, 'Professional Certification 14', 'Credential',  '/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.31 PM (3).jpeg', 14),
  (24, 2, 'Professional Certification 15', 'Registration','/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.31 PM (4).jpeg', 15),
  (25, 2, 'Professional Certification 16', 'Compliance',  '/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.31 PM (5).jpeg', 16),
  (26, 2, 'Professional Certification 17', 'License',     '/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.33 PM.jpeg', 17),
  (27, 2, 'Professional Certification 18', 'Credential',  '/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.33 PM (1).jpeg', 18),
  (28, 2, 'Professional Certification 19', 'Registration','/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.33 PM (2).jpeg', 19),
  (29, 2, 'Professional Certification 20', 'Compliance',  '/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.33 PM (3).jpeg', 20),
  (30, 2, 'Professional Certification 21', 'License',     '/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.33 PM (4).jpeg', 21),
  (31, 2, 'Professional Certification 22', 'Credential',  '/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.33 PM (5).jpeg', 22),
  (32, 2, 'Professional Certification 23', 'Registration','/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.33 PM (6).jpeg', 23),
  (33, 2, 'Professional Certification 24', 'Compliance',  '/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.33 PM (7).jpeg', 24),
  (34, 2, 'Professional Certification 25', 'License',     '/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.33 PM (8).jpeg', 25),
  (35, 2, 'Professional Certification 26', 'Credential',  '/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.33 PM (9).jpeg', 26),
  (36, 2, 'Professional Certification 27', 'Registration','/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.33 PM (10).jpeg', 27),
  (37, 2, 'Professional Certification 28', 'Compliance',  '/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.33 PM (11).jpeg', 28),
  (38, 2, 'Professional Certification 29', 'License',     '/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.33 PM (12).jpeg', 29),
  (39, 2, 'Professional Certification 30', 'Credential',  '/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.33 PM (13).jpeg', 30),
  (40, 2, 'Professional Certification 31', 'Registration','/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.33 PM (14).jpeg', 31),
  (41, 2, 'Professional Certification 32', 'Compliance',  '/certification/Professional Certification/WhatsApp Image 2026-06-17 at 2.20.33 PM (15).jpeg', 32),
  (42, 2, 'Professional Certification 33', 'License',     '/certification/Professional Certification/a.jpeg', 33);

-- Trust badges
-- Explicit ids so INSERT IGNORE is actually idempotent on re-run.
INSERT IGNORE INTO `certification_trust_badges` (`id`, `label`, `icon_key`, `sort_order`, `is_active`) VALUES
  (1, 'DRAP Registered', 'check-circle', 1, 1),
  (2, 'PCP Licensed', 'check-circle', 2, 1),
  (3, 'ISO Certified', 'check-circle', 3, 1),
  (4, 'Quality Assured', 'check-circle', 4, 1);
