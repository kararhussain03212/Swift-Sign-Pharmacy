import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import { AuthProvider } from "./context/AuthContext.jsx";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ProductList from "./pages/product/ProductList";
import ProductForm from "./pages/product/ProductForm";
import SliderList from "./pages/slider/SliderList";
import SliderForm from "./pages/slider/SliderForm";
import CommitmentItemList from "./pages/commitment/CommitmentItemList";
import CommitmentItemForm from "./pages/commitment/CommitmentItemForm";
import SiteSettings from "./pages/settings/SiteSettings";
import ProductPageSettings from "./pages/settings/ProductPageSettings";
import TestimonialList from "./pages/testimonial/TestimonialList";
import TestimonialForm from "./pages/testimonial/TestimonialForm";
import BlogList from "./pages/blog/BlogList";
import BlogForm from "./pages/blog/BlogForm";
import UserManagement from "./pages/users/UserManagement";
import ContactMessages from "./pages/contact/ContactMessages";
import ContactPageSettings from "./pages/contact/ContactPageSettings";
import ContactInfoCardList from "./pages/contact/ContactInfoCardList";
import ContactInfoCardForm from "./pages/contact/ContactInfoCardForm";
import ContactFaqList from "./pages/contact/ContactFaqList";
import ContactFaqForm from "./pages/contact/ContactFaqForm";
import HomepageHeroBannerForm from "./pages/homepage/HomepageHeroBannerForm";
import PromoCardList from "./pages/homepage/PromoCardList";
import PromoCardForm from "./pages/homepage/PromoCardForm";
import CarePlanBannerForm from "./pages/homepage/CarePlanBannerForm";
import FeaturedBrandList from "./pages/homepage/FeaturedBrandList";
import FeaturedBrandForm from "./pages/homepage/FeaturedBrandForm";
import TrustBadgeList from "./pages/homepage/TrustBadgeList";
import TrustBadgeForm from "./pages/homepage/TrustBadgeForm";
import HeroSectionAdmin from "./pages/about/HeroSectionAdmin";
import StorySectionAdmin from "./pages/about/StorySectionAdmin";
import MissionSectionAdmin from "./pages/about/MissionSectionAdmin";
import CtaSectionAdmin from "./pages/about/CtaSectionAdmin";
import ComparisonSectionAdmin from "./pages/about/ComparisonSectionAdmin";
import ProblemCardList from "./pages/about/ProblemCardList";
import ProblemCardForm from "./pages/about/ProblemCardForm";
import CoreValueList from "./pages/about/CoreValueList";
import CoreValueForm from "./pages/about/CoreValueForm";
import CustomerAddresses from "./pages/addresses/CustomerAddresses";
import AnnouncementBarList from "./pages/header/AnnouncementBarList";
import HeaderSiteSettings from "./pages/header/HeaderSiteSettings";
import NavLinkList from "./pages/header/NavLinkList";
import CategoryList from "./pages/header/CategoryList";
import LocationList from "./pages/header/LocationList";
import HeroSlideList from "./pages/header/HeroSlideList";
import HeroSlideForm from "./pages/header/HeroSlideForm";
import StoreBranchList from "./pages/storeLocator/StoreBranchList";
import StoreBranchForm from "./pages/storeLocator/StoreBranchForm";
import StoreNetworkStatList from "./pages/storeLocator/StoreNetworkStatList";
import StoreLocatorContentForm from "./pages/storeLocator/StoreLocatorContentForm";
import StoreGalleryList from "./pages/storeLocator/StoreGalleryList";
import StoreGalleryForm from "./pages/storeLocator/StoreGalleryForm";
import { useAuth } from "./context/useAuth";

function Forbidden403() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/15 text-4xl">
        🔒
      </div>
      <div>
        <h1 className="text-3xl font-bold text-white">403 — Forbidden</h1>
        <p className="mt-2 max-w-sm text-white/60">
          You don't have permission to access this page. Contact your administrator to request access.
        </p>
      </div>
    </div>
  );
}

function ProtectedPage({ children }) {
  return (
    <ProtectedRoute>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
}

function PermissionPage({ permission, children }) {
  const { can } = useAuth();
  if (!can(permission)) {
    return (
      <ProtectedPage>
        <Forbidden403 />
      </ProtectedPage>
    );
  }
  return <>{children}</>;
}

export default function App() {
  const basename =
    typeof window !== "undefined"
      ? (() => {
          const { pathname } = window.location;
          const adminIndex = pathname.indexOf("/admin");
          if (adminIndex === -1) return undefined;
          return pathname.slice(0, adminIndex + "/admin".length);
        })()
      : undefined;

  return (
    <AuthProvider>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedPage>
                <Dashboard />
              </ProtectedPage>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedPage>
                <Dashboard />
              </ProtectedPage>
            }
          />

          <Route
            path="/products"
            element={
              <ProtectedPage>
                <ProductList />
              </ProtectedPage>
            }
          />
          <Route
            path="/products/new"
            element={
              <ProtectedPage>
                <ProductForm />
              </ProtectedPage>
            }
          />
          <Route
            path="/products/edit/:id"
            element={
              <ProtectedPage>
                <ProductForm />
              </ProtectedPage>
            }
          />

          <Route
            path="/sliders"
            element={
              <ProtectedPage>
                <SliderList />
              </ProtectedPage>
            }
          />
          <Route
            path="/sliders/new"
            element={
              <ProtectedPage>
                <SliderForm />
              </ProtectedPage>
            }
          />
          <Route
            path="/sliders/edit/:id"
            element={
              <ProtectedPage>
                <SliderForm />
              </ProtectedPage>
            }
          />
          <Route
            path="/testimonials"
            element={
              <ProtectedPage>
                <TestimonialList />
              </ProtectedPage>
            }
          />
          <Route
            path="/testimonials/new"
            element={
              <ProtectedPage>
                <TestimonialForm />
              </ProtectedPage>
            }
          />
          <Route
            path="/testimonials/edit/:id"
            element={
              <ProtectedPage>
                <TestimonialForm />
              </ProtectedPage>
            }
          />

          <Route
            path="/blogs"
            element={
              <ProtectedPage>
                <BlogList />
              </ProtectedPage>
            }
          />
          <Route
            path="/blogs/new"
            element={
              <ProtectedPage>
                <BlogForm />
              </ProtectedPage>
            }
          />
          <Route
            path="/blogs/edit/:id"
            element={
              <ProtectedPage>
                <BlogForm />
              </ProtectedPage>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedPage>
                <Admin />
              </ProtectedPage>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedPage>
                <Navigate to="/settings/navbar" replace />
              </ProtectedPage>
            }
          />
          <Route
            path="/settings/navbar"
            element={
              <ProtectedPage>
                <SiteSettings forcedMainSection="navbar" />
              </ProtectedPage>
            }
          />
          <Route
            path="/settings/home"
            element={
              <ProtectedPage>
                <SiteSettings forcedMainSection="home" />
              </ProtectedPage>
            }
          />
          <Route
            path="/settings/home-about"
            element={
              <ProtectedPage>
                <SiteSettings forcedMainSection="home" forcedHomeSection="about" />
              </ProtectedPage>
            }
          />
          <Route
            path="/settings/home-company"
            element={
              <ProtectedPage>
                <SiteSettings forcedMainSection="home" forcedHomeSection="company" />
              </ProtectedPage>
            }
          />
          <Route
            path="/settings/home-offer"
            element={
              <ProtectedPage>
                <SiteSettings forcedMainSection="home" forcedHomeSection="offer" />
              </ProtectedPage>
            }
          />
          <Route
            path="/settings/home-testimonials"
            element={
              <ProtectedPage>
                <SiteSettings forcedMainSection="home" forcedHomeSection="testimonials" />
              </ProtectedPage>
            }
          />
          <Route
            path="/settings/home-newsletter"
            element={
              <ProtectedPage>
                <SiteSettings forcedMainSection="home" forcedHomeSection="newsletter" />
              </ProtectedPage>
            }
          />
          <Route
            path="/settings/home-video"
            element={
              <ProtectedPage>
                <SiteSettings forcedMainSection="home" forcedHomeSection="video" />
              </ProtectedPage>
            }
          />
          <Route
            path="/settings/home-blog"
            element={
              <ProtectedPage>
                <SiteSettings forcedMainSection="home" forcedHomeSection="blog" />
              </ProtectedPage>
            }
          />
          <Route
            path="/settings/home-commitment"
            element={
              <ProtectedPage>
                <SiteSettings forcedMainSection="home" forcedHomeSection="commitment" />
              </ProtectedPage>
            }
          />
          <Route
            path="/settings/home-authentic"
            element={
              <ProtectedPage>
                <SiteSettings forcedMainSection="home" forcedHomeSection="authentic" />
              </ProtectedPage>
            }
          />
          <Route
            path="/settings/footer"
            element={
              <ProtectedPage>
                <SiteSettings forcedMainSection="footer" />
              </ProtectedPage>
            }
          />
          <Route
            path="/settings/product"
            element={
              <ProtectedPage>
                <ProductPageSettings />
              </ProtectedPage>
            }
          />
          <Route
            path="/settings/contact"
            element={
              <ProtectedPage>
                <SiteSettings forcedMainSection="contact" />
              </ProtectedPage>
            }
          />
          <Route
            path="/settings/blog"
            element={
              <ProtectedPage>
                <SiteSettings forcedMainSection="blog" />
              </ProtectedPage>
            }
          />
          <Route
            path="/settings/about"
            element={
              <ProtectedPage>
                <SiteSettings forcedMainSection="about" forcedAboutSection="hero" />
              </ProtectedPage>
            }
          />
          <Route
            path="/settings/about-hero"
            element={
              <ProtectedPage>
                <SiteSettings forcedMainSection="about" forcedAboutSection="hero" />
              </ProtectedPage>
            }
          />
          <Route
            path="/settings/about-info"
            element={
              <ProtectedPage>
                <SiteSettings forcedMainSection="about" forcedAboutSection="info" />
              </ProtectedPage>
            }
          />
          <Route
            path="/settings/about-company"
            element={
              <ProtectedPage>
                <SiteSettings forcedMainSection="about" forcedAboutSection="company" />
              </ProtectedPage>
            }
          />
          <Route
            path="/settings/about-category"
            element={
              <ProtectedPage>
                <SiteSettings forcedMainSection="about" forcedAboutSection="category" />
              </ProtectedPage>
            }
          />
          <Route
            path="/settings/about-process"
            element={
              <ProtectedPage>
                <SiteSettings forcedMainSection="about" forcedAboutSection="process" />
              </ProtectedPage>
            }
          />
          <Route
            path="/commitment"
            element={
              <ProtectedPage>
                <CommitmentItemList />
              </ProtectedPage>
            }
          />
          <Route
            path="/commitment/new"
            element={
              <ProtectedPage>
                <CommitmentItemForm />
              </ProtectedPage>
            }
          />
          <Route
            path="/commitment/edit/:id"
            element={
              <ProtectedPage>
                <CommitmentItemForm />
              </ProtectedPage>
            }
          />
          <Route
            path="/contact-messages"
            element={
              <ProtectedPage>
                <ContactMessages />
              </ProtectedPage>
            }
          />
          <Route
            path="/contact-settings"
            element={
              <ProtectedPage>
                <ContactPageSettings />
              </ProtectedPage>
            }
          />
          <Route path="/contact-info-cards"          element={<ProtectedPage><ContactInfoCardList /></ProtectedPage>} />
          <Route path="/contact-info-cards/new"       element={<ProtectedPage><ContactInfoCardForm /></ProtectedPage>} />
          <Route path="/contact-info-cards/edit/:id"  element={<ProtectedPage><ContactInfoCardForm /></ProtectedPage>} />
          <Route path="/contact-faqs"                 element={<ProtectedPage><ContactFaqList /></ProtectedPage>} />
          <Route path="/contact-faqs/new"             element={<ProtectedPage><ContactFaqForm /></ProtectedPage>} />
          <Route path="/contact-faqs/edit/:id"        element={<ProtectedPage><ContactFaqForm /></ProtectedPage>} />

          {/* Homepage Promo Sections */}
          <Route path="/homepage-hero-banner"         element={<ProtectedPage><HomepageHeroBannerForm /></ProtectedPage>} />
          <Route path="/homepage-promo-cards"         element={<ProtectedPage><PromoCardList /></ProtectedPage>} />
          <Route path="/homepage-promo-cards/new"     element={<ProtectedPage><PromoCardForm /></ProtectedPage>} />
          <Route path="/homepage-promo-cards/edit/:id" element={<ProtectedPage><PromoCardForm /></ProtectedPage>} />
          <Route path="/homepage-care-plan"           element={<ProtectedPage><CarePlanBannerForm /></ProtectedPage>} />
          <Route path="/featured-brands"              element={<ProtectedPage><FeaturedBrandList /></ProtectedPage>} />
          <Route path="/featured-brands/new"          element={<ProtectedPage><FeaturedBrandForm /></ProtectedPage>} />
          <Route path="/featured-brands/edit/:id"     element={<ProtectedPage><FeaturedBrandForm /></ProtectedPage>} />
          <Route path="/trust-badges"                 element={<ProtectedPage><TrustBadgeList /></ProtectedPage>} />
          <Route path="/trust-badges/new"             element={<ProtectedPage><TrustBadgeForm /></ProtectedPage>} />
          <Route path="/trust-badges/edit/:id"        element={<ProtectedPage><TrustBadgeForm /></ProtectedPage>} />

          {/* About Us Management */}
          <Route path="/about/hero"    element={<ProtectedPage><HeroSectionAdmin /></ProtectedPage>} />
          <Route path="/about/story"   element={<ProtectedPage><StorySectionAdmin /></ProtectedPage>} />
          <Route path="/about/mission" element={<ProtectedPage><MissionSectionAdmin /></ProtectedPage>} />
          <Route path="/about/cta"     element={<ProtectedPage><CtaSectionAdmin /></ProtectedPage>} />
          <Route path="/about/comparison" element={<ProtectedPage><ComparisonSectionAdmin /></ProtectedPage>} />

          <Route path="/about/problems"          element={<ProtectedPage><ProblemCardList /></ProtectedPage>} />
          <Route path="/about/problems/new"      element={<ProtectedPage><ProblemCardForm /></ProtectedPage>} />
          <Route path="/about/problems/edit/:id" element={<ProtectedPage><ProblemCardForm /></ProtectedPage>} />

          <Route path="/about/core-values"          element={<ProtectedPage><CoreValueList /></ProtectedPage>} />
          <Route path="/about/core-values/new"      element={<ProtectedPage><CoreValueForm /></ProtectedPage>} />
          <Route path="/about/core-values/edit/:id" element={<ProtectedPage><CoreValueForm /></ProtectedPage>} />
          <Route
            path="/users"
            element={
              <PermissionPage permission="manage_users">
                <ProtectedPage>
                  <UserManagement />
                </ProtectedPage>
              </PermissionPage>
            }
          />

          <Route
            path="/addresses"
            element={
              <ProtectedPage>
                <CustomerAddresses />
              </ProtectedPage>
            }
          />

          {/* Arion Pharmacy — Header module (create/edit handled via modals on each list page) */}
          <Route path="/header/announcement-bar" element={<ProtectedPage><AnnouncementBarList /></ProtectedPage>} />
          <Route path="/header/site-settings"    element={<ProtectedPage><HeaderSiteSettings /></ProtectedPage>} />
          <Route path="/header/nav-links"        element={<ProtectedPage><NavLinkList /></ProtectedPage>} />
          <Route path="/header/categories"       element={<ProtectedPage><CategoryList /></ProtectedPage>} />
          <Route path="/header/locations"        element={<ProtectedPage><LocationList /></ProtectedPage>} />
          <Route path="/header/hero-slides"           element={<ProtectedPage><HeroSlideList /></ProtectedPage>} />
          <Route path="/header/hero-slides/new"       element={<ProtectedPage><HeroSlideForm /></ProtectedPage>} />
          <Route path="/header/hero-slides/edit/:id"  element={<ProtectedPage><HeroSlideForm /></ProtectedPage>} />

          <Route path="/store-locator/branches"          element={<ProtectedPage><StoreBranchList /></ProtectedPage>} />
          <Route path="/store-locator/branches/new"       element={<ProtectedPage><StoreBranchForm /></ProtectedPage>} />
          <Route path="/store-locator/branches/edit/:id"  element={<ProtectedPage><StoreBranchForm /></ProtectedPage>} />
          <Route path="/store-locator/stats"              element={<ProtectedPage><StoreNetworkStatList /></ProtectedPage>} />
          <Route path="/store-locator/content"             element={<ProtectedPage><StoreLocatorContentForm /></ProtectedPage>} />
          <Route path="/store-locator/gallery"             element={<ProtectedPage><StoreGalleryList /></ProtectedPage>} />
          <Route path="/store-locator/gallery/new"         element={<ProtectedPage><StoreGalleryForm /></ProtectedPage>} />
          <Route path="/store-locator/gallery/edit/:id"    element={<ProtectedPage><StoreGalleryForm /></ProtectedPage>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
