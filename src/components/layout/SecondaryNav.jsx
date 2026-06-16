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
    subCategories: diseasesList.slice(0, 30) // show first 30 in dropdown
  }

  const catItems = categories
    .filter(cat => cat.showInNav !== false) // Only map categories where showInNav is not explicitly false
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
      <div className="bg-white hidden md:block relative z-30"
           style={{ borderBottom: '1px solid #e5e5e5' }}>
        <div className="max-w-[1450px] mx-auto px-6">
          <div className="flex items-center justify-between" style={{ minHeight: '35px' }}>

            {/* Main Links */}
            <div className="flex items-center gap-0 overflow-x-visible">
              {navItems.map((item, i) => (
                <div key={item.name} className="relative group h-full flex items-center">
                  <Link
                    to={item.to}
                    className="flex items-center gap-1 text-gray-600 hover:text-primary
                               transition-colors duration-[150ms] whitespace-nowrap relative"
                    style={{
                      fontSize: '13px',
                      fontWeight: 400,
                      paddingLeft: i === 0 ? '0px' : '16px',
                      paddingRight: '16px',
                      height: '35px',
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
                        <Link to="/diseases" className="block px-4 py-2 text-[13px] font-bold text-primary hover:bg-primary-light border-b border-gray-100 mb-1">
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
                              ? 'block px-4 py-2 text-[13px] font-bold text-primary hover:bg-primary-light border-b border-gray-100 mb-1 transition-colors'
                              : 'block px-4 py-2 text-[13px] text-gray-600 hover:bg-primary-light hover:text-primary transition-colors truncate'
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

            {/* ── DELIVERY LOCATION ON RIGHT SIDE ───────────────────── */}
            <div className="flex items-center justify-end ml-4 pl-4 border-l border-gray-200 h-full min-w-0">
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="bg-[#0FAFB8] hover:bg-[#0a9aa5] border border-[#0FAFB8] text-white font-semibold text-[11px] px-3 py-0.5 rounded-2xl my-1 shadow-sm transition-colors flex-shrink-0 whitespace-nowrap"
              >
                Change
              </button>

              <div className="flex items-center gap-2 ml-2 min-w-0">
                <MapPin size={14} className="text-[#0FAFB8] flex-shrink-0" />
                <div className="text-[11px] text-gray-700 min-w-0 flex items-center whitespace-nowrap">
                  <span className="font-bold text-[#0FAFB8]">DELIVER TO:</span>
                  <span
                    className="ml-1 font-medium truncate inline-block max-w-[200px]"
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
