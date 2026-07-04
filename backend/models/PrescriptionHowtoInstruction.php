<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/ArionBaseModel.php';

final class PrescriptionHowtoInstruction extends ArionBaseModel
{
    protected string $table = 'prescription_howto_instructions';
    protected array $fillable = ['instruction_text', 'sort_order'];

    protected function defaultOrderBy(): string
    {
        return 'sort_order ASC, id ASC';
    }
}
