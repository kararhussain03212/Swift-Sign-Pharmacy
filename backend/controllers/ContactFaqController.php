<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\ContactFaq;
use Backend\Utils\Cache;
use Backend\Utils\Response;

require_once __DIR__ . '/BaseCrudController.php';
require_once __DIR__ . '/../models/ContactFaq.php';

final class ContactFaqController extends BaseCrudController
{
    protected string $modelClass = ContactFaq::class;
    protected string $resourceName = 'contact_faqs';
    protected array $requiredCreateFields = ['question', 'answer'];

    public function publicIndex(array $params = []): void
    {
        $data = Cache::remember('public:contact_faqs', static function () {
            $model = new ContactFaq();
            return $model->activeOrdered();
        });

        Response::success($data, 'Fetched successfully');
    }
}
