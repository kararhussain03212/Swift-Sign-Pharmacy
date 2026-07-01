<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\StoreLocatorContent;
use Backend\Utils\ActivityLogger;
use Backend\Utils\Cache;
use Backend\Utils\Response;
use Backend\Utils\Validator;

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/StoreLocatorContent.php';
require_once __DIR__ . '/../utils/ActivityLogger.php';
require_once __DIR__ . '/../utils/Cache.php';
require_once __DIR__ . '/../utils/Response.php';
require_once __DIR__ . '/../utils/Validator.php';

/**
 * Single-row content resource (id = 1) for the Store Locator page copy.
 */
final class StoreLocatorContentController extends BaseController
{
    public function index(array $params = []): void
    {
        $model = new StoreLocatorContent();
        Response::success($model->find(1), 'Fetched successfully');
    }

    public function publicIndex(array $params = []): void
    {
        $model = new StoreLocatorContent();
        $data = Cache::remember('public:store_locator_content', static fn () => $model->find(1));
        Response::success($data, 'Fetched successfully');
    }

    public function update(array $params = []): void
    {
        $this->requirePermission('edit_content');
        $payload = Validator::sanitizeInput($this->body());
        if ($payload === []) {
            Response::error('Content payload is required', 422);
        }

        $model = new StoreLocatorContent();
        $row = $model->saveSingle($payload);

        ActivityLogger::log($this->currentAdminId(), 'update', 'store_locator_content', 1);
        Cache::clearAll();

        Response::success($row, 'Updated successfully');
    }
}
