<?php

declare(strict_types=1);

namespace Backend\Controllers;

use Backend\Models\Certification;
use Backend\Utils\Response;

require_once __DIR__ . '/BaseCrudController.php';
require_once __DIR__ . '/../models/Certification.php';
require_once __DIR__ . '/../utils/Response.php';

final class CertificationController extends BaseCrudController
{
    protected string $modelClass = Certification::class;
    protected string $resourceName = 'certifications';
    protected array $requiredCreateFields = ['category_id', 'title', 'certificate_image_url'];

    /**
     * Overrides the generic index() to support the search / category_id /
     * type_tag filters the admin list view needs (30+ rows expected).
     */
    public function index(array $params = []): void
    {
        /** @var Certification $model */
        $model = new $this->modelClass();
        $query = $this->query();

        if (($query['paginate'] ?? '1') === '0') {
            Response::success($model->all($query), 'Fetched successfully');
        }

        Response::success($model->adminPaginate($query), 'Fetched successfully');
    }
}
