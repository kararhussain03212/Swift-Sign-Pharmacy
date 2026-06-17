import { NavLink, Link, useNavigate } from 'react-router-dom'
import { FileUp, Menu, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import clsx from 'clsx'
import { categories, diseasesList } from '../../data/categories'

const navLinks = [
  { label: 'Home',          to: '/',                },
  { label: 'Blog',          to: '/blog',            },
  { label: 'Certification', to: '/certification',   },
  { label: 'Store Locator', to: '/store-locator',   },
  { label: 'Contact',       to: '/contact',         },
]

// Build nav items from categories.js
const navItems = [
  ...categories
    .filter(cat => cat.showInNav !== false)
    .map(cat => ({
      name: cat.name,
      slug: cat.slug,
      to: `/shop?category=${cat.slug}`,
      subCategories: cat.subCategories || []
    }))
]

const Navbar = () => {
  const [activeCategory, setActiveCategory] = useState(navItems[0])
  const navigate = useNavigate()

  return (
    <nav className="hidden sm:block bg-white relative z-40"
         style={{ borderBottom: '1px solid #e5e5e5' }}>

      {/* Top section with location and license (if needed as a separate bar, or integrated) */}
      <div className="max-w-[1450px] mx-auto px-3 sm:px-6 flex items-center justify-between flex-wrap sm:flex-nowrap gap-3 sm:gap-4"
           style={{ minHeight: '50px', paddingTop: '8px', paddingBottom: '8px' }}>

        {/* ── NAV LINKS ─────────────────────────────────── */}
        <div className="flex items-center justify-start flex-wrap gap-1 sm:gap-4" style={{ order: 1 }}>
          
          {/* ── CATEGORIES DROPDOWN ─────────────────────────────────── */}
          <div className="relative group flex items-center h-full">
            <button className="flex items-center gap-2 bg-[#0FAFB8] text-white px-5 py-3 rounded-full font-bold text-sm hover:bg-[#0a9aa5] transition-colors">
              <Menu size={18} />
              Categories
            </button>
            
            {/* Primary Dropdown (Left Menu) */}
            <div className="absolute top-[100%] left-0 mt-[1px] bg-white shadow-xl border border-gray-100 rounded-b-lg min-w-[260px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col py-2">
              {navItems.map(item => (
                <div
                  key={item.slug}
                  className="relative group/item px-4 py-3 text-[13px] font-bold cursor-pointer flex items-center justify-between text-gray-700 hover:bg-gray-50 hover:text-[#0FAFB8] transition-colors"
                  onClick={() => navigate(item.to)}
                >
                  <span>{item.name}</span>
                  {item.subCategories && item.subCategories.length > 0 && (
                    <ChevronRight size={14} className="text-gray-400 group-hover/item:text-[#0FAFB8]" />
                  )}
                  
                  {/* Flyout Menu (Right Menu) */}
                  {item.subCategories && item.subCategories.length > 0 && (
                    <div 
                      className="absolute top-0 left-[100%] ml-0 bg-white shadow-xl border border-gray-100 rounded-lg min-w-[450px] min-h-[100%] opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 z-50 p-6 cursor-default" 
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-center mb-4 border-b pb-3">
                        <h3 className="font-extrabold text-[18px] text-gray-800">{item.name}</h3>
                        <Link to={item.to} className="text-[13px] text-[#0FAFB8] hover:underline font-bold">View All</Link>
                      </div>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                        {item.subCategories.map(sub => {
                          const subName = typeof sub === 'object' ? sub.name : sub
                          const subSlug = typeof sub === 'object' ? sub.slug : sub.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                          const isViewAll = subSlug.startsWith('all-')
                          let subTo = item.slug === 'diseases'
                            ? `/shop?diseaseCategory=${encodeURIComponent(subSlug)}`
                            : `/shop?category=${item.slug}&subCategory=${encodeURIComponent(subSlug)}`

                          if (isViewAll) {
                            subTo = `/shop`
                          }
                          
                          return (
                            <Link
                              key={subSlug}
                              to={subTo}
                              className="text-[13px] text-gray-600 hover:text-[#0FAFB8] hover:bg-gray-50 px-2 py-1.5 rounded transition-colors truncate block"
                            >
                              {subName}
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {navLinks.map(link => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-1 font-medium px-2 sm:px-3 py-2 rounded transition-colors duration-[150ms] whitespace-nowrap',
                  isActive
                    ? 'text-[#0FAFB8]'
                    : 'text-gray-700 hover:text-[#0FAFB8]'
                )
              }
              style={{ fontSize: 'clamp(12px, 2vw, 16px)' }}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* ── LICENSE & PRESCRIPTION ─────────────────────────────────── */}
        <div className="flex-shrink-0 flex items-center gap-2 sm:gap-4 w-full sm:w-auto" style={{ order: 2 }}>
          <div className="hidden lg:block text-gray-700 text-right leading-tight">
            <div className="text-[11px]">PCP License Number:</div>
            <div className="text-[12px] font-medium">2659-A/2014-PC</div>
          </div>
          <Link
            to="/asaan-order"
            className="flex items-center gap-1.5 bg-[#0FAFB8] text-white border-2 border-[#0FAFB8] hover:bg-white hover:text-[#0FAFB8]
                       px-3 sm:px-4 py-1.5 sm:py-2 rounded-[22px] font-bold text-[11px] sm:text-[13px] transition-colors flex-shrink-0"
          >
            <FileUp size={14} strokeWidth={2.5} />
            <span className="hidden sm:inline">PRESCRIPTION</span>
            <span className="sm:hidden">RX</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
