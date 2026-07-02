<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Config\ArionDatabase;
use Backend\Models\HomepageProductSlider;
use Backend\Models\HomepageSliderCategory;
use Backend\Models\Product;
use Backend\Utils\ActivityLogger;
use Backend\Utils\Cache;
use Backend\Utils\Response;
use Backend\Utils\Validator;

require_once __DIR__ . '/BaseCrudController.php';
require_once __DIR__ . '/../models/HomepageProductSlider.php';
require_once __DIR__ . '/../models/HomepageSliderCategory.php';
require_once __DIR__ . '/../models/Product.php';
require_once __DIR__ . '/../config/arion_database.php';
require_once __DIR__ . '/../utils/ActivityLogger.php';
require_once __DIR__ . '/../utils/Cache.php';
require_once __DIR__ . '/../utils/Response.php';
require_once __DIR__ . '/../utils/Validator.php';

final class HomepageProductSliderController extends BaseCrudController
{
    protected string $modelClass = HomepageProductSlider::class;
    protected string $resourceName = 'homepage_product_sliders';
    protected array $requiredCreateFields = ['title'];

    /** Admin list: every slider (active + inactive) with linked category names and a product-count preview. */
    public function index(array $params = []): void
    {
        $sliderModel = new HomepageProductSlider();
        $sliders = $sliderModel->all();

        $categoriesById = $this->allArionCategoriesById();
        $linkModel = new HomepageSliderCategory();
        $productModel = new Product();

        $data = array_map(function (array $slider) use ($categoriesById, $linkModel, $productModel): array {
            $links = $linkModel->forSlider((int) $slider['id']);
            $categoryIds = array_column($links, 'category_id');

            $slider['categories'] = array_values(array_filter(array_map(
                static function (array $link) use ($categoriesById): ?array {
                    $cat = $categoriesById[(int) $link['category_id']] ?? null;
                    if ($cat === null) {
                        return null;
                    }
                    return ['id' => (int) $cat['id'], 'name' => $cat['name'], 'slug' => $cat['slug']];
                },
                $links
            )));

            $slider['product_count'] = $categoryIds === []
                ? 0
                : count($productModel->byCategoriesSorted($categoryIds, 'newest', 100));

            return $slider;
        }, $sliders);

        Response::success($data, 'Fetched successfully');
    }

    /** Admin edit fetch: slider fields + linked category_ids for pre-populating the multi-select. */
    public function show(array $params): void
    {
        $id = (int) ($params['id'] ?? 0);
        if ($id <= 0) {
            Response::error('Invalid resource ID', 422);
        }

        $sliderModel = new HomepageProductSlider();
        $slider = $sliderModel->find($id);
        if (!$slider) {
            Response::error('Resource not found', 404);
        }

        $linkModel = new HomepageSliderCategory();
        $links = $linkModel->forSlider($id);
        $slider['category_ids'] = array_map(static fn (array $l): int => (int) $l['category_id'], $links);

        Response::success($slider, 'Fetched successfully');
    }

    public function store(array $params = []): void
    {
        $this->requirePermission('create_content');
        $payload = Validator::sanitizeInput($this->body());

        $errors = Validator::required($payload, $this->requiredCreateFields);
        if ($errors !== []) {
            Response::error('Validation failed', 422, ['fields' => $errors]);
        }

        $sliderModel = new HomepageProductSlider();
        $categoryIds = $this->extractCategoryIds($payload);
        $categoryIdToSlug = $this->resolveCategorySlugs($categoryIds);

        $createPayload = [
            'title' => (string) $payload['title'],
            'view_all_link' => $this->resolveViewAllLink($payload, $categoryIdToSlug),
            'max_products' => isset($payload['max_products']) ? max(1, min(255, (int) $payload['max_products'])) : 10,
            'sort_criteria' => $this->sanitizeSortCriteria($payload['sort_criteria'] ?? 'newest'),
            'is_active' => isset($payload['is_active']) ? (int) (bool) $payload['is_active'] : 1,
        ];

        $position = $payload['position'] ?? 'bottom';
        if (isset($payload['sort_order'])) {
            $createPayload['sort_order'] = (int) $payload['sort_order'];
        } elseif ($position === 'top') {
            $sliderModel->shiftAllDown();
            $createPayload['sort_order'] = 0;
        } else {
            $createPayload['sort_order'] = $sliderModel->nextSortOrder();
        }

        $id = $sliderModel->create($createPayload);

        $linkModel = new HomepageSliderCategory();
        $linkModel->replaceForSlider($id, $categoryIdToSlug);

        ActivityLogger::log($this->currentAdminId(), 'create', $this->resourceName, $id);
        Cache::clearAll();

        Response::success($sliderModel->find($id), 'Created successfully', 201);
    }

    public function update(array $params): void
    {
        $this->requirePermission('edit_content');
        $id = (int) ($params['id'] ?? 0);
        if ($id <= 0) {
            Response::error('Invalid resource ID', 422);
        }

        $sliderModel = new HomepageProductSlider();
        if (!$sliderModel->find($id)) {
            Response::error('Resource not found', 404);
        }

        $payload = Validator::sanitizeInput($this->body());

        $updatePayload = [];
        if (isset($payload['title'])) {
            $updatePayload['title'] = (string) $payload['title'];
        }
        if (isset($payload['max_products'])) {
            $updatePayload['max_products'] = max(1, min(255, (int) $payload['max_products']));
        }
        if (isset($payload['sort_criteria'])) {
            $updatePayload['sort_criteria'] = $this->sanitizeSortCriteria($payload['sort_criteria']);
        }
        if (isset($payload['is_active'])) {
            $updatePayload['is_active'] = (int) (bool) $payload['is_active'];
        }
        if (isset($payload['sort_order'])) {
            $updatePayload['sort_order'] = (int) $payload['sort_order'];
        }

        $categoryIdToSlug = null;
        if (array_key_exists('category_ids', $payload)) {
            $categoryIds = $this->extractCategoryIds($payload);
            $categoryIdToSlug = $this->resolveCategorySlugs($categoryIds);
        }

        if (array_key_exists('view_all_link', $payload)) {
            $link = trim((string) $payload['view_all_link']);
            $updatePayload['view_all_link'] = $link !== ''
                ? $link
                : $this->resolveViewAllLink($payload, $categoryIdToSlug ?? []);
        }

        if ($updatePayload !== []) {
            $sliderModel->update($id, $updatePayload);
        }

        if ($categoryIdToSlug !== null) {
            (new HomepageSliderCategory())->replaceForSlider($id, $categoryIdToSlug);
        }

        ActivityLogger::log($this->currentAdminId(), 'update', $this->resourceName, $id);
        Cache::clearAll();

        Response::success($sliderModel->find($id), 'Updated successfully');
    }

    /** Reorders sliders given an ordered array of ids (top of list = shows first). */
    public function reorderSliders(array $params = []): void
    {
        $this->requirePermission('edit_content');
        $body = $this->body();
        $ids = $body['ids'] ?? $body['items'] ?? [];

        if (!is_array($ids) || $ids === []) {
            Response::error('ids is required', 422);
        }

        $sliderModel = new HomepageProductSlider();
        $sliderModel->reorderByIds($ids);

        ActivityLogger::log($this->currentAdminId(), 'reorder', $this->resourceName, null);
        Cache::clearAll();

        Response::success($sliderModel->all(), 'Reordered successfully');
    }

    /** Public: active sliders in order, each with its resolved product list. Empty sliders are omitted. */
    public function publicIndex(array $params = []): void
    {
        $data = Cache::remember('public:homepage_product_sliders', function (): array {
            $sliderModel = new HomepageProductSlider();
            $linkModel = new HomepageSliderCategory();
            $productModel = new Product();

            $sliders = $sliderModel->activeOrdered();
            $result = [];

            foreach ($sliders as $slider) {
                $links = $linkModel->forSlider((int) $slider['id']);
                $categoryIds = array_values(array_unique(array_column($links, 'category_id')));
                $slugs = array_values(array_unique(array_column($links, 'category_slug')));

                if ($categoryIds === []) {
                    continue;
                }

                $products = $productModel->byCategoriesSorted(
                    $categoryIds,
                    (string) $slider['sort_criteria'],
                    (int) $slider['max_products']
                );

                if ($products === []) {
                    continue;
                }

                $result[] = [
                    'id' => (int) $slider['id'],
                    'title' => $slider['title'],
                    'viewAllLink' => $slider['view_all_link'] ?: ('/shop/' . ($slugs[0] ?? '')),
                    'products' => $products,
                ];
            }

            return $result;
        }, 120);

        Response::success($data, 'Fetched successfully');
    }

    private function extractCategoryIds(array $payload): array
    {
        $raw = $payload['category_ids'] ?? [];
        if (!is_array($raw)) {
            return [];
        }

        return array_values(array_unique(array_map('intval', $raw)));
    }

    /** @return array<int,string> category_id => category_slug */
    private function resolveCategorySlugs(array $categoryIds): array
    {
        if ($categoryIds === []) {
            return [];
        }

        $categoriesById = $this->allArionCategoriesById();

        $result = [];
        foreach ($categoryIds as $id) {
            if (isset($categoriesById[$id])) {
                $result[$id] = $categoriesById[$id]['slug'];
            }
        }

        return $result;
    }

    /** @return array<int,array{id:int,name:string,slug:string}> */
    private function allArionCategoriesById(): array
    {
        $pdo = ArionDatabase::connection();
        $stmt = $pdo->query('SELECT id, name, slug FROM categories');
        $rows = $stmt ? ($stmt->fetchAll() ?: []) : [];

        $byId = [];
        foreach ($rows as $row) {
            $byId[(int) $row['id']] = $row;
        }

        return $byId;
    }

    private function resolveViewAllLink(array $payload, array $categoryIdToSlug): ?string
    {
        if (isset($payload['view_all_link']) && trim((string) $payload['view_all_link']) !== '') {
            return trim((string) $payload['view_all_link']);
        }

        $firstSlug = $categoryIdToSlug === [] ? null : array_values($categoryIdToSlug)[0];

        return $firstSlug !== null ? '/shop/' . $firstSlug : null;
    }

    private function sanitizeSortCriteria(string $value): string
    {
        $allowed = ['newest', 'best_selling', 'random', 'price_low_high', 'price_high_low'];
        return in_array($value, $allowed, true) ? $value : 'newest';
    }
}
