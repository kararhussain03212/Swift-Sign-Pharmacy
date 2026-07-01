import api from './axios'

export const getHomepageHeroBanner = () => api.get('/admin/homepage/hero-banner')
export const updateHomepageHeroBanner = (payload) => api.put('/admin/homepage/hero-banner', payload)
export const addHomepageHeroBannerImage = (payload) => api.post('/admin/homepage/hero-banner/images', payload)
export const updateHomepageHeroBannerImage = (id, payload) => api.put(`/admin/homepage/hero-banner/images/${id}`, payload)
export const deleteHomepageHeroBannerImage = (id) => api.delete(`/admin/homepage/hero-banner/images/${id}`)
