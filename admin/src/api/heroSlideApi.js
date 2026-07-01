import api from './axios'

export const getHeroSlides = () => api.get('/admin/hero-slides', { params: { paginate: 0 } })
export const getHeroSlide = (id) => api.get(`/admin/hero-slides/${id}`)
export const createHeroSlide = (payload) => api.post('/admin/hero-slides', payload)
export const updateHeroSlide = (id, payload) => api.put(`/admin/hero-slides/${id}`, payload)
export const deleteHeroSlide = (id) => api.delete(`/admin/hero-slides/${id}`)
