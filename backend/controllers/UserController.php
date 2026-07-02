<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Config\Database;
use Backend\Middleware\AuthMiddleware;
use Backend\Models\Admin;
use Backend\Utils\ActivityLogger;
use Backend\Utils\Response;
use Backend\Utils\Validator;

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/Admin.php';
require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/../utils/ActivityLogger.php';
require_once __DIR__ . '/../utils/Response.php';
require_once __DIR__ . '/../utils/Validator.php';

final class UserController extends BaseController
{
    /**
     * Only super admins may reach any endpoint in this controller.
     *
     * Re-checks the database rather than trusting the JWT's is_super_admin
     * claim: that claim is only as fresh as the holder's last login, so a
     * stale token (e.g. from before this flag existed, or from before an
     * admin was promoted/demoted) would otherwise keep the old answer until
     * the token naturally expires.
     */
    private function ensureSuperAdmin(): array
    {
        $current = AuthMiddleware::user();
        if (!$current || (int) ($current['id'] ?? 0) <= 0) {
            Response::error('Only super admins can access user management.', 403);
        }

        $model = new Admin();
        $row = $model->find((int) $current['id']);
        if (!$row || !$this->isSuperAdmin($row)) {
            Response::error('Only super admins can access user management.', 403);
        }

        $current['is_super_admin'] = true;
        return $current;
    }

    private function isSuperAdmin(array $row): bool
    {
        return (bool) ((int) ($row['is_super_admin'] ?? 0));
    }

    public function index(array $params = []): void
    {
        $this->ensureSuperAdmin();

        $query = $this->query();
        $search = trim((string) ($query['search'] ?? ''));
        $role = strtolower(trim((string) ($query['role'] ?? '')));
        $status = strtolower(trim((string) ($query['status'] ?? '')));
        $page = max(1, (int) ($query['page'] ?? 1));
        $limit = max(1, min(100, (int) ($query['limit'] ?? 10)));
        $offset = ($page - 1) * $limit;

        $model = new Admin();
        $rows = $model->all([
            'search' => $search,
            'status' => in_array($status, ['active', 'inactive'], true) ? $status : '',
        ]);

        $filtered = array_values(array_filter($rows, static function (array $row) use ($role): bool {
            if ($role === '') {
                return true;
            }
            return strtolower((string) ($row['role'] ?? 'editor')) === $role;
        }));

        $total = count($filtered);
        $data = array_slice($filtered, $offset, $limit);
        $totalPages = max(1, (int) ceil($total / $limit));

        Response::success([
            'data' => array_map([$this, 'serializeUser'], $data),
            'pagination' => [
                'page' => $page,
                'totalPages' => $totalPages,
                'total' => $total,
                'hasPrevPage' => $page > 1,
                'hasNextPage' => $page < $totalPages,
                'limit' => $limit,
            ],
        ], 'Users fetched successfully');
    }

    public function show(array $params): void
    {
        $this->ensureSuperAdmin();
        $id = (int) ($params['id'] ?? 0);
        if ($id <= 0) {
            Response::error('Invalid user ID.', 422);
        }

        $model = new Admin();
        $row = $model->find($id);
        if (!$row) {
            Response::error('User not found.', 404);
        }

        $user = $this->serializeUser($row);
        $user['activity'] = $this->getUserActivity($id);
        Response::success($user, 'User fetched successfully');
    }

    public function store(array $params = []): void
    {
        $currentUser = $this->ensureSuperAdmin();
        $payload = Validator::sanitizeInput($this->body());

        $name = trim((string) ($payload['name'] ?? ''));
        $email = strtolower(trim((string) ($payload['email'] ?? '')));
        $password = (string) ($payload['password'] ?? '');
        $role = strtolower(trim((string) ($payload['role'] ?? 'editor')));
        $status = strtolower(trim((string) ($payload['status'] ?? 'active')));
        $designation = trim((string) ($payload['designation'] ?? ''));
        $phone = trim((string) ($payload['phone'] ?? ''));
        $location = trim((string) ($payload['location'] ?? ''));
        $permissions = $payload['permissions'] ?? [];
        $isSuperAdmin = !empty($payload['is_super_admin']);

        if ($name === '' || $email === '' || $password === '') {
            Response::error('Name, email and password are required.', 422);
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            Response::error('A valid email is required.', 422);
        }
        if (strlen($password) < 6) {
            Response::error('Password must be at least 6 characters.', 422);
        }
        if (!in_array($role, ['admin', 'editor'], true)) {
            Response::error('Role must be admin or editor.', 422);
        }
        if (!in_array($status, ['active', 'inactive'], true)) {
            Response::error('Status must be active or inactive.', 422);
        }
        if (!is_array($permissions)) {
            Response::error('Permissions must be an array.', 422);
        }

        $model = new Admin();
        if ($model->findByEmail($email)) {
            Response::error('Email already exists.', 422);
        }

        $id = $model->create([
            'name' => $name,
            'email' => $email,
            'password' => password_hash($password, PASSWORD_BCRYPT),
            'role' => $role,
            'is_super_admin' => $isSuperAdmin ? 1 : 0,
            'status' => $status,
            'designation' => $designation,
            'phone' => $phone,
            'location' => $location,
            'permissions_json' => json_encode(array_values($permissions), JSON_UNESCAPED_SLASHES),
        ]);

        ActivityLogger::log((int) ($currentUser['id'] ?? 0), 'create', 'users', $id);
        $created = $model->find($id);
        Response::success($this->serializeUser($created ?: []), 'User created successfully', 201);
    }

    public function update(array $params): void
    {
        $currentUser = $this->ensureSuperAdmin();
        $id = (int) ($params['id'] ?? 0);
        if ($id <= 0) {
            Response::error('Invalid user ID.', 422);
        }

        $model = new Admin();
        $existing = $model->find($id);
        if (!$existing) {
            Response::error('User not found.', 404);
        }

        $payload = Validator::sanitizeInput($this->body());
        $update = [];
        $wasSuperAdmin = $this->isSuperAdmin($existing);

        // If this edit would strip the last remaining super admin of that
        // status (or otherwise lock them out), reject it up front — prevents
        // accidental total lockout from User Management, same spirit as the
        // self-delete guard in destroy().
        if ($wasSuperAdmin) {
            $losingSuperAdmin = array_key_exists('is_super_admin', $payload) && !$payload['is_super_admin'];
            $losingActiveStatus = array_key_exists('status', $payload) && strtolower(trim((string) $payload['status'])) !== 'active';
            if (($losingSuperAdmin || $losingActiveStatus) && $model->countSuperAdmins() <= 1) {
                Response::error('Cannot modify the last remaining super admin — promote another user to super admin first.', 422);
            }
        }

        if (array_key_exists('name', $payload)) {
            $name = trim((string) $payload['name']);
            if ($name === '') Response::error('Name cannot be empty.', 422);
            $update['name'] = $name;
        }

        if (array_key_exists('email', $payload)) {
            $email = strtolower(trim((string) $payload['email']));
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                Response::error('A valid email is required.', 422);
            }
            $other = $model->findByEmail($email);
            if ($other && (int) ($other['id'] ?? 0) !== $id) {
                Response::error('Email already exists.', 422);
            }
            $update['email'] = $email;
        }

        if (array_key_exists('password', $payload)) {
            $password = trim((string) $payload['password']);
            if ($password !== '') {
                if (strlen($password) < 6) {
                    Response::error('Password must be at least 6 characters.', 422);
                }
                $update['password'] = password_hash($password, PASSWORD_BCRYPT);
            }
        }

        if (array_key_exists('role', $payload)) {
            $role = strtolower(trim((string) $payload['role']));
            if (!in_array($role, ['admin', 'editor'], true)) {
                Response::error('Role must be admin or editor.', 422);
            }
            $update['role'] = $role;
        }

        if (array_key_exists('is_super_admin', $payload)) {
            $update['is_super_admin'] = !empty($payload['is_super_admin']) ? 1 : 0;
        }

        if (array_key_exists('status', $payload)) {
            $status = strtolower(trim((string) $payload['status']));
            if (!in_array($status, ['active', 'inactive'], true)) {
                Response::error('Status must be active or inactive.', 422);
            }
            $update['status'] = $status;
        }

        if (array_key_exists('designation', $payload)) {
            $update['designation'] = trim((string) $payload['designation']);
        }
        if (array_key_exists('phone', $payload)) {
            $update['phone'] = trim((string) $payload['phone']);
        }
        if (array_key_exists('location', $payload)) {
            $update['location'] = trim((string) $payload['location']);
        }
        if (array_key_exists('profile_photo', $payload)) {
            $update['profile_photo'] = trim((string) $payload['profile_photo']);
        }
        if (array_key_exists('permissions', $payload)) {
            if (!is_array($payload['permissions'])) {
                Response::error('Permissions must be an array.', 422);
            }
            $update['permissions_json'] = json_encode(array_values($payload['permissions']), JSON_UNESCAPED_SLASHES);
        }

        if ($update === []) {
            Response::error('No changes provided.', 422);
        }

        $model->update($id, $update);
        ActivityLogger::log((int) ($currentUser['id'] ?? 0), 'update', 'users', $id);
        $saved = $model->find($id);
        Response::success($this->serializeUser($saved ?: []), 'User updated successfully');
    }

    public function destroy(array $params): void
    {
        $currentUser = $this->ensureSuperAdmin();
        $id = (int) ($params['id'] ?? 0);
        if ($id <= 0) {
            Response::error('Invalid user ID.', 422);
        }
        if ($id === (int) ($currentUser['id'] ?? 0)) {
            Response::error('You cannot delete your own account.', 422);
        }

        $model = new Admin();
        $existing = $model->find($id);
        if (!$existing) {
            Response::error('User not found.', 404);
        }
        if ($this->isSuperAdmin($existing) && $model->countSuperAdmins() <= 1) {
            Response::error('Cannot delete the last remaining super admin — promote another user first.', 422);
        }

        $model->delete($id);
        ActivityLogger::log((int) ($currentUser['id'] ?? 0), 'delete', 'users', $id);
        Response::success(null, 'User deleted successfully');
    }

    /** GET /api/admin/roles/{role}/default-permissions — for the "Apply Role Defaults" button. */
    public function roleDefaults(array $params): void
    {
        $this->ensureSuperAdmin();

        $role = strtolower(trim((string) ($params['role'] ?? '')));
        if (!in_array($role, ['admin', 'editor'], true)) {
            Response::error('Role must be admin or editor.', 422);
        }

        $pdo = Database::connection();
        $stmt = $pdo->prepare('SELECT * FROM role_default_permissions WHERE role = :role LIMIT 1');
        $stmt->execute([':role' => $role]);
        $row = $stmt->fetch();

        $defaults = [];
        if ($row) {
            if ((int) ($row['can_create_content'] ?? 0) === 1) $defaults[] = 'create_content';
            if ((int) ($row['can_edit_content'] ?? 0) === 1) $defaults[] = 'edit_content';
            if ((int) ($row['can_delete_content'] ?? 0) === 1) $defaults[] = 'delete_content';
            if ((int) ($row['can_publish_content'] ?? 0) === 1) $defaults[] = 'publish_content';
        }

        Response::success(['role' => $role, 'permissions' => $defaults], 'Fetched successfully');
    }

    private function serializeUser(array $row): array
    {
        return [
            '_id' => (int) ($row['id'] ?? 0),
            'id' => (int) ($row['id'] ?? 0),
            'name' => (string) ($row['name'] ?? ''),
            'email' => (string) ($row['email'] ?? ''),
            'is_super_admin' => $this->isSuperAdmin($row),
            'role' => (string) ($row['role'] ?? 'editor'),
            'status' => (string) ($row['status'] ?? 'active'),
            'designation' => (string) ($row['designation'] ?? ''),
            'phone' => (string) ($row['phone'] ?? ''),
            'location' => (string) ($row['location'] ?? ''),
            'profile_photo' => (string) ($row['profile_photo'] ?? ''),
            'permissions' => $this->parsePermissions($row['permissions_json'] ?? null),
            'last_login_at' => $row['last_login_at'] ?? null,
            'created_at' => $row['created_at'] ?? null,
            'updated_at' => $row['updated_at'] ?? null,
        ];
    }

    private function parsePermissions($value): array
    {
        if (is_array($value)) {
            return array_values(array_filter(array_map(static fn ($item) => trim((string) $item), $value)));
        }
        if (!is_string($value) || trim($value) === '') return [];
        $decoded = json_decode($value, true);
        if (!is_array($decoded)) return [];
        return array_values(array_filter(array_map(static fn ($item) => trim((string) $item), $decoded)));
    }

    private function getUserActivity(int $userId): array
    {
        try {
            $pdo = \Backend\Config\Database::connection();
            $stmt = $pdo->prepare('SELECT action, resource, created_at FROM activity_logs WHERE resource = :resource AND resource_id = :resource_id ORDER BY created_at DESC LIMIT 20');
            $stmt->execute([
                ':resource' => 'users',
                ':resource_id' => $userId,
            ]);
            $rows = $stmt->fetchAll() ?: [];

            return array_map(static function (array $row): array {
                $action = (string) ($row['action'] ?? 'update');
                $titleMap = [
                    'create' => 'User Created',
                    'update' => 'User Updated',
                    'delete' => 'User Deleted',
                ];
                return [
                    'title' => $titleMap[$action] ?? 'User Updated',
                    'description' => 'Profile was ' . $action . ' by admin.',
                    'created_at' => $row['created_at'] ?? null,
                ];
            }, $rows);
        } catch (\Throwable $e) {
            return [];
        }
    }
}
