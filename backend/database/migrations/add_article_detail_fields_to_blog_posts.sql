-- Migration: Add article-detail-page fields to blog_posts
-- Purpose: Make the Blog Article Detail page (gradient hero + watermark word,
--          stat bar, like counter, tinted intro callout) admin-editable by
--          extending the existing blog_posts table/CRUD instead of a new one.
-- Date: 2026-07-01

USE `organic_food`;

ALTER TABLE `blog_posts`
  ADD COLUMN `watermark_text` VARCHAR(100) DEFAULT NULL AFTER `title`,
  ADD COLUMN `author_role` VARCHAR(150) DEFAULT NULL AFTER `author`,
  ADD COLUMN `author_avatar_url` VARCHAR(500) DEFAULT NULL AFTER `author_role`,
  ADD COLUMN `content_type_label` VARCHAR(100) NOT NULL DEFAULT 'Guide' AFTER `read_time`,
  ADD COLUMN `likes_count` INT UNSIGNED NOT NULL DEFAULT 0 AFTER `content_type_label`,
  ADD COLUMN `intro_highlight` TEXT DEFAULT NULL AFTER `excerpt`;

-- Seed/update the "Baby Showing Signs of Ear Infection" article so the database
-- matches the currently hardcoded article (src/data/blogs.js, slug
-- "baby-ear-infection-signs") before the frontend switchover to the API.
INSERT INTO `blog_posts`
  (`title`, `slug`, `watermark_text`, `excerpt`, `intro_highlight`, `content`, `image`,
   `author`, `author_role`, `category`, `is_published`, `published_at`,
   `read_time`, `content_type_label`, `likes_count`, `sort_order`)
VALUES (
  'Baby Showing Signs of Ear Infection? When to See a Doctor',
  'baby-ear-infection-signs',
  'Baby Health',
  'Ear infections are one of the most common and distressing reasons parents visit the pediatrician. Learn how to spot the early warning signs, understand the difference between viral and bacterial infections, and know exactly when to act fast to protect your baby''s hearing and health.',
  'Ear infections (otitis media) affect roughly 80% of children before they reach age 3. The primary reason for this high statistic lies in a baby''s anatomy: their Eustachian tubes—the narrow channels connecting the middle ear to the back of the throat—are shorter, narrower, and more horizontal than those of adults. This makes it incredibly easy for fluid to become trapped and for bacteria or viruses from a common cold to breed in the middle ear.',
  '<p>Watch closely for these primary warning signs: persistent, unexplained crying (especially when lying down, which increases ear pressure), tugging, pulling, or hitting at the ears, a fever above 100.4&deg;F (38&deg;C), and severely disrupted sleep patterns. You may also notice changes in their feeding habits; the swallowing motion causes painful pressure shifts in the ear, making babies pull away from the breast or bottle. In more severe cases, you might notice sudden difficulty hearing or see yellow, clear, or blood-tinged fluid draining from the ear canal&mdash;a sign that the eardrum may have ruptured to relieve pressure.</p><p>If your baby is under 6 months old, you should see a pediatrician immediately, as their immune systems are still developing and fevers must be evaluated promptly. For older infants and toddlers (6 to 23 months) with mild symptoms in only one ear, pediatricians often recommend a &lsquo;watch and wait&rsquo; approach for 48 to 72 hours. This is because many mild ear infections are viral and will resolve on their own with infant-safe pain relievers (like acetaminophen or ibuprofen, if age-appropriate). Overprescribing antibiotics for viral infections contributes to antibiotic resistance and can upset your baby''s gut microbiome. However, if the infection is bacterial, symptoms are severe, or both ears are affected, a targeted course of antibiotics like Amoxicillin is usually required.</p><p>Preventive measures can significantly reduce the risk of future infections. Breastfeeding for at least the first six months passes vital antibodies to your baby. Additionally, always feed your baby in an upright position to prevent milk from flowing into the Eustachian tubes. Keep your child strictly away from secondhand smoke (which inflames the nasal passages), and ensure they are up-to-date on pneumococcal and flu vaccinations.</p>',
  NULL,
  'Dr. Sarah Johnson',
  'Pediatrician',
  'Baby Care',
  1,
  '2025-06-15 00:00:00',
  8,
  'In-depth guide',
  68,
  1
)
ON DUPLICATE KEY UPDATE
  `watermark_text` = VALUES(`watermark_text`),
  `excerpt` = VALUES(`excerpt`),
  `intro_highlight` = VALUES(`intro_highlight`),
  `content` = VALUES(`content`),
  `author` = VALUES(`author`),
  `author_role` = VALUES(`author_role`),
  `category` = VALUES(`category`),
  `published_at` = VALUES(`published_at`),
  `read_time` = VALUES(`read_time`),
  `content_type_label` = VALUES(`content_type_label`);
