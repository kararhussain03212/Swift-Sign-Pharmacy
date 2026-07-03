import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, User, ShoppingCart, X, Menu, ChevronRight, MapPin, Heart } from 'lucide-react'
import useCartStore from '../../store/cartStore'
import useLocationStore from '../../store/locationStore'
import useWishlistStore from '../../store/wishlistStore'
import CartDrawer from '../modals/CartDrawer'
import SearchDropdown from '../modals/SearchDropdown'
import LocationSelector from '../modals/LocationSelector'
import { VscPercentage } from "react-icons/vsc"
import { getEstimatedDeliveryDays } from '../../data/locations'
import { getSiteSettings, resolveUploadUrl } from '../../services/headerApi'

const navLinks = [
  { label: 'Home',          to: '/' },
  { label: 'Blog',          to: '/blog' },
  { label: 'Store Locator', to: '/store-locator' },
  { label: 'Contact',       to: '/contact' },
]

const FALLBACK_SITE_SETTINGS = {
  site_name: 'Arion Pharmacy',
  logo_url: null,
  hot_deals_link: '/shop/deals',
  hot_deals_text: 'Hot Deals',
  hot_deals_enabled: 1,
  prescription_link: '/asaan-order',
  prescription_text: 'Prescription',
  prescription_enabled: 1,
  country: 'Pakistan',
}

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false)

  const { items: cartItems } = useCartStore()
  const { location } = useLocationStore()
  const { items: wishlistItems } = useWishlistStore()
  const [siteSettings, setSiteSettings] = useState(null)

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0)
  const resolvedSettings = siteSettings ?? FALLBACK_SITE_SETTINGS

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    let active = true
    getSiteSettings()
      .then((data) => active && setSiteSettings(data ? { ...FALLBACK_SITE_SETTINGS, ...data } : FALLBACK_SITE_SETTINGS))
      .catch(() => active && setSiteSettings(FALLBACK_SITE_SETTINGS))
    return () => {
      active = false
    }
  }, [])

  // Prevent background scrolling when sidebar is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMobileSidebarOpen])

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-[300ms]
                    ${scrolled ? 'shadow-nav' : 'shadow-sm'}`}
        style={{ borderBottom: '1px solid #e5e5e5' }}
      >
        {/* ── MAIN ROW ─────────────────────────────────── */}
        <div className="max-w-[1450px] mx-auto px-3 sm:px-6 flex items-center gap-2 sm:gap-4 md:gap-6 h-20 sm:h-[70px] md:h-[100px]">

          {/* ── MOBILE: Menu & Search Icons (Left) ────────────────────── */}
          <div className="flex items-center gap-2 sm:hidden flex-shrink-0">
            <button
              className="text-gray-700 hover:text-[#0FAFB8] transition-colors p-1"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <button
              className="text-gray-500 hover:text-primary transition-colors p-1"
              onClick={() => setMobileSearchOpen(s => !s)}
              aria-label="Toggle search"
            >
              <Search size={20} strokeWidth={1.75} />
            </button>
          </div>

          {/* ── LOGO (Center on mobile, left on desktop) ──────────────── */}
          <Link to="/" className="flex items-center gap-1.5 group flex-1 sm:flex-shrink-0 justify-center sm:justify-start">
            {resolvedSettings.logo_url ? (
              <img
                src={resolveUploadUrl(resolvedSettings.logo_url)}
                alt={resolvedSettings.site_name}
                className="h-8 sm:h-9 md:h-12 lg:h-10 w-auto object-contain"
              />
            ) : (
              <span className="font-bold text-gray-900 tracking-tight text-base sm:text-lg md:text-4xl lg:text-3xl"
                    style={{ letterSpacing: '-0.5px' }}>
                {resolvedSettings.site_name}
              </span>
            )}
          </Link>

          {/* ── SEARCH BAR (Left-aligned next to logo, desktop only) ──── */}
          <div className="hidden sm:flex relative min-w-0" style={{ flex: '1 1 auto', maxWidth: '600px' }}>
            <div
              className={`flex items-center w-full transition-all duration-[150ms]
                          ${isSearchFocused ? 'ring-2 ring-primary ring-offset-0' : ''}`}
              style={{
                height: 'clamp(42px, 6vw, 50px)',
                border: `1px solid ${isSearchFocused ? '#0FAFB8' : '#e5e5e5'}`,
                borderRadius: '50px',
                overflow: 'hidden',
                backgroundColor: '#f4f3f3',
              }}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                placeholder="Search products"
                style={{ fontSize: 'clamp(12px, 1.5vw, 15px)' }}
                className="flex-1 px-4 outline-none bg-transparent text-gray-700
                           placeholder:text-gray-400 w-full min-w-0"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}
                        className="pr-2 text-gray-400 hover:text-gray-600 flex-shrink-0">
                  <X size={window.innerWidth >= 768 ? 16 : 14} />
                </button>
              )}
              <button
                className="flex items-center justify-center flex-shrink-0
                           hover:opacity-90 transition-opacity duration-[150ms]"
                style={{
                  width: 'clamp(42px, 6vw, 50px)',
                  height: 'clamp(42px, 6vw, 50px)',
                  backgroundColor: '#0FAFB8',
                  borderRadius: '0 50px 50px 0',
                }}
              >
                <Search size={window.innerWidth >= 1024 ? 20 : window.innerWidth >= 768 ? 18 : 15} color="white" />
              </button>
            </div>

            {searchQuery.length > 1 && isSearchFocused && (
              <SearchDropdown query={searchQuery} />
            )}
          </div>

          {/* ── HOT DEALS (Centered in remaining space) ──────────────── */}
          {Number(resolvedSettings.hot_deals_enabled) === 1 && (
            <div className="hidden md:flex flex-1 justify-center">
              <Link
                to={resolvedSettings.hot_deals_link || '/shop?deals=true'}
                className="flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-full text-white font-bold hover:scale-105 transition-all whitespace-nowrap relative overflow-hidden group"
                style={{
                  fontSize: 'clamp(10px, 1.5vw, 15px)',
                  backgroundColor: '#FF0000',
                  boxShadow: '0 4px 15px rgba(255, 0, 0, 0.4)',
                  letterSpacing: '0.5px',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                              transform translate-x-full group-hover:translate-x-0 transition-transform duration-700 group-hover:duration-500"
                     style={{ width: '200%' }} />
                <div className="relative z-10 flex items-center gap-2">
                  {/* <VscPercentage size={16} className="animate-bounce text-white" style={{ animationDuration: '1.5s' }} /> */}
                  <span>{resolvedSettings.hot_deals_text || 'Hot Deals'}</span>
                  <span className="inline-block animate-pulse">🔥</span>
                </div>
              </Link>
            </div>
          )}

          {/* ── RIGHT ICONS ──────────────────────────────── */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 ml-auto flex-shrink-0">

            {/* Mobile location icon */}
            <button
              className="sm:hidden text-gray-500 hover:text-primary transition-colors p-1"
              onClick={() => setIsLocationSelectorOpen(true)}
              aria-label="Location"
            >
              <MapPin size={20} strokeWidth={1.75} />
            </button>

            {/* Country flag (md+) */}
            <div className="hidden lg:flex flex-col items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/32/Flag_of_Pakistan.svg"
                alt={resolvedSettings.country}
                className="w-[28px] h-[18px] object-cover rounded-[2px] shadow-sm mb-1"
              />
              <span className="text-[9px] font-bold text-gray-700 leading-none">{resolvedSettings.country}</span>
            </div>

            <div className="hidden lg:block w-px h-8" style={{ backgroundColor: '#e5e5e5' }} />

            {/* Account (md+) */}
            <button className="hidden md:flex text-gray-500 hover:text-primary transition-colors duration-[150ms]" aria-label="Account">
              <User size={24} strokeWidth={1.75} />
            </button>

            {/* Wishlist (lg+) */}
            <Link
              to="/wishlist"
              className="hidden lg:flex text-gray-500 hover:text-primary transition-colors duration-[150ms] p-1"
              aria-label="Wishlist"
            >
              <Heart className="w-[20px] h-[20px]" strokeWidth={1.75} />
              {wishlistItems.length > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center
                                 text-white font-bold rounded-full animate-pulse-glow"
                      style={{ width: '15px', height: '15px', fontSize: '9px', backgroundColor: '#0FAFB8' }}>
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              className="relative text-gray-500 hover:text-primary transition-colors duration-[150ms] p-1"
              onClick={() => setIsCartOpen(true)}
              aria-label="Cart"
            >
              <ShoppingCart className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]" strokeWidth={1.75} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center
                                 text-white font-bold rounded-full animate-pulse-glow"
                      style={{ width: '15px', height: '15px', fontSize: '9px', backgroundColor: '#0FAFB8' }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ── MOBILE SEARCH DROPDOWN ───────────────────── */}
        {mobileSearchOpen && (
          <div className="sm:hidden px-3 pb-3 pt-1">
            <div
              className={`flex items-center transition-all duration-[150ms]
                          ${isSearchFocused ? 'ring-2 ring-primary ring-offset-0' : ''}`}
              style={{
                height: '44px',
                border: `1px solid ${isSearchFocused ? '#0FAFB8' : '#e5e5e5'}`,
                borderRadius: '50px',
                overflow: 'hidden',
                backgroundColor: '#f4f3f3',
              }}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                placeholder="Search medicines, vitamins..."
                autoFocus
                style={{ fontSize: '12px' }}
                className="flex-1 px-4 outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="pr-2 text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              )}
              <button
                className="flex items-center justify-center flex-shrink-0 hover:opacity-90"
                style={{ width: '44px', height: '44px', backgroundColor: '#0FAFB8', borderRadius: '0 50px 50px 0' }}
              >
                <Search size={15} color="white" />
              </button>
            </div>

            {searchQuery.length > 1 && isSearchFocused && (
              <div className="relative">
                <SearchDropdown query={searchQuery} />
              </div>
            )}
          </div>
        )}
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <LocationSelector isOpen={isLocationSelectorOpen} onClose={() => setIsLocationSelectorOpen(false)} />

      {/* ── MOBILE SIDEBAR DRAWER ─────────────────────── */}
      <>
        {/* Backdrop */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-[9999] sm:hidden transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 bottom-0 w-[280px] bg-white z-[10000] sm:hidden
                      shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col
                      ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <span className="font-bold text-gray-900 text-lg">Menu</span>
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-700 bg-gray-50 p-2 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Delivery Location */}
          <button
            onClick={() => {
              setIsLocationSelectorOpen(true)
              setIsMobileSidebarOpen(false)
            }}
            className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-50 hover:bg-gray-50 transition-colors w-full"
          >
            <MapPin size={18} className="text-[#0FAFB8] flex-shrink-0" />
            <div className="flex flex-col items-start">
              <span className="text-[11px] text-gray-500 font-semibold">DELIVER TO</span>
              <span className="text-sm font-bold text-gray-900">{location?.city || 'Select Location'}</span>
            </div>
          </button>

          {/* Links */}
          <div className="flex flex-col py-2 overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setIsMobileSidebarOpen(false)}
                className="flex items-center justify-between px-5 py-3.5 text-gray-700 hover:bg-gray-50 hover:text-[#0FAFB8] transition-colors border-b border-gray-50 last:border-0"
              >
                <span className="font-semibold text-[15px]">{link.label}</span>
                <ChevronRight size={16} className="text-gray-400" />
              </Link>
            ))}
          </div>
          
          {/* Bottom Actions */}
          <div className="mt-auto p-5 border-t border-gray-100 bg-gray-50">
            <Link
              to={resolvedSettings.prescription_link || '/asaan-order'}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="flex items-center justify-center gap-2 bg-[#0FAFB8] text-white w-full py-3 rounded-xl font-bold text-sm hover:bg-[#0a9aa5] transition-colors"
            >
              {resolvedSettings.prescription_text || 'Prescription'}
            </Link>
          </div>
        </div>
      </>
    </>
  )
}

export default Header
