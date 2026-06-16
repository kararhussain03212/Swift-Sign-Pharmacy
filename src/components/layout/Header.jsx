import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, MapPin, User, Heart, ShoppingCart, X, ChevronDown, Flame } from 'lucide-react'
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
             style={{ height: '90px' }}>

          {/* ── LOGO ───────────────────────────────────── */}
          <Link to="/" className="flex items-center gap-1.5 flex-shrink-0 group">
            <span className="font-bold text-gray-900 tracking-tight"
                  style={{ fontSize: '30px', letterSpacing: '-0.5px' }}>
              Logo Here
            </span>
          </Link>

          {/* ── SEARCH BAR ─────────────────────────────── */}
          <div className="flex-1  relative" style={{ maxWidth: '550px' }}>
            <div
              className={`flex items-center transition-all duration-[150ms]
                          ${isSearchFocused
                            ? 'ring-2 ring-primary ring-offset-0'
                            : ''}`}
              style={{
                height: '48px',
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
                  backgroundColor: '#0FAFB8',
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
          {/* Deals Button */}
          <Link
            to="/shop?deals=true"
            className="flex items-center gap-1.5 px-4 py-3 bg-[#073B45] rounded-full text-white font-semibold hover:bg-[#0FAFB8] transition-colors whitespace-nowrap ml-4 flex-shrink-0"
            style={{ fontSize: '13px' }}
          >
            <VscPercentage size={20} className="animate-pulse text-white" />
            Hot Deals
          </Link>

          {/* ── RIGHT SIDE ICONS ────────────────────────── */}
          <div className="flex items-center gap-5 ml-auto flex-shrink-0">

            {/* Country Selector */}
            <div className="hidden md:flex flex-col items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/32/Flag_of_Pakistan.svg" 
                alt="Pakistan" 
                className="w-[28px] h-[18px] object-cover rounded-[2px] shadow-sm mb-1" 
              />
              <span className="text-[11px] font-bold text-gray-700 leading-none">Pakistan</span>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-8" style={{ backgroundColor: '#e5e5e5' }} />

            {/* Icons & Delivery Container */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-5 mb-1.5">
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
                            backgroundColor: '#0FAFB8',
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
                            backgroundColor: '#0FAFB8',
                          }}>
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
              
              
            </div>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />


    </>
  )
}

export default Header
