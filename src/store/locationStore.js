import { create } from 'zustand'

const useLocationStore = create((set) => {
  // Load from localStorage on init
  const savedLocation = localStorage.getItem('userLocation')
  const initialLocation = savedLocation ? JSON.parse(savedLocation) : null

  return {
    location: initialLocation || {
      latitude: null,
      longitude: null,
      province: null,
      city: null,
      area: null,
      fullAddress: null,
      source: null, // 'manual' | 'automatic'
    },

    isDeliveryAvailable: null,
    isLoading: false,
    error: null,

    setLocation: (locationData) => {
      set((state) => {
        const updated = {
          ...state.location,
          ...locationData,
        }
        localStorage.setItem('userLocation', JSON.stringify(updated))
        return { location: updated, error: null }
      })
    },

    setLocationFromCoordinates: (latitude, longitude, address = {}) => {
      set((state) => {
        const updated = {
          latitude,
          longitude,
          province: address.province || null,
          city: address.city || null,
          area: address.area || null,
          fullAddress: address.fullAddress || null,
          source: 'automatic',
        }
        localStorage.setItem('userLocation', JSON.stringify(updated))
        return { location: updated, error: null }
      })
    },

    setDeliveryAvailable: (available) => set({ isDeliveryAvailable: available }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    clearError: () => set({ error: null }),

    clearLocation: () => {
      localStorage.removeItem('userLocation')
      set({
        location: {
          latitude: null,
          longitude: null,
          province: null,
          city: null,
          area: null,
          fullAddress: null,
          source: null,
        },
        isDeliveryAvailable: null,
        error: null,
      })
    },
  }
})

export default useLocationStore
