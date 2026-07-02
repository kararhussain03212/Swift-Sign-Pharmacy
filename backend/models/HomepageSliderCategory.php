<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/BaseModel.php';

final class HomepageSliderCategory extends BaseModel
{
    protected string $table = 'homepage_slider_categories';
    protected array $fillable = ['slider_id', 'category_id', 'category_slug'];

    public function forSlider(int $sliderId): array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM ' . $this->table . ' WHERE slider_id = :slider_id ORDER BY id ASC');
        $stmt->execute([':slider_id' => $sliderId]);

        return $stmt->fetchAll() ?: [];
    }

    /**
     * Replaces every category link for a slider with the given
     * [category_id => category_slug] pairs, inside a transaction.
     */
    public function replaceForSlider(int $sliderId, array $categoryIdToSlug): void
    {
        $this->pdo->beginTransaction();

        try {
            $del = $this->pdo->prepare('DELETE FROM ' . $this->table . ' WHERE slider_id = :slider_id');
            $del->execute([':slider_id' => $sliderId]);

            if ($categoryIdToSlug !== []) {
                $insert = $this->pdo->prepare(
                    'INSERT INTO ' . $this->table . ' (slider_id, category_id, category_slug) VALUES (:slider_id, :category_id, :category_slug)'
                );
                foreach ($categoryIdToSlug as $categoryId => $slug) {
                    $insert->execute([
                        ':slider_id' => $sliderId,
                        ':category_id' => (int) $categoryId,
                        ':category_slug' => $slug,
                    ]);
                }
            }

            $this->pdo->commit();
        } catch (\Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }
}
