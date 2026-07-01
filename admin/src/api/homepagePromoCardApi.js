import api from './axios'

export const getHomepagePromoCards = () => api.get('/admin/homepage/promo-cards', { params: { paginate: 0 } })
export const getHomepagePromoCard = (id) => api.get(`/admin/homepage/promo-cards/${id}`)
export const createHomepagePromoCard = (payload) => api.post('/admin/homepage/promo-cards', payload)
export const updateHomepagePromoCard = (id, payload) => api.put(`/admin/homepage/promo-cards/${id}`, payload)
export const deleteHomepagePromoCard = (id) => api.delete(`/admin/homepage/promo-cards/${id}`)
