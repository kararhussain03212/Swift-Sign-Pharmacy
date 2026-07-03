<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\StoreBranch;
use Backend\Utils\ActivityLogger;
use Backend\Utils\Cache;
use Backend\Utils\Response;
use Backend\Utils\Validator;

require_once __DIR__ . '/BaseCrudController.php';
require_once __DIR__ . '/../models/StoreBranch.php';

final class StoreBranchController extends BaseCrudController
{
    protected string $modelClass = StoreBranch::class;
    protected string $resourceName = 'store_branches';
    protected array $requiredCreateFields = ['name', 'address', 'area', 'city', 'map_embed_link', 'hours_display'];

    public function publicIndex(array $params = []): void
    {
        $model = new StoreBranch();
        $query = $this->query();
        $area = trim((string) ($query['area'] ?? ''));

        $cacheKey = 'public:store_branches:' . $area;
        $data = Cache::remember($cacheKey, static function () use ($model, $area) {
            $rows = array_values(array_filter($model->all(), static fn (array $row): bool => (int) ($row['is_active'] ?? 0) === 1));
            if ($area === '') {
                return $rows;
            }
            $needle = mb_strtolower($area);
            return array_values(array_filter($rows, static function (array $row) use ($needle) {
                return str_contains(mb_strtolower((string) $row['area']), $needle)
                    || str_contains(mb_strtolower((string) $row['address']), $needle);
            }));
        });

        Response::success($data, 'Fetched successfully');
    }

    public function publicShowBySlug(array $params): void
    {
        $slug = (string) ($params['slug'] ?? '');
        if ($slug === '') {
            Response::error('Invalid slug', 422);
        }

        $branch = Cache::remember('public:store_branch:slug:' . $slug, static function () use ($slug) {
            $model = new StoreBranch();
            return $model->findByDetailSlug($slug);
        });

        if (!$branch || !((int) ($branch['is_active'] ?? 0))) {
            Response::error('Branch not found', 404);
        }

        Response::success($branch, 'Fetched successfully');
    }

    public function store(array $params = []): void
    {
        $this->requirePermission('create_content');
        $model = new StoreBranch();
        $body = $this->body();
        $mapEmbedLink = $this->extractMapEmbedUrl((string) ($body['map_embed_link'] ?? ''));
        $payload = Validator::sanitizeInput($body);
        $payload['map_embed_link'] = $mapEmbedLink;

        $errors = Validator::required($payload, $this->requiredCreateFields);
        if ($errors !== []) {
            Response::error('Validation failed', 422, ['fields' => $errors]);
        }

        $payload['detail_slug'] = $this->resolveSlug($model, (string) ($payload['detail_slug'] ?? ''), (string) $payload['name']);

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

        $model = new StoreBranch();
        $existing = $model->find($id);
        if (!$existing) {
            Response::error('Resource not found', 404);
        }

        $body = $this->body();
        $payload = Validator::sanitizeInput($body);
        if (array_key_exists('map_embed_link', $body)) {
            $payload['map_embed_link'] = $this->extractMapEmbedUrl((string) $body['map_embed_link']);
        }
        if (array_key_exists('detail_slug', $payload) || array_key_exists('name', $payload)) {
            $desired = trim((string) ($payload['detail_slug'] ?? $existing['detail_slug']));
            $payload['detail_slug'] = $this->resolveSlug($model, $desired, (string) ($payload['name'] ?? $existing['name']), $id);
        }

        $ok = $model->update($id, $payload);
        if (!$ok) {
            Response::error('No changes were applied', 422);
        }

        ActivityLogger::log($this->currentAdminId(), 'update', $this->resourceName, $id);
        Cache::clearAll();

        Response::success($model->find($id), 'Updated successfully');
    }

    private function extractMapEmbedUrl(string $value): string
    {
        $raw = trim($value);
        if ($raw === '') {
            return '';
        }

        if (preg_match('/src=["\']([^"\']+)["\']/i', $raw, $matches) === 1) {
            return trim($matches[1]);
        }

        return $raw;
    }

    private function resolveSlug(StoreBranch $model, string $desired, string $fallbackName, ?int $excludeId = null): string
    {
        $base = $this->slugify($desired !== '' ? $desired : $fallbackName);
        $slug = $base;
        $suffix = 2;
        while ($model->slugExists($slug, $excludeId)) {
            $slug = $base . '-' . $suffix;
            $suffix++;
        }

        return $slug;
    }
}
