<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\WishlistItem;
use Backend\Utils\Response;
use Backend\Utils\Validator;

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/WishlistItem.php';
require_once __DIR__ . '/../utils/Response.php';
require_once __DIR__ . '/../utils/Validator.php';

final class WishlistController extends BaseController
{
    public function index(array $params = []): void
    {
        $userId = $this->requireCustomerId();

        $model = new WishlistItem();
        Response::success(array_map([$this, 'serializeWishlistItem'], $model->findByUserId($userId)), 'Wishlist fetched successfully');
    }

    public function store(array $params = []): void
    {
        $userId = $this->requireCustomerId();
        $payload = Validator::sanitizeInput($this->body());

        $productId = (int) ($payload['product_id'] ?? 0);
        if ($productId <= 0) {
            Response::error('A valid product is required.', 422);
        }

        $model = new WishlistItem();
        if (!$model->findByUserAndProduct($userId, $productId)) {
            $model->create(['user_id' => $userId, 'product_id' => $productId]);
        }

        Response::success(array_map([$this, 'serializeWishlistItem'], $model->findByUserId($userId)), 'Item added to wishlist', 201);
    }

    public function destroy(array $params): void
    {
        $userId = $this->requireCustomerId();
        $itemId = (int) ($params['id'] ?? 0);

        $model = new WishlistItem();
        $existing = $model->find($itemId);

        if (!$existing || (int) ($existing['user_id'] ?? 0) !== $userId) {
            Response::error('Wishlist item not found.', 404);
        }

        $model->delete($itemId);
        Response::success(array_map([$this, 'serializeWishlistItem'], $model->findByUserId($userId)), 'Item removed from wishlist');
    }

    public function destroyByProduct(array $params): void
    {
        $userId = $this->requireCustomerId();
        $productId = (int) ($params['productId'] ?? 0);

        $model = new WishlistItem();
        $existing = $model->findByUserAndProduct($userId, $productId);

        if ($existing) {
            $model->delete((int) $existing['id']);
        }

        Response::success(array_map([$this, 'serializeWishlistItem'], $model->findByUserId($userId)), 'Item removed from wishlist');
    }

    private function requireCustomerId(): int
    {
        $auth = $this->currentAuth();
        if (!$auth) {
            Response::error('Unauthorized', 401);
        }

        $userId = (int) ($auth['id'] ?? 0);
        if ($userId <= 0) {
            Response::error('Invalid user.', 422);
        }

        return $userId;
    }

    private function serializeWishlistItem(array $row): array
    {
        return [
            'id' => (int) ($row['id'] ?? 0),
            'product_id' => (int) ($row['product_id'] ?? 0),
            'product_name' => (string) ($row['product_name'] ?? ''),
            'product_slug' => (string) ($row['product_slug'] ?? ''),
            'price' => (float) ($row['base_price'] ?? 0),
            'stock_status' => (string) ($row['stock_status'] ?? ''),
            'brand' => (string) ($row['manufacturer_or_brand'] ?? ''),
            'image_url' => (string) ($row['image_url'] ?? ''),
        ];
    }
}
