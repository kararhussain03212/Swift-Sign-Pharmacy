import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      toggleWishlist: (product) => {
        const items = get().items
        const exists = items.find(i => i.id === product.id)
        if (exists) {
          set({ items: items.filter(i => i.id !== product.id) })
        } else {
          set({ items: [...items, product] })
        }
      },

      isWishlisted: (id) => get().items.some(i => i.id === id),

      removeFromWishlist: (id) =>
        set({ items: get().items.filter(i => i.id !== id) }),

      clearWishlist: () => set({ items: [] }),

      get wishlistCount() {
        return get().items.length
      },
    }),
    { name: 'dcare-wishlist' }
  )
)

export default useWishlistStore
