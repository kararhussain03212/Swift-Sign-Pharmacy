import api from './axios'

export const getFeaturedBrands = () => api.get('/admin/homepage/featured-brands', { params: { paginate: 0 } })
export const getFeaturedBrand = (id) => api.get(`/admin/homepage/featured-brands/${id}`)
export const createFeaturedBrand = (payload) => api.post('/admin/homepage/featured-brands', payload)
export const updateFeaturedBrand = (id, payload) => api.put(`/admin/homepage/featured-brands/${id}`, payload)
export const deleteFeaturedBrand = (id) => api.delete(`/admin/homepage/featured-brands/${id}`)
