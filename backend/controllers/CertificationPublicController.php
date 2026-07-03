<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\Certification;
use Backend\Models\CertificationCategory;
use Backend\Models\CertificationPageContent;
use Backend\Models\CertificationTrustBadge;
use Backend\Utils\Cache;
use Backend\Utils\Response;

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/Certification.php';
require_once __DIR__ . '/../models/CertificationCategory.php';
require_once __DIR__ . '/../models/CertificationPageContent.php';
require_once __DIR__ . '/../models/CertificationTrustBadge.php';
require_once __DIR__ . '/../utils/Cache.php';
require_once __DIR__ . '/../utils/Response.php';

final class CertificationPublicController extends BaseController
{
    public function pageContent(array $params = []): void
    {
        $data = Cache::remember('public:certifications:page-content', static function (): ?array {
            return (new CertificationPageContent())->find(1);
        });

        Response::success($data, 'Fetched successfully');
    }

    /**
     * Active categories, each with its active certifications nested inside —
     * one call gets everything the page needs to render both groups.
     */
    public function grouped(array $params = []): void
    {
        $data = Cache::remember('public:certifications:grouped', static function (): array {
            $categoryModel = new CertificationCategory();
            $certificationModel = new Certification();

            $categories = $categoryModel->activeOrdered();
            foreach ($categories as &$category) {
                $category['certifications'] = $certificationModel->activeByCategory((int) $category['id']);
            }
            unset($category);

            return $categories;
        });

        Response::success($data, 'Fetched successfully');
    }

    public function trustBadges(array $params = []): void
    {
        $data = Cache::remember('public:certifications:trust-badges', static function (): array {
            return (new CertificationTrustBadge())->activeOrdered();
        });

        Response::success($data, 'Fetched successfully');
    }

    public function primaryLicense(array $params = []): void
    {
        $data = Cache::remember('public:certifications:primary-license', static function (): ?array {
            return (new Certification())->primaryLicense();
        });

        Response::success($data, 'Fetched successfully');
    }
}
