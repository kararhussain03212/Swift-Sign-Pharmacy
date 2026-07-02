import api from './axios'

export const getHomepageSliders = () => api.get('/admin/homepage-sliders')
export const getHomepageSlider = (id) => api.get(`/admin/homepage-sliders/${id}`)
export const createHomepageSlider = (payload) => api.post('/admin/homepage-sliders', payload)
export const updateHomepageSlider = (id, payload) => api.put(`/admin/homepage-sliders/${id}`, payload)
export const deleteHomepageSlider = (id) => api.delete(`/admin/homepage-sliders/${id}`)
export const reorderHomepageSliders = (ids) => api.put('/admin/homepage-sliders/reorder', { ids })
