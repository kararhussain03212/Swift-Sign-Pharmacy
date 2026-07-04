<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\PrescriptionHowtoInstruction;

require_once __DIR__ . '/BaseCrudController.php';
require_once __DIR__ . '/../models/PrescriptionHowtoInstruction.php';

final class PrescriptionHowtoInstructionController extends BaseCrudController
{
    protected string $modelClass = PrescriptionHowtoInstruction::class;
    protected string $resourceName = 'prescription_howto_instructions';
    protected array $requiredCreateFields = ['instruction_text'];
}
