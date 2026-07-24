import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { isCustomerAuthenticated } from '../api/axios'
import { addToCartApi, updateCartItemByProduct, removeCartItemByProduct, clearCartApi } from '../services/customerApi'

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, quantity = 1) => {
        const items = get().items
        const existing = items.find(i => i.id === product.id)
        if (existing) {
          set({
            items: items.map(i =>
              i.id === product.id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          })
        } else {
          set({ items: [...items, { ...product, quantity }] })
        }
        if (isCustomerAuthenticated()) {
          addToCartApi(product.id, quantity).catch(() => {})
        }
      },

      removeFromCart: (id) => {
        set({ items: get().items.filter(i => i.id !== id) })
        if (isCustomerAuthenticated()) {
          removeCartItemByProduct(id).catch(() => {})
        }
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) return get().removeFromCart(id)
        set({
          items: get().items.map(i =>
            i.id === id ? { ...i, quantity } : i
          ),
        })
        if (isCustomerAuthenticated()) {
          updateCartItemByProduct(id, quantity).catch(() => {})
        }
      },

      clearCart: () => {
        set({ items: [] })
        if (isCustomerAuthenticated()) {
          clearCartApi().catch(() => {})
        }
      },

      replaceCart: (items) => set({ items }),
    }),
    { name: 'dcare-cart' }
  )
)

export default useCartStore
