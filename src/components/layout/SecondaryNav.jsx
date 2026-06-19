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
      <div className="hidden bg-white overflow-x-auto scrollbar-hide"
           style={{ borderBottom: '1px solid #e5e5e5' }}>
        <div className="flex items-center gap-1.5 px-3 py-2 min-w-max">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="flex-shrink-0 text-[11px] font-semibold px-3 py-1.5 rounded-full bg-gray-50 text-gray-600
                         hover:bg-primary-light hover:text-primary active:bg-primary active:text-white
                         transition-colors whitespace-nowrap border border-gray-100"
            >
              {item.name}
            </Link>
          ))}
          {/* Location button on mobile */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="flex-shrink-0 flex items-center gap-1 text-[11px] font-semibold px-3 py-1.5 rounded-full
                       bg-primary text-white whitespace-nowrap ml-1"
          >
            <MapPin size={10} />
            Deliver to
          </button>
        </div>
      </div>

      {/* ── DESKTOP: Full nav ──────────────────────────── */}
      <div className="bg-white hidden sm:block relative z-30"
           style={{ borderBottom: '1px solid #e5e5e5' }}>
        <div className="max-w-[1450px] mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between flex-wrap gap-2" style={{ minHeight: '40px' }}>

            {/* Main Links */}
            <div className="flex items-center gap-0 flex-wrap" style={{ flex: 1 }}>
              {navItems.map((item, i) => (
                <div key={item.name} className={`relative group h-full flex items-center ${i > 4 ? 'hidden lg:flex' : ''}`}>
                  <Link
                    to={item.to}
                    className="flex items-center gap-0.5 sm:gap-1 text-gray-600 hover:text-primary
                               transition-colors duration-[150ms] whitespace-nowrap relative"
                    style={{
                      fontSize: 'clamp(10px, 1.8vw, 13px)',
                      fontWeight: 400,
                      paddingLeft: i === 0 ? '0px' : 'clamp(6px, 1.5vw, 14px)',
                      paddingRight: 'clamp(6px, 1.5vw, 14px)',
                      height: '40px',
                    }}
                  >
                    {item.name}
                    {item.subCategories && item.subCategories.length > 0 && (
                      <ChevronDown size={11} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                    )}

                    {/* Active indicator underline on hover */}
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary
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

              {/* More Categories Dropdown (Tablet only) */}
              {navItems.length > 5 && (
                <div className="relative group flex lg:hidden h-full items-center">
                  <button
                    onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                    className="flex items-center gap-1 text-gray-600 hover:text-primary
                               transition-colors duration-[150ms] whitespace-nowrap relative"
                    style={{
                      fontSize: 'clamp(10px, 1.8vw, 13px)',
                      fontWeight: 400,
                      paddingLeft: 'clamp(6px, 1.5vw, 14px)',
                      paddingRight: 'clamp(6px, 1.5vw, 14px)',
                      height: '40px',
                    }}
                  >
                    More
                    <ChevronDown size={11} className={`transition-transform ${isMoreDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* More Categories Dropdown Menu - Horizontal */}
                  {isMoreDropdownOpen && (
                    <div className="absolute top-full left-0 bg-white shadow-card-hover border border-gray-100
                                    rounded-b-xl py-2 px-2 z-50"
                         style={{ minWidth: '400px' }}>
                      <div className="flex items-center gap-0 flex-wrap">
                        {navItems.slice(5).map((item, i) => (
                          <div key={item.slug} className="relative group h-full flex items-center">
                            <Link
                              to={item.to}
                              className="flex items-center gap-0.5 text-gray-600 hover:text-primary
                                         transition-colors duration-[150ms] whitespace-nowrap relative"
                              style={{
                                fontSize: 'clamp(10px, 1.8vw, 13px)',
                                fontWeight: 400,
                                paddingLeft: 'clamp(6px, 1.5vw, 14px)',
                                paddingRight: 'clamp(6px, 1.5vw, 14px)',
                                height: '40px',
                              }}
                              onClick={() => setIsMoreDropdownOpen(false)}
                            >
                              {item.name}
                              {item.subCategories && item.subCategories.length > 0 && (
                                <ChevronDown size={11} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                              )}

                              {/* Active indicator underline on hover */}
                              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary
                                               scale-x-0 group-hover:scale-x-100
                                               transition-transform duration-[150ms] origin-left" />
                            </Link>

                            {/* Subcategories Dropdown for More items */}
                            {item.subCategories && item.subCategories.length > 0 && (
                              <div className="absolute top-full left-0 bg-white shadow-card-hover border border-gray-100
                                              rounded-b-xl py-2 min-w-[220px] max-h-[70vh] overflow-y-auto opacity-0 invisible translate-y-2
                                              group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                                              transition-all duration-200 z-50 mt-1">
                                {item.subCategories.map(sub => {
                                  const subName = typeof sub === 'object' ? sub.name : sub
                                  const subSlug = typeof sub === 'object' ? sub.slug : sub.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                                  const isViewAll = subSlug.startsWith('all-')
                                  let subTo = `/shop?category=${item.slug}&subCategory=${encodeURIComponent(subSlug)}`

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
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── DELIVERY LOCATION ON RIGHT SIDE ───────────────────── */}
            <div className="hidden lg:flex items-center justify-end border-l border-gray-200 h-full min-w-0 gap-2 flex-shrink-0 pl-4">
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="bg-[#0FAFB8] hover:bg-[#0a9aa5] border border-[#0FAFB8] text-white font-semibold text-[10px] sm:text-[11px] px-2 sm:px-3 py-0.5 rounded-2xl shadow-sm transition-colors flex-shrink-0 whitespace-nowrap"
              >
                Change
              </button>

              <div className="flex items-center gap-1.5 min-w-0">
                <MapPin size={12} className="text-[#0FAFB8] flex-shrink-0" />
                <div className="text-[10px] sm:text-[11px] text-gray-700 min-w-0 flex items-center gap-1">
                  <span className="font-bold text-[#0FAFB8] hidden md:inline">DELIVER TO:</span>
                  <span
                    className="font-medium truncate max-w-[150px]"
                    title={location.fullAddress || getDisplayAddress()}
                  >
                    {getDisplayAddress()}
                  </span>
                </div>
              </div>
            </div>
          </div>
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
