const trimSlash = (value) => String(value || '').replace(/\/+$/, '')

export function getApiBase() {
  const envApiBase = trimSlash(import.meta.env.VITE_API_URL)
  if (envApiBase) return envApiBase
  if (import.meta.env.DEV) return 'http://localhost/Pharmacy/backend/api'

  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  return origin ? `${origin}/backend/api` : '/backend/api'
}
