<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\PrescriptionOrder;
use Backend\Models\PrescriptionPageContent;
use Backend\Utils\ActivityLogger;
use Backend\Utils\PrescriptionUpload;
use Backend\Utils\Response;
use Backend\Utils\Validator;

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/PrescriptionOrder.php';
require_once __DIR__ . '/../models/PrescriptionPageContent.php';
require_once __DIR__ . '/../utils/ActivityLogger.php';
require_once __DIR__ . '/../utils/PrescriptionUpload.php';
require_once __DIR__ . '/../utils/Response.php';
require_once __DIR__ . '/../utils/Validator.php';

final class PrescriptionOrderController extends BaseController
{
    /* ── Public: submit a prescription order ─────────────────── */
    public function store(array $params = []): void
    {
        $payload = Validator::sanitizeInput($this->body());

        $errors = [];
        $name = trim((string) ($payload['customer_name'] ?? ''));
        if ($name === '') {
            $errors['customer_name'] = 'Your name is required.';
        } elseif (mb_strlen($name) > 150) {
            $errors['customer_name'] = 'Name must not exceed 150 characters.';
        }

        $phone = trim((string) ($payload['phone_number'] ?? ''));
        if ($phone === '') {
            $errors['phone_number'] = 'Phone number is required.';
        } elseif (!preg_match('/^[0-9+\s\-]{7,30}$/', $phone)) {
            $errors['phone_number'] = 'Enter a valid phone number.';
        }

        if ($errors !== []) {
            Response::error('Validation failed', 422, ['fields' => $errors]);
        }

        $settings = (new PrescriptionPageContent())->find(1);
        $allowedTypes = (string) ($settings['allowed_file_types'] ?? 'jpg,jpeg,png,pdf');
        $maxSizeMb = (int) ($settings['max_file_size_mb'] ?? 10);

        $file = $_FILES['file'] ?? null;
        if (!is_array($file)) {
            Response::error('Validation failed', 422, ['fields' => ['file' => 'Please attach your prescription file.']]);
        }

        $stored = PrescriptionUpload::store($file, $allowedTypes, $maxSizeMb);

        $model = new PrescriptionOrder();
        $model->create([
            'customer_name' => $name,
            'phone_number' => $phone,
            'file_path' => $stored['relative_path'],
            'original_file_name' => $stored['original_name'],
            'file_type' => $stored['extension'],
            'file_size_bytes' => $stored['size'],
            'status' => 'pending',
        ]);

        Response::success(null, "We've received your prescription — expect a confirmation call shortly.", 201);
    }

    /* ── Admin: paginated submissions list ────────────────────── */
    public function index(array $params = []): void
    {
        $query = $this->query();
        $page = max(1, (int) ($query['page'] ?? 1));
        $perPage = max(1, min(100, (int) ($query['per_page'] ?? 20)));
        $status = (string) ($query['status'] ?? '');

        $model = new PrescriptionOrder();
        Response::success($model->paginateByStatus($page, $perPage, $status), 'Fetched successfully');
    }

    /* ── Admin: submission detail (no raw file path exposed) ──── */
    public function show(array $params): void
    {
        $id = (int) ($params['id'] ?? 0);
        $row = $id > 0 ? (new PrescriptionOrder())->find($id) : null;
        if (!$row) {
            Response::error('Submission not found', 404);
        }

        unset($row['file_path']);
        Response::success($row, 'Fetched successfully');
    }

    /* ── Admin: stream the prescription file ──────────────────── */
    public function file(array $params): void
    {
        $id = (int) ($params['id'] ?? 0);
        $row = $id > 0 ? (new PrescriptionOrder())->find($id) : null;
        if (!$row) {
            Response::error('Submission not found', 404);
        }

        $absolutePath = PrescriptionUpload::absolutePath((string) $row['file_path']);
        if ($absolutePath === null || !is_file($absolutePath)) {
            Response::error('File not found', 404);
        }

        $mimeMap = ['jpg' => 'image/jpeg', 'jpeg' => 'image/jpeg', 'png' => 'image/png', 'pdf' => 'application/pdf'];
        $mime = $mimeMap[$row['file_type']] ?? (mime_content_type($absolutePath) ?: 'application/octet-stream');

        header('Content-Type: ' . $mime);
        header('Content-Length: ' . (string) filesize($absolutePath));
        header('Content-Disposition: inline; filename="' . rawurlencode((string) $row['original_file_name']) . '"');
        header('X-Content-Type-Options: nosniff');
        header('Cache-Control: private, no-store');
        readfile($absolutePath);
        exit;
    }

    /* ── Admin: update status / notes ─────────────────────────── */
    public function update(array $params): void
    {
        $this->requirePermission('edit_content');
        $id = (int) ($params['id'] ?? 0);
        if ($id <= 0) {
            Response::error('Invalid resource ID', 422);
        }

        $model = new PrescriptionOrder();
        if (!$model->find($id)) {
            Response::error('Submission not found', 404);
        }

        $payload = Validator::sanitizeInput($this->body());
        $update = [];

        if (array_key_exists('status', $payload)) {
            $status = (string) $payload['status'];
            if (!in_array($status, PrescriptionOrder::statuses(), true)) {
                Response::error('Validation failed', 422, ['fields' => ['status' => 'Invalid status value.']]);
            }
            $update['status'] = $status;
        }

        if (array_key_exists('admin_notes', $payload)) {
            $update['admin_notes'] = (string) $payload['admin_notes'];
        }

        if ($update === []) {
            Response::error('No changes provided', 422);
        }

        $model->update($id, $update);
        ActivityLogger::log($this->currentAdminId(), 'update', 'prescription_orders', $id);

        $row = $model->find($id);
        unset($row['file_path']);

        Response::success($row, 'Updated successfully');
    }
}
