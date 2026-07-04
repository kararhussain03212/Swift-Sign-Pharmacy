<?php

declare(strict_types=1);

namespace Backend\Utils;

/**
 * Stores uploaded prescription files outside the public webroot
 * (backend/storage/prescriptions, protected by a "deny all" .htaccess)
 * and validates actual file content, not just the extension/client MIME.
 */
final class PrescriptionUpload
{
    private const EXTENSION_MIME_MAP = [
        'jpg' => ['image/jpeg'],
        'jpeg' => ['image/jpeg'],
        'png' => ['image/png'],
        'pdf' => ['application/pdf'],
    ];

    /**
     * @return array{stored_name: string, relative_path: string, original_name: string, extension: string, size: int}
     */
    public static function store(array $file, string $allowedTypesCsv, int $maxSizeMb): array
    {
        $errorCode = (int) ($file['error'] ?? UPLOAD_ERR_NO_FILE);
        if ($errorCode !== UPLOAD_ERR_OK) {
            if ($errorCode === UPLOAD_ERR_INI_SIZE || $errorCode === UPLOAD_ERR_FORM_SIZE) {
                Response::error('File exceeds server upload limit', 422);
            }
            if ($errorCode === UPLOAD_ERR_NO_FILE) {
                Response::error('Please attach your prescription file', 422);
            }
            Response::error('Upload failed, please try again', 422);
        }

        $allowedExtensions = array_values(array_filter(array_map(
            static fn (string $ext): string => strtolower(trim($ext)),
            explode(',', $allowedTypesCsv)
        )));
        if ($allowedExtensions === []) {
            $allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
        }

        $maxSizeBytes = max(1, $maxSizeMb) * 1024 * 1024;
        $size = (int) ($file['size'] ?? 0);
        if ($size > $maxSizeBytes) {
            Response::error("File exceeds the {$maxSizeMb}MB size limit", 422);
        }

        $originalName = (string) ($file['name'] ?? '');
        $tmpPath = (string) ($file['tmp_name'] ?? '');
        $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

        if ($extension === '' || !in_array($extension, $allowedExtensions, true)) {
            Response::error('Invalid file type. Allowed: ' . implode(', ', $allowedExtensions), 422);
        }

        if ($tmpPath === '' || !is_uploaded_file($tmpPath)) {
            Response::error('Uploaded file is missing from temporary storage', 422);
        }

        $detectedMime = mime_content_type($tmpPath) ?: '';
        $allowedMimes = self::EXTENSION_MIME_MAP[$extension] ?? [];
        if ($allowedMimes === [] || !in_array($detectedMime, $allowedMimes, true)) {
            Response::error('File content does not match a supported prescription format', 422);
        }

        $dir = self::storageDir();
        $storedName = bin2hex(random_bytes(16)) . '.' . $extension;
        $target = $dir . DIRECTORY_SEPARATOR . $storedName;

        if (!move_uploaded_file($tmpPath, $target)) {
            Response::error('Failed to save prescription file', 500);
        }

        return [
            'stored_name' => $storedName,
            'relative_path' => $storedName,
            'original_name' => basename($originalName),
            'extension' => $extension,
            'size' => (int) (filesize($target) ?: $size),
        ];
    }

    /**
     * Resolves a stored relative path (as saved in prescription_orders.file_path)
     * back to an absolute filesystem path, refusing to escape the storage root.
     */
    public static function absolutePath(string $relativePath): ?string
    {
        $root = realpath(self::storageDir());
        if ($root === false) {
            return null;
        }

        $relative = ltrim(str_replace(['..', "\0"], '', $relativePath), '/\\');
        $candidate = realpath($root . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $relative));
        if ($candidate === false) {
            return null;
        }

        $normalizedRoot = str_replace('\\', '/', $root) . '/';
        $normalizedCandidate = str_replace('\\', '/', $candidate);
        if (strncmp($normalizedCandidate, $normalizedRoot, strlen($normalizedRoot)) !== 0) {
            return null;
        }

        return $candidate;
    }

    private static function storageDir(): string
    {
        $dir = dirname(__DIR__) . '/storage/prescriptions';
        if (!is_dir($dir) && !mkdir($dir, 0770, true) && !is_dir($dir)) {
            Response::error('Unable to prepare secure storage', 500);
        }

        return $dir;
    }
}
