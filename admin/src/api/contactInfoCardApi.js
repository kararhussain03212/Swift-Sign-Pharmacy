import api from './axios'

export const getContactInfoCards = () => api.get('/admin/contact/info-cards', { params: { paginate: 0 } })
export const getContactInfoCard = (id) => api.get(`/admin/contact/info-cards/${id}`)
export const createContactInfoCard = (payload) => api.post('/admin/contact/info-cards', payload)
export const updateContactInfoCard = (id, payload) => api.put(`/admin/contact/info-cards/${id}`, payload)
export const deleteContactInfoCard = (id) => api.delete(`/admin/contact/info-cards/${id}`)
