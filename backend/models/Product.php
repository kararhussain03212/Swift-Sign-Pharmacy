<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/BaseModel.php';

final class Product extends BaseModel
{
    protected string $table = 'catalog_products';
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
     * Active catalog_products in one of the given category ids, ordered per a homepage
     * slider's chosen sort criteria. Includes each product's first image and
     * (for pharmacy catalog_products) original_price so slider cards can show a discount.
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
                 FROM catalog_product_images GROUP BY product_id
             ) first_img ON first_img.product_id = p.id
             LEFT JOIN catalog_product_images img ON img.product_id = first_img.product_id AND img.sort_order = first_img.min_sort
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

    /** Other active catalog_products sharing a category, excluding the given product. */
    public function relatedByCategory(int $categoryId, int $excludeProductId, int $limit = 8): array
    {
        $stmt = $this->pdo->prepare(
            'SELECT p.*, img.image_url AS first_image
             FROM ' . $this->table . ' p
             LEFT JOIN (SELECT product_id, MIN(sort_order) AS min_sort FROM catalog_product_images GROUP BY product_id) fi ON fi.product_id = p.id
             LEFT JOIN catalog_product_images img ON img.product_id = fi.product_id AND img.sort_order = fi.min_sort
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

    /**
     * Other active catalog_products from the same parent category (e.g. other Vitamins
     * catalog_products in general, not just the same subcategory), excluding the given
     * product and its own exact subcategory so this doesn't just duplicate
     * relatedByCategory()'s results.
     */
    public function relatedByParentCategory(int $categoryId, int $excludeProductId, int $limit = 8): array
    {
        $parentStmt = $this->pdo->prepare('SELECT COALESCE(parent_id, id) AS pid FROM catalog_categories WHERE id = :cat LIMIT 1');
        $parentStmt->execute([':cat' => $categoryId]);
        $parentRow = $parentStmt->fetch();
        if (!$parentRow) {
            return [];
        }
        $parentId = (int) $parentRow['pid'];

        // Only dedupe against the product's own subcategory when that subcategory
        // is a distinct leaf under the parent — if the product sits directly in the
        // parent category itself, excluding "its own category" would wrongly drop
        // every other direct sibling too.
        $excludeOwnCategory = $categoryId !== $parentId;

        $sql = 'SELECT p.*, img.image_url AS first_image
             FROM ' . $this->table . ' p
             LEFT JOIN (SELECT product_id, MIN(sort_order) AS min_sort FROM catalog_product_images GROUP BY product_id) fi ON fi.product_id = p.id
             LEFT JOIN catalog_product_images img ON img.product_id = fi.product_id AND img.sort_order = fi.min_sort
             WHERE p.is_active = 1
               AND p.id != :exclude'
            . ($excludeOwnCategory ? ' AND p.category_id != :own_cat' : '') . '
               AND p.category_id IN (
                   SELECT id FROM catalog_categories WHERE id = :parent1 OR parent_id = :parent2
               )
             ORDER BY p.created_at DESC, p.id DESC
             LIMIT :limit';

        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':exclude', $excludeProductId, \PDO::PARAM_INT);
        if ($excludeOwnCategory) {
            $stmt->bindValue(':own_cat', $categoryId, \PDO::PARAM_INT);
        }
        $stmt->bindValue(':parent1', $parentId, \PDO::PARAM_INT);
        $stmt->bindValue(':parent2', $parentId, \PDO::PARAM_INT);
        $stmt->bindValue(':limit', $limit, \PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll() ?: [];
    }
}
