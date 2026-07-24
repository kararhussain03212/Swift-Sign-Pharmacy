import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import {
  CUSTOMER_TOKEN_KEY,
  CUSTOMER_AUTH_USER_KEY,
  CUSTOMER_CSRF_TOKEN_KEY,
  isCustomerAuthenticated,
  clearCustomerAuthStorage,
} from '../api/axios'
import {
  loginUser,
  registerUser,
  logoutUser,
  getMe,
  getCart,
  getWishlist,
  addToCartApi,
  addToWishlistApi,
} from '../services/customerApi'
import useCartStore from '../store/cartStore'
import useWishlistStore from '../store/wishlistStore'

const AuthContext = createContext(null)

const mapCartItem = (row) => ({
  id: row.product_id,
  name: row.product_name,
  price: row.price,
  image: row.image_url,
  brand: row.brand,
  quantity: row.quantity,
})

const mapWishlistItem = (row) => ({
  id: row.product_id,
  name: row.product_name,
  price: row.price,
  image: row.image_url,
  brand: row.brand,
})

const storeSession = (data) => {
  localStorage.setItem(CUSTOMER_TOKEN_KEY, data.token)
  localStorage.setItem(CUSTOMER_CSRF_TOKEN_KEY, data.csrf_token)
  localStorage.setItem(CUSTOMER_AUTH_USER_KEY, JSON.stringify(data.user))
}

async function mergeGuestCartAndWishlist() {
  const guestCartItems = useCartStore.getState().items
  const guestWishlistItems = useWishlistStore.getState().items

  await Promise.all([
    ...guestCartItems.map((item) => addToCartApi(item.id, item.quantity).catch(() => {})),
    ...guestWishlistItems.map((item) => addToWishlistApi(item.id).catch(() => {})),
  ])

  const [cartRows, wishlistRows] = await Promise.all([
    getCart().catch(() => []),
    getWishlist().catch(() => []),
  ])

  useCartStore.getState().replaceCart((cartRows || []).map(mapCartItem))
  useWishlistStore.getState().replaceWishlist((wishlistRows || []).map(mapWishlistItem))
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const hydrate = useCallback(async () => {
    if (!isCustomerAuthenticated()) {
      clearCustomerAuthStorage()
      setUser(null)
      setLoading(false)
      return
    }

    try {
      const profile = await getMe()
      setUser(profile)
    } catch {
      clearCustomerAuthStorage()
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    hydrate()

    const handleLogout = () => setUser(null)
    window.addEventListener('customer-auth:logout', handleLogout)
    return () => window.removeEventListener('customer-auth:logout', handleLogout)
  }, [hydrate])

  const login = useCallback(async (credentials) => {
    const data = await loginUser(credentials)
    storeSession(data)
    setUser(data.user)
    await mergeGuestCartAndWishlist()
    return data.user
  }, [])

  const register = useCallback(async (payload) => {
    const data = await registerUser(payload)
    storeSession(data)
    setUser(data.user)
    await mergeGuestCartAndWishlist()
    return data.user
  }, [])

  const logout = useCallback(async () => {
    try {
      await logoutUser()
    } catch {
      // stateless JWT — ignore network errors on logout
    }
    clearCustomerAuthStorage()
    useCartStore.getState().replaceCart([])
    useWishlistStore.getState().replaceWishlist([])
    setUser(null)
  }, [])

  const refreshUser = useCallback(async () => {
    const profile = await getMe()
    setUser(profile)
    return profile
  }, [])

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
