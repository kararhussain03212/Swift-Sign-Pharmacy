<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\CartItem;
use Backend\Utils\Response;
use Backend\Utils\Validator;

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/CartItem.php';
require_once __DIR__ . '/../utils/Response.php';
require_once __DIR__ . '/../utils/Validator.php';

final class CartController extends BaseController
{
    public function index(array $params = []): void
    {
        $userId = $this->requireCustomerId();

        $model = new CartItem();
        Response::success(array_map([$this, 'serializeCartItem'], $model->findByUserId($userId)), 'Cart fetched successfully');
    }

    public function store(array $params = []): void
    {
        $userId = $this->requireCustomerId();
        $payload = Validator::sanitizeInput($this->body());

        $productId = (int) ($payload['product_id'] ?? 0);
        $quantity = max(1, (int) ($payload['quantity'] ?? 1));

        if ($productId <= 0) {
            Response::error('A valid product is required.', 422);
        }

        $model = new CartItem();
        $existing = $model->findByUserAndProduct($userId, $productId);

        if ($existing) {
            $model->update((int) $existing['id'], ['quantity' => (int) $existing['quantity'] + $quantity]);
        } else {
            $model->create(['user_id' => $userId, 'product_id' => $productId, 'quantity' => $quantity]);
        }

        Response::success(array_map([$this, 'serializeCartItem'], $model->findByUserId($userId)), 'Item added to cart', 201);
    }

    public function update(array $params): void
    {
        $userId = $this->requireCustomerId();
        $itemId = (int) ($params['id'] ?? 0);

        $payload = Validator::sanitizeInput($this->body());
        $quantity = (int) ($payload['quantity'] ?? 0);

        $model = new CartItem();
        $existing = $model->find($itemId);

        if (!$existing || (int) ($existing['user_id'] ?? 0) !== $userId) {
            Response::error('Cart item not found.', 404);
        }

        if ($quantity <= 0) {
            $model->delete($itemId);
        } else {
            $model->update($itemId, ['quantity' => $quantity]);
        }

        Response::success(array_map([$this, 'serializeCartItem'], $model->findByUserId($userId)), 'Cart updated successfully');
    }

    public function updateByProduct(array $params): void
    {
        $userId = $this->requireCustomerId();
        $productId = (int) ($params['productId'] ?? 0);

        $payload = Validator::sanitizeInput($this->body());
        $quantity = (int) ($payload['quantity'] ?? 0);

        $model = new CartItem();
        $existing = $model->findByUserAndProduct($userId, $productId);

        if ($existing) {
            if ($quantity <= 0) {
                $model->delete((int) $existing['id']);
            } else {
                $model->update((int) $existing['id'], ['quantity' => $quantity]);
            }
        } elseif ($quantity > 0) {
            $model->create(['user_id' => $userId, 'product_id' => $productId, 'quantity' => $quantity]);
        }

        Response::success(array_map([$this, 'serializeCartItem'], $model->findByUserId($userId)), 'Cart updated successfully');
    }

    public function destroyByProduct(array $params): void
    {
        $userId = $this->requireCustomerId();
        $productId = (int) ($params['productId'] ?? 0);

        $model = new CartItem();
        $existing = $model->findByUserAndProduct($userId, $productId);

        if ($existing) {
            $model->delete((int) $existing['id']);
        }

        Response::success(array_map([$this, 'serializeCartItem'], $model->findByUserId($userId)), 'Item removed from cart');
    }

    public function destroy(array $params): void
    {
        $userId = $this->requireCustomerId();
        $itemId = (int) ($params['id'] ?? 0);

        $model = new CartItem();
        $existing = $model->find($itemId);

        if (!$existing || (int) ($existing['user_id'] ?? 0) !== $userId) {
            Response::error('Cart item not found.', 404);
        }

        $model->delete($itemId);
        Response::success(array_map([$this, 'serializeCartItem'], $model->findByUserId($userId)), 'Item removed from cart');
    }

    public function clear(array $params = []): void
    {
        $userId = $this->requireCustomerId();

        $model = new CartItem();
        $model->clearForUser($userId);

        Response::success([], 'Cart cleared successfully');
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

    private function serializeCartItem(array $row): array
    {
        return [
            'id' => (int) ($row['id'] ?? 0),
            'product_id' => (int) ($row['product_id'] ?? 0),
            'quantity' => (int) ($row['quantity'] ?? 0),
            'product_name' => (string) ($row['product_name'] ?? ''),
            'product_slug' => (string) ($row['product_slug'] ?? ''),
            'price' => (float) ($row['base_price'] ?? 0),
            'stock_status' => (string) ($row['stock_status'] ?? ''),
            'brand' => (string) ($row['manufacturer_or_brand'] ?? ''),
            'image_url' => (string) ($row['image_url'] ?? ''),
        ];
    }
}
