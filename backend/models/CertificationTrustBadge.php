<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/ArionBaseModel.php';

final class CertificationTrustBadge extends ArionBaseModel
{
    protected string $table = 'certification_trust_badges';
    protected array $fillable = ['label', 'icon_key', 'sort_order', 'is_active'];

    protected function defaultOrderBy(): string
    {
        return 'sort_order ASC, id ASC';
    }

    public function activeOrdered(): array
    {
        $stmt = $this->pdo->prepare(
            'SELECT * FROM ' . $this->table . ' WHERE is_active = 1 ORDER BY ' . $this->defaultOrderBy()
        );
        $stmt->execute();

        return $stmt->fetchAll() ?: [];
    }
}
