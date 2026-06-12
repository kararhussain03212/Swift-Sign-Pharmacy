import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, MapPin, User, Heart, ShoppingCart, X, ChevronDown } from 'lucide-react'
import useCartStore from '../../store/cartStore'
import useWishlistStore from '../../store/wishlistStore'
import CartDrawer from '../modals/CartDrawer'
import SearchDropdown from '../modals/SearchDropdown'
import { VscPercentage } from "react-icons/vsc";
import { categories } from '../../data/categories'

const Header = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
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
        <div className="max-w-[1450px] mx-auto px-6 flex items-center gap-6"
             style={{ height: '100px' }}>

          {/* ── LOGO ───────────────────────────────────── */}
          <Link to="/" className="flex items-center gap-1.5 flex-shrink-0 group">
            <span className="font-bold text-gray-900 tracking-tight"
                  style={{ fontSize: '30px', letterSpacing: '-0.5px' }}>
              Logo Here
            </span>
          </Link>

          {/* ── SEARCH BAR ─────────────────────────────── */}
          <div className="flex-1  relative" style={{ maxWidth: '650px' }}>
            <div
              className={`flex items-center transition-all duration-[150ms]
                          ${isSearchFocused
                            ? 'ring-2 ring-primary ring-offset-0'
                            : ''}`}
              style={{
                height: '48px',
                border: `1px solid ${isSearchFocused ? '#1A9E6E' : '#e5e5e5'}`,
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
                style={{ fontSize: '15px' }}
                className="flex-1 px-5 outline-none bg-transparent text-gray-700
                           placeholder:text-gray-400 w-full"
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
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#1A9E6E',
                  borderRadius: '0 50px 50px 0',
                }}
              >
                <Search size={16} color="white" />
              </button>
            </div>

            {/* Search dropdown */}
            {searchQuery.length > 1 && isSearchFocused && (
              <SearchDropdown query={searchQuery} />
            )}
          </div>

          {/* ── RIGHT SIDE ICONS ────────────────────────── */}
          <div className="flex items-center gap-5 ml-auto flex-shrink-0">

            {/* Delivery location */}
            

            {/* Divider */}
            <div className="hidden lg:block w-px h-8" style={{ backgroundColor: '#e5e5e5' }} />

            {/* Account */}
            <button className="hidden md:flex flex-col items-center gap-0.5
                               text-gray-500 hover:text-primary transition-colors duration-[150ms]">
              <User size={30} strokeWidth={1.75} />
            </button>

            {/* Wishlist */}
            <button
              className="relative text-gray-500 hover:text-primary transition-colors duration-[150ms]"
              onClick={() => navigate('/wishlist')}
            >
              <Heart size={30} strokeWidth={1.75} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center
                                 text-white font-bold rounded-full"
                      style={{
                        width: '16px', height: '16px',
                        fontSize: '9px',
                        backgroundColor: '#1A9E6E',
                      }}>
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              className="relative text-gray-500 hover:text-primary transition-colors duration-[150ms]"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart size={30} strokeWidth={1.75} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center
                                 text-white font-bold rounded-full animate-pulse-glow"
                      style={{
                        width: '16px', height: '16px',
                        fontSize: '9px',
                        backgroundColor: '#1A9E6E',
                      }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

export default Header
