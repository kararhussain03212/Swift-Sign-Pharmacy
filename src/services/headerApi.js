const trimSlash = (value) => String(value || '').replace(/\/+$/, '')

function getApiBase() {
  const envApiBase = trimSlash(import.meta.env.VITE_API_URL)
  if (envApiBase) return envApiBase
  if (import.meta.env.DEV) return 'http://localhost/Pharmacy/backend/api'

  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  return origin ? `${origin}/backend/api` : '/backend/api'
}

async function getJson(path) {
  const res = await fetch(`${getApiBase()}${path}`)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  const json = await res.json()
  if (!json.success) throw new Error(json.error || 'Request failed')
  return json.data
}

export const getAnnouncementBar = () => getJson('/public/announcement-bar')
export const getSiteSettings = () => getJson('/public/site-settings')
export const getNavLinks = () => getJson('/public/nav-links')
export const getCategories = () => getJson('/public/categories')
export const getLocations = () => getJson('/public/locations')
export const getHeroSlides = () => getJson('/public/hero-slides')

export const resolveUploadUrl = (path) => {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  const root = getApiBase().replace(/\/api$/i, '')
  return path.startsWith('/') ? `${root}${path}` : `${root}/uploads/${path}`
}
