import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, User, Heart, ShoppingCart, X } from 'lucide-react'
import useCartStore from '../../store/cartStore'
import useWishlistStore from '../../store/wishlistStore'
import CartDrawer from '../modals/CartDrawer'
import SearchDropdown from '../modals/SearchDropdown'
import { VscPercentage } from "react-icons/vsc"


const Header = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const { items: cartItems } = useCartStore()
  const { items: wishlistItems } = useWishlistStore()

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0)
  const wishlistCount = wishlistItems.length

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-[300ms]
                    ${scrolled ? 'shadow-nav' : 'shadow-sm'}`}
        style={{ borderBottom: '1px solid #e5e5e5' }}
      >
        {/* ── MAIN ROW ─────────────────────────────────── */}
        <div className="max-w-[1450px] mx-auto px-3 sm:px-6 flex items-center gap-2 sm:gap-4 md:gap-6 h-14 sm:h-[70px] md:h-[90px]">

          {/* ── LOGO ─────────────────────────────────────── */}
          <Link to="/" className="flex items-center gap-1.5 flex-shrink-0 group">
            <span className="font-bold text-gray-900 tracking-tight text-lg sm:text-2xl md:text-[30px]"
                  style={{ letterSpacing: '-0.5px' }}>
              Logo Here
            </span>
          </Link>

          {/* ── SEARCH BAR (Left-aligned next to logo) ──── */}
          <div className="hidden sm:flex relative min-w-0" style={{ flex: '1 1 auto', maxWidth: '450px' }}>
            <div
              className={`flex items-center w-full transition-all duration-[150ms]
                          ${isSearchFocused ? 'ring-2 ring-primary ring-offset-0' : ''}`}
              style={{
                height: '42px',
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
                style={{ fontSize: '14px' }}
                className="flex-1 px-4 outline-none bg-transparent text-gray-700
                           placeholder:text-gray-400 w-full min-w-0"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}
                        className="pr-2 text-gray-400 hover:text-gray-600 flex-shrink-0">
                  <X size={14} />
                </button>
              )}
              <button
                className="flex items-center justify-center flex-shrink-0
                           hover:opacity-90 transition-opacity duration-[150ms]"
                style={{
                  width: '42px',
                  height: '42px',
                  backgroundColor: '#0FAFB8',
                  borderRadius: '0 50px 50px 0',
                }}
              >
                <Search size={15} color="white" />
              </button>
            </div>

            {searchQuery.length > 1 && isSearchFocused && (
              <SearchDropdown query={searchQuery} />
            )}
          </div>

          {/* ── HOT DEALS (Centered in remaining space) ──────────────── */}
          <div className="hidden md:flex flex-1 justify-center">
            <Link
              to="/shop?deals=true"
              className="flex items-center gap-2 px-4 lg:px-5 py-2.5 rounded-full text-white font-bold hover:scale-105 transition-all whitespace-nowrap relative overflow-hidden group"
              style={{
                fontSize: '13px',
                backgroundColor: '#FF4757',
                boxShadow: '0 4px 15px rgba(255, 71, 87, 0.4)',
                letterSpacing: '0.5px',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                            transform translate-x-full group-hover:translate-x-0 transition-transform duration-700 group-hover:duration-500"
                   style={{ width: '200%' }} />
              <div className="relative z-10 flex items-center gap-2">
                <VscPercentage size={16} className="animate-bounce text-white" style={{ animationDuration: '1.5s' }} />
                <span>Hot Deals</span>
                <span className="inline-block animate-pulse">🔥</span>
              </div>
            </Link>
          </div>

          {/* ── RIGHT ICONS ──────────────────────────────── */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 ml-auto flex-shrink-0">

            {/* Mobile search icon */}
            <button
              className="sm:hidden text-gray-500 hover:text-primary transition-colors p-1"
              onClick={() => setMobileSearchOpen(s => !s)}
              aria-label="Toggle search"
            >
              <Search size={20} strokeWidth={1.75} />
            </button>

            {/* Country flag (md+) */}
            <div className="hidden lg:flex flex-col items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/32/Flag_of_Pakistan.svg"
                alt="Pakistan"
                className="w-[28px] h-[18px] object-cover rounded-[2px] shadow-sm mb-1"
              />
              <span className="text-[11px] font-bold text-gray-700 leading-none">Pakistan</span>
            </div>

            <div className="hidden lg:block w-px h-8" style={{ backgroundColor: '#e5e5e5' }} />

            {/* Account (md+) */}
            <button className="hidden md:flex text-gray-500 hover:text-primary transition-colors duration-[150ms]" aria-label="Account">
              <User size={24} strokeWidth={1.75} />
            </button>

            {/* Wishlist */}
            <button
              className="relative text-gray-500 hover:text-primary transition-colors duration-[150ms] p-1"
              onClick={() => navigate('/wishlist')}
              aria-label="Wishlist"
            >
              <Heart className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]" strokeWidth={1.75} />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center
                                 text-white font-bold rounded-full"
                      style={{ width: '15px', height: '15px', fontSize: '9px', backgroundColor: '#0FAFB8' }}>
                  {wishlistCount}
                </span>
              )}
            </button>

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
                style={{ fontSize: '14px' }}
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
    </>
  )
}

export default Header
