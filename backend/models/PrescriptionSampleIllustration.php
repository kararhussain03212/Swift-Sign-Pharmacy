<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/ArionBaseModel.php';

final class PrescriptionSampleIllustration extends ArionBaseModel
{
    protected string $table = 'prescription_sample_illustration';
    protected array $fillable = [
        'doctor_name_sample', 'clinic_name_label', 'clinic_address_label',
        'clinic_phone_label', 'consultation_date_label', 'patient_name_label',
        'patient_age_label', 'sample_medicine_name', 'sample_medicine_strength',
        'sample_medicine_dose', 'sample_medicine_duration', 'signature_sample_name',
        'annotation_doctor_details_label', 'annotation_patient_details_label',
        'annotation_medicine_details_label', 'annotation_signature_label',
    ];
}
