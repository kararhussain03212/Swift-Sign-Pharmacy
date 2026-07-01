<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\TrustBadge;
use Backend\Utils\Cache;
use Backend\Utils\Response;

require_once __DIR__ . '/BaseCrudController.php';
require_once __DIR__ . '/../models/TrustBadge.php';

final class TrustBadgeController extends BaseCrudController
{
    protected string $modelClass = TrustBadge::class;
    protected string $resourceName = 'trust_badges';
    protected array $requiredCreateFields = ['icon_key', 'title', 'subtitle'];

    public function publicIndex(array $params = []): void
    {
        $data = Cache::remember('public:trust_badges', static function () {
            $model = new TrustBadge();
            return $model->activeOrdered();
        });

        Response::success($data, 'Fetched successfully');
    }
}
