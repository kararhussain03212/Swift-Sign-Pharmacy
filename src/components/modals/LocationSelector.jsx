import { useState, useEffect } from 'react'
import {
  MapPin,
  X,
  Search,
  Navigation,
  Loader2,
  AlertCircle,
  CheckCircle,
} from 'lucide-react'
import toast from 'react-hot-toast'
import useLocationStore from '../../store/locationStore'
import {
  getProvinces,
  getCitiesByProvince,
  getCoordinatesByCity,
  isLocationServiceable,
  getEstimatedDeliveryDays,
} from '../../data/locations'
import {
  getCurrentLocation,
  reverseGeocode,
  searchLocationAutocomplete,
} from '../../services/locationService'

const LocationSelector = ({ isOpen, onClose, onLocationSelected }) => {
  const [step, setStep] = useState('options') // options | manual | detecting | map
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [addressInput, setAddressInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [isDetecting, setIsDetecting] = useState(false)
  const [error, setError] = useState('')
  const [tempLocation, setTempLocation] = useState(null)

  const { setLocation, setLocationFromCoordinates, setDeliveryAvailable } =
    useLocationStore()

  const provinces = getProvinces()
  const cities = selectedProvince ? getCitiesByProvince(selectedProvince) : []

  const resetForm = () => {
    setSelectedProvince('')
    setSelectedCity('')
    setAddressInput('')
    setSearchQuery('')
    setSearchResults([])
    setError('')
    setTempLocation(null)
  }

  const handleDetectLocation = async () => {
    setIsDetecting(true)
    setError('')
    try {
      const coords = await getCurrentLocation()
      const address = await reverseGeocode(coords.latitude, coords.longitude)

      const fullData = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        province: address.province,
        city: address.city,
        area: address.area,
        fullAddress: address.fullAddress,
        source: 'automatic',
      }

      setTempLocation(fullData)
      checkDeliveryAvailability(address.province, address.city)
      setStep('options')
    } catch (err) {
      setError(err.message)
      toast.error(err.message)
    } finally {
      setIsDetecting(false)
    }
  }

  const handleManualSelection = () => {
    setStep('manual')
    resetForm()
  }

  const handleSearchLocation = async (e) => {
    const query = e.target.value
    setSearchQuery(query)

    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      const results = await searchLocationAutocomplete(query)
      setSearchResults(results)
    } catch (err) {
      console.error('Search error:', err)
    } finally {
      setIsSearching(false)
    }
  }

  const handleSelectSearchResult = (result) => {
    if (result.type === 'city') {
      setSelectedProvince(result.province)
      setSelectedCity(result.city)
      setAddressInput('')
    } else if (result.type === 'province') {
      setSelectedProvince(result.province)
      setSelectedCity('')
      setAddressInput('')
    } else {
      // Search result from API
      setTempLocation({
        latitude: result.lat,
        longitude: result.lng,
        fullAddress: result.fullAddress,
      })
    }
    setSearchQuery('')
    setSearchResults([])
  }

  const handleConfirmManualSelection = () => {
    if (!selectedCity) {
      setError('Please select a city')
      return
    }

    if (!isLocationServiceable(selectedProvince, selectedCity)) {
      setError(
        'Sorry, we currently do not deliver to this area. Please select another location.'
      )
      return
    }

    const coords = getCoordinatesByCity(selectedProvince, selectedCity)

    const fullData = {
      latitude: coords?.lat || null,
      longitude: coords?.lng || null,
      province: selectedProvince,
      city: selectedCity,
      area: addressInput || null,
      fullAddress: `${addressInput ? addressInput + ', ' : ''}${selectedCity}, ${selectedProvince}`,
      source: 'manual',
    }

    setLocation(fullData)
    checkDeliveryAvailability(selectedProvince, selectedCity)
    toast.success('Location updated successfully!')
    resetForm()
    onClose()
    if (onLocationSelected) {
      onLocationSelected(fullData)
    }
  }

  const handleConfirmDetectedLocation = () => {
    if (!tempLocation?.city) {
      setError('Unable to determine location. Please select manually.')
      return
    }

    if (!isLocationServiceable(tempLocation.province, tempLocation.city)) {
      setError(
        'Sorry, we currently do not deliver to this area. Please select another location.'
      )
      return
    }

    setLocation(tempLocation)
    checkDeliveryAvailability(tempLocation.province, tempLocation.city)
    toast.success('Location detected and saved!')
    resetForm()
    onClose()
    if (onLocationSelected) {
      onLocationSelected(tempLocation)
    }
  }

  const checkDeliveryAvailability = (province, city) => {
    const isServiceable = isLocationServiceable(province, city)
    const deliveryDays = getEstimatedDeliveryDays(province, city)
    setDeliveryAvailable(isServiceable)

    if (!isServiceable) {
      toast.error('Delivery not available in this area')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 transition-opacity overflow-y-auto">
      <div className="bg-white rounded-xl w-[90vw] max-w-[600px] my-8 shadow-xl relative animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">
            {step === 'options' && 'Select Your Location'}
            {step === 'manual' && 'Manual Location Selection'}
            {step === 'detecting' && 'Detecting Location'}
          </h3>
          <button
            onClick={() => {
              resetForm()
              onClose()
            }}
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Step: Options Selection */}
          {step === 'options' && (
            <div className="space-y-4">
              <div className="mx-auto w-24 h-24 mb-6 flex items-center justify-center rounded-full relative">
                <div className="absolute w-16 h-8 bg-[#ccf0dd] rounded-[50%] bottom-2 z-0"></div>
                <MapPin
                  size={54}
                  className="text-[#0FAFB8] z-10 drop-shadow-md"
                  fill="#0FAFB8"
                />
                <div className="absolute w-6 h-6 bg-white rounded-full top-[1.4rem] z-20"></div>
              </div>

              <p className="text-center text-sm text-gray-600 mb-8">
                Help us improve your shopping experience by selecting your delivery location
              </p>

              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={handleDetectLocation}
                  disabled={isDetecting}
                  className="w-full bg-[#0FAFB8] hover:bg-[#0a9aa5] disabled:bg-gray-300 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {isDetecting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Detecting...
                    </>
                  ) : (
                    <>
                      <Navigation size={18} />
                      Detect Automatically
                    </>
                  )}
                </button>

                <button
                  onClick={handleManualSelection}
                  className="w-full bg-white text-[#0FAFB8] border-2 border-[#0FAFB8] hover:bg-[#f0fffe] py-3 rounded-lg font-medium transition-colors"
                >
                  Select Manually
                </button>
              </div>

              {tempLocation && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 mb-2">
                    Detected Location:
                  </p>
                  <p className="text-sm text-blue-700 mb-4">
                    {tempLocation.fullAddress ||
                      `${tempLocation.area ? tempLocation.area + ', ' : ''}${tempLocation.city}, ${tempLocation.province}`}
                  </p>
                  <button
                    onClick={handleConfirmDetectedLocation}
                    className="w-full bg-[#0FAFB8] hover:bg-[#0a9aa5] text-white py-2 rounded font-medium text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={16} />
                    Confirm This Location
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step: Manual Selection */}
          {step === 'manual' && (
            <div className="space-y-5">
              {/* Search Bar */}
              <div className="relative">
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2.5 bg-white">
                  <Search size={18} className="text-gray-400 mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search by location name..."
                    className="w-full outline-none text-sm text-gray-700"
                    value={searchQuery}
                    onChange={handleSearchLocation}
                  />
                  {isSearching && (
                    <Loader2 size={16} className="animate-spin text-gray-400" />
                  )}
                </div>

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                    {searchResults.map((result, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectSearchResult(result)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 border-b last:border-b-0 transition-colors"
                      >
                        <p className="text-sm font-medium text-gray-900">
                          {result.name}
                        </p>
                        <p className="text-xs text-gray-500">{result.fullAddress}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Province Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Province *
                </label>
                <select
                  value={selectedProvince}
                  onChange={(e) => {
                    setSelectedProvince(e.target.value)
                    setSelectedCity('')
                    setAddressInput('')
                    setError('')
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0FAFB8] focus:border-transparent"
                >
                  <option value="">Select Province</option>
                  {provinces.map((prov) => (
                    <option key={prov} value={prov}>
                      {prov}
                    </option>
                  ))}
                </select>
              </div>

              {/* City Selection */}
              {selectedProvince && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => {
                      setSelectedCity(e.target.value)
                      setError('')
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0FAFB8] focus:border-transparent"
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Address/Area Text Input */}
              {selectedCity && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address/Area (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your area, building, street name, etc."
                    value={addressInput}
                    onChange={(e) => {
                      setAddressInput(e.target.value)
                      setError('')
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0FAFB8] focus:border-transparent placeholder:text-gray-400"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    e.g., "Main Bazar", "University Road", "Shopping Complex"
                  </p>
                </div>
              )}

              {/* Back and Confirm Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setStep('options')
                    setError('')
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 rounded-lg font-medium transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirmManualSelection}
                  className="flex-1 bg-[#0FAFB8] hover:bg-[#0a9aa5] text-white py-2.5 rounded-lg font-medium transition-colors"
                >
                  Confirm Location
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Delivery Info Footer (if location selected) */}
        {(tempLocation || (selectedCity && selectedProvince)) && (
          <div className="px-6 py-4 bg-blue-50 border-t border-blue-200 rounded-b-xl">
            <div className="flex items-start gap-3">
              <CheckCircle size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Delivery Available
                </p>
                <p className="text-xs text-blue-700 mt-0.5">
                  Expected delivery in{' '}
                  {getEstimatedDeliveryDays(
                    tempLocation?.province || selectedProvince,
                    tempLocation?.city || selectedCity
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LocationSelector
