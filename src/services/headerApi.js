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

async function postJson(path) {
  const res = await fetch(`${getApiBase()}${path}`, { method: 'POST' })
  const json = await res.json().catch(() => ({}))
  if (!res.ok || !json.success) throw new Error(json.error || `Request failed: ${res.status}`)
  return json.data
}

async function postJsonBody(path, body) {
  const res = await fetch(`${getApiBase()}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok || !json.success) {
    const error = new Error(json.error || `Request failed: ${res.status}`)
    error.fields = json.fields
    throw error
  }
  return json.data
}

export const getAnnouncementBar = () => getJson('/public/announcement-bar')
export const getSiteSettings = () => getJson('/public/site-settings')
export const getNavLinks = () => getJson('/public/nav-links')
export const getCategories = () => getJson('/public/categories')
export const getLocations = () => getJson('/public/locations')
export const getHeroSlides = () => getJson('/public/hero-slides')
export const getBlogSettings = () => getJson('/public/blog/settings')

export const getPublishedBlogs = () => getJson('/public/blog')

export const getContactPageContent = () => getJson('/public/contact-page')
export const getContactInfoCards = () => getJson('/public/contact/info-cards')
export const getContactFaqs = () => getJson('/public/contact/faqs')
export const submitContactMessage = (payload) => postJsonBody('/public/contact', payload)

export const getHomepageHeroBanner = () => getJson('/public/homepage/hero-banner')
export const getHomepagePromoCards = () => getJson('/public/homepage/promo-cards')
export const getHomepageCarePlanBanner = () => getJson('/public/homepage/care-plan-banner')
export const getFeaturedBrands = () => getJson('/public/homepage/featured-brands')
export const getTrustBadges = () => getJson('/public/homepage/trust-badges')
export const getHomepageProductSliders = () => getJson('/public/homepage/product-sliders')

export const getFooterData = () => getJson('/public/footer')

export async function getProductBySlug(slug) {
  const res = await fetch(`${getApiBase()}/public/products/${encodeURIComponent(slug)}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  const json = await res.json()
  if (!json.success) throw new Error(json.error || 'Request failed')
  return json.data
}

export async function getRelatedProducts(slug) {
  const res = await fetch(`${getApiBase()}/public/products/${encodeURIComponent(slug)}/related`)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  const json = await res.json()
  if (!json.success) throw new Error(json.error || 'Request failed')
  return json.data
}

export const getStoreBranches = (area) => getJson(`/public/store-locator/branches${area ? `?area=${encodeURIComponent(area)}` : ''}`)
export const getStoreNetworkStats = () => getJson('/public/store-locator/stats')
export const getStoreLocatorContent = () => getJson('/public/store-locator/content')
export const getStoreGallery = () => getJson('/public/store-locator/gallery')

export async function getStoreBranchBySlug(slug) {
  const res = await fetch(`${getApiBase()}/public/store-locator/branches/${encodeURIComponent(slug)}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  const json = await res.json()
  if (!json.success) throw new Error(json.error || 'Request failed')
  return json.data
}

export async function getBlogPostBySlug(slug) {
  const res = await fetch(`${getApiBase()}/public/blog/${encodeURIComponent(slug)}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  const json = await res.json()
  if (!json.success) throw new Error(json.error || 'Request failed')
  return json.data
}

export const likeBlogPost = (slug) => postJson(`/public/blog/${encodeURIComponent(slug)}/like`)

export const resolveUploadUrl = (path) => {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  const root = getApiBase().replace(/\/api$/i, '')
  return path.startsWith('/') ? `${root}${path}` : `${root}/uploads/${path}`
}
