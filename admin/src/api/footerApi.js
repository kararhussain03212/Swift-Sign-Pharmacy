import api from './axios'

// Quick Links
export const getFooterQuickLinks = () => api.get('/admin/footer/quick-links?paginate=0')
export const getFooterQuickLink = (id) => api.get(`/admin/footer/quick-links/${id}`)
export const createFooterQuickLink = (payload) => api.post('/admin/footer/quick-links', payload)
export const updateFooterQuickLink = (id, payload) => api.put(`/admin/footer/quick-links/${id}`, payload)
export const deleteFooterQuickLink = (id) => api.delete(`/admin/footer/quick-links/${id}`)

// App Links
export const getFooterAppLinks = () => api.get('/admin/footer/app-links?paginate=0')
export const getFooterAppLink = (id) => api.get(`/admin/footer/app-links/${id}`)
export const createFooterAppLink = (payload) => api.post('/admin/footer/app-links', payload)
export const updateFooterAppLink = (id, payload) => api.put(`/admin/footer/app-links/${id}`, payload)
export const deleteFooterAppLink = (id) => api.delete(`/admin/footer/app-links/${id}`)

// Social Links
export const getFooterSocialLinks = () => api.get('/admin/footer/social-links?paginate=0')
export const getFooterSocialLink = (id) => api.get(`/admin/footer/social-links/${id}`)
export const createFooterSocialLink = (payload) => api.post('/admin/footer/social-links', payload)
export const updateFooterSocialLink = (id, payload) => api.put(`/admin/footer/social-links/${id}`, payload)
export const deleteFooterSocialLink = (id) => api.delete(`/admin/footer/social-links/${id}`)

// Company Info (singleton)
export const getFooterCompanyInfo = () => api.get('/admin/footer/company-info')
export const updateFooterCompanyInfo = (payload) => api.put('/admin/footer/company-info', payload)

// Settings (singleton)
export const getFooterSettings = () => api.get('/admin/footer/settings')
export const updateFooterSettings = (payload) => api.put('/admin/footer/settings', payload)
