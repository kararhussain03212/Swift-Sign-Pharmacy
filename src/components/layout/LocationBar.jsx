import { useState } from 'react'
import { MapPin } from 'lucide-react'
import useLocationStore from '../../store/locationStore'
import LocationSelector from '../modals/LocationSelector'
import { getEstimatedDeliveryDays } from '../../data/locations'

const LocationBar = () => {
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
      <div
        className="hidden md:flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200"
        style={{ minHeight: '45px' }}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="bg-[#0FAFB8] hover:bg-[#0a9aa5] border border-[#0FAFB8] text-white font-semibold text-[11px] px-3 py-1.5 rounded shadow-sm transition-colors flex-shrink-0 whitespace-nowrap"
          >
            Change
          </button>

          <div className="flex items-center gap-2 min-w-0">
            <MapPin size={16} className="text-[#0FAFB8] flex-shrink-0" />
            <div className="text-[12px] text-gray-700 min-w-0">
              <span className="font-bold text-[#0FAFB8]">DELIVER TO:</span>
              <span
                className="ml-1 font-medium truncate block text-ellipsis"
                title={location.fullAddress || getDisplayAddress()}
              >
                {getDisplayAddress()}
              </span>
            </div>
          </div>

          {isDeliveryAvailable !== null && (
            <div className={`ml-auto flex-shrink-0 text-[11px] font-medium whitespace-nowrap px-2 py-1 rounded ${
              isDeliveryAvailable
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {isDeliveryAvailable ? (
                <>
                  ✓ Available ({deliveryEstimate})
                </>
              ) : (
                '✗ Not Available'
              )}
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

export default LocationBar
