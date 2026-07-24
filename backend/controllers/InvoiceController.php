<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\Order;
use Backend\Models\OrderItem;
use Backend\Utils\Response;

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/Order.php';
require_once __DIR__ . '/../models/OrderItem.php';
require_once __DIR__ . '/../utils/Response.php';

final class InvoiceController extends BaseController
{
    public function download(array $params): void
    {
        $userId = $this->requireCustomerId();
        $orderId = (int) ($params['id'] ?? 0);

        if ($orderId <= 0) {
            Response::error('Invalid order ID', 422);
            return;
        }

        $orderModel = new Order();
        $order = $orderModel->find($orderId);

        if (!$order || (int) ($order['user_id'] ?? 0) !== $userId) {
            Response::error('Order not found', 404);
            return;
        }

        $itemModel = new OrderItem();
        $items = $itemModel->findByOrderId($orderId);

        $shippingAddress = [];
        if (!empty($order['shipping_address_json'])) {
            $decoded = json_decode($order['shipping_address_json'], true);
            $shippingAddress = is_array($decoded) ? $decoded : [];
        }

        $html = $this->generateInvoiceHTML($order, $items, $shippingAddress);

        header('Content-Type: application/pdf');
        header('Content-Disposition: attachment; filename="Invoice-Order-' . $orderId . '.pdf"');
        header('Cache-Control: no-cache, no-store, must-revalidate');

        echo $this->convertHTMLToPDF($html);
    }

    private function generateInvoiceHTML(array $order, array $items, array $shippingAddress): string
    {
        $orderId = $order['id'];
        $totalAmount = number_format((float) $order['total_amount'], 2);
        $createdAt = date('F d, Y', strtotime($order['created_at']));
        $invoiceDate = date('F d, Y H:i A', strtotime($order['created_at']));

        $itemsHTML = '';
        $subtotal = 0;
        foreach ($items as $item) {
            $lineTotal = (float) $item['quantity'] * (float) $item['price'];
            $subtotal += $lineTotal;
            $itemsHTML .= sprintf(
                '<tr>
                    <td style="padding: 12px; border-bottom: 1px solid #e5e5e5;">%s</td>
                    <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; text-align: center;">%d</td>
                    <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; text-align: right;">Rs. %s</td>
                    <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; text-align: right;">Rs. %s</td>
                </tr>',
                htmlspecialchars($item['product_name']),
                $item['quantity'],
                number_format((float) $item['price'], 2),
                number_format($lineTotal, 2)
            );
        }

        $addressLine = implode(', ', array_filter([
            $shippingAddress['street_address'] ?? '',
            $shippingAddress['city'] ?? '',
            $shippingAddress['state'] ?? '',
            $shippingAddress['country'] ?? ''
        ]));

        $html = <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
        .invoice-container { max-width: 900px; margin: 0 auto; }
        .invoice-header { margin-bottom: 30px; }
        .company-name { font-size: 28px; font-weight: bold; color: #0FAFB8; margin-bottom: 5px; }
        .invoice-title { font-size: 24px; font-weight: bold; margin: 20px 0; }
        .invoice-meta { display: flex; justify-content: space-between; margin-bottom: 30px; }
        .meta-box { width: 48%; }
        .meta-label { font-weight: bold; color: #666; margin-bottom: 5px; font-size: 12px; }
        .meta-value { font-size: 14px; margin-bottom: 10px; }
        .section-title { font-weight: bold; font-size: 14px; margin-top: 20px; margin-bottom: 10px; color: #333; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background-color: #f5f5f5; padding: 12px; text-align: left; font-weight: bold; border-bottom: 2px solid #0FAFB8; }
        td { padding: 12px; }
        .total-row { font-weight: bold; font-size: 16px; text-align: right; }
        .total-row td:first-child { text-align: right; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="invoice-header">
            <div class="company-name">Arion Pharmacy</div>
            <div style="color: #666; font-size: 14px; margin-bottom: 10px;">Premium Medicines & Healthcare Products</div>
        </div>

        <div class="invoice-title">INVOICE</div>

        <div class="invoice-meta">
            <div class="meta-box">
                <div class="meta-label">INVOICE NUMBER</div>
                <div class="meta-value">Order #$orderId</div>
                <div class="meta-label" style="margin-top: 15px;">INVOICE DATE</div>
                <div class="meta-value">$invoiceDate</div>
            </div>
            <div class="meta-box">
                <div class="meta-label">PAYMENT METHOD</div>
                <div class="meta-value" style="text-transform: uppercase;">{$order['payment_method']}</div>
                <div class="meta-label" style="margin-top: 15px;">ORDER STATUS</div>
                <div class="meta-value" style="text-transform: capitalize;">{$order['status']}</div>
            </div>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
            <div style="width: 48%;">
                <div class="section-title">BILL TO</div>
                <div style="font-size: 14px;">
                    <div><strong>{$shippingAddress['first_name']} {$shippingAddress['last_name']}</strong></div>
                    <div>{$shippingAddress['phone']}</div>
                    <div style="margin-top: 10px;">$addressLine</div>
                </div>
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th>PRODUCT</th>
                    <th style="text-align: center;">QTY</th>
                    <th style="text-align: right;">UNIT PRICE</th>
                    <th style="text-align: right;">TOTAL</th>
                </tr>
            </thead>
            <tbody>
                $itemsHTML
                <tr class="total-row">
                    <td colspan="3" style="text-align: right; padding: 16px 12px;">TOTAL AMOUNT</td>
                    <td style="padding: 16px 12px; border-top: 2px solid #0FAFB8;">Rs. $totalAmount</td>
                </tr>
            </tbody>
        </table>

        <div class="footer">
            <p>Thank you for shopping with Arion Pharmacy!</p>
            <p>This is an electronically generated invoice and is valid without a signature or stamp.</p>
            <p style="margin-top: 15px; color: #999;">Generated on $createdAt</p>
        </div>
    </div>
</body>
</html>
HTML;

        return $html;
    }

    private function convertHTMLToPDF(string $html): string
    {
        // Return HTML that browsers can print/save as PDF
        // The browser's print-to-PDF feature will handle conversion
        return $html;
    }

    private function requireCustomerId(): int
    {
        $auth = $this->currentAuth();
        if (!$auth) {
            Response::error('Unauthorized', 401);
        }

        $userId = (int) ($auth['id'] ?? 0);
        if ($userId <= 0) {
            Response::error('Invalid user', 422);
        }

        return $userId;
    }
}
