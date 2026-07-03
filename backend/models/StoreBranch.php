<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/ArionBaseModel.php';

final class StoreBranch extends ArionBaseModel
{
    protected string $table = 'store_branches';
    protected array $fillable = [
        'name', 'address', 'area', 'city', 'map_embed_link', 'latitude', 'longitude',
        'phone', 'hours_display', 'detail_slug', 'is_active', 'sort_order',
    ];

    protected function defaultOrderBy(): string
    {
        return 'sort_order ASC, id ASC';
    }

    protected function searchableColumns(): array
    {
        return ['name', 'address', 'area'];
    }

    public function findByDetailSlug(string $slug): ?array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM ' . $this->table . ' WHERE detail_slug = :slug LIMIT 1');
        $stmt->execute([':slug' => $slug]);
        $row = $stmt->fetch();

        return $row !== false ? $row : null;
    }

    public function slugExists(string $slug, ?int $excludeId = null): bool
    {
        $sql = 'SELECT COUNT(*) AS aggregate FROM ' . $this->table . ' WHERE detail_slug = :slug';
        $params = [':slug' => $slug];
        if ($excludeId !== null) {
            $sql .= ' AND id != :id';
            $params[':id'] = $excludeId;
        }
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        $row = $stmt->fetch();

        return ((int) ($row['aggregate'] ?? 0)) > 0;
    }
}
