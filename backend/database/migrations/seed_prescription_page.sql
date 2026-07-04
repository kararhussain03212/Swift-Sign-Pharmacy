-- Seed: Prescription upload page (hero, steps, how-to list, sample illustration).
-- prescription_orders is intentionally left empty — real customer submissions, not seed content.

INSERT INTO `prescription_page_content`
  (`id`, `hero_badge_text`, `hero_heading`, `hero_subheading`, `upload_badge_text`,
   `upload_heading`, `upload_subtext`, `dropzone_instruction_text`, `dropzone_hint_text`,
   `howto_heading`, `sample_section_heading`, `help_heading`, `help_subtext`,
   `help_phone_number`, `max_file_size_mb`, `allowed_file_types`)
VALUES
  (
    1,
    'ASAAN ORDER',
    'Order Medicines Using Prescription',
    'Simply upload your doctor''s prescription and let our pharmacy team prepare your order — delivered right to your door.',
    'UPLOAD PRESCRIPTION',
    'Upload Prescription',
    'To place an order please upload a picture of your prescription.',
    'Drag & drop your prescription here',
    'or click to browse — JPG, PNG, PDF · Max 10 MB',
    'How to upload your prescription?',
    'Sample Valid Prescription',
    'Need help?',
    'Call us for prescription assistance',
    '051-8447077',
    10,
    'jpg,jpeg,png,pdf'
  )
ON DUPLICATE KEY UPDATE
  `hero_badge_text` = VALUES(`hero_badge_text`),
  `hero_heading` = VALUES(`hero_heading`),
  `hero_subheading` = VALUES(`hero_subheading`),
  `upload_badge_text` = VALUES(`upload_badge_text`),
  `upload_heading` = VALUES(`upload_heading`),
  `upload_subtext` = VALUES(`upload_subtext`),
  `dropzone_instruction_text` = VALUES(`dropzone_instruction_text`),
  `dropzone_hint_text` = VALUES(`dropzone_hint_text`),
  `howto_heading` = VALUES(`howto_heading`),
  `sample_section_heading` = VALUES(`sample_section_heading`),
  `help_heading` = VALUES(`help_heading`),
  `help_subtext` = VALUES(`help_subtext`),
  `help_phone_number` = VALUES(`help_phone_number`);

INSERT INTO `prescription_process_steps` (`icon_key`, `label`, `sort_order`)
VALUES
  ('upload', 'Upload a valid prescription', 1),
  ('phone', 'Receive a confirmation call', 2),
  ('package', 'Get medicines at your doorstep', 3);

INSERT INTO `prescription_howto_instructions` (`instruction_text`, `sort_order`)
VALUES
  ('Do not crop out any part of the prescription image.', 1),
  ('Avoid unclear or blurred images of your prescription.', 2),
  ('Include details of your doctor, patient, and clinic visit date.', 3),
  ('Medicines will only be dispensed against a valid prescription.', 4);

INSERT INTO `prescription_sample_illustration`
  (`id`, `doctor_name_sample`, `sample_medicine_name`, `sample_medicine_strength`,
   `sample_medicine_dose`, `sample_medicine_duration`, `signature_sample_name`)
VALUES
  (1, 'Dr. Nowruz, MBBS', 'Sitagliptin', '10mg', '1-0-1', '6 months', 'Dr. M. Ali')
ON DUPLICATE KEY UPDATE
  `doctor_name_sample` = VALUES(`doctor_name_sample`),
  `sample_medicine_name` = VALUES(`sample_medicine_name`),
  `sample_medicine_strength` = VALUES(`sample_medicine_strength`),
  `sample_medicine_dose` = VALUES(`sample_medicine_dose`),
  `sample_medicine_duration` = VALUES(`sample_medicine_duration`),
  `signature_sample_name` = VALUES(`signature_sample_name`);
