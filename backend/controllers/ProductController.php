<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Config\Database;
use Backend\Models\ChemicalProductDetail;
use Backend\Models\ChemicalProductDocument;
use Backend\Models\ChemicalProductPackagingOption;
use Backend\Models\ChemicalProductQuantityOption;
use Backend\Models\PharmacyProductBenefit;
use Backend\Models\PharmacyProductDetail;
use Backend\Models\Product;
use Backend\Models\ProductImage;
use Backend\Models\ProductReview;
use Backend\Utils\ActivityLogger;
use Backend\Utils\Cache;
use Backend\Utils\Response;
use Backend\Utils\Validator;

require_once __DIR__ . '/BaseCrudController.php';
require_once __DIR__ . '/../models/Product.php';
require_once __DIR__ . '/../models/ProductImage.php';
require_once __DIR__ . '/../models/ProductReview.php';
require_once __DIR__ . '/../models/PharmacyProductDetail.php';
require_once __DIR__ . '/../models/PharmacyProductBenefit.php';
require_once __DIR__ . '/../models/ChemicalProductDetail.php';
require_once __DIR__ . '/../models/ChemicalProductQuantityOption.php';
require_once __DIR__ . '/../models/ChemicalProductPackagingOption.php';
require_once __DIR__ . '/../models/ChemicalProductDocument.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/ActivityLogger.php';
require_once __DIR__ . '/../utils/Cache.php';
require_once __DIR__ . '/../utils/Response.php';
require_once __DIR__ . '/../utils/Validator.php';

final class ProductController extends BaseCrudController
{
    protected string $modelClass = Product::class;
    protected string $resourceName = 'products';
    protected array $requiredCreateFields = ['name', 'category_id', 'manufacturer_or_brand', 'base_price'];

    // ---------------------------------------------------------------
    // Public
    // ---------------------------------------------------------------

    public function publicShowBySlug(array $params): void
    {
        $slug = trim((string) ($params['slug'] ?? ''));
        if ($slug === '') {
            Response::error('Slug is required', 422);
        }

        $productModel = new Product();
        $product = $productModel->findBySlug($slug);
        if (!$product) {
            Response::error('Product not found', 404);
        }

        Response::success($this->buildProductPayload($product), 'Fetched successfully');
    }

    public function publicRelated(array $params): void
    {
        $slug = trim((string) ($params['slug'] ?? ''));
        if ($slug === '') {
            Response::error('Slug is required', 422);
        }

        $productModel = new Product();
        $product = $productModel->findBySlug($slug);
        if (!$product) {
            Response::error('Product not found', 404);
        }

        Response::success([
            'related' => array_map(
                [$this, 'mapCardProduct'],
                $productModel->relatedByCategory((int) $product['category_id'], (int) $product['id'])
            ),
            'youMayAlsoLike' => array_map(
                [$this, 'mapCardProduct'],
                $productModel->relatedByManufacturer((string) $product['manufacturer_or_brand'], (int) $product['id'])
            ),
        ], 'Fetched successfully');
    }

    // ---------------------------------------------------------------
    // Admin
    // ---------------------------------------------------------------

    public function index(array $params = []): void
    {
        $query = $this->query();
        $page = max(1, (int) ($query['page'] ?? 1));
        $perPage = max(1, min(100, (int) ($query['per_page'] ?? 20)));
        $offset = ($page - 1) * $perPage;
        $type = $query['type'] ?? null;
        $search = trim((string) ($query['search'] ?? ''));

        $where = [];
        $bind = [];
        if ($type === 'pharmacy' || $type === 'chemical') {
            $where[] = 'p.product_type = :type';
            $bind[':type'] = $type;
        }
        if ($search !== '') {
            $where[] = 'p.name LIKE :search';
            $bind[':search'] = '%' . $search . '%';
        }
        $whereSql = $where === [] ? '' : ('WHERE ' . implode(' AND ', $where));

        $pdo = Database::connection();

        $countStmt = $pdo->prepare("SELECT COUNT(*) AS aggregate FROM products p $whereSql");
        $countStmt->execute($bind);
        $total = (int) ($countStmt->fetch()['aggregate'] ?? 0);

        $sql = "SELECT p.*, c.name AS category_name, c.slug AS category_slug
                FROM products p
                LEFT JOIN categories c ON c.id = p.category_id
                $whereSql
                ORDER BY p.created_at DESC, p.id DESC
                LIMIT :limit OFFSET :offset";
        $stmt = $pdo->prepare($sql);
        foreach ($bind as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        $stmt->bindValue(':limit', $perPage, \PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, \PDO::PARAM_INT);
        $stmt->execute();
        $rows = $stmt->fetchAll() ?: [];

        Response::success([
            'data' => $rows,
            'meta' => [
                'page' => $page,
                'per_page' => $perPage,
                'total' => $total,
                'total_pages' => (int) ceil($total / $perPage),
            ],
        ], 'Fetched successfully');
    }

    public function show(array $params): void
    {
        $id = (int) ($params['id'] ?? 0);
        if ($id <= 0) {
            Response::error('Invalid resource ID', 422);
        }

        $productModel = new Product();
        $product = $productModel->find($id);
        if (!$product) {
            Response::error('Resource not found', 404);
        }

        Response::success($this->buildProductPayload($product, true), 'Fetched successfully');
    }

    public function store(array $params = []): void
    {
        $this->requirePermission('create_content');
        $payload = Validator::sanitizeInput($this->body());

        $errors = Validator::required($payload, $this->requiredCreateFields);
        if ($errors !== []) {
            Response::error('Validation failed', 422, ['fields' => $errors]);
        }

        $categoryId = (int) $payload['category_id'];
        $productType = $this->resolveCategoryProductType($categoryId);
        if ($productType === null) {
            Response::error('Selected category was not found', 422, ['fields' => ['category_id' => 'Invalid category']]);
        }

        $slug = trim((string) ($payload['slug'] ?? '')) !== ''
            ? $this->slugify((string) $payload['slug'])
            : $this->slugify((string) $payload['name']);

        $productModel = new Product();
        $id = $productModel->create([
            'name' => (string) $payload['name'],
            'slug' => $slug,
            'category_id' => $categoryId,
            'product_type' => $productType,
            'manufacturer_or_brand' => (string) $payload['manufacturer_or_brand'],
            'form' => $payload['form'] ?? null,
            'sku' => $payload['sku'] ?? null,
            'base_price' => (float) $payload['base_price'],
            'badge_label' => $payload['badge_label'] ?? null,
            'description_text' => $payload['description_text'] ?? null,
            'stock_status' => in_array($payload['stock_status'] ?? '', ['in_stock', 'out_of_stock', 'preorder'], true)
                ? $payload['stock_status'] : 'in_stock',
            'is_active' => isset($payload['is_active']) ? (int) (bool) $payload['is_active'] : 1,
        ]);

        (new ProductImage())->replaceForProduct($id, $payload['images'] ?? []);
        $this->saveExtension($id, $productType, $payload);

        ActivityLogger::log($this->currentAdminId(), 'create', $this->resourceName, $id);
        Cache::clearAll();

        Response::success($this->buildProductPayload($productModel->find($id), true), 'Created successfully', 201);
    }

    public function update(array $params): void
    {
        $this->requirePermission('edit_content');
        $id = (int) ($params['id'] ?? 0);
        if ($id <= 0) {
            Response::error('Invalid resource ID', 422);
        }

        $productModel = new Product();
        $existing = $productModel->find($id);
        if (!$existing) {
            Response::error('Resource not found', 404);
        }

        $payload = Validator::sanitizeInput($this->body());
        $update = [];

        foreach (['name', 'manufacturer_or_brand', 'form', 'sku', 'badge_label', 'description_text', 'stock_status'] as $field) {
            if (array_key_exists($field, $payload)) {
                $update[$field] = $payload[$field] === '' ? null : $payload[$field];
            }
        }
        if (isset($payload['base_price'])) {
            $update['base_price'] = (float) $payload['base_price'];
        }
        if (isset($payload['is_active'])) {
            $update['is_active'] = (int) (bool) $payload['is_active'];
        }
        if (isset($payload['slug']) && trim((string) $payload['slug']) !== '') {
            $update['slug'] = $this->slugify((string) $payload['slug']);
        }

        $typeChanged = false;
        $productType = (string) $existing['product_type'];

        if (isset($payload['category_id'])) {
            $newCategoryId = (int) $payload['category_id'];
            if ($newCategoryId !== (int) $existing['category_id']) {
                $newType = $this->resolveCategoryProductType($newCategoryId);
                if ($newType === null) {
                    Response::error('Selected category was not found', 422, ['fields' => ['category_id' => 'Invalid category']]);
                }
                $update['category_id'] = $newCategoryId;
                $update['product_type'] = $newType;
                $typeChanged = $newType !== $productType;
                $productType = $newType;
            }
        }

        if ($update !== []) {
            $productModel->update($id, $update);
        }

        if (array_key_exists('images', $payload)) {
            (new ProductImage())->replaceForProduct($id, $payload['images']);
        }

        // Only touch extension tables when the caller actually sent extension data
        // for the (possibly new) type, so a bare metadata edit doesn't wipe them out.
        if ($this->payloadHasExtensionData($payload, $productType)) {
            $this->saveExtension($id, $productType, $payload);
        }

        ActivityLogger::log($this->currentAdminId(), 'update', $this->resourceName, $id);
        Cache::clearAll();

        $response = $this->buildProductPayload($productModel->find($id), true);
        $response['type_changed'] = $typeChanged;

        Response::success($response, 'Updated successfully');
    }

    // ---------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------

    private function resolveCategoryProductType(int $categoryId): ?string
    {
        $pdo = Database::connection();
        $stmt = $pdo->prepare('SELECT product_type FROM categories WHERE id = :id LIMIT 1');
        $stmt->execute([':id' => $categoryId]);
        $row = $stmt->fetch();

        return $row ? (string) $row['product_type'] : null;
    }

    private function payloadHasExtensionData(array $payload, string $productType): bool
    {
        return $productType === 'pharmacy'
            ? (array_key_exists('pharmacy', $payload) && is_array($payload['pharmacy']))
            : (array_key_exists('chemical', $payload) && is_array($payload['chemical']));
    }

    private function saveExtension(int $productId, string $productType, array $payload): void
    {
        if ($productType === 'pharmacy') {
            $pharmacy = is_array($payload['pharmacy'] ?? null) ? $payload['pharmacy'] : [];
            (new PharmacyProductDetail())->upsertForProduct($productId, [
                'net_weight' => $pharmacy['net_weight'] ?? null,
                'original_price' => isset($pharmacy['original_price']) && $pharmacy['original_price'] !== ''
                    ? (float) $pharmacy['original_price'] : null,
                'discount_percent' => isset($pharmacy['discount_percent']) && $pharmacy['discount_percent'] !== ''
                    ? (int) $pharmacy['discount_percent'] : null,
                'directions_for_use' => $pharmacy['directions_for_use'] ?? null,
            ]);
            (new PharmacyProductBenefit())->replaceForProduct($productId, $pharmacy['benefits'] ?? []);
            return;
        }

        $chemical = is_array($payload['chemical'] ?? null) ? $payload['chemical'] : [];
        (new ChemicalProductDetail())->upsertForProduct($productId, [
            'cas_number' => $chemical['cas_number'] ?? null,
            'chemical_name_of_material' => $chemical['chemical_name_of_material'] ?? null,
            'boiling_point' => $chemical['boiling_point'] ?? null,
            'melting_point' => $chemical['melting_point'] ?? null,
            'molecular_formula' => $chemical['molecular_formula'] ?? null,
            'molecular_weight' => $chemical['molecular_weight'] ?? null,
            'percent_purity' => $chemical['percent_purity'] ?? null,
            'color' => $chemical['color'] ?? null,
            'synonym' => $chemical['synonym'] ?? null,
            'grade' => $chemical['grade'] ?? null,
            'unit_size' => $chemical['unit_size'] ?? null,
            'molecule_diagram_url' => $chemical['molecule_diagram_url'] ?? null,
        ]);
        (new ChemicalProductQuantityOption())->replaceForProduct($productId, $chemical['quantity_options'] ?? []);
        (new ChemicalProductPackagingOption())->replaceForProduct($productId, $chemical['packaging_options'] ?? []);
        (new ChemicalProductDocument())->replaceForProduct($productId, $chemical['documents'] ?? []);
    }

    private function buildProductPayload(array $product, bool $forAdmin = false): array
    {
        $productId = (int) $product['id'];
        $productType = (string) $product['product_type'];

        $pdo = Database::connection();
        $catStmt = $pdo->prepare('SELECT id, name, slug FROM categories WHERE id = :id LIMIT 1');
        $catStmt->execute([':id' => (int) $product['category_id']]);
        $category = $catStmt->fetch() ?: null;

        $payload = [
            'id' => $productId,
            'name' => $product['name'],
            'slug' => $product['slug'],
            'category' => $category ? ['id' => (int) $category['id'], 'name' => $category['name'], 'slug' => $category['slug']] : null,
            'category_id' => (int) $product['category_id'],
            'product_type' => $productType,
            'manufacturer_or_brand' => $product['manufacturer_or_brand'],
            'form' => $product['form'],
            'sku' => $product['sku'],
            'base_price' => (float) $product['base_price'],
            'badge_label' => $product['badge_label'],
            'description_text' => $product['description_text'],
            'stock_status' => $product['stock_status'],
            'is_active' => (int) $product['is_active'],
            'images' => array_map(static fn (array $img): string => $img['image_url'], (new ProductImage())->forProduct($productId)),
            'rating' => (new ProductReview())->aggregateForProduct($productId),
        ];

        if ($productType === 'pharmacy') {
            $details = (new PharmacyProductDetail())->forProduct($productId) ?? [];
            $payload['pharmacy'] = [
                'net_weight' => $details['net_weight'] ?? null,
                'original_price' => isset($details['original_price']) ? (float) $details['original_price'] : null,
                'discount_percent' => isset($details['discount_percent']) ? (int) $details['discount_percent'] : null,
                'directions_for_use' => $details['directions_for_use'] ?? null,
                'benefits' => array_map(
                    static fn (array $b): string => $b['benefit_text'],
                    (new PharmacyProductBenefit())->forProduct($productId)
                ),
            ];
            $payload['chemical'] = null;
        } else {
            $details = (new ChemicalProductDetail())->forProduct($productId) ?? [];
            $payload['chemical'] = [
                'cas_number' => $details['cas_number'] ?? null,
                'chemical_name_of_material' => $details['chemical_name_of_material'] ?? null,
                'boiling_point' => $details['boiling_point'] ?? null,
                'melting_point' => $details['melting_point'] ?? null,
                'molecular_formula' => $details['molecular_formula'] ?? null,
                'molecular_weight' => $details['molecular_weight'] ?? null,
                'percent_purity' => $details['percent_purity'] ?? null,
                'color' => $details['color'] ?? null,
                'synonym' => $details['synonym'] ?? null,
                'grade' => $details['grade'] ?? null,
                'unit_size' => $details['unit_size'] ?? null,
                'molecule_diagram_url' => $details['molecule_diagram_url'] ?? null,
                'quantity_options' => (new ChemicalProductQuantityOption())->forProduct($productId),
                'packaging_options' => (new ChemicalProductPackagingOption())->forProduct($productId),
                'documents' => $forAdmin
                    ? (new ChemicalProductDocument())->forProduct($productId)
                    : (new ChemicalProductDocument())->groupedForProduct($productId),
            ];
            $payload['pharmacy'] = null;
        }

        return $payload;
    }

    private function mapCardProduct(array $row): array
    {
        return [
            'id' => (int) $row['id'],
            'name' => $row['name'],
            'slug' => $row['slug'],
            'image' => $row['first_image'] ?? '',
            'price' => (float) $row['base_price'],
            'brand' => $row['manufacturer_or_brand'],
        ];
    }
}
