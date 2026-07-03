<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\CertificationPageContent;
use Backend\Utils\ActivityLogger;
use Backend\Utils\Cache;
use Backend\Utils\Response;
use Backend\Utils\Validator;

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/CertificationPageContent.php';
require_once __DIR__ . '/../utils/ActivityLogger.php';
require_once __DIR__ . '/../utils/Cache.php';
require_once __DIR__ . '/../utils/Response.php';
require_once __DIR__ . '/../utils/Validator.php';

/** Single-row settings resource (id = 1), same shape as FooterSettingController. */
final class CertificationPageContentController extends BaseController
{
    public function index(array $params = []): void
    {
        $model = new CertificationPageContent();
        Response::success($model->find(1), 'Fetched successfully');
    }

    public function update(array $params = []): void
    {
        $this->requirePermission('edit_content');
        $payload = Validator::sanitizeInput($this->body());
        if ($payload === []) {
            Response::error('Content payload is required', 422);
        }

        $model = new CertificationPageContent();
        $row = $model->saveSingle($payload);

        ActivityLogger::log($this->currentAdminId(), 'update', 'certification_page_content', 1);
        Cache::clearAll();

        Response::success($row, 'Updated successfully');
    }
}
