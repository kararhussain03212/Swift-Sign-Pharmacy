import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";
import fallbackLogo from "../assets/images/web_logo.png";
import { getBackendRoot } from "../api/runtimeApi";
import { getSettings } from "../api/settingApi";

const NAV = [
  { path: "/dashboard",         label: "Dashboard" },
  { path: "/users",             label: "User Management", superAdminOnly: true },
  { path: "/header/hero-slides",      label: "Hero Banner" },
  { path: "/blogs",             label: "Blogs" },
  // Other Settings
  { path: "/settings/blog",     label: "Blog Page" },
  // Home Page module
  { path: "/homepage", label: "Home Page", group: "homepage" },
  { path: "/homepage/hero-banner",      label: "Hero Banner",      child: true, childGroup: "homepage" },
  { path: "/homepage-sliders",          label: "Product Sliders",  child: true, childGroup: "homepage" },
  { path: "/homepage-promo-cards",      label: "Promo Cards",      child: true, childGroup: "homepage" },
  { path: "/homepage/care-plan-banner", label: "Care Plan Banner", child: true, childGroup: "homepage" },
  { path: "/featured-brands",           label: "Featured Brands",  child: true, childGroup: "homepage" },
  { path: "/trust-badges",              label: "Trust Badges",     child: true, childGroup: "homepage" },
  // Contact Page
  { path: "/contact-settings", label: "Contact Page", group: "contactUs" },
  { path: "/contact-settings",    label: "Page Content", child: true, childGroup: "contactUs" },
  { path: "/contact-info-cards",  label: "Info Cards",   child: true, childGroup: "contactUs" },
  { path: "/contact-faqs",        label: "FAQs",         child: true, childGroup: "contactUs" },
  { path: "/contact-messages",    label: "Submissions",  child: true, childGroup: "contactUs" },
  // Arion Pharmacy — Header module
  { path: "/header", label: "Header", group: "header" },
  { path: "/header/announcement-bar", label: "Announcement Bar", child: true, childGroup: "header" },
  { path: "/header/site-settings",    label: "Site Settings",    child: true, childGroup: "header" },
  { path: "/header/nav-links",        label: "Nav Links",        child: true, childGroup: "header" },
  { path: "/header/categories",       label: "Categories",       child: true, childGroup: "header" },
  { path: "/header/locations",        label: "Locations",        child: true, childGroup: "header" },
  // Store Locator
  { path: "/store-locator", label: "Store Locator", group: "storeLocator" },
  { path: "/store-locator/branches",      label: "Branches",      child: true, childGroup: "storeLocator" },
  { path: "/store-locator/stats",         label: "Network Stats", child: true, childGroup: "storeLocator" },
  { path: "/store-locator/content",       label: "Page Content",  child: true, childGroup: "storeLocator" },
  { path: "/store-locator/gallery",       label: "Gallery",       child: true, childGroup: "storeLocator" },
  // Footer
  { path: "/footer", label: "Footer", group: "footer" },
  { path: "/footer/quick-links",   label: "Quick Links",   child: true, childGroup: "footer" },
  { path: "/footer/app-links",     label: "App Links",     child: true, childGroup: "footer" },
  { path: "/footer/social-links",  label: "Social Links",  child: true, childGroup: "footer" },
  { path: "/footer/company-info",  label: "Company Info",  child: true, childGroup: "footer" },
  { path: "/footer/settings",      label: "Settings",      child: true, childGroup: "footer" },
  // Certifications
  { path: "/certifications", label: "Certifications", group: "certifications" },
  { path: "/certifications/page-content", label: "Page Content", child: true, childGroup: "certifications" },
  { path: "/certifications/categories",   label: "Categories",   child: true, childGroup: "certifications" },
  { path: "/certifications/items",        label: "Certificates", child: true, childGroup: "certifications" },
  { path: "/certifications/trust-badges", label: "Trust Badges", child: true, childGroup: "certifications" },
];

const PAGE_TITLES = {
  "/":                               "Dashboard",
  "/dashboard":                      "Dashboard",
  "/products":                       "Products",
  "/products/new":                   "Add Product",
  "/commitment":                     "Commitment Items",
  "/commitment/new":                 "Add Commitment Item",
  "/blogs":                          "Blogs",
  "/blogs/new":                      "Add Blog",
  "/contact-messages":               "Contact Messages",
  "/contact-settings":               "Contact Page Settings",
  "/contact-info-cards":             "Contact Info Cards",
  "/contact-info-cards/new":         "Add Info Card",
  "/contact-faqs":                   "Contact FAQs",
  "/contact-faqs/new":               "Add FAQ",
  "/settings/blog":                  "Blog Page Settings",
  "/profile":                        "Admin Profile",
  "/users":                          "User Management",
  "/addresses":                      "Customer Addresses",
  "/header/announcement-bar":        "Announcement Bar",
  "/header/site-settings":           "Header — Site Settings",
  "/header/nav-links":               "Nav Links",
  "/header/categories":              "Categories",
  "/header/locations":               "Locations",
  "/header/hero-slides":             "Hero Banner",
  "/header/hero-slides/new":         "Add Hero Slide",
  "/homepage/hero-banner":           "Home Page — Hero Banner",
  "/homepage/care-plan-banner":      "Home Page — Care Plan Banner",
  "/homepage-sliders":               "Home Page — Product Sliders",
  "/homepage-sliders/new":           "Add Product Slider",
  "/homepage-promo-cards":           "Home Page — Promo Cards",
  "/homepage-promo-cards/new":       "Add Promo Card",
  "/featured-brands":                "Home Page — Featured Brands",
  "/featured-brands/new":            "Add Brand",
  "/trust-badges":                   "Home Page — Trust Badges",
  "/trust-badges/new":               "Add Trust Badge",
  "/store-locator/branches":         "Store Locator — Branches",
  "/store-locator/branches/new":     "Add Branch",
  "/store-locator/stats":            "Store Locator — Network Stats",
  "/store-locator/content":          "Store Locator — Page Content",
  "/store-locator/gallery":          "Store Locator — Gallery",
  "/store-locator/gallery/new":      "Add Gallery Image",
  "/footer/quick-links":             "Footer — Quick Links",
  "/footer/quick-links/new":         "Add Quick Link",
  "/footer/app-links":               "Footer — App Links",
  "/footer/app-links/new":           "Add App Link",
  "/footer/social-links":            "Footer — Social Links",
  "/footer/social-links/new":        "Add Social Link",
  "/footer/company-info":            "Footer — Company Info",
  "/footer/settings":                "Footer — Settings",
  "/certifications/page-content":    "Certifications — Page Content",
  "/certifications/categories":      "Certifications — Categories",
  "/certifications/items":           "Certifications — Certificates",
  "/certifications/trust-badges":    "Certifications — Trust Badges",
};

/* nav-link class helpers */
const cls = {
  link: (active) =>
    `mb-0.5 flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
      active
        ? "border border-[var(--admin-border-amber)] bg-[var(--admin-sidebar-hover)] font-semibold text-[var(--admin-accent)]"
        : "text-[var(--admin-muted)] hover:bg-[var(--admin-sidebar-hover)] hover:text-white"
    }`,
  child: (active) =>
    `flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors ${
      active
        ? "border border-[var(--admin-border-amber)] bg-[var(--admin-sidebar-hover)] font-semibold text-[var(--admin-accent)]"
        : "text-[var(--admin-muted)] hover:bg-[var(--admin-sidebar-hover)] hover:text-white"
    }`,
  drop: (active) =>
    `flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors ${
      active
        ? "border border-[var(--admin-border-amber)] bg-[var(--admin-sidebar-hover)] font-semibold text-[var(--admin-accent)]"
        : "text-[var(--admin-muted)] hover:bg-[var(--admin-sidebar-hover)] hover:text-white"
    }`,
};

export default function Layout({ children }) {
  const [sidebarOpen,      setSidebarOpen]      = useState(false);
  const [headerManual,     setHeaderManual]      = useState(false);
  const [homepageManual,   setHomepageManual]    = useState(false);
  const [storeLocatorManual, setStoreLocatorManual] = useState(false);
  const [contactUsManual,   setContactUsManual]     = useState(false);
  const [footerManual,     setFooterManual]      = useState(false);
  const [certificationsManual, setCertificationsManual] = useState(false);
  const [logoutOpen,       setLogoutOpen]        = useState(false);
  const [siteLogo,         setSiteLogo]          = useState(fallbackLogo);

  const { user, logout } = useAuth();
  const isAdmin  = user?.role === "admin";
  const isSuperAdmin = user?.is_super_admin === true;
  const location = useLocation();
  const navigate = useNavigate();

  /* ── derive dropdown open state from route (no setState-in-effect) */
  const headerOpen = headerManual || location.pathname.startsWith("/header/");
  const homepageOpen = homepageManual
    || location.pathname.startsWith("/homepage/")
    || location.pathname.startsWith("/homepage-sliders")
    || location.pathname.startsWith("/homepage-promo-cards")
    || location.pathname.startsWith("/featured-brands")
    || location.pathname.startsWith("/trust-badges");
  const storeLocatorOpen = storeLocatorManual || location.pathname.startsWith("/store-locator/");
  const contactUsOpen = contactUsManual
    || location.pathname === "/contact-settings"
    || location.pathname.startsWith("/contact-info-cards")
    || location.pathname.startsWith("/contact-faqs")
    || location.pathname.startsWith("/contact-messages");
  const footerOpen = footerManual || location.pathname.startsWith("/footer/");
  const certificationsOpen = certificationsManual || location.pathname.startsWith("/certifications/");

  /* ── fetch logo from site settings once ── */
  useEffect(() => {
    getSettings()
      .then((res) => {
        const s = res?.data?.data ?? res?.data ?? {};
        const logo = s.navbar_logo || s.nav_logo || "";
        if (logo && /^https?:\/\//i.test(logo)) setSiteLogo(logo);
      })
      .catch(() => {});
  }, []);

  /* ── body scroll lock on mobile overlay ── */
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  /* ── Escape key closes logout dialog ── */
  useEffect(() => {
    if (!logoutOpen) return undefined;
    const onKey = (e) => { if (e.key === "Escape") setLogoutOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [logoutOpen]);

  const pageTitle = useMemo(() => {
    if (PAGE_TITLES[location.pathname]) return PAGE_TITLES[location.pathname];
    if (location.pathname.startsWith("/store-locator/branches/edit")) return "Edit Branch";
    if (location.pathname.startsWith("/store-locator/gallery/edit"))  return "Edit Gallery Image";
    if (location.pathname.startsWith("/contact-info-cards/edit"))     return "Edit Info Card";
    if (location.pathname.startsWith("/contact-faqs/edit"))           return "Edit FAQ";
    if (location.pathname.startsWith("/homepage-promo-cards/edit"))   return "Edit Promo Card";
    if (location.pathname.startsWith("/featured-brands/edit"))        return "Edit Brand";
    if (location.pathname.startsWith("/trust-badges/edit"))           return "Edit Trust Badge";
    if (location.pathname.startsWith("/homepage-sliders/edit"))       return "Edit Slider";
    if (location.pathname.startsWith("/products/edit"))          return "Edit Product";
    if (location.pathname.startsWith("/commitment/edit"))        return "Edit Commitment Item";
    if (location.pathname.startsWith("/blogs/edit"))             return "Edit Blog";
    return "Dashboard";
  }, [location.pathname]);

  const isActive = (path) =>
    path === "/dashboard"
      ? location.pathname === "/" || location.pathname === "/dashboard"
      : location.pathname.startsWith(path);

  const closeSidebar = () => setSidebarOpen(false);

  const resolvePhoto = (value) => {
    const raw = String(value || "").trim();
    if (!raw) return "";
    if (/^https?:\/\//i.test(raw)) return raw;
    const root = getBackendRoot();
    return raw.startsWith("/") ? `${root}${raw}` : `${root}/uploads/${raw}`;
  };

  const photoUrl = resolvePhoto(user?.profile_photo);

  return (
    <div className="admin-theme flex min-h-screen w-full bg-[var(--admin-bg)] text-white">

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* ══ SIDEBAR ══════════════════════════════════════════ */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-[100] flex w-64 max-w-[85vw] flex-col
          border-r border-[var(--admin-border)] bg-[var(--admin-sidebar)]
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        {/* Brand logo */}
        <div className="flex items-center gap-2 border-b border-[var(--admin-border)] px-3 py-3.5">
          <Link
            to="/dashboard"
            onClick={closeSidebar}
            className="group flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] px-3 py-2.5 transition-all hover:border-[var(--admin-border-amber)] hover:shadow-[0_0_16px_rgba(224,184,92,0.15)]"
          >
            <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-green-deep)] shadow-[0_4px_14px_rgba(73,99,72,0.5)]">
              <img
                src="/public/logo/General trading white storke.png"
                alt="Swift Sign"
                className="h-full w-full object-cover"
                onError={(e) => { e.currentTarget.src = fallbackLogo; }}
              />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[var(--admin-muted)]">Admin Panel</p>
              <p className="truncate text-sm font-bold text-white transition-colors group-hover:text-[var(--admin-accent)]">
                Swift Sign
              </p>
            </div>
          </Link>

          {/* Mobile close */}
          <button
            type="button"
            onClick={closeSidebar}
            className="flex-shrink-0 rounded-lg p-1.5 text-[var(--admin-muted)] hover:bg-[var(--admin-sidebar-hover)] hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <span className="pi pi-times" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2.5 pb-4">
          <p className="mb-1 mt-2 px-3 text-[9px] font-bold uppercase tracking-widest text-[var(--admin-muted)]">
            Main
          </p>

          {NAV.filter((item) => (!item.adminOnly || isAdmin) && (!item.superAdminOnly || isSuperAdmin)).map((item) => {

            /* Header module dropdown */
            if (item.group === "header") {
              const active = location.pathname.startsWith("/header/");
              return (
                <div key="header-drop" className="mb-0.5">
                  <button type="button" onClick={() => setHeaderManual((p) => !p)} className={cls.drop(active)}>
                    <span>{item.label}</span>
                    <span className={`pi ${headerOpen ? "pi-chevron-up" : "pi-chevron-down"} text-[10px] opacity-60`} />
                  </button>
                  {headerOpen && (
                    <div className="ml-3 mt-0.5 space-y-0.5">
                      {NAV.filter((e) => e.child && e.childGroup === "header").map((e) => (
                        <Link
                          key={e.path}
                          to={e.path}
                          onClick={closeSidebar}
                          className={cls.child(location.pathname === e.path || location.pathname.startsWith(e.path + "/"))}
                        >
                          {e.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            /* Home Page module dropdown */
            if (item.group === "homepage") {
              const active = homepageOpen;
              return (
                <div key="homepage-drop" className="mb-0.5">
                  <button type="button" onClick={() => setHomepageManual((p) => !p)} className={cls.drop(active)}>
                    <span>{item.label}</span>
                    <span className={`pi ${homepageOpen ? "pi-chevron-up" : "pi-chevron-down"} text-[10px] opacity-60`} />
                  </button>
                  {homepageOpen && (
                    <div className="ml-3 mt-0.5 space-y-0.5">
                      {NAV.filter((e) => e.child && e.childGroup === "homepage").map((e) => (
                        <Link
                          key={e.path}
                          to={e.path}
                          onClick={closeSidebar}
                          className={cls.child(location.pathname === e.path || location.pathname.startsWith(e.path + "/"))}
                        >
                          {e.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            /* Store Locator dropdown */
            if (item.group === "storeLocator") {
              const active = location.pathname.startsWith("/store-locator/");
              return (
                <div key="store-locator-drop" className="mb-0.5">
                  <button type="button" onClick={() => setStoreLocatorManual((p) => !p)} className={cls.drop(active)}>
                    <span>{item.label}</span>
                    <span className={`pi ${storeLocatorOpen ? "pi-chevron-up" : "pi-chevron-down"} text-[10px] opacity-60`} />
                  </button>
                  {storeLocatorOpen && (
                    <div className="ml-3 mt-0.5 space-y-0.5">
                      {NAV.filter((e) => e.child && e.childGroup === "storeLocator").map((e) => (
                        <Link
                          key={e.path}
                          to={e.path}
                          onClick={closeSidebar}
                          className={cls.child(location.pathname === e.path || location.pathname.startsWith(e.path + "/"))}
                        >
                          {e.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            /* Contact Page dropdown */
            if (item.group === "contactUs") {
              const active = contactUsOpen;
              return (
                <div key="contact-us-drop" className="mb-0.5">
                  <button type="button" onClick={() => setContactUsManual((p) => !p)} className={cls.drop(active)}>
                    <span>{item.label}</span>
                    <span className={`pi ${contactUsOpen ? "pi-chevron-up" : "pi-chevron-down"} text-[10px] opacity-60`} />
                  </button>
                  {contactUsOpen && (
                    <div className="ml-3 mt-0.5 space-y-0.5">
                      {NAV.filter((e) => e.child && e.childGroup === "contactUs").map((e) => (
                        <Link
                          key={e.label}
                          to={e.path}
                          onClick={closeSidebar}
                          className={cls.child(location.pathname === e.path || location.pathname.startsWith(e.path + "/"))}
                        >
                          {e.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            /* Footer dropdown */
            if (item.group === "footer") {
              const active = location.pathname.startsWith("/footer/");
              return (
                <div key="footer-drop" className="mb-0.5">
                  <button type="button" onClick={() => setFooterManual((p) => !p)} className={cls.drop(active)}>
                    <span>{item.label}</span>
                    <span className={`pi ${footerOpen ? "pi-chevron-up" : "pi-chevron-down"} text-[10px] opacity-60`} />
                  </button>
                  {footerOpen && (
                    <div className="ml-3 mt-0.5 space-y-0.5">
                      {NAV.filter((e) => e.child && e.childGroup === "footer").map((e) => (
                        <Link
                          key={e.path}
                          to={e.path}
                          onClick={closeSidebar}
                          className={cls.child(location.pathname === e.path || location.pathname.startsWith(e.path + "/"))}
                        >
                          {e.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            /* Certifications dropdown */
            if (item.group === "certifications") {
              const active = location.pathname.startsWith("/certifications/");
              return (
                <div key="certifications-drop" className="mb-0.5">
                  <button type="button" onClick={() => setCertificationsManual((p) => !p)} className={cls.drop(active)}>
                    <span>{item.label}</span>
                    <span className={`pi ${certificationsOpen ? "pi-chevron-up" : "pi-chevron-down"} text-[10px] opacity-60`} />
                  </button>
                  {certificationsOpen && (
                    <div className="ml-3 mt-0.5 space-y-0.5">
                      {NAV.filter((e) => e.child && e.childGroup === "certifications").map((e) => (
                        <Link
                          key={e.path}
                          to={e.path}
                          onClick={closeSidebar}
                          className={cls.child(location.pathname === e.path || location.pathname.startsWith(e.path + "/"))}
                        >
                          {e.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

if (item.child) return null;

            return (
              <Link key={item.path} to={item.path} onClick={closeSidebar} className={cls.link(isActive(item.path))}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="border-t border-[var(--admin-border)] p-2.5">
          <Link
            to="/profile"
            onClick={closeSidebar}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-[var(--admin-sidebar-hover)]"
          >
            {photoUrl ? (
              <img src={photoUrl} alt={user?.name} className="h-8 w-8 flex-shrink-0 rounded-full object-cover ring-2 ring-[var(--admin-border-amber)]" />
            ) : (
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--admin-primary)] to-[var(--admin-accent)] text-xs font-bold ring-2 ring-[var(--admin-border-amber)]">
                {user?.name?.[0]?.toUpperCase() || "A"}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">{user?.name || "Admin"}</p>
              <p className="text-xs capitalize text-[var(--admin-muted)]">{user?.role || "user"}</p>
            </div>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLogoutOpen(true); }}
              className="flex-shrink-0 rounded-lg p-1.5 text-[var(--admin-muted)] hover:bg-[var(--admin-sidebar-hover)] hover:text-white"
              aria-label="Logout"
            >
              <span className="pi pi-sign-out text-sm" />
            </button>
          </Link>
        </div>
      </aside>

      {/* ══ MAIN AREA ════════════════════════════════════════ */}
      <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
        {/* Topbar */}
        <header className="sticky top-0 z-40 flex min-h-14 items-center gap-3 border-b border-[var(--admin-border)] bg-[var(--admin-card)]/90 px-4 py-2.5 backdrop-blur-lg sm:min-h-16 sm:px-6">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="flex-shrink-0 rounded-lg p-2 text-[var(--admin-muted)] transition-colors hover:bg-[var(--admin-sidebar-hover)] hover:text-white lg:hidden"
            aria-label="Open menu"
          >
            <span className="pi pi-bars text-base" />
          </button>

          <h1 className="min-w-0 flex-1 truncate text-base font-bold text-white sm:text-lg">{pageTitle}</h1>

          <button
            type="button"
            onClick={() => setLogoutOpen(true)}
            className="rounded-lg bg-[var(--admin-primary)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--admin-primary-strong)]"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 overflow-x-hidden p-4 sm:p-5 lg:p-6">{children}</main>
      </div>

      {/* ══ LOGOUT DIALOG ════════════════════════════════════ */}
      {logoutOpen && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-[var(--admin-border-amber)] bg-[var(--admin-card)] p-6 shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--admin-primary-light)]">
                <span className="pi pi-sign-out text-[var(--admin-primary)]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Logout</h3>
                <p className="text-xs text-[var(--admin-muted)]">You will be returned to the login page.</p>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setLogoutOpen(false)}
                className="rounded-lg border border-[var(--admin-border)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--admin-card-elevated)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => { setLogoutOpen(false); logout(); navigate("/login"); }}
                className="rounded-lg bg-[var(--admin-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--admin-primary-strong)]"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
