<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\PrescriptionProcessStep;

require_once __DIR__ . '/BaseCrudController.php';
require_once __DIR__ . '/../models/PrescriptionProcessStep.php';

final class PrescriptionProcessStepController extends BaseCrudController
{
    protected string $modelClass = PrescriptionProcessStep::class;
    protected string $resourceName = 'prescription_process_steps';
    protected array $requiredCreateFields = ['icon_key', 'label'];
}
