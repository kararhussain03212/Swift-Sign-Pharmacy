<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Config\Database;
use Backend\Models\CartItem;
use Backend\Models\Order;
use Backend\Models\OrderItem;
use Backend\Utils\Response;
use Backend\Utils\Validator;

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/CartItem.php';
require_once __DIR__ . '/../models/Order.php';
require_once __DIR__ . '/../models/OrderItem.php';
require_once __DIR__ . '/../utils/Response.php';
require_once __DIR__ . '/../utils/Validator.php';

final class OrderController extends BaseController
{
    public function store(array $params = []): void
    {
        $userId = $this->requireCustomerId();
        $payload = Validator::sanitizeInput($this->body());

        $shippingAddress = $payload['shipping_address'] ?? [];
        $paymentMethod = trim((string) ($payload['payment_method'] ?? 'cod'));

        if (!is_array($shippingAddress) || empty($shippingAddress)) {
            Response::error('Shipping address is required.', 422);
        }

        $cartModel = new CartItem();
        $cartItems = $cartModel->findByUserId($userId);

        if ($cartItems === []) {
            Response::error('Your cart is empty.', 422);
        }

        $pdo = Database::connection();

        try {
            $pdo->beginTransaction();

            $total = 0.0;
            foreach ($cartItems as $item) {
                $total += (float) $item['base_price'] * (int) $item['quantity'];
            }

            $orderModel = new Order();
            $orderId = $orderModel->create([
                'user_id' => $userId,
                'total_amount' => $total,
                'status' => 'pending',
                'shipping_address_json' => json_encode($shippingAddress, JSON_UNESCAPED_SLASHES),
                'payment_method' => $paymentMethod,
            ]);

            $orderItemModel = new OrderItem();
            foreach ($cartItems as $item) {
                $orderItemModel->create([
                    'order_id' => $orderId,
                    'product_id' => (int) $item['product_id'],
                    'product_name' => (string) $item['product_name'],
                    'quantity' => (int) $item['quantity'],
                    'price' => (float) $item['base_price'],
                    'product_image' => isset($item['image_url']) ? (string) $item['image_url'] : null,
                ]);
            }

            $cartModel->clearForUser($userId);

            $pdo->commit();
        } catch (\Throwable $e) {
            $pdo->rollBack();
            Response::error('Failed to place order: ' . $e->getMessage(), 500);
            return;
        }

        Response::success($this->buildOrderPayload($orderId), 'Order placed successfully', 201);
    }

    public function history(array $params = []): void
    {
        $userId = $this->requireCustomerId();

        $orderModel = new Order();
        $orders = $orderModel->findByUserId($userId);

        $itemModel = new OrderItem();
        $payload = array_map(function (array $order) use ($itemModel): array {
            $serialized = $this->serializeOrder($order);
            $items = $itemModel->findByOrderId((int) $order['id']);
            $serialized['items'] = array_map(static fn (array $item): array => [
                'id' => (int) ($item['id'] ?? 0),
                'product_id' => $item['product_id'] !== null ? (int) $item['product_id'] : null,
                'product_name' => (string) ($item['product_name'] ?? ''),
                'quantity' => (int) ($item['quantity'] ?? 0),
                'price' => (float) ($item['price'] ?? 0),
                'product_image' => $item['product_image'] ?? null,
            ], $items);
            return $serialized;
        }, $orders);

        Response::success($payload, 'Order history fetched successfully');
    }

    public function details(array $params): void
    {
        $userId = $this->requireCustomerId();
        $orderId = (int) ($params['id'] ?? 0);

        $orderModel = new Order();
        $order = $orderModel->find($orderId);

        if (!$order || (int) ($order['user_id'] ?? 0) !== $userId) {
            Response::error('Order not found.', 404);
        }

        Response::success($this->buildOrderPayload($orderId), 'Order details fetched successfully');
    }

    private function buildOrderPayload(int $orderId): array
    {
        $orderModel = new Order();
        $order = $orderModel->find($orderId);

        $itemModel = new OrderItem();
        $items = $itemModel->findByOrderId($orderId);

        $payload = $this->serializeOrder($order ?: []);
        $payload['items'] = array_map(static fn (array $item): array => [
            'id' => (int) ($item['id'] ?? 0),
            'product_id' => $item['product_id'] !== null ? (int) $item['product_id'] : null,
            'product_name' => (string) ($item['product_name'] ?? ''),
            'quantity' => (int) ($item['quantity'] ?? 0),
            'price' => (float) ($item['price'] ?? 0),
            'product_image' => $item['product_image'] ?? null,
        ], $items);

        return $payload;
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

    private function serializeOrder(array $row): array
    {
        $rawShippingAddress = $row['shipping_address_json'] ?? null;
        if (is_array($rawShippingAddress)) {
            $shippingAddress = $rawShippingAddress;
        } elseif (is_string($rawShippingAddress) && $rawShippingAddress !== '') {
            $decoded = json_decode($rawShippingAddress, true);
            $shippingAddress = is_array($decoded) ? $decoded : [];
        } else {
            $shippingAddress = [];
        }

        return [
            'id' => (int) ($row['id'] ?? 0),
            'total_amount' => (float) ($row['total_amount'] ?? 0),
            'status' => (string) ($row['status'] ?? 'pending'),
            'payment_method' => (string) ($row['payment_method'] ?? ''),
            'shipping_address' => $shippingAddress,
            'created_at' => $row['created_at'] ?? null,
        ];
    }
}
