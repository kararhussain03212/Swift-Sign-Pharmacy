import { ChevronDown, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { categories, diseasesList } from '../../data/categories'
import LocationSelector from '../modals/LocationSelector'
import useLocationStore from '../../store/locationStore'
import { getEstimatedDeliveryDays } from '../../data/locations'

// Build nav items from categories.js - diseases go first as a special item
const buildNavItems = () => {
  const diseasesItem = {
    name: 'Diseases',
    slug: 'diseases',
    to: '/diseases',
    subCategories: [] // Removed dropdown as requested
  }

  const catItems = categories
    .filter(cat => cat.showInNav !== false && cat.slug !== 'performance-and-wellness') // Only map categories where showInNav is not explicitly false and exclude performance-and-wellness
    .map(cat => ({
      name: cat.name,
      slug: cat.slug,
      to: `/shop?category=${cat.slug}`,
      subCategories: cat.subCategories || []
    }))

  return [diseasesItem, ...catItems]
}

const navItems = buildNavItems()

const SecondaryNav = () => {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false)
  const [openSubcategory, setOpenSubcategory] = useState(null)
  const { location, isDeliveryAvailable } = useLocationStore()

  const getDisplayAddress = () => {
    if (location.area) {
      return `${location.area}, ${location.city}`
    }
    if (location.city) {
      return location.city
    }
    if (location.latitude && location.longitude) {
      return `Lat: ${location.latitude.toFixed(4)}, Lng: ${location.longitude.toFixed(4)}`
    }
    return 'Select Location'
  }

  const deliveryEstimate = location.city
    ? getEstimatedDeliveryDays(location.province, location.city)
    : null

  return (
    <>
      {/* ── MOBILE: Horizontal scroll category pills ──── */}
      <div className="sm:hidden bg-white overflow-x-auto scrollbar-hide"
           style={{ borderBottom: '1px solid #e5e5e5' }}>
        <div className="flex items-center gap-2 px-3 py-2 min-w-max">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="flex-shrink-0 text-xs font-semibold px-2.5 py-1.5 rounded-full bg-gray-50 text-gray-600
                         hover:bg-primary-light hover:text-primary active:bg-primary active:text-white
                         transition-colors whitespace-nowrap border border-gray-100"
            >
              {item.name}
            </Link>
          ))}
          {/* Location button on mobile */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="flex-shrink-0 flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-full
                       bg-primary text-white whitespace-nowrap ml-1"
          >
            <MapPin size={14} />
            Deliver to
          </button>
        </div>
      </div>

      {/* ── DESKTOP: Full nav ──────────────────────────── */}
      <div className="bg-white hidden sm:block relative z-30"
           style={{ borderBottom: '1px solid #e5e5e5' }}>
        <div className="max-w-[1450px] mx-auto px-2 sm:px-3 md:px-3 lg:px-4">
          <div className="flex items-center justify-between gap-0.5 sm:gap-1 overflow-x-auto scrollbar-hide" style={{ minHeight: '40px' }}>

            {/* Main Links - First 3 categories on tablet */}
            <div className="flex items-center gap-0 min-w-0" style={{ flex: 1 }}>
              {navItems.map((item, i) => (
                <div key={item.name} className={`relative group h-full flex items-center ${i > 1 ? 'hidden lg:flex' : ''}`}>
                  <Link
                    to={item.to}
                    className="flex items-center gap-0.5 sm:gap-1 text-gray-600 hover:text-primary
                               transition-colors duration-[150ms] whitespace-nowrap relative"
                    style={{
                      fontSize: 'clamp(11px, 1.1vw, 13px)',
                      fontWeight: 500,
                      paddingLeft: i === 0 ? '0px' : 'clamp(4px, 0.5vw, 6px)',
                      paddingRight: 'clamp(4px, 0.5vw, 6px)',
                      height: '40px',
                    }}
                  >
                    {item.name}
                    {item.subCategories && item.subCategories.length > 0 && (
                      <ChevronDown size={11} className={`opacity-40 group-hover:opacity-100 transition-all cursor-pointer ${openSubcategory === item.slug ? 'rotate-180' : ''}`} onClick={(e) => { e.preventDefault(); setOpenSubcategory(openSubcategory === item.slug ? null : item.slug) }} />
                    )}

                    {/* Active indicator underline on hover */}
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary
                                     scale-x-0 group-hover:scale-x-100
                                     transition-transform duration-[150ms] origin-left" />
                  </Link>

                  {/* Dropdown Menu */}
                  {item.subCategories && item.subCategories.length > 0 && (
                    <div className={`absolute top-full left-0 bg-white shadow-card-hover border border-gray-100
                                    rounded-b-xl py-2 min-w-[220px] max-h-[70vh] overflow-y-auto
                                    transition-all duration-200 z-50
                                    ${openSubcategory === item.slug ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'}`}>
                      {/* "View All" link for Diseases */}
                      {item.slug === 'diseases' && (
                        <Link to="/diseases" className="block px-4 py-2 text-[12px] font-bold text-primary hover:bg-primary-light border-b border-gray-100 mb-1">
                          View A-Z Guide →
                        </Link>
                      )}
                      {item.subCategories.map(sub => {
                        const subName = typeof sub === 'object' ? sub.name : sub
                        const subSlug = typeof sub === 'object' ? sub.slug : sub.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                        const isViewAll = subSlug.startsWith('all-')
                        let subTo = item.slug === 'diseases'
                          ? `/shop?diseaseCategory=${encodeURIComponent(subSlug)}`
                          : `/shop?category=${item.slug}&subCategory=${encodeURIComponent(subSlug)}`

                        // If it's an "All ..." button, go to /shop with no filters (show all products)
                        if (isViewAll) {
                          subTo = `/shop`
                        }
                        return (
                          <Link
                            key={subSlug}
                            to={subTo}
                            className={isViewAll
                              ? 'block px-4 py-2 text-[12px] font-bold text-primary hover:bg-primary-light border-b border-gray-100 mb-1 transition-colors'
                              : 'block px-4 py-2 text-[12px] text-gray-600 hover:bg-primary-light hover:text-primary transition-colors truncate'
                            }
                          >
                            {isViewAll ? `${subName} →` : subName}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* More Button (Tablet only) - Right side */}
            {navItems.length > 2 && (
              <button
                onClick={() => {
                  setIsMoreDropdownOpen(!isMoreDropdownOpen)
                  setOpenSubcategory(null)
                }}
                className="flex lg:hidden items-center gap-1 text-gray-600 hover:text-primary
                           transition-colors duration-[150ms] whitespace-nowrap relative flex-shrink-0"
                style={{
                  fontSize: 'clamp(11px, 1.1vw, 13px)',
                  fontWeight: 500,
                  paddingLeft: 'clamp(4px, 0.5vw, 6px)',
                  paddingRight: 'clamp(4px, 0.5vw, 6px)',
                  height: '40px',
                }}
              >
                More
                <ChevronDown size={11} className={`transition-transform duration-300 ${isMoreDropdownOpen ? '' : 'rotate-180'}`} />
              </button>
            )}

            {/* ── DELIVERY LOCATION ON RIGHT SIDE ───────────────────── */}
            <div className="flex items-center justify-end border-l border-gray-200 h-full min-w-0 gap-1.5 sm:gap-2 md:gap-2.5 flex-shrink-0 pl-2 sm:pl-2 md:pl-3 lg:pl-4">
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="bg-[#0FAFB8] hover:bg-[#0a9aa5] border border-[#0FAFB8] text-white font-semibold text-xs sm:text-xs md:text-sm px-2.5 sm:px-3 py-1 rounded-2xl shadow-sm transition-colors flex-shrink-0 whitespace-nowrap"
              >
                Change
              </button>

              <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 min-w-0">
                <MapPin size={16} className="sm:hidden text-[#0FAFB8] flex-shrink-0" />
                <MapPin size={18} className="hidden sm:block text-[#0FAFB8] flex-shrink-0" />
                <div className="text-xs sm:text-xs md:text-sm text-gray-700 min-w-0 flex items-center gap-1">
                  <span className="font-bold text-[#0FAFB8] hidden lg:inline text-xs sm:text-xs">DELIVER TO:</span>
                  <span
                    className="font-medium truncate max-w-[80px] sm:max-w-[100px] md:max-w-[140px]"
                    title={location.fullAddress || getDisplayAddress()}
                  >
                    {getDisplayAddress()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Hidden Categories Row (shown when More is clicked on tablet only) */}
          {isMoreDropdownOpen && (
            <div className="flex lg:hidden items-center gap-0 border-t border-gray-100 pt-1.5 pb-1.5" style={{ minHeight: '40px' }}>
              {navItems.slice(2).map((item, i) => (
                <div key={item.slug} className="relative group h-full flex items-center">
                  <Link
                    to={item.to}
                    className="flex items-center gap-0.5 sm:gap-1 text-gray-600 hover:text-primary
                               transition-colors duration-[150ms] whitespace-nowrap relative"
                    style={{
                      fontSize: 'clamp(11px, 1vw, 12px)',
                      fontWeight: 500,
                      paddingLeft: i === 0 ? '0px' : 'clamp(4px, 0.5vw, 6px)',
                      paddingRight: 'clamp(4px, 0.5vw, 6px)',
                      height: '40px',
                    }}
                    onClick={() => setIsMoreDropdownOpen(false)}
                  >
                    {item.name}
                    {item.subCategories && item.subCategories.length > 0 && (
                      <ChevronDown size={11} className={`opacity-40 group-hover:opacity-100 transition-all cursor-pointer ${openSubcategory === item.slug ? 'rotate-180' : ''}`} onClick={(e) => { e.preventDefault(); setOpenSubcategory(openSubcategory === item.slug ? null : item.slug) }} />
                    )}

                    {/* Active indicator underline on hover */}
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary
                                     scale-x-0 group-hover:scale-x-100
                                     transition-transform duration-[150ms] origin-left" />
                  </Link>

                  {/* Dropdown Menu */}
                  {item.subCategories && item.subCategories.length > 0 && (
                    <div className={`absolute top-full left-0 bg-white shadow-card-hover border border-gray-100
                                    rounded-b-xl py-2 min-w-[220px] max-h-[70vh] overflow-y-auto
                                    transition-all duration-200 z-50
                                    ${openSubcategory === item.slug ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'}`}>
                      {/* "View All" link for Diseases */}
                      {item.slug === 'diseases' && (
                        <Link to="/diseases" className="block px-4 py-2 text-[12px] font-bold text-primary hover:bg-primary-light border-b border-gray-100 mb-1">
                          View A-Z Guide →
                        </Link>
                      )}
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
                            className={isViewAll
                              ? 'block px-4 py-2 text-[12px] font-bold text-primary hover:bg-primary-light border-b border-gray-100 mb-1 transition-colors'
                              : 'block px-4 py-2 text-[12px] text-gray-600 hover:bg-primary-light hover:text-primary transition-colors truncate'
                            }
                            onClick={() => setIsMoreDropdownOpen(false)}
                          >
                            {isViewAll ? `${subName} →` : subName}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <LocationSelector
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onLocationSelected={() => {}}
      />
    </>
  )
}

export default SecondaryNav
