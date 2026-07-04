<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\PrescriptionHowtoInstruction;
use Backend\Models\PrescriptionPageContent;
use Backend\Models\PrescriptionProcessStep;
use Backend\Models\PrescriptionSampleIllustration;
use Backend\Utils\ActivityLogger;
use Backend\Utils\Cache;
use Backend\Utils\Response;
use Backend\Utils\Validator;

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/PrescriptionPageContent.php';
require_once __DIR__ . '/../models/PrescriptionProcessStep.php';
require_once __DIR__ . '/../models/PrescriptionHowtoInstruction.php';
require_once __DIR__ . '/../models/PrescriptionSampleIllustration.php';
require_once __DIR__ . '/../utils/ActivityLogger.php';
require_once __DIR__ . '/../utils/Cache.php';
require_once __DIR__ . '/../utils/Response.php';
require_once __DIR__ . '/../utils/Validator.php';

/**
 * Singleton page copy (id = 1) for the "Order Medicines Using Prescription"
 * page, plus the process steps / how-to list / sample illustration that
 * render alongside it.
 */
final class PrescriptionPageContentController extends BaseController
{
    public function index(array $params = []): void
    {
        Response::success((new PrescriptionPageContent())->find(1), 'Fetched successfully');
    }

    public function publicIndex(array $params = []): void
    {
        $data = Cache::remember('public:prescription_page_content', static function () {
            return [
                'content' => (new PrescriptionPageContent())->find(1),
                'process_steps' => (new PrescriptionProcessStep())->all(),
                'howto_instructions' => (new PrescriptionHowtoInstruction())->all(),
                'sample_illustration' => (new PrescriptionSampleIllustration())->find(1),
            ];
        });

        Response::success($data, 'Fetched successfully');
    }

    public function update(array $params = []): void
    {
        $this->requirePermission('edit_content');
        $payload = Validator::sanitizeInput($this->body());
        if ($payload === []) {
            Response::error('Content payload is required', 422);
        }

        $model = new PrescriptionPageContent();
        $row = $model->saveSingle($payload);

        ActivityLogger::log($this->currentAdminId(), 'update', 'prescription_page_content', 1);
        Cache::clearAll();

        Response::success($row, 'Updated successfully');
    }
}
