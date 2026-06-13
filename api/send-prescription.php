<?php
// ─── Allow requests from the React dev server ───────────────
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// ─── Load PHPMailer ─────────────────────────────────────────
require_once __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ─── Read POST fields ────────────────────────────────────────
$customerName  = trim($_POST['name']  ?? '');
$customerPhone = trim($_POST['phone'] ?? '');

if (empty($customerName) || empty($customerPhone)) {
    echo json_encode(['success' => false, 'message' => 'Name and phone are required.']);
    exit();
}

// ─── Validate uploaded file ──────────────────────────────────
if (!isset($_FILES['prescription']) || $_FILES['prescription']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['success' => false, 'message' => 'Prescription image is required.']);
    exit();
}

$allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'];
$fileType = mime_content_type($_FILES['prescription']['tmp_name']);
if (!in_array($fileType, $allowed)) {
    echo json_encode(['success' => false, 'message' => 'Invalid file type. Only JPG, PNG, WEBP, or PDF allowed.']);
    exit();
}

if ($_FILES['prescription']['size'] > 10 * 1024 * 1024) {
    echo json_encode(['success' => false, 'message' => 'File too large. Maximum size is 10 MB.']);
    exit();
}

// ─── Send Email via PHPMailer ────────────────────────────────
$mail = new PHPMailer(true);

try {
    // ── SMTP Configuration ──
    // Using Gmail SMTP — replace with your own credentials
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'your-email@gmail.com';   // <── Your Gmail address
    $mail->Password   = 'your-app-password';       // <── Gmail App Password (NOT your real password)
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // ── Email settings ──
    $mail->setFrom('your-email@gmail.com', 'Asaan Order - Pharmacy');
    $mail->addAddress('your-email@gmail.com', 'Pharmacy Support'); // <── Where to receive orders

    // ── Subject & Body ──
    $mail->Subject = '📋 New Prescription Order — ' . $customerName;
    $mail->isHTML(true);
    $mail->Body = "
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
            <div style='background: linear-gradient(135deg, #0D3D2B, #1A9E6E); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;'>
                <h1 style='color: white; margin: 0; font-size: 24px;'>🏥 New Prescription Order</h1>
                <p style='color: rgba(255,255,255,0.8); margin: 8px 0 0;'>Asaan Order — D. Watson Pharmacy</p>
            </div>
            <div style='background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;'>
                <h2 style='color: #1A9E6E; margin-top: 0;'>Customer Details</h2>
                <table style='width: 100%; border-collapse: collapse;'>
                    <tr>
                        <td style='padding: 10px; background: #fff; border: 1px solid #e5e7eb; font-weight: bold; width: 35%;'>👤 Customer Name</td>
                        <td style='padding: 10px; background: #fff; border: 1px solid #e5e7eb;'>{$customerName}</td>
                    </tr>
                    <tr>
                        <td style='padding: 10px; background: #f0fdf4; border: 1px solid #e5e7eb; font-weight: bold;'>📞 Phone Number</td>
                        <td style='padding: 10px; background: #f0fdf4; border: 1px solid #e5e7eb;'>{$customerPhone}</td>
                    </tr>
                    <tr>
                        <td style='padding: 10px; background: #fff; border: 1px solid #e5e7eb; font-weight: bold;'>📅 Order Date</td>
                        <td style='padding: 10px; background: #fff; border: 1px solid #e5e7eb;'>" . date('d M Y, h:i A') . "</td>
                    </tr>
                </table>
                <div style='margin-top: 20px; padding: 15px; background: #ecfdf5; border-left: 4px solid #1A9E6E; border-radius: 4px;'>
                    <p style='margin: 0; color: #065f46; font-size: 14px;'>
                        📎 The prescription image is attached to this email. Please review it and call the customer to confirm the order.
                    </p>
                </div>
            </div>
        </div>
    ";

    // ── Attach the prescription image ──
    $mail->addAttachment(
        $_FILES['prescription']['tmp_name'],
        'prescription_' . $customerName . '_' . date('Ymd') . '.' . pathinfo($_FILES['prescription']['name'], PATHINFO_EXTENSION)
    );

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Prescription sent successfully!']);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Failed to send email: ' . $mail->ErrorInfo]);
}
