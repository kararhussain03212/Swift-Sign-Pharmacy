// Pakistan Location Data: Provinces and Cities with coordinates
export const pakLocations = {
  'Balochistan': {
    province: 'Balochistan',
    cities: {
      'Quetta': { lat: 30.1824, lng: 67.0348 },
      'Peshawar': { lat: 34.0151, lng: 71.5249 },
      'Gwadar': { lat: 25.2048, lng: 62.3284 },
      'Zhob': { lat: 31.3185, lng: 69.4515 },
      'Dera Murad Jamali': { lat: 29.4708, lng: 67.5142 },
      'Turbat': { lat: 28.7750, lng: 66.8300 },
      'Dalbandin': { lat: 28.3378, lng: 64.3992 },
    },
  },
  'Khyber Pakhtunkhwa': {
    province: 'Khyber Pakhtunkhwa',
    cities: {
      'Peshawar': { lat: 34.0151, lng: 71.5249 },
      'Abbottabad': { lat: 34.1414, lng: 73.2087 },
      'Swat': { lat: 35.2245, lng: 72.4274 },
      'Kohat': { lat: 33.5833, lng: 71.4333 },
      'Mardan': { lat: 34.1965, lng: 72.0389 },
      'Dera Ismail Khan': { lat: 31.8508, lng: 70.9318 },
      'Charsadda': { lat: 34.1490, lng: 71.7372 },
      'Buner': { lat: 34.5667, lng: 72.5833 },
      'Bannu': { lat: 32.9797, lng: 70.6048 },
      'Mansehra': { lat: 34.3226, lng: 73.1937 },
      'Mingora': { lat: 35.2383, lng: 72.4615 },
    },
  },
  'Punjab': {
    province: 'Punjab',
    cities: {
      'Lahore': { lat: 31.5497, lng: 74.3436 },
      'Karachi': { lat: 24.8607, lng: 67.0011 },
      'Islamabad': { lat: 33.6844, lng: 73.0479 },
      'Rawalpindi': { lat: 33.5731, lng: 73.1898 },
      'Faisalabad': { lat: 31.4180, lng: 72.9790 },
      'Multan': { lat: 30.1978, lng: 71.4455 },
      'Gujranwala': { lat: 32.1656, lng: 74.1895 },
      'Sialkot': { lat: 32.4945, lng: 74.5229 },
      'Bahawalpur': { lat: 29.3956, lng: 71.6722 },
      'Jhang': { lat: 31.2773, lng: 72.3192 },
      'Sargodha': { lat: 32.0856, lng: 72.6419 },
      'Okara': { lat: 30.8154, lng: 73.4532 },
      'Gujrat': { lat: 32.1744, lng: 74.0753 },
      'Sheikhupura': { lat: 31.7160, lng: 73.9732 },
      'Kasur': { lat: 31.0371, lng: 74.5128 },
      'Attock': { lat: 33.7654, lng: 72.7235 },
      'Dera Ghazi Khan': { lat: 29.9654, lng: 70.6309 },
      'Sahiwal': { lat: 30.6654, lng: 73.7564 },
      'Lodhran': { lat: 29.5431, lng: 71.6283 },
      'Vehari': { lat: 30.0062, lng: 72.6437 },
      'Khanewal': { lat: 30.3007, lng: 71.9316 },
      'Toba Tek Singh': { lat: 30.9769, lng: 72.4833 },
      'Bhakkar': { lat: 31.8859, lng: 71.4747 },
      'Mandi Bahauddin': { lat: 32.5842, lng: 74.6097 },
      'Hafizabad': { lat: 32.3088, lng: 74.0520 },
      'Pakpattan': { lat: 30.3482, lng: 73.3663 },
    },
  },
  'Sindh': {
    province: 'Sindh',
    cities: {
      'Karachi': { lat: 24.8607, lng: 67.0011 },
      'Hyderabad': { lat: 25.3937, lng: 68.4746 },
      'Sukkur': { lat: 27.7046, lng: 68.8669 },
      'Larkana': { lat: 27.5584, lng: 68.2084 },
      'Nawabshah': { lat: 26.2197, lng: 68.4081 },
      'Jacobabad': { lat: 28.2706, lng: 68.4403 },
      'Mirpur Khas': { lat: 25.5144, lng: 69.0076 },
      'Thatta': { lat: 24.7606, lng: 67.2781 },
      'Badin': { lat: 24.6406, lng: 68.4142 },
      'Shikarpur': { lat: 27.9639, lng: 68.6406 },
      'Kashmore': { lat: 27.5147, lng: 67.7778 },
      'Dadu': { lat: 27.7870, lng: 67.8156 },
      'Tando Allah Yar': { lat: 24.8556, lng: 68.1394 },
      'Sanghar': { lat: 25.8403, lng: 68.9598 },
    },
  },
  'Gilgit-Baltistan': {
    province: 'Gilgit-Baltistan',
    cities: {
      'Gilgit': { lat: 35.9280, lng: 74.3114 },
      'Skardu': { lat: 35.2854, lng: 75.5859 },
      'Hunza': { lat: 36.8506, lng: 74.8588 },
      'Nagar': { lat: 36.6180, lng: 74.8823 },
      'Ghanche': { lat: 35.4081, lng: 75.8642 },
    },
  },
  'Azad Jammu & Kashmir': {
    province: 'Azad Jammu & Kashmir',
    cities: {
      'Mirpur': { lat: 33.1411, lng: 73.7272 },
      'Muzaffarabad': { lat: 34.3650, lng: 73.4833 },
      'Rawalakot': { lat: 33.8231, lng: 73.8653 },
      'Bhimber': { lat: 32.8308, lng: 73.9050 },
      'Kotli': { lat: 33.5144, lng: 73.9020 },
      'Palandri': { lat: 34.0667, lng: 73.6833 },
    },
  },
}

// Flatten locations for easier searching
export const getProvinces = () => Object.keys(pakLocations).sort()

export const getCitiesByProvince = (province) => {
  if (!pakLocations[province]) return []
  return Object.keys(pakLocations[province].cities).sort()
}

export const getCoordinatesByCity = (province, city) => {
  const cityData = pakLocations[province]?.cities[city]
  if (cityData) {
    return { lat: cityData.lat, lng: cityData.lng }
  }
  return null
}

export const searchLocations = (query) => {
  const results = []
  const q = query.toLowerCase()

  for (const [province, provData] of Object.entries(pakLocations)) {
    if (province.toLowerCase().includes(q)) {
      results.push({
        type: 'province',
        name: province,
        province,
        fullAddress: province,
      })
    }

    for (const [city, cityData] of Object.entries(provData.cities)) {
      if (city.toLowerCase().includes(q)) {
        results.push({
          type: 'city',
          name: city,
          province,
          city,
          fullAddress: `${city}, ${province}`,
          lat: cityData.lat,
          lng: cityData.lng,
        })
      }
    }
  }

  return results.slice(0, 10) // Return top 10 results
}

// Delivery coverage zones
export const deliveryZones = [
  { province: 'Punjab', cities: ['Lahore', 'Rawalpindi', 'Islamabad'] },
  { province: 'Sindh', cities: ['Karachi', 'Hyderabad'] },
  {
    province: 'Khyber Pakhtunkhwa',
    cities: ['Peshawar', 'Abbottabad'],
  },
  { province: 'Balochistan', cities: ['Quetta'] },
]

export const isLocationServiceable = (province, city) => {
  return deliveryZones.some(
    (zone) => zone.province === province && zone.cities.includes(city)
  )
}

// Estimate delivery time based on location
export const getEstimatedDeliveryDays = (province, city) => {
  if (!isLocationServiceable(province, city)) return null

  const majorCities = ['Karachi', 'Lahore', 'Islamabad']
  if (majorCities.includes(city)) return '1-2 days'
  return '2-3 days'
}
