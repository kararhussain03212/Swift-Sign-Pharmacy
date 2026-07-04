-- Prescription upload page: content tables + real submission queue.
-- prescription_orders holds real patient-submitted data (never seeded).

CREATE TABLE IF NOT EXISTS `prescription_page_content` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `hero_badge_text` VARCHAR(100) NOT NULL,
  `hero_heading` VARCHAR(200) NOT NULL,
  `hero_subheading` TEXT NOT NULL,
  `upload_badge_text` VARCHAR(100) NOT NULL,
  `upload_heading` VARCHAR(150) NOT NULL,
  `upload_subtext` VARCHAR(255) NOT NULL,
  `dropzone_instruction_text` VARCHAR(150) NOT NULL,
  `dropzone_hint_text` VARCHAR(150) NOT NULL COMMENT 'e.g. "or click to browse — JPG, PNG, PDF · Max 10 MB"',
  `howto_heading` VARCHAR(150) NOT NULL,
  `sample_section_heading` VARCHAR(150) NOT NULL,
  `help_heading` VARCHAR(100) NOT NULL,
  `help_subtext` VARCHAR(200) NOT NULL,
  `help_phone_number` VARCHAR(30) NOT NULL,
  `max_file_size_mb` TINYINT UNSIGNED NOT NULL DEFAULT 10,
  `allowed_file_types` VARCHAR(100) NOT NULL DEFAULT 'jpg,jpeg,png,pdf',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `prescription_process_steps` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `icon_key` VARCHAR(50) NOT NULL COMMENT 'e.g. upload, phone, package',
  `label` VARCHAR(150) NOT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `prescription_howto_instructions` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `instruction_text` VARCHAR(255) NOT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `prescription_sample_illustration` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `doctor_name_sample` VARCHAR(150) NOT NULL COMMENT 'e.g. "Dr. Nowruz, MBBS"',
  `clinic_name_label` VARCHAR(100) NOT NULL DEFAULT 'Name of Hospital / Clinic',
  `clinic_address_label` VARCHAR(100) NOT NULL DEFAULT 'Address of Hospital / Clinic',
  `clinic_phone_label` VARCHAR(100) NOT NULL DEFAULT 'Phone No.',
  `consultation_date_label` VARCHAR(100) NOT NULL DEFAULT 'Date of consultation',
  `patient_name_label` VARCHAR(100) NOT NULL DEFAULT 'Name of Patient',
  `patient_age_label` VARCHAR(50) NOT NULL DEFAULT 'Age',
  `sample_medicine_name` VARCHAR(100) NOT NULL DEFAULT 'Sitagliptin',
  `sample_medicine_strength` VARCHAR(50) NOT NULL DEFAULT '10mg',
  `sample_medicine_dose` VARCHAR(50) NOT NULL DEFAULT '1-0-1',
  `sample_medicine_duration` VARCHAR(50) NOT NULL DEFAULT '6 months',
  `signature_sample_name` VARCHAR(150) NOT NULL DEFAULT 'Dr. M. Ali',
  `annotation_doctor_details_label` VARCHAR(100) NOT NULL DEFAULT 'Doctor''s details',
  `annotation_patient_details_label` VARCHAR(100) NOT NULL DEFAULT 'Patient''s details',
  `annotation_medicine_details_label` VARCHAR(100) NOT NULL DEFAULT 'Medicine details',
  `annotation_signature_label` VARCHAR(100) NOT NULL DEFAULT 'Doctor''s sign + stamp',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `prescription_orders` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_name` VARCHAR(150) NOT NULL,
  `phone_number` VARCHAR(30) NOT NULL,
  `file_path` VARCHAR(500) NOT NULL COMMENT 'stored outside the public webroot; resolved only via the authenticated admin stream endpoint',
  `original_file_name` VARCHAR(255) NOT NULL,
  `file_type` VARCHAR(20) NOT NULL,
  `file_size_bytes` INT UNSIGNED NOT NULL,
  `status` ENUM('pending','contacted','processing','delivered','rejected') NOT NULL DEFAULT 'pending',
  `admin_notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
