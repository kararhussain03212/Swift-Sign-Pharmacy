import { pakLocations, searchLocations } from '../data/locations'

// Reverse geocoding using Nominatim (OpenStreetMap)
export const reverseGeocode = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
      {
        headers: {
          'Accept-Language': 'en',
        },
      }
    )

    if (!response.ok) throw new Error('Reverse geocoding failed')

    const data = await response.json()
    const address = data.address || {}

    // Try to match with our location data
    const matchedLocation = findClosestLocation(latitude, longitude)

    return {
      province: matchedLocation?.province || address.state || null,
      city: matchedLocation?.city || address.city || address.town || null,
      area: matchedLocation?.area || address.neighbourhood || null,
      fullAddress: data.display_name || null,
    }
  } catch (error) {
    console.error('Reverse geocoding error:', error)
    throw new Error('Unable to detect your location. Please try again or select manually.')
  }
}

// Forward geocoding using Nominatim
export const forwardGeocode = async (address) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address + ', Pakistan'
      )}&limit=5`,
      {
        headers: {
          'Accept-Language': 'en',
        },
      }
    )

    if (!response.ok) throw new Error('Geocoding failed')

    const data = await response.json()
    if (!data || data.length === 0) {
      throw new Error('Location not found')
    }

    const top = data[0]
    const matchedLocation = findClosestLocation(parseFloat(top.lat), parseFloat(top.lon))

    return {
      latitude: parseFloat(top.lat),
      longitude: parseFloat(top.lon),
      province: matchedLocation?.province || null,
      city: matchedLocation?.city || null,
      area: matchedLocation?.area || null,
      fullAddress: top.display_name || address,
    }
  } catch (error) {
    console.error('Forward geocoding error:', error)
    throw error
  }
}

// Find the closest location in our database
const findClosestLocation = (lat, lng) => {
  let closestLocation = null
  let closestDistance = Infinity

  for (const [province, provData] of Object.entries(pakLocations)) {
    for (const [city, cityData] of Object.entries(provData.cities)) {
      // Check city distance
      const cityDistance = calculateDistance(lat, lng, cityData.lat, cityData.lng)
      if (cityDistance < closestDistance) {
        closestDistance = cityDistance
        closestLocation = {
          province,
          city,
          area: null,
          lat: cityData.lat,
          lng: cityData.lng,
        }
      }
    }
  }

  return closestLocation && closestDistance < 50 ? closestLocation : null
}

// Haversine formula to calculate distance between two coordinates
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371 // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c // Distance in km
}

// Get user's current location using browser's Geolocation API
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        })
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(
              new Error(
                'Location access was denied. Please select your location manually.'
              )
            )
            break
          case error.POSITION_UNAVAILABLE:
            reject(new Error('Location information is unavailable.'))
            break
          case error.TIMEOUT:
            reject(new Error('The request to get user location timed out.'))
            break
          default:
            reject(new Error('Unable to get your location.'))
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  })
}

// Search locations with autocomplete
export const searchLocationAutocomplete = async (query) => {
  if (!query || query.length < 2) return []

  // First try our local database
  const localResults = searchLocations(query)
  if (localResults.length > 0) {
    return localResults
  }

  // Then try Nominatim if not found locally
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query + ', Pakistan'
      )}&limit=10&countrycodes=pk`,
      {
        headers: {
          'Accept-Language': 'en',
        },
      }
    )

    if (!response.ok) return []

    const data = await response.json()
    return (data || [])
      .map((item) => ({
        type: 'search',
        name: item.display_name.split(',')[0],
        fullAddress: item.display_name,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
      }))
      .slice(0, 10)
  } catch (error) {
    console.error('Autocomplete search error:', error)
    return []
  }
}
