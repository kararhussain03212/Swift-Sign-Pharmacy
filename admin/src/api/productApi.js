import api from './axios'

export const getProducts = (params = {}) => api.get('/admin/products', { params })
export const getProduct = (id) => api.get(`/admin/products/${id}`)
export const createProduct = (payload) => api.post('/admin/products', payload)
export const updateProduct = (id, payload) => api.put(`/admin/products/${id}`, payload)
export const deleteProduct = (id) => api.delete(`/admin/products/${id}`)
export const getCategoriesWithType = () => api.get('/admin/categories-with-type')
