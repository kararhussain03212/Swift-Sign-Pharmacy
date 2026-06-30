import api from './axios'

export const getAnnouncementBarItems = () => api.get('/admin/announcement-bar?paginate=0')
export const getAnnouncementBarItem = (id) => api.get(`/admin/announcement-bar/${id}`)
export const createAnnouncementBarItem = (payload) => api.post('/admin/announcement-bar', payload)
export const updateAnnouncementBarItem = (id, payload) => api.put(`/admin/announcement-bar/${id}`, payload)
export const deleteAnnouncementBarItem = (id) => api.delete(`/admin/announcement-bar/${id}`)
