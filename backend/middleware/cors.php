<?php

declare(strict_types=1);

namespace Backend\Middleware;

use Backend\Config\Env;

require_once __DIR__ . '/../config/env.php';

final class CorsMiddleware
{
    private static function isLocalOrigin(string $origin): bool
    {
        if ($origin === '') {
            return false;
        }
        $parts = parse_url($origin);
        if (!is_array($parts)) {
            return false;
        }
        $host = strtolower((string) ($parts['host'] ?? ''));
        return in_array($host, ['localhost', '127.0.0.1', '::1'], true);
    }

    public static function handle(): void
    {
        Env::load(dirname(__DIR__) . '/.env');

        $requestOrigin = trim((string) ($_SERVER['HTTP_ORIGIN'] ?? ''));
        $allowedOrigin = null;

        if ($requestOrigin !== '') {
            // Always allow any localhost / 127.0.0.1 origin (covers all Vite dev ports)
            if (self::isLocalOrigin($requestOrigin)) {
                $allowedOrigin = $requestOrigin;
            } else {
                // Check explicit CORS_ALLOW_ORIGIN whitelist from .env
                $list = array_values(array_filter(array_map(
                    static fn(string $o): string => trim($o),
                    explode(',', Env::get('CORS_ALLOW_ORIGIN', '') ?? '')
                )));
                if (in_array('*', $list, true)) {
                    $allowedOrigin = '*';
                } elseif (in_array($requestOrigin, $list, true)) {
                    $allowedOrigin = $requestOrigin;
                }
            }
        }

        // Remove any headers Apache may have pre-set to avoid duplicates
        header_remove('Access-Control-Allow-Origin');
        header_remove('Access-Control-Allow-Credentials');
        header_remove('Access-Control-Allow-Methods');
        header_remove('Access-Control-Allow-Headers');

        if ($allowedOrigin !== null) {
            header('Access-Control-Allow-Origin: ' . $allowedOrigin);
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type, Authorization, X-CSRF-Token');
        }

        header('Vary: Origin');
        header('X-Frame-Options: SAMEORIGIN');
        header('X-Content-Type-Options: nosniff');
        header('Referrer-Policy: strict-origin-when-cross-origin');

        // Handle OPTIONS preflight — respond immediately with 204
        if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
            http_response_code(204);
            exit;
        }
    }
}
