import api from './axios'

export const getStoreBranches = () => api.get('/admin/store-locator/branches', { params: { paginate: 0 } })
export const getStoreBranch = (id) => api.get(`/admin/store-locator/branches/${id}`)
export const createStoreBranch = (payload) => api.post('/admin/store-locator/branches', payload)
export const updateStoreBranch = (id, payload) => api.put(`/admin/store-locator/branches/${id}`, payload)
export const deleteStoreBranch = (id) => api.delete(`/admin/store-locator/branches/${id}`)
