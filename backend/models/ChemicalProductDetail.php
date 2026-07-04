<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/BaseModel.php';

final class ChemicalProductDetail extends BaseModel
{
    protected string $table = 'chemical_product_details';
    protected array $fillable = [
        'product_id', 'cas_number', 'chemical_name_of_material', 'boiling_point', 'melting_point',
        'molecular_formula', 'molecular_weight', 'percent_purity', 'color', 'synonym', 'grade',
        'unit_size', 'molecule_diagram_url',
    ];

    public function forProduct(int $productId): ?array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM ' . $this->table . ' WHERE product_id = :pid LIMIT 1');
        $stmt->execute([':pid' => $productId]);
        $row = $stmt->fetch();
        return $row !== false ? $row : null;
    }

    public function upsertForProduct(int $productId, array $data): void
    {
        $payload = $this->sanitizeFillable(array_merge($data, ['product_id' => $productId]));
        if ($this->forProduct($productId) !== null) {
            $set = [];
            foreach ($payload as $col => $val) {
                if ($col === 'product_id') {
                    continue;
                }
                $set[] = "$col = :$col";
            }
            unset($payload['product_id']);
            $payload['pid'] = $productId;
            $sql = 'UPDATE ' . $this->table . ' SET ' . implode(', ', $set) . ' WHERE product_id = :pid';
            $this->pdo->prepare($sql)->execute($payload);
        } else {
            $columns = array_keys($payload);
            $placeholders = array_map(static fn (string $c): string => ':' . $c, $columns);
            $sql = sprintf('INSERT INTO %s (%s) VALUES (%s)', $this->table, implode(', ', $columns), implode(', ', $placeholders));
            $this->pdo->prepare($sql)->execute($payload);
        }
    }
}
