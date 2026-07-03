<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/ArionBaseModel.php';

final class Certification extends ArionBaseModel
{
    protected string $table = 'certifications';
    protected array $fillable = [
        'category_id',
        'title',
        'type_tag',
        'certificate_image_url',
        'license_number',
        'is_primary_license',
        'is_active',
        'sort_order',
    ];

    protected function defaultOrderBy(): string
    {
        return 'sort_order ASC, id ASC';
    }

    public function activeByCategory(int $categoryId): array
    {
        $stmt = $this->pdo->prepare(
            'SELECT * FROM ' . $this->table . ' WHERE category_id = :category_id AND is_active = 1 ORDER BY ' . $this->defaultOrderBy()
        );
        $stmt->execute([':category_id' => $categoryId]);

        return $stmt->fetchAll() ?: [];
    }

    public function primaryLicense(): ?array
    {
        $stmt = $this->pdo->prepare(
            'SELECT * FROM ' . $this->table . ' WHERE is_primary_license = 1 AND is_active = 1 LIMIT 1'
        );
        $stmt->execute();
        $row = $stmt->fetch();

        return $row !== false ? $row : null;
    }

    /**
     * Admin list view: paginated, with optional search (title), category_id,
     * and type_tag filters — needed because the Professional Certifications
     * group alone holds 30+ rows.
     */
    public function adminPaginate(array $query): array
    {
        $page = max(1, (int) ($query['page'] ?? 1));
        $perPage = max(1, min(100, (int) ($query['per_page'] ?? 12)));
        $offset = ($page - 1) * $perPage;

        $where = [];
        $params = [];

        if (isset($query['search']) && trim((string) $query['search']) !== '') {
            $where[] = 'title LIKE :search';
            $params[':search'] = '%' . trim((string) $query['search']) . '%';
        }

        if (isset($query['category_id']) && (int) $query['category_id'] > 0) {
            $where[] = 'category_id = :category_id';
            $params[':category_id'] = (int) $query['category_id'];
        }

        if (isset($query['type_tag']) && trim((string) $query['type_tag']) !== '') {
            $where[] = 'type_tag = :type_tag';
            $params[':type_tag'] = trim((string) $query['type_tag']);
        }

        $countSql = 'SELECT COUNT(*) AS aggregate FROM ' . $this->table;
        if ($where !== []) {
            $countSql .= ' WHERE ' . implode(' AND ', $where);
        }
        $countStmt = $this->pdo->prepare($countSql);
        $countStmt->execute($params);
        $total = (int) ($countStmt->fetch()['aggregate'] ?? 0);

        $dataSql = 'SELECT * FROM ' . $this->table;
        if ($where !== []) {
            $dataSql .= ' WHERE ' . implode(' AND ', $where);
        }
        $dataSql .= ' ORDER BY ' . $this->defaultOrderBy() . ' LIMIT :limit OFFSET :offset';

        $dataStmt = $this->pdo->prepare($dataSql);
        foreach ($params as $key => $value) {
            $dataStmt->bindValue($key, $value);
        }
        $dataStmt->bindValue(':limit', $perPage, \PDO::PARAM_INT);
        $dataStmt->bindValue(':offset', $offset, \PDO::PARAM_INT);
        $dataStmt->execute();
        $data = $dataStmt->fetchAll() ?: [];

        return [
            'data' => $data,
            'meta' => [
                'page' => $page,
                'per_page' => $perPage,
                'total' => $total,
                'total_pages' => (int) ceil($total / max(1, $perPage)),
            ],
        ];
    }
}
