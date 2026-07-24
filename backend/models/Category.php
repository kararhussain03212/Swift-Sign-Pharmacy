<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/ArionBaseModel.php';

final class Category extends ArionBaseModel
{
    protected string $table = 'catalog_categories';
    protected array $fillable = ['name', 'slug', 'parent_id', 'sort_order', 'is_active', 'product_type'];

    protected function defaultOrderBy(): string
    {
        return 'sort_order ASC, id ASC';
    }

    /**
     * Returns top-level catalog_categories with their subcatalog_categories nested under `children`.
     */
    public function allNested(bool $onlyActive = false): array
    {
        $rows = $this->all();
        if ($onlyActive) {
            $rows = array_values(array_filter(
                $rows,
                static fn (array $row): bool => (int) ($row['is_active'] ?? 0) === 1
            ));
        }

        $byParent = [];
        foreach ($rows as $row) {
            $parentId = $row['parent_id'] !== null ? (int) $row['parent_id'] : 0;
            $byParent[$parentId][] = $row;
        }

        $build = function (int $parentId) use (&$build, $byParent): array {
            $result = [];
            foreach ($byParent[$parentId] ?? [] as $child) {
                $child['children'] = $build((int) $child['id']);
                $result[] = $child;
            }
            return $result;
        };

        return $build(0);
    }

    /** Flat, active, top-level catalog_categories for simple list displays (e.g. the footer). */
    public function topLevelActive(): array
    {
        $stmt = $this->pdo->query(
            'SELECT id, name, slug FROM ' . $this->table
            . ' WHERE is_active = 1 AND parent_id IS NULL ORDER BY ' . $this->defaultOrderBy()
        );

        return $stmt->fetchAll() ?: [];
    }
}
