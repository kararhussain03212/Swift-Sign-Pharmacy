import { ChevronDown, Upload } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories, diseasesList } from '../../data/categories'

// Build nav items from categories.js - diseases go first as a special item
const buildNavItems = () => {
  const diseasesItem = {
    name: 'Diseases',
    slug: 'diseases',
    to: '/diseases',
    subCategories: diseasesList.slice(0, 30) // show first 30 in dropdown
  }

  const catItems = categories.map(cat => ({
    name: cat.name,
    slug: cat.slug,
    to: `/shop?category=${cat.slug}`,
    subCategories: cat.subCategories || []
  }))

  return [diseasesItem, ...catItems]
}

const navItems = buildNavItems()

const SecondaryNav = () => {
  return (
    <div className="bg-white hidden md:block relative z-30"
         style={{ borderBottom: '1px solid #e5e5e5' }}>
      <div className="max-w-[1450px] mx-auto px-6">
        <div className="flex items-center justify-between" style={{ height: '40px' }}>
          
          {/* Main Links */}
          <div className="flex items-center gap-0 overflow-x-visible">
            {navItems.map((item, i) => (
              <div key={item.name} className="relative group h-full flex items-center">
                <Link
                  to={item.to}
                  className="flex items-center gap-1 text-gray-600 hover:text-[#1A9E6E]
                             transition-colors duration-[150ms] whitespace-nowrap relative"
                  style={{
                    fontSize: '13px',
                    fontWeight: 400,
                    paddingLeft: i === 0 ? '0px' : '16px',
                    paddingRight: '16px',
                    height: '40px',
                  }}
                >
                  {item.name}
                  {item.subCategories && item.subCategories.length > 0 && (
                    <ChevronDown size={11} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                  )}
                  
                  {/* Active indicator underline on hover */}
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1A9E6E]
                                   scale-x-0 group-hover:scale-x-100
                                   transition-transform duration-[150ms] origin-left" />
                </Link>

                {/* Dropdown Menu */}
                {item.subCategories && item.subCategories.length > 0 && (
                  <div className="absolute top-full left-0 bg-white shadow-card-hover border border-gray-100 
                                  rounded-b-xl py-2 min-w-[220px] max-h-[70vh] overflow-y-auto opacity-0 invisible translate-y-2
                                  group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                                  transition-all duration-200 z-50">
                    {/* "View All" link for Diseases */}
                    {item.slug === 'diseases' && (
                      <Link to="/diseases" className="block px-4 py-2 text-[13px] font-bold text-primary hover:bg-primary-light border-b border-gray-100 mb-1">
                        View A-Z Guide →
                      </Link>
                    )}
                    {item.subCategories.map(sub => {
                      // sub is either an object {name, slug} (diseases) or {name, slug} (category sub)
                      const subName = typeof sub === 'object' ? sub.name : sub
                      const subSlug = typeof sub === 'object' ? sub.slug : sub.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                      const subTo = item.slug === 'diseases'
                        ? `/shop?diseaseCategory=${encodeURIComponent(subSlug)}`
                        : `/shop?category=${item.slug}&subCategory=${encodeURIComponent(subSlug)}`
                      return (
                        <Link
                          key={subSlug}
                          to={subTo}
                          className="block px-4 py-2 text-[13px] text-gray-600 hover:bg-primary-light hover:text-primary transition-colors truncate"
                        >
                          {subName}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side: Asaan Order Button */}
          <div className="flex-shrink-0 ml-4">
            <Link
              to="/asaan-order"
              className="flex items-center gap-1.5 bg-[#1A9E6E] hover:bg-[#157A56] text-white text-[12px] font-semibold px-4 py-1.5 rounded-full transition-colors shadow-sm"
            >
              <Upload size={13} />
              Asaan Order
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default SecondaryNav
