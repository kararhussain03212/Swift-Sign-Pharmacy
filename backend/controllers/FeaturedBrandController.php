<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\FeaturedBrand;
use Backend\Utils\Cache;
use Backend\Utils\Response;

require_once __DIR__ . '/BaseCrudController.php';
require_once __DIR__ . '/../models/FeaturedBrand.php';

final class FeaturedBrandController extends BaseCrudController
{
    protected string $modelClass = FeaturedBrand::class;
    protected string $resourceName = 'featured_brands';
    protected array $requiredCreateFields = ['name'];

    public function publicIndex(array $params = []): void
    {
        $data = Cache::remember('public:featured_brands', static function () {
            $model = new FeaturedBrand();
            return $model->activeOrdered();
        });

        Response::success($data, 'Fetched successfully');
    }
}
