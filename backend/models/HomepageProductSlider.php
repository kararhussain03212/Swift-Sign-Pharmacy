<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/BaseModel.php';

final class HomepageProductSlider extends BaseModel
{
    protected string $table = 'homepage_product_sliders';
    protected array $fillable = ['title', 'view_all_link', 'max_products', 'sort_criteria', 'is_active', 'sort_order'];

    protected function defaultOrderBy(): string
    {
        return 'sort_order ASC, id ASC';
    }

    public function activeOrdered(): array
    {
        $stmt = $this->pdo->query(
            'SELECT * FROM ' . $this->table . ' WHERE is_active = 1 ORDER BY ' . $this->defaultOrderBy()
        );

        return $stmt->fetchAll() ?: [];
    }

    public function nextSortOrder(): int
    {
        $stmt = $this->pdo->query('SELECT MAX(sort_order) AS max_order FROM ' . $this->table);
        $row = $stmt->fetch();

        return (int) ($row['max_order'] ?? 0) + 1;
    }

    public function shiftAllDown(): void
    {
        $this->pdo->exec('UPDATE ' . $this->table . ' SET sort_order = sort_order + 1');
    }

    public function reorderByIds(array $orderedIds): void
    {
        $this->pdo->beginTransaction();

        try {
            $stmt = $this->pdo->prepare('UPDATE ' . $this->table . ' SET sort_order = :sort_order, updated_at = NOW() WHERE id = :id');
            foreach ($orderedIds as $index => $id) {
                $stmt->execute([':sort_order' => $index + 1, ':id' => (int) $id]);
            }
            $this->pdo->commit();
        } catch (\Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }
}
