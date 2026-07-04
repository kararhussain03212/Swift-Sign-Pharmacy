<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/ArionBaseModel.php';

final class PrescriptionOrder extends ArionBaseModel
{
    protected string $table = 'prescription_orders';
    protected array $fillable = [
        'customer_name', 'phone_number', 'file_path', 'original_file_name',
        'file_type', 'file_size_bytes', 'status', 'admin_notes',
    ];

    private const STATUSES = ['pending', 'contacted', 'processing', 'delivered', 'rejected'];

    public static function statuses(): array
    {
        return self::STATUSES;
    }

    public function paginateByStatus(int $page, int $perPage, string $status = ''): array
    {
        $page = max(1, $page);
        $perPage = max(1, min(100, $perPage));
        $offset = ($page - 1) * $perPage;

        $where = '';
        $params = [];
        if ($status !== '' && in_array($status, self::STATUSES, true)) {
            $where = 'WHERE status = :status';
            $params[':status'] = $status;
        }

        $countStmt = $this->pdo->prepare("SELECT COUNT(*) AS aggregate FROM {$this->table} {$where}");
        $countStmt->execute($params);
        $total = (int) (($countStmt->fetch())['aggregate'] ?? 0);

        $dataStmt = $this->pdo->prepare(
            "SELECT id, customer_name, phone_number, original_file_name, file_type, file_size_bytes, status, admin_notes, created_at, updated_at
             FROM {$this->table} {$where} ORDER BY created_at DESC LIMIT :limit OFFSET :offset"
        );
        foreach ($params as $key => $value) {
            $dataStmt->bindValue($key, $value);
        }
        $dataStmt->bindValue(':limit', $perPage, \PDO::PARAM_INT);
        $dataStmt->bindValue(':offset', $offset, \PDO::PARAM_INT);
        $dataStmt->execute();

        return [
            'data' => $dataStmt->fetchAll() ?: [],
            'meta' => [
                'page' => $page,
                'per_page' => $perPage,
                'total' => $total,
                'total_pages' => (int) ceil($total / $perPage),
            ],
        ];
    }
}
