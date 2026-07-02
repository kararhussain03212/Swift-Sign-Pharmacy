<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/BaseModel.php';

final class Product extends BaseModel
{
    protected string $table = 'products';
    protected array $fillable = [
        'name', 'slug', 'category_id', 'product_type', 'manufacturer_or_brand', 'form', 'sku',
        'base_price', 'badge_label', 'description_text', 'stock_status', 'is_active',
    ];

    protected function defaultOrderBy(): string
    {
        return 'created_at DESC, id DESC';
    }

    public function findBySlug(string $slug): ?array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM ' . $this->table . ' WHERE slug = :slug AND is_active = 1 LIMIT 1');
        $stmt->execute([':slug' => $slug]);
        $row = $stmt->fetch();
        return $row !== false ? $row : null;
    }

    /**
     * Active products in one of the given category ids, ordered per a homepage
     * slider's chosen sort criteria. Includes each product's first image and
     * (for pharmacy products) original_price so slider cards can show a discount.
     */
    public function byCategoriesSorted(array $categoryIds, string $sortCriteria, int $limit): array
    {
        $categoryIds = array_values(array_unique(array_filter(array_map('intval', $categoryIds))));
        if ($categoryIds === []) {
            return [];
        }

        $placeholders = [];
        $params = [];
        foreach ($categoryIds as $index => $id) {
            $key = ':cat' . $index;
            $placeholders[] = $key;
            $params[$key] = $id;
        }

        $orderBy = match ($sortCriteria) {
            'best_selling' => 'p.id DESC', // no sales-count column yet; falls back to newest
            'random' => 'RAND()',
            'price_low_high' => 'p.base_price ASC, p.id DESC',
            'price_high_low' => 'p.base_price DESC, p.id DESC',
            default => 'p.created_at DESC, p.id DESC', // newest
        };

        $limit = max(1, min(100, $limit));

        $sql = sprintf(
            'SELECT p.*,
                    img.image_url AS first_image,
                    ppd.original_price AS pharmacy_original_price
             FROM %s p
             LEFT JOIN (
                 SELECT product_id, MIN(sort_order) AS min_sort
                 FROM product_images GROUP BY product_id
             ) first_img ON first_img.product_id = p.id
             LEFT JOIN product_images img ON img.product_id = first_img.product_id AND img.sort_order = first_img.min_sort
             LEFT JOIN pharmacy_product_details ppd ON ppd.product_id = p.id
             WHERE p.is_active = 1 AND p.category_id IN (%s)
             ORDER BY %s
             LIMIT %d',
            $this->table,
            implode(', ', $placeholders),
            $orderBy,
            $limit
        );

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);

        return $stmt->fetchAll() ?: [];
    }

    /** Other active products sharing a category, excluding the given product. */
    public function relatedByCategory(int $categoryId, int $excludeProductId, int $limit = 8): array
    {
        $stmt = $this->pdo->prepare(
            'SELECT p.*, img.image_url AS first_image
             FROM ' . $this->table . ' p
             LEFT JOIN (SELECT product_id, MIN(sort_order) AS min_sort FROM product_images GROUP BY product_id) fi ON fi.product_id = p.id
             LEFT JOIN product_images img ON img.product_id = fi.product_id AND img.sort_order = fi.min_sort
             WHERE p.is_active = 1 AND p.category_id = :cat AND p.id != :exclude
             ORDER BY p.created_at DESC, p.id DESC
             LIMIT :limit'
        );
        $stmt->bindValue(':cat', $categoryId, \PDO::PARAM_INT);
        $stmt->bindValue(':exclude', $excludeProductId, \PDO::PARAM_INT);
        $stmt->bindValue(':limit', $limit, \PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll() ?: [];
    }

    /** Other active products from the same manufacturer/brand, excluding the given product. */
    public function relatedByManufacturer(string $manufacturer, int $excludeProductId, int $limit = 8): array
    {
        if (trim($manufacturer) === '') {
            return [];
        }

        $stmt = $this->pdo->prepare(
            'SELECT p.*, img.image_url AS first_image
             FROM ' . $this->table . ' p
             LEFT JOIN (SELECT product_id, MIN(sort_order) AS min_sort FROM product_images GROUP BY product_id) fi ON fi.product_id = p.id
             LEFT JOIN product_images img ON img.product_id = fi.product_id AND img.sort_order = fi.min_sort
             WHERE p.is_active = 1 AND p.manufacturer_or_brand = :brand AND p.id != :exclude
             ORDER BY p.created_at DESC, p.id DESC
             LIMIT :limit'
        );
        $stmt->bindValue(':brand', $manufacturer);
        $stmt->bindValue(':exclude', $excludeProductId, \PDO::PARAM_INT);
        $stmt->bindValue(':limit', $limit, \PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll() ?: [];
    }
}
