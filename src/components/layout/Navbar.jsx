import { NavLink, Link, useNavigate } from 'react-router-dom'
import { FileUp, Menu, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import clsx from 'clsx'
import { categories, diseasesList } from '../../data/categories'

const navLinks = [
  { label: 'Home', labelShort: 'Home',  to: '/',                },
  { label: 'Blog', labelShort: 'Blog',  to: '/blog',            },
  { label: 'Certification', labelShort: 'Certification', to: '/certification',   },
  { label: 'Store Locator', labelShort: 'Stores', to: '/store-locator',   },
  { label: 'Contact', labelShort: 'Contact', to: '/contact',         },
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
      <div className="max-w-[1450px] mx-auto px-2 sm:px-3 lg:px-4 flex items-center justify-between gap-1 sm:gap-1.5 lg:gap-3 flex-nowrap overflow-hidden"
           style={{ minHeight: '52px', paddingTop: '7px', paddingBottom: '7px' }}>

        {/* ── NAV LINKS ─────────────────────────────────── */}
        <div className="flex items-center justify-start gap-1 sm:gap-2 lg:gap-3 flex-nowrap" style={{ order: 1, minWidth: 0, flex: 1 }}>

          {/* ── CATEGORIES DROPDOWN ─────────────────────────────────── */}
          <div className="relative group flex items-center h-full flex-shrink-0">
            <button className="flex items-center gap-1 bg-[#0FAFB8] text-white px-2 sm:px-2.5 lg:px-4 py-1.5 lg:py-2.5 rounded-full font-bold text-[10px] sm:text-xs lg:text-sm hover:bg-[#0a9aa5] transition-colors flex-shrink-0">
              <Menu size={14} className="sm:hidden" />
              <Menu size={15} className="hidden sm:block lg:hidden" />
              <Menu size={18} className="hidden lg:block" />
              <span className="hidden xs:inline">Categories</span>
            </button>
            
            {/* Primary Dropdown (Left Menu) */}
            <div className="absolute top-[100%] left-0 mt-[1px] bg-white shadow-xl border border-gray-100 rounded-b-lg min-w-[200px] sm:min-w-[260px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col py-2">
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
                      className="absolute top-0 left-[100%] ml-0 bg-white shadow-xl border border-gray-100 rounded-lg min-w-[300px] sm:min-w-[450px] min-h-[100%] opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 z-50 p-3 sm:p-6 cursor-default"
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-center mb-3 sm:mb-4 border-b pb-2 sm:pb-3">
                        <h3 className="font-extrabold text-[14px] sm:text-[18px] text-gray-800">{item.name}</h3>
                        <Link to={item.to} className="text-[11px] sm:text-[13px] text-[#0FAFB8] hover:underline font-bold">View All</Link>
                      </div>
                      <div className="grid grid-cols-2 gap-x-3 sm:gap-x-6 gap-y-2 sm:gap-y-3">
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
                              className="text-[11px] sm:text-[13px] text-gray-600 hover:text-[#0FAFB8] hover:bg-gray-50 px-1.5 sm:px-2 py-1 sm:py-1.5 rounded transition-colors truncate block"
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
                  'flex items-center gap-1 font-medium px-1.5 sm:px-2 lg:px-3 py-1.5 lg:py-2 rounded transition-colors duration-[150ms] whitespace-nowrap flex-shrink-0',
                  isActive
                    ? 'text-[#0FAFB8]'
                    : 'text-gray-700 hover:text-[#0FAFB8]'
                )
              }
              style={{ fontSize: 'clamp(10px, 1.5vw, 15px)' }}
            >
              <span className="lg:hidden">{link.labelShort}</span>
              <span className="hidden lg:inline">{link.label}</span>
            </NavLink>
          ))}
        </div>

        {/* ── LICENSE & PRESCRIPTION ─────────────────────────────────── */}
        <div className="flex-shrink-0 flex items-center gap-1 sm:gap-1.5 lg:gap-3 w-full sm:w-auto" style={{ order: 2 }}>
          <div className="hidden lg:block text-gray-700 text-right leading-tight text-[11px]">
            <div>PCP License Number:</div>
            <div className="text-[12px] font-medium">2659-A/2014-PC</div>
          </div>
          <Link
            to="/asaan-order"
            className="flex items-center gap-0.5 sm:gap-1 lg:gap-1.5 bg-[#0FAFB8] text-white border-2 border-[#0FAFB8] hover:bg-white hover:text-[#0FAFB8]
                       px-2 sm:px-2.5 lg:px-4 py-1.5 lg:py-2 rounded-full font-bold text-[9px] sm:text-[10px] lg:text-[13px] transition-colors flex-shrink-0"
          >
            <FileUp size={12} className="sm:hidden" strokeWidth={2.5} />
            <FileUp size={13} className="hidden sm:block lg:hidden" strokeWidth={2.5} />
            <FileUp size={14} className="hidden lg:block" strokeWidth={2.5} />
            <span className="hidden sm:inline">PRESCRIPTION</span>
            <span className="sm:hidden">Rx</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
