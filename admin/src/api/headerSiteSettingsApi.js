import api from './axios'

// Single-row settings for the Arion Pharmacy Header module (id = 1).
// Distinct from the existing `settingApi.js`, which manages a different settings table.
export const getHeaderSiteSettings = () => api.get('/admin/site-settings')
export const updateHeaderSiteSettings = (payload) => api.put('/admin/site-settings', payload)
