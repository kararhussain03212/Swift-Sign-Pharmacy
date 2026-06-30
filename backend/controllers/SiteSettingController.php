<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\SiteSetting;
use Backend\Utils\ActivityLogger;
use Backend\Utils\Cache;
use Backend\Utils\Response;
use Backend\Utils\Validator;

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/SiteSetting.php';
require_once __DIR__ . '/../utils/ActivityLogger.php';
require_once __DIR__ . '/../utils/Cache.php';
require_once __DIR__ . '/../utils/Response.php';
require_once __DIR__ . '/../utils/Validator.php';

/**
 * Single-row settings resource (id = 1), same shape as the index/update
 * pair on SettingController but backed by the dedicated site_settings table.
 */
final class SiteSettingController extends BaseController
{
    public function index(array $params = []): void
    {
        $model = new SiteSetting();
        Response::success($model->find(1), 'Fetched successfully');
    }

    public function publicIndex(array $params = []): void
    {
        $model = new SiteSetting();
        $data = Cache::remember('public:site_settings', static fn () => $model->find(1));
        Response::success($data, 'Fetched successfully');
    }

    public function update(array $params = []): void
    {
        $this->requirePermission('edit_content');
        $payload = Validator::sanitizeInput($this->body());
        if ($payload === []) {
            Response::error('Settings payload is required', 422);
        }

        $model = new SiteSetting();
        $row = $model->saveSingle($payload);

        ActivityLogger::log($this->currentAdminId(), 'update', 'site_settings', 1);
        Cache::clearAll();

        Response::success($row, 'Updated successfully');
    }
}
