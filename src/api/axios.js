import axios from 'axios'
import { getApiBase } from './runtimeApi'

const API_BASE_URL = getApiBase()
const TOKEN_KEY = 'customer_token'
const AUTH_USER_KEY = 'customer_auth_user'
const CSRF_TOKEN_KEY = 'customer_csrf_token'

const parseJwtPayload = (token) => {
  if (!token || typeof token !== 'string') return null
  const parts = token.split('.')
  if (parts.length !== 3) return null

  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')
    return JSON.parse(atob(padded))
  } catch {
    return null
  }
}

const hasValidJwtShape = (token) => {
  const payload = parseJwtPayload(token)
  if (!payload) return false
  if (payload.exp && Date.now() >= Number(payload.exp) * 1000) return false
  return true
}

export const isCustomerAuthenticated = () => hasValidJwtShape(localStorage.getItem(TOKEN_KEY))

export const clearCustomerAuthStorage = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(AUTH_USER_KEY)
  localStorage.removeItem(CSRF_TOKEN_KEY)
}

const emitAuthLogout = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('customer-auth:logout'))
  }
}

export const CUSTOMER_TOKEN_KEY = TOKEN_KEY
export const CUSTOMER_AUTH_USER_KEY = AUTH_USER_KEY
export const CUSTOMER_CSRF_TOKEN_KEY = CSRF_TOKEN_KEY

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  const csrfToken = localStorage.getItem(CSRF_TOKEN_KEY)
  if (token && hasValidJwtShape(token)) {
    config.headers.Authorization = `Bearer ${token}`
    const method = String(config.method || 'get').toUpperCase()
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method) && csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken
    }
  } else if (token) {
    clearCustomerAuthStorage()
    emitAuthLogout()
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      const url = error?.config?.url || ''
      const isAuthEndpoint = url.includes('/customer/login') || url.includes('/customer/register')
      if (!isAuthEndpoint) {
        clearCustomerAuthStorage()
        emitAuthLogout()
      }
    }
    return Promise.reject(error)
  }
)

export default api
