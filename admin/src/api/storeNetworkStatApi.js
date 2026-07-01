import api from './axios'

export const getStoreNetworkStats = () => api.get('/admin/store-locator/stats', { params: { paginate: 0 } })
export const createStoreNetworkStat = (payload) => api.post('/admin/store-locator/stats', payload)
export const updateStoreNetworkStat = (id, payload) => api.put(`/admin/store-locator/stats/${id}`, payload)
export const deleteStoreNetworkStat = (id) => api.delete(`/admin/store-locator/stats/${id}`)
