import { useState, useRef, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { AlignJustify, Phone, ChevronDown, ChevronRight } from 'lucide-react'
import clsx from 'clsx'
import { categories } from '../../data/categories'

const navLinks = [
  { label: 'Home',     to: '/',         hasDropdown: false },
  { label: 'Blog',     to: '/blog',     hasDropdown: false },
  { label: 'Medicine', to: '/shop?category=vitamins', hasDropdown: false },
  { label: 'About',    to: '#',         hasDropdown: false },
  { label: 'Contact',  to: '/contact',   hasDropdown: false },
]

const Navbar = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const categoryRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setIsCategoryOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <nav className="hidden md:block bg-white relative z-40"
         style={{ borderBottom: '1px solid #e5e5e5' }}>
      <div className="max-w-[1450px] mx-auto px-6 flex items-center gap-0"
           style={{ height: '80px' }}>

        {/* ── ALL CATEGORIES ────────────────────────────── */}
        <div className="relative flex-shrink-0" ref={categoryRef}>
          <button
            onMouseEnter={() => setIsCategoryOpen(true)}
            onClick={() => setIsCategoryOpen(v => !v)}
            className="flex items-center gap-2 font-semibold text-white
                       transition-all duration-[150ms] hover:opacity-90 mr-6"
            style={{
              backgroundColor: '#1A9E6E',
              borderRadius: '40px',
              paddingLeft: '40px',
              paddingRight: '40px',
              height: '55px',
              fontSize: '15px',
              whiteSpace: 'nowrap',
            }}
          >
            <AlignJustify size={16} strokeWidth={2} />
            All Categories
          </button>

          {/* Category Mega Dropdown */}
          {isCategoryOpen && (
            <div
              onMouseLeave={() => setIsCategoryOpen(false)}
              className="absolute top-full left-0 bg-white animate-fadeIn z-50"
              style={{
                marginTop: '8px',
                width: '240px',
                borderRadius: '10px',
                border: '1px solid #e5e5e5',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                paddingTop: '6px',
                paddingBottom: '6px',
              }}
            >
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  to={`/shop?category=${cat.slug}`}
                  onClick={() => setIsCategoryOpen(false)}
                  className="flex items-center gap-3 px-4 text-gray-600
                             hover:bg-[#E8F5F0] hover:text-[#1A9E6E]
                             transition-colors duration-[150ms]"
                  style={{ fontSize: '13px', paddingTop: '9px', paddingBottom: '9px' }}
                >
                  <img src={cat.image} className="w-6 h-6 object-contain rounded flex-shrink-0"
                       alt={cat.name} />
                  <span className="flex-1">{cat.name}</span>
                  <ChevronRight size={12} className="opacity-30" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ── NAV LINKS ─────────────────────────────────── */}
        <div className="flex items-center flex-1" style={{ gap: '20px' }}>
          {navLinks.map(link => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-1 font-medium px-3 h-full rounded transition-colors duration-[150ms] whitespace-nowrap',
                  isActive
                    ? 'text-[#1A9E6E]'
                    : 'text-gray-700 hover:text-[#1A9E6E]'
                )
              }
              style={{ fontSize: '16px', height: '58px' }}
            >
              {link.label}
              {link.hasDropdown && (
                <ChevronDown size={13} className="opacity-50 mt-0.5" />
              )}
            </NavLink>
          ))}
        </div>

        {/* ── PHONE CTA ─────────────────────────────────── */}
        <div className="flex-shrink-0 ml-auto">
          <button
            className="flex items-center gap-2.5 text-white font-semibold
                       hover:opacity-90 transition-opacity duration-[150ms]"
            style={{
              backgroundColor: '#1A9E6E',
              borderRadius: '40px',
              paddingLeft: '40px',
              paddingRight: '40px',
              height: '60px',
              fontSize: '15px',
            }}
          >
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <Phone size={25} className="text-white" fill="white" />
            </div>
            <div className="text-left leading-tight">
              <div style={{ fontSize: '17px', fontWeight: 600 }}>324 - 897 - 4567</div>
              <div style={{ fontSize: '11px', opacity: 0.8, lineHeight: '1' }}>Support 24/7</div>
            </div>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
