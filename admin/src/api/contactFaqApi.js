import api from './axios'

export const getContactFaqs = () => api.get('/admin/contact/faqs', { params: { paginate: 0 } })
export const getContactFaq = (id) => api.get(`/admin/contact/faqs/${id}`)
export const createContactFaq = (payload) => api.post('/admin/contact/faqs', payload)
export const updateContactFaq = (id, payload) => api.put(`/admin/contact/faqs/${id}`, payload)
export const deleteContactFaq = (id) => api.delete(`/admin/contact/faqs/${id}`)
