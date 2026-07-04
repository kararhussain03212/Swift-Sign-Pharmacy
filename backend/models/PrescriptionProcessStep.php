<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/ArionBaseModel.php';

final class PrescriptionProcessStep extends ArionBaseModel
{
    protected string $table = 'prescription_process_steps';
    protected array $fillable = ['icon_key', 'label', 'sort_order'];

    protected function defaultOrderBy(): string
    {
        return 'sort_order ASC, id ASC';
    }
}
