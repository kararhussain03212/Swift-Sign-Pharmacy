<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\Category;
use Backend\Utils\ActivityLogger;
use Backend\Utils\Cache;
use Backend\Utils\Response;
use Backend\Utils\Validator;

require_once __DIR__ . '/BaseCrudController.php';
require_once __DIR__ . '/../models/Category.php';
require_once __DIR__ . '/../utils/ActivityLogger.php';
require_once __DIR__ . '/../utils/Cache.php';
require_once __DIR__ . '/../utils/Response.php';
require_once __DIR__ . '/../utils/Validator.php';

final class CategoryController extends BaseCrudController
{
    protected string $modelClass = Category::class;
    protected string $resourceName = 'categories';
    protected array $requiredCreateFields = ['name'];

    public function index(array $params = []): void
    {
        $model = new Category();
        Response::success($model->allNested(false), 'Fetched successfully');
    }

    public function publicIndex(array $params = []): void
    {
        $model = new Category();
        $data = Cache::remember('public:categories:nested', static fn () => $model->allNested(true));
        Response::success($data, 'Fetched successfully');
    }

    /** Flat category list with product_type, for the admin product form's category dropdown. */
    public function adminWithType(array $params = []): void
    {
        $model = new Category();
        $rows = $model->all();
        $data = array_map(static fn (array $row): array => [
            'id' => (int) $row['id'],
            'name' => $row['name'],
            'slug' => $row['slug'],
            'parent_id' => $row['parent_id'] !== null ? (int) $row['parent_id'] : null,
            'product_type' => $row['product_type'],
        ], $rows);

        Response::success($data, 'Fetched successfully');
    }

    public function store(array $params = []): void
    {
        $this->requirePermission('create_content');
        $model = new Category();
        $payload = Validator::sanitizeInput($this->body());

        $errors = Validator::required($payload, $this->requiredCreateFields);
        if ($errors !== []) {
            Response::error('Validation failed', 422, ['fields' => $errors]);
        }

        if (!isset($payload['slug']) || trim((string) $payload['slug']) === '') {
            $payload['slug'] = $this->slugify((string) $payload['name']);
        }
        $payload['parent_id'] = isset($payload['parent_id']) && $payload['parent_id'] !== ''
            ? (int) $payload['parent_id']
            : null;

        $id = $model->create($payload);
        ActivityLogger::log($this->currentAdminId(), 'create', $this->resourceName, $id);
        Cache::clearAll();

        Response::success($model->find($id), 'Created successfully', 201);
    }

    public function update(array $params): void
    {
        $this->requirePermission('edit_content');
        $id = (int) ($params['id'] ?? 0);
        if ($id <= 0) {
            Response::error('Invalid resource ID', 422);
        }

        $model = new Category();
        if (!$model->find($id)) {
            Response::error('Resource not found', 404);
        }

        $payload = Validator::sanitizeInput($this->body());
        if (isset($payload['name']) && (!isset($payload['slug']) || trim((string) $payload['slug']) === '')) {
            $payload['slug'] = $this->slugify((string) $payload['name']);
        }
        if (array_key_exists('parent_id', $payload)) {
            $payload['parent_id'] = $payload['parent_id'] !== '' && $payload['parent_id'] !== null
                ? (int) $payload['parent_id']
                : null;
        }

        $ok = $model->update($id, $payload);
        if (!$ok) {
            Response::error('No changes were applied', 422);
        }

        ActivityLogger::log($this->currentAdminId(), 'update', $this->resourceName, $id);
        Cache::clearAll();

        Response::success($model->find($id), 'Updated successfully');
    }
}
