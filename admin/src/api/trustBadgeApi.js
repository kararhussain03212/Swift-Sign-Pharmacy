import api from './axios'

export const getTrustBadges = () => api.get('/admin/homepage/trust-badges', { params: { paginate: 0 } })
export const getTrustBadge = (id) => api.get(`/admin/homepage/trust-badges/${id}`)
export const createTrustBadge = (payload) => api.post('/admin/homepage/trust-badges', payload)
export const updateTrustBadge = (id, payload) => api.put(`/admin/homepage/trust-badges/${id}`, payload)
export const deleteTrustBadge = (id) => api.delete(`/admin/homepage/trust-badges/${id}`)
