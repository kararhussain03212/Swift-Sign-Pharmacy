import api from './axios'

export const getLocations = () => api.get('/admin/locations?paginate=0')
export const getLocation = (id) => api.get(`/admin/locations/${id}`)
export const createLocation = (payload) => api.post('/admin/locations', payload)
export const updateLocation = (id, payload) => api.put(`/admin/locations/${id}`, payload)
export const deleteLocation = (id) => api.delete(`/admin/locations/${id}`)
