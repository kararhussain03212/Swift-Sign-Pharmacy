import api from './axios'

// Returns top-level categories with subcategories nested under `children`.
export const getCategoriesNested = () => api.get('/admin/categories')
export const getCategory = (id) => api.get(`/admin/categories/${id}`)
export const createCategory = (payload) => api.post('/admin/categories', payload)
export const updateCategory = (id, payload) => api.put(`/admin/categories/${id}`, payload)
export const deleteCategory = (id) => api.delete(`/admin/categories/${id}`)
