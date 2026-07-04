<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\PrescriptionSampleIllustration;
use Backend\Utils\ActivityLogger;
use Backend\Utils\Cache;
use Backend\Utils\Response;
use Backend\Utils\Validator;

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/PrescriptionSampleIllustration.php';
require_once __DIR__ . '/../utils/ActivityLogger.php';
require_once __DIR__ . '/../utils/Cache.php';
require_once __DIR__ . '/../utils/Response.php';
require_once __DIR__ . '/../utils/Validator.php';

/**
 * Singleton (id = 1) editable labels/sample values for the fictional
 * "Sample Valid Prescription" teaching illustration.
 */
final class PrescriptionSampleIllustrationController extends BaseController
{
    public function index(array $params = []): void
    {
        Response::success((new PrescriptionSampleIllustration())->find(1), 'Fetched successfully');
    }

    public function update(array $params = []): void
    {
        $this->requirePermission('edit_content');
        $payload = Validator::sanitizeInput($this->body());
        if ($payload === []) {
            Response::error('Content payload is required', 422);
        }

        $model = new PrescriptionSampleIllustration();
        $row = $model->saveSingle($payload);

        ActivityLogger::log($this->currentAdminId(), 'update', 'prescription_sample_illustration', 1);
        Cache::clearAll();

        Response::success($row, 'Updated successfully');
    }
}
