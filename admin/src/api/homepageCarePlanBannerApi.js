import api from './axios'

export const getHomepageCarePlanBanner = () => api.get('/admin/homepage/care-plan-banner')
export const updateHomepageCarePlanBanner = (payload) => api.put('/admin/homepage/care-plan-banner', payload)
