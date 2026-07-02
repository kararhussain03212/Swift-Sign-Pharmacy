<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/BaseModel.php';

final class ChemicalProductDocument extends BaseModel
{
    protected string $table = 'chemical_product_documents';
    protected array $fillable = [
        'product_id', 'doc_group', 'title', 'lot_number', 'certificate_type',
        'document_date', 'catalog_numbers', 'file_url', 'sort_order',
    ];

    private const GROUPS = ['certificate', 'safety_data_sheet', 'product_information', 'scientific_resource'];

    public function forProduct(int $productId): array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM ' . $this->table . ' WHERE product_id = :pid ORDER BY doc_group ASC, sort_order ASC, id ASC');
        $stmt->execute([':pid' => $productId]);
        return $stmt->fetchAll() ?: [];
    }

    /** Groups a flat row list by doc_group into the 4 fixed buckets. */
    public function groupedForProduct(int $productId): array
    {
        $grouped = ['certificate' => [], 'safety_data_sheet' => [], 'product_information' => [], 'scientific_resource' => []];
        foreach ($this->forProduct($productId) as $row) {
            $grouped[$row['doc_group']][] = $row;
        }
        return $grouped;
    }

    /** @param array<int,array<string,mixed>> $documents each with a doc_group key */
    public function replaceForProduct(int $productId, array $documents): void
    {
        $this->pdo->beginTransaction();
        try {
            $this->pdo->prepare('DELETE FROM ' . $this->table . ' WHERE product_id = :pid')->execute([':pid' => $productId]);

            if ($documents !== []) {
                $insert = $this->pdo->prepare(
                    'INSERT INTO ' . $this->table . ' (product_id, doc_group, title, lot_number, certificate_type, document_date, catalog_numbers, file_url, sort_order)
                     VALUES (:pid, :doc_group, :title, :lot_number, :certificate_type, :document_date, :catalog_numbers, :file_url, :sort)'
                );

                $sortByGroup = [];
                foreach ($documents as $doc) {
                    $group = (string) ($doc['doc_group'] ?? '');
                    $title = trim((string) ($doc['title'] ?? ''));
                    $fileUrl = trim((string) ($doc['file_url'] ?? ''));
                    if (!in_array($group, self::GROUPS, true) || $title === '' || $fileUrl === '') {
                        continue;
                    }

                    $sortByGroup[$group] = ($sortByGroup[$group] ?? 0) + 1;

                    $insert->execute([
                        ':pid' => $productId,
                        ':doc_group' => $group,
                        ':title' => $title,
                        ':lot_number' => $group === 'certificate' ? ($doc['lot_number'] ?? null) : null,
                        ':certificate_type' => $group === 'certificate' ? ($doc['certificate_type'] ?? null) : null,
                        ':document_date' => ($doc['document_date'] ?? '') ?: null,
                        ':catalog_numbers' => $group === 'certificate' ? ($doc['catalog_numbers'] ?? null) : null,
                        ':file_url' => $fileUrl,
                        ':sort' => $sortByGroup[$group],
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
