import { NavLink, Link, useNavigate } from 'react-router-dom'
import { FileUp, Menu, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import clsx from 'clsx'
import { categories, diseasesList } from '../../data/categories'
import { licenseInfo } from '../../data/contactInfo'

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
    <>
    <nav className="hidden sm:block bg-white relative z-40"
         style={{ borderBottom: '1px solid #e5e5e5' }}>

      {/* Top section with location and license (if needed as a separate bar, or integrated) */}
      <div className="max-w-[1450px] mx-auto px-2 sm:px-3 lg:px-4 flex items-center justify-between gap-1 sm:gap-1.5 lg:gap-3 flex-nowrap"
           style={{ minHeight: 'clamp(52px, 8vw, 68px)', paddingTop: '10px', paddingBottom: '10px' }}>

        {/* ── NAV LINKS ─────────────────────────────────── */}
        <div className="flex items-center justify-start gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-3 flex-nowrap" style={{ order: 1, minWidth: 0, flex: 1 }}>

          {/* ── CATEGORIES DROPDOWN ─────────────────────────────────── */}
          <div className="relative group flex items-center h-full flex-shrink-0">
            <button className="flex items-center gap-1 bg-[#0FAFB8] text-white px-2 sm:px-2.5 lg:px-5 py-1.5 lg:py-3 rounded-full font-bold text-[8px] sm:text-[9px] lg:text-base hover:bg-[#073B45] transition-all duration-200 ease-in-out transform hover:shadow-lg flex-shrink-0">
              <Menu size={14} className="sm:hidden" />
              <Menu size={15} className="hidden sm:block lg:hidden" />
              <Menu size={20} className="hidden lg:block" />
              <span className="hidden xs:inline">Categories</span>
            </button>

            {/* Primary Dropdown (Left Menu) */}
            <div className="absolute top-full left-0 bg-white shadow-xl border border-gray-100 rounded-lg min-w-[200px] sm:min-w-[260px] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto pointer-events-none transition-all duration-300 z-[999] flex flex-col py-2 pt-2">
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
                      className="absolute top-0 left-full bg-white shadow-xl border border-gray-100 rounded-lg min-w-[300px] sm:min-w-[450px] min-h-[100%] opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible group-hover/item:pointer-events-auto pointer-events-none transition-all duration-300 z-[999] p-3 sm:p-6 cursor-default -ml-1"
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
                  'flex items-center gap-1 font-medium px-1.5 sm:px-2 md:px-2.5 lg:px-3 py-1.5 md:py-2 lg:py-2.5 rounded transition-colors duration-[150ms] whitespace-nowrap flex-shrink-0',
                  isActive
                    ? 'text-[#0FAFB8]'
                    : 'text-gray-700 hover:text-[#0FAFB8]'
                )
              }
              style={{ fontSize: 'clamp(11px, 1.8vw, 15px)' }}
            >
              <span className="lg:hidden">{link.labelShort}</span>
              <span className="hidden lg:inline">{link.label}</span>
            </NavLink>
          ))}
        </div>

        {/* ── LICENSE & PRESCRIPTION ─────────────────────────────────── */}
        <div className="flex-shrink-0 flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-3 w-full sm:w-auto" style={{ order: 2 }}>
          <div className="hidden lg:block w-px h-6" style={{ backgroundColor: '#e5e5e5' }} />
          <div className="hidden lg:block text-gray-700 text-right leading-tight" style={{ fontSize: 'clamp(11px, 1vw, 13px)' }}>
            <div>{licenseInfo.description}:</div>
            <div className="font-medium" style={{ fontSize: 'clamp(12px, 1.1vw, 14px)' }}>{licenseInfo.number}</div>
          </div>
          <Link
            to="/asaan-order"
            className="flex items-center gap-0.5 bg-[#0FAFB8] text-white border-2 border-[#0FAFB8] hover:bg-white hover:text-[#0FAFB8]
                       px-1.5 sm:px-3 py-0.5 lg:py-2 rounded-full font-bold text-[7px] sm:text-[8px] lg:text-sm transition-colors flex-shrink-0"
          >
            <FileUp size={10} className="sm:hidden" strokeWidth={2.5} />
            <FileUp size={11} className="hidden sm:block lg:hidden" strokeWidth={2.5} />
            <FileUp size={14} className="hidden lg:block" strokeWidth={2.5} />
            <span className="hidden sm:inline">PRESCRIPTION</span>
            <span className="sm:hidden">Rx</span>
          </Link>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar
