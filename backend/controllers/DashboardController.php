<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Config\Database;
use Backend\Models\Product;
use Backend\Models\PrescriptionOrder;
use Backend\Models\Category;
use Backend\Models\Location;
use Backend\Utils\Response;

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/Product.php';
require_once __DIR__ . '/../models/PrescriptionOrder.php';
require_once __DIR__ . '/../models/Category.php';
require_once __DIR__ . '/../models/Location.php';
require_once __DIR__ . '/../utils/Response.php';

final class DashboardController extends BaseController
{
    public function stats(array $params = []): void
    {
        $counts = [
            'products'       => 0,
            'prescriptions'  => 0,
            'categories'     => 0,
            'locations'      => 0,
        ];

        try {
            $counts['products'] = (new Product())->count();
        } catch (\Throwable $e) {
            $counts['products'] = 0;
        }

        try {
            $counts['prescriptions'] = (new PrescriptionOrder())->count();
        } catch (\Throwable $e) {
            $counts['prescriptions'] = 0;
        }

        try {
            $counts['categories'] = (new Category())->count();
        } catch (\Throwable $e) {
            $counts['categories'] = 0;
        }

        try {
            $counts['locations'] = (new Location())->count();
        } catch (\Throwable $e) {
            $counts['locations'] = 0;
        }

        $pdo = Database::connection();
        try {
            $stmt   = $pdo->query('SELECT id, action, resource, resource_id, created_at FROM activity_logs ORDER BY created_at DESC LIMIT 20');
            $recent = $stmt ? ($stmt->fetchAll() ?: []) : [];
        } catch (\Throwable $e) {
            $recent = [];
        }

        Response::success([
            'counts'            => $counts,
            'recent_activities' => $recent,
        ], 'Dashboard data fetched');
    }
}
