import api from './axios'

// Page Content (singleton)
export const getCertificationPageContent = () => api.get('/admin/certifications/page-content')
export const updateCertificationPageContent = (payload) => api.put('/admin/certifications/page-content', payload)

// Categories
export const getCertificationCategories = () => api.get('/admin/certifications/categories?paginate=0')
export const getCertificationCategory = (id) => api.get(`/admin/certifications/categories/${id}`)
export const createCertificationCategory = (payload) => api.post('/admin/certifications/categories', payload)
export const updateCertificationCategory = (id, payload) => api.put(`/admin/certifications/categories/${id}`, payload)
export const deleteCertificationCategory = (id) => api.delete(`/admin/certifications/categories/${id}`)

// Certificates (items)
export const getCertifications = (params = {}) => api.get('/admin/certifications/items', { params })
export const getCertification = (id) => api.get(`/admin/certifications/items/${id}`)
export const createCertification = (payload) => api.post('/admin/certifications/items', payload)
export const updateCertification = (id, payload) => api.put(`/admin/certifications/items/${id}`, payload)
export const deleteCertification = (id) => api.delete(`/admin/certifications/items/${id}`)

// Trust Badges
export const getCertificationTrustBadges = () => api.get('/admin/certifications/trust-badges?paginate=0')
export const getCertificationTrustBadge = (id) => api.get(`/admin/certifications/trust-badges/${id}`)
export const createCertificationTrustBadge = (payload) => api.post('/admin/certifications/trust-badges', payload)
export const updateCertificationTrustBadge = (id, payload) => api.put(`/admin/certifications/trust-badges/${id}`, payload)
export const deleteCertificationTrustBadge = (id) => api.delete(`/admin/certifications/trust-badges/${id}`)
