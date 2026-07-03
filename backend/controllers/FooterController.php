<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\Category;
use Backend\Models\FooterAppLink;
use Backend\Models\FooterCompanyInfo;
use Backend\Models\FooterQuickLink;
use Backend\Models\FooterSetting;
use Backend\Models\FooterSocialLink;
use Backend\Utils\Cache;
use Backend\Utils\Response;

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/Category.php';
require_once __DIR__ . '/../models/FooterAppLink.php';
require_once __DIR__ . '/../models/FooterCompanyInfo.php';
require_once __DIR__ . '/../models/FooterQuickLink.php';
require_once __DIR__ . '/../models/FooterSetting.php';
require_once __DIR__ . '/../models/FooterSocialLink.php';
require_once __DIR__ . '/../utils/Cache.php';
require_once __DIR__ . '/../utils/Response.php';

/**
 * Aggregates every footer section (categories, quick links, company info,
 * app links, social links, settings) into a single response so the
 * frontend Footer component only needs one request.
 */
final class FooterController extends BaseController
{
    public function publicIndex(array $params = []): void
    {
        $data = Cache::remember('public:footer', static function (): array {
            return [
                'categories' => (new Category())->topLevelActive(),
                'quickLinks' => (new FooterQuickLink())->activeOrdered(),
                'companyInfo' => (new FooterCompanyInfo())->find(1),
                'appLinks' => (new FooterAppLink())->activeOrdered(),
                'socialLinks' => (new FooterSocialLink())->activeOrdered(),
                'settings' => (new FooterSetting())->find(1),
            ];
        });

        Response::success($data, 'Fetched successfully');
    }
}
