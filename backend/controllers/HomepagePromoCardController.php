<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\HomepagePromoCard;
use Backend\Utils\Cache;
use Backend\Utils\Response;

require_once __DIR__ . '/BaseCrudController.php';
require_once __DIR__ . '/../models/HomepagePromoCard.php';

final class HomepagePromoCardController extends BaseCrudController
{
    protected string $modelClass = HomepagePromoCard::class;
    protected string $resourceName = 'homepage_promo_cards';
    protected array $requiredCreateFields = ['heading', 'button_text', 'button_link', 'image_url'];

    public function publicIndex(array $params = []): void
    {
        $data = Cache::remember('public:homepage_promo_cards', static function () {
            $model = new HomepagePromoCard();
            return $model->activeOrdered();
        });

        Response::success($data, 'Fetched successfully');
    }
}
