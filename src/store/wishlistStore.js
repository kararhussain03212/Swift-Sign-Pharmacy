import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { isCustomerAuthenticated } from '../api/axios'
import { addToWishlistApi, removeWishlistItemByProduct } from '../services/customerApi'

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      toggleWishlist: (product) => {
        const items = get().items
        const exists = items.find(i => i.id === product.id)
        if (exists) {
          set({ items: items.filter(i => i.id !== product.id) })
          if (isCustomerAuthenticated()) {
            removeWishlistItemByProduct(product.id).catch(() => {})
          }
        } else {
          set({ items: [...items, product] })
          if (isCustomerAuthenticated()) {
            addToWishlistApi(product.id).catch(() => {})
          }
        }
      },

      isWishlisted: (id) => get().items.some(i => i.id === id),

      removeFromWishlist: (id) => {
        set({ items: get().items.filter(i => i.id !== id) })
        if (isCustomerAuthenticated()) {
          removeWishlistItemByProduct(id).catch(() => {})
        }
      },

      clearWishlist: () => set({ items: [] }),

      replaceWishlist: (items) => set({ items }),
    }),
    { name: 'dcare-wishlist' }
  )
)

export default useWishlistStore
