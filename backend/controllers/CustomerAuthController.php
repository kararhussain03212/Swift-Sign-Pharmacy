<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Middleware\CustomerAuthMiddleware;
use Backend\Models\User;
use Backend\Utils\Jwt;
use Backend\Utils\Response;
use Backend\Utils\Validator;

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../middleware/customerAuth.php';
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../utils/Jwt.php';
require_once __DIR__ . '/../utils/Response.php';
require_once __DIR__ . '/../utils/Validator.php';

final class CustomerAuthController extends BaseController
{
    private string $rateLimitPath;

    public function __construct()
    {
        $this->rateLimitPath = dirname(__DIR__) . '/storage/customer_login_rate_limit.json';
    }

    public function register(array $params = []): void
    {
        $payload = Validator::sanitizeInput($this->body());
        $name = trim((string) ($payload['name'] ?? ($payload['full_name'] ?? '')));
        $email = strtolower(trim((string) ($payload['email'] ?? '')));
        $phone = trim((string) ($payload['phone'] ?? ''));
        $password = (string) ($payload['password'] ?? '');
        $confirmPassword = (string) ($payload['confirm_password'] ?? ($payload['password_confirmation'] ?? ''));

        if ($name === '' || $email === '' || $password === '') {
            Response::error('Name, email, and password are required.', 422);
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            Response::error('A valid email is required.', 422);
        }
        if (strlen($password) < 6) {
            Response::error('Password must be at least 6 characters.', 422);
        }
        if ($confirmPassword !== '' && $password !== $confirmPassword) {
            Response::error('Passwords do not match.', 422);
        }
        if ($phone !== '' && !preg_match('/^[0-9\-\+\s\(\)]{7,}$/', $phone)) {
            Response::error('A valid phone number is required.', 422);
        }

        $model = new User();
        if ($model->findByEmail($email)) {
            Response::error('An account with this email already exists.', 422);
        }

        $userId = $model->create([
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'password' => password_hash($password, PASSWORD_BCRYPT),
        ]);

        $user = $model->find($userId);
        $this->issueSession($user);
    }

    public function login(array $params = []): void
    {
        $this->ensureRateLimit();

        $payload = Validator::sanitizeInput($this->body());
        $email = strtolower(trim((string) ($payload['email'] ?? '')));
        $password = (string) ($payload['password'] ?? '');

        if ($email === '' || $password === '') {
            Response::error('Invalid login credentials', 422);
        }

        $model = new User();
        $user = $model->findByEmail($email);

        if (!$user || !password_verify($password, (string) ($user['password'] ?? ''))) {
            Response::error('Invalid login credentials', 401);
        }

        $this->issueSession($user);
    }

    public function logout(array $params = []): void
    {
        Response::success(null, 'Logout successful');
    }

    public function me(array $params = []): void
    {
        $auth = CustomerAuthMiddleware::user();
        if (!$auth) {
            Response::error('Unauthorized', 401);
        }

        $model = new User();
        $user = $model->find((int) ($auth['id'] ?? 0));
        if (!$user) {
            Response::error('User not found', 404);
        }

        Response::success($this->serializeUser($user), 'User fetched');
    }

    public function updateProfile(array $params = []): void
    {
        $auth = CustomerAuthMiddleware::user();
        if (!$auth) {
            Response::error('Unauthorized', 401);
        }

        $payload = Validator::sanitizeInput($this->body());
        $name = trim((string) ($payload['name'] ?? ''));
        $phone = trim((string) ($payload['phone'] ?? ''));
        $email = strtolower(trim((string) ($payload['email'] ?? '')));

        if ($name === '' || $email === '') {
            Response::error('Name and email are required.', 422);
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            Response::error('Valid email is required.', 422);
        }
        if ($phone !== '' && !preg_match('/^[0-9\-\+\s\(\)]{7,}$/', $phone)) {
            Response::error('A valid phone number is required.', 422);
        }

        $model = new User();
        $currentId = (int) ($auth['id'] ?? 0);
        $existingByEmail = $model->findByEmail($email);
        if ($existingByEmail && (int) ($existingByEmail['id'] ?? 0) !== $currentId) {
            Response::error('Email is already in use.', 422);
        }

        $model->update($currentId, [
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
        ]);

        $saved = $model->find($currentId);
        Response::success($this->serializeUser($saved ?: []), 'Profile updated successfully');
    }

    public function changePassword(array $params = []): void
    {
        $auth = CustomerAuthMiddleware::user();
        if (!$auth) {
            Response::error('Unauthorized', 401);
        }

        $payload = Validator::sanitizeInput($this->body());
        $currentPassword = (string) ($payload['current_password'] ?? '');
        $newPassword = (string) ($payload['new_password'] ?? '');

        if ($currentPassword === '' || $newPassword === '') {
            Response::error('Current and new password are required.', 422);
        }
        if (strlen($newPassword) < 6) {
            Response::error('New password must be at least 6 characters.', 422);
        }

        $model = new User();
        $currentId = (int) ($auth['id'] ?? 0);
        $user = $model->find($currentId);
        if (!$user) {
            Response::error('User not found.', 404);
        }
        if (!password_verify($currentPassword, (string) ($user['password'] ?? ''))) {
            Response::error('Current password is incorrect.', 422);
        }

        $model->update($currentId, [
            'password' => password_hash($newPassword, PASSWORD_BCRYPT),
        ]);

        Response::success(null, 'Password changed successfully');
    }

    private function issueSession(array $user): void
    {
        $csrfToken = bin2hex(random_bytes(24));
        $token = Jwt::encode([
            'sub' => (int) $user['id'],
            'email' => (string) $user['email'],
            'name' => (string) $user['name'],
            'csrf' => $csrfToken,
        ]);

        Response::success([
            'token' => $token,
            'csrf_token' => $csrfToken,
            'user' => $this->serializeUser($user),
        ], 'Success');
    }

    private function serializeUser(array $row): array
    {
        return [
            'id' => (int) ($row['id'] ?? 0),
            'name' => (string) ($row['name'] ?? ''),
            'email' => (string) ($row['email'] ?? ''),
            'phone' => (string) ($row['phone'] ?? ''),
        ];
    }

    private function ensureRateLimit(): void
    {
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        $now = time();
        $window = 60;
        $maxAttempts = 5;

        if (!is_file($this->rateLimitPath)) {
            file_put_contents($this->rateLimitPath, json_encode([], JSON_UNESCAPED_SLASHES));
        }

        $raw = file_get_contents($this->rateLimitPath) ?: '[]';
        $state = json_decode($raw, true);
        if (!is_array($state)) {
            $state = [];
        }

        $entries = array_filter($state[$ip] ?? [], static fn ($timestamp): bool => ($now - (int) $timestamp) <= $window);

        if (count($entries) >= $maxAttempts) {
            Response::error('Too many login attempts. Try again in 1 minute.', 429);
        }

        $entries[] = $now;
        $state[$ip] = array_values($entries);

        file_put_contents($this->rateLimitPath, json_encode($state, JSON_UNESCAPED_SLASHES));
    }
}
