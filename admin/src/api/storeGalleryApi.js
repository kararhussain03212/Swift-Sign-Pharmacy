import api from './axios'

export const getStoreGalleryImages = () => api.get('/admin/store-locator/gallery', { params: { paginate: 0 } })
export const getStoreGalleryImage = (id) => api.get(`/admin/store-locator/gallery/${id}`)
export const createStoreGalleryImage = (payload) => api.post('/admin/store-locator/gallery', payload)
export const updateStoreGalleryImage = (id, payload) => api.put(`/admin/store-locator/gallery/${id}`, payload)
export const deleteStoreGalleryImage = (id) => api.delete(`/admin/store-locator/gallery/${id}`)
