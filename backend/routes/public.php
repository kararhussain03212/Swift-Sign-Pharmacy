<?php

declare(strict_types=1);

use Backend\Controllers\AboutController;
use Backend\Controllers\AddressController;
use Backend\Controllers\AnnouncementBarController;
use Backend\Controllers\BlogController;
use Backend\Controllers\CategoryController;
use Backend\Controllers\CommitmentItemController;
use Backend\Controllers\ContactController;
use Backend\Controllers\ContactFaqController;
use Backend\Controllers\ContactInfoCardController;
use Backend\Controllers\FeaturedBrandController;
use Backend\Controllers\HeroController;
use Backend\Controllers\HeroBannerController;
use Backend\Controllers\HomepageCarePlanBannerController;
use Backend\Controllers\HomepageHeroBannerController;
use Backend\Controllers\HomepagePromoCardController;
use Backend\Controllers\HomepageProductSliderController;
use Backend\Controllers\LocationController;
use Backend\Controllers\NavLinkController;
use Backend\Controllers\ProductController;
use Backend\Controllers\ProductPageController;
use Backend\Controllers\SettingController;
use Backend\Controllers\SiteSettingController;
use Backend\Controllers\StoreBranchController;
use Backend\Controllers\StoreGalleryController;
use Backend\Controllers\StoreLocatorContentController;
use Backend\Controllers\StoreNetworkStatController;
use Backend\Controllers\TestimonialController;
use Backend\Controllers\TrustBadgeController;
use Backend\Middleware\AuthMiddleware;
use Backend\Utils\Router;

require_once __DIR__ . '/../controllers/HeroController.php';
require_once __DIR__ . '/../controllers/HeroBannerController.php';
require_once __DIR__ . '/../controllers/ProductController.php';
require_once __DIR__ . '/../controllers/ProductPageController.php';
require_once __DIR__ . '/../controllers/TestimonialController.php';
require_once __DIR__ . '/../controllers/BlogController.php';
require_once __DIR__ . '/../controllers/SettingController.php';
require_once __DIR__ . '/../controllers/ContactController.php';
require_once __DIR__ . '/../controllers/ContactInfoCardController.php';
require_once __DIR__ . '/../controllers/ContactFaqController.php';
require_once __DIR__ . '/../controllers/CommitmentItemController.php';
require_once __DIR__ . '/../controllers/AboutController.php';
require_once __DIR__ . '/../controllers/AddressController.php';
require_once __DIR__ . '/../controllers/AnnouncementBarController.php';
require_once __DIR__ . '/../controllers/SiteSettingController.php';
require_once __DIR__ . '/../controllers/NavLinkController.php';
require_once __DIR__ . '/../controllers/CategoryController.php';
require_once __DIR__ . '/../controllers/LocationController.php';
require_once __DIR__ . '/../controllers/StoreBranchController.php';
require_once __DIR__ . '/../controllers/StoreNetworkStatController.php';
require_once __DIR__ . '/../controllers/StoreLocatorContentController.php';
require_once __DIR__ . '/../controllers/StoreGalleryController.php';
require_once __DIR__ . '/../controllers/HomepageHeroBannerController.php';
require_once __DIR__ . '/../controllers/HomepagePromoCardController.php';
require_once __DIR__ . '/../controllers/HomepageCarePlanBannerController.php';
require_once __DIR__ . '/../controllers/FeaturedBrandController.php';
require_once __DIR__ . '/../controllers/TrustBadgeController.php';
require_once __DIR__ . '/../controllers/HomepageProductSliderController.php';
require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/../utils/Router.php';

function registerPublicRoutes(Router $router): void
{
    $router->get('/api/public/hero', [HeroController::class, 'publicIndex']);
    $router->get('/api/public/products', [ProductController::class, 'publicIndex']);
    $router->get('/api/public/products/{slug}/related', [ProductController::class, 'publicRelated']);
    $router->get('/api/public/products/{slug}', [ProductController::class, 'publicShowBySlug']);
    $router->get('/api/public/testimonials', [TestimonialController::class, 'publicIndex']);
    $router->get('/api/public/commitment-items', [CommitmentItemController::class, 'publicIndex']);
    $router->get('/api/public/blog', [BlogController::class, 'publicIndex']);
    $router->get('/api/public/blog/search', [BlogController::class, 'publicSearch']);
    $router->get('/api/public/blog/settings', [BlogController::class, 'publicBlogSettings']);
    $router->get('/api/public/blog/{slug}', [BlogController::class, 'publicShowBySlug']);
    $router->post('/api/public/blog/{slug}/like', [BlogController::class, 'publicLike']);
    $router->get('/api/public/settings', [SettingController::class, 'publicIndex']);
    $router->get('/api/public/contact-page',  [ContactController::class, 'publicContactPage']);
    $router->post('/api/public/contact', [ContactController::class, 'store']);
    $router->get('/api/public/contact/info-cards', [ContactInfoCardController::class, 'publicIndex']);
    $router->get('/api/public/contact/faqs', [ContactFaqController::class, 'publicIndex']);
    $router->get('/api/public/product-page', [ProductPageController::class, 'publicPage']);

    // About Us
    $router->get('/api/public/about/page',        [AboutController::class, 'publicPage']);
    $router->get('/api/public/about/hero',         [AboutController::class, 'publicHero']);
    $router->get('/api/public/about/story',        [AboutController::class, 'publicStory']);
    $router->get('/api/public/about/problems',     [AboutController::class, 'publicProblems']);
    $router->get('/api/public/about/mission',      [AboutController::class, 'publicMission']);
    $router->get('/api/public/about/core-values',  [AboutController::class, 'publicCoreValues']);
    $router->get('/api/public/about/comparison',   [AboutController::class, 'publicComparison']);
    $router->get('/api/public/about/cta',          [AboutController::class, 'publicCta']);

    // User Addresses (authenticated)
    $router->get('/api/addresses', [AddressController::class, 'index'], [[AuthMiddleware::class, 'requireAuth']]);
    $router->post('/api/addresses', [AddressController::class, 'store'], [[AuthMiddleware::class, 'requireAuth']]);
    $router->get('/api/addresses/{id}', [AddressController::class, 'show'], [[AuthMiddleware::class, 'requireAuth']]);
    $router->put('/api/addresses/{id}', [AddressController::class, 'update'], [[AuthMiddleware::class, 'requireAuth']]);
    $router->delete('/api/addresses/{id}', [AddressController::class, 'destroy'], [[AuthMiddleware::class, 'requireAuth']]);

    // Arion Pharmacy — Header module (separate arion_pharmacy database)
    $router->get('/api/public/announcement-bar', [AnnouncementBarController::class, 'publicIndex']);
    $router->get('/api/public/site-settings', [SiteSettingController::class, 'publicIndex']);
    $router->get('/api/public/nav-links', [NavLinkController::class, 'publicIndex']);
    $router->get('/api/public/categories', [CategoryController::class, 'publicIndex']);
    $router->get('/api/public/locations', [LocationController::class, 'publicIndex']);
    $router->get('/api/public/hero-slides', [HeroBannerController::class, 'publicIndex']);

    // Store Locator
    $router->get('/api/public/store-locator/branches', [StoreBranchController::class, 'publicIndex']);
    $router->get('/api/public/store-locator/branches/{slug}', [StoreBranchController::class, 'publicShowBySlug']);
    $router->get('/api/public/store-locator/stats', [StoreNetworkStatController::class, 'publicIndex']);
    $router->get('/api/public/store-locator/content', [StoreLocatorContentController::class, 'publicIndex']);
    $router->get('/api/public/store-locator/gallery', [StoreGalleryController::class, 'publicIndex']);

    // Homepage promo sections
    $router->get('/api/public/homepage/hero-banner', [HomepageHeroBannerController::class, 'publicIndex']);
    $router->get('/api/public/homepage/promo-cards', [HomepagePromoCardController::class, 'publicIndex']);
    $router->get('/api/public/homepage/care-plan-banner', [HomepageCarePlanBannerController::class, 'publicIndex']);
    $router->get('/api/public/homepage/featured-brands', [FeaturedBrandController::class, 'publicIndex']);
    $router->get('/api/public/homepage/trust-badges', [TrustBadgeController::class, 'publicIndex']);
    $router->get('/api/public/homepage/product-sliders', [HomepageProductSliderController::class, 'publicIndex']);
}
