<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\HomepageHeroBanner;
use Backend\Models\HomepageHeroBannerImage;
use Backend\Utils\ActivityLogger;
use Backend\Utils\Cache;
use Backend\Utils\Response;
use Backend\Utils\Validator;

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/HomepageHeroBanner.php';
require_once __DIR__ . '/../models/HomepageHeroBannerImage.php';
require_once __DIR__ . '/../utils/ActivityLogger.php';
require_once __DIR__ . '/../utils/Cache.php';
require_once __DIR__ . '/../utils/Response.php';
require_once __DIR__ . '/../utils/Validator.php';

/**
 * Single-row content resource (id = 1) for the "Up To 25% Off" dark-teal
 * homepage banner (WideBanner.jsx), plus its stacked product images (max 3).
 */
final class HomepageHeroBannerController extends BaseController
{
    private const MAX_IMAGES = 3;

    public function index(array $params = []): void
    {
        Response::success($this->payload(), 'Fetched successfully');
    }

    public function publicIndex(array $params = []): void
    {
        $data = Cache::remember('public:homepage_hero_banner', fn () => $this->payload());
        Response::success($data, 'Fetched successfully');
    }

    public function update(array $params = []): void
    {
        $this->requirePermission('edit_content');
        $payload = Validator::sanitizeInput($this->body());
        if ($payload === []) {
            Response::error('Content payload is required', 422);
        }

        $model = new HomepageHeroBanner();
        $model->saveSingle($payload);

        ActivityLogger::log($this->currentAdminId(), 'update', 'homepage_hero_banner', 1);
        Cache::clearAll();

        Response::success($this->payload(), 'Updated successfully');
    }

    public function storeImage(array $params = []): void
    {
        $this->requirePermission('create_content');

        $imageModel = new HomepageHeroBannerImage();
        if ($imageModel->count() >= self::MAX_IMAGES) {
            Response::error('A maximum of ' . self::MAX_IMAGES . ' images is allowed', 422);
        }

        $payload = Validator::sanitizeInput($this->body());
        $errors = Validator::required($payload, ['image_url']);
        if ($errors !== []) {
            Response::error('Validation failed', 422, ['fields' => $errors]);
        }

        $id = $imageModel->create($payload);
        ActivityLogger::log($this->currentAdminId(), 'create', 'homepage_hero_banner_images', $id);
        Cache::clearAll();

        Response::success($imageModel->find($id), 'Image added successfully', 201);
    }

    public function updateImage(array $params): void
    {
        $this->requirePermission('edit_content');
        $id = (int) ($params['id'] ?? 0);
        if ($id <= 0) {
            Response::error('Invalid image ID', 422);
        }

        $imageModel = new HomepageHeroBannerImage();
        if (!$imageModel->find($id)) {
            Response::error('Image not found', 404);
        }

        $payload = Validator::sanitizeInput($this->body());
        $imageModel->update($id, $payload);

        ActivityLogger::log($this->currentAdminId(), 'update', 'homepage_hero_banner_images', $id);
        Cache::clearAll();

        Response::success($imageModel->find($id), 'Image updated successfully');
    }

    public function destroyImage(array $params): void
    {
        $this->requirePermission('delete_content');
        $id = (int) ($params['id'] ?? 0);
        if ($id <= 0) {
            Response::error('Invalid image ID', 422);
        }

        $imageModel = new HomepageHeroBannerImage();
        if (!$imageModel->find($id)) {
            Response::error('Image not found', 404);
        }

        $imageModel->delete($id);
        ActivityLogger::log($this->currentAdminId(), 'delete', 'homepage_hero_banner_images', $id);
        Cache::clearAll();

        Response::success(null, 'Image deleted successfully');
    }

    private function payload(): array
    {
        $bannerModel = new HomepageHeroBanner();
        $imageModel = new HomepageHeroBannerImage();

        $banner = $bannerModel->find(1) ?? [];
        $banner['images'] = $imageModel->all();

        return $banner;
    }
}
