import { ChevronDown, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { categories, diseasesList } from '../../data/categories'
import LocationSelector from '../modals/LocationSelector'
import useLocationStore from '../../store/locationStore'
import { getEstimatedDeliveryDays } from '../../data/locations'
import { licenseInfo } from '../../data/contactInfo'

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
      to: `/shop/${cat.slug}`,
      subCategories: cat.subCategories || []
    }))

  return [diseasesItem, ...catItems]
}

const navItems = buildNavItems()

const SecondaryNav = () => {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
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
          <div className="flex items-center justify-between gap-1 sm:gap-1.5 flex-nowrap" style={{ minHeight: '40px' }}>

            {/* Main Links - Desktop only (tablet shows license info instead) */}
            <div className="hidden lg:flex items-center gap-0 min-w-0" style={{ flex: 1 }}>
              {navItems.map((item, i) => (
                <div key={item.name} className="relative group/nav h-full flex items-center min-w-0">
                  <Link
                    to={item.to}
                    className="flex items-center gap-0.5 sm:gap-1 text-red-600 hover:text-red-700
                               transition-colors duration-[150ms] whitespace-nowrap relative overflow-hidden text-ellipsis min-w-0 max-w-full"
                    style={{
                      fontSize: 'clamp(10px, 1vw, 13px)',
                      fontWeight: 500,
                      paddingLeft: i === 0 ? '0px' : 'clamp(3px, 0.4vw, 5px)',
                      paddingRight: 'clamp(3px, 0.4vw, 5px)',
                      height: '40px',
                    }}
                  >
                    {item.name}
                    {item.subCategories && item.subCategories.length > 0 && (
                      <ChevronDown size={11} className={`opacity-40 group-hover/nav:opacity-100 transition-all cursor-pointer ${openSubcategory === item.slug ? 'rotate-180' : ''}`} onClick={(e) => { e.preventDefault(); setOpenSubcategory(openSubcategory === item.slug ? null : item.slug) }} />
                    )}

                    {/* Active indicator underline on hover */}
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600
                                     scale-x-0 group-hover/nav:scale-x-100
                                     transition-transform duration-[150ms] origin-left" />
                  </Link>

                  {/* Dropdown Menu */}
                  {item.subCategories && item.subCategories.length > 0 && (
                    <div className={`absolute top-full left-0 bg-white shadow-card-hover border border-gray-100 rounded-b-xl
                                    py-2 min-w-[220px] max-h-[70vh] overflow-y-auto
                                    transition-all duration-200 z-[999]
                                    ${openSubcategory === item.slug ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible translate-y-2 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto'}`}>

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
                          : `/shop/${item.slug}/${encodeURIComponent(subSlug)}`

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

            {/* License Info + Location - Tablet only (desktop has full categories, mobile has its own bar) */}
            <div className="flex lg:hidden items-center justify-between min-w-0 gap-3" style={{ flex: 1 }}>
              <span className="leading-tight truncate text-gray-700" style={{ fontSize: 'clamp(12px, 1.3vw, 14px)' }}>
                {licenseInfo.description}: <span className="font-semibold">{licenseInfo.number}</span>
              </span>

              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="flex items-center gap-2 flex-shrink-0 text-gray-700 hover:text-primary
                           transition-colors whitespace-nowrap"
              >
                <MapPin size={17} className="text-[#0FAFB8] flex-shrink-0" />
                <span
                  className="truncate text-gray-700"
                  style={{
                    fontSize: 'clamp(11px, 1.1vw, 13px)',
                    maxWidth: 'clamp(140px, 18vw, 240px)'
                  }}
                  title={location.fullAddress || getDisplayAddress()}
                >
                  <span className="font-bold text-[#0FAFB8]">DELIVER TO:</span> <span className="font-medium">{getDisplayAddress()}</span>
                </span>
              </button>
            </div>

            {/* ── DELIVERY LOCATION ON RIGHT SIDE (Desktop only) ───────── */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden lg:flex items-center justify-end border-l border-gray-200 h-full gap-2 flex-shrink-0
                         pl-4 text-gray-700 hover:text-primary transition-colors whitespace-nowrap min-w-0"
            >
              <MapPin size={15} className="text-[#0FAFB8] flex-shrink-0" />
              <span
                className="truncate max-w-[110px] sm:max-w-[140px] md:max-w-[180px]"
                style={{ fontSize: 'clamp(10px, 1vw, 12px)' }}
                title={location.fullAddress || getDisplayAddress()}
              >
                <span className="font-bold text-[#0FAFB8]">DELIVER TO:</span> <span className="font-medium">{getDisplayAddress()}</span>
              </span>
            </button>
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
