import api from './axios'

export const getStoreLocatorContent = () => api.get('/admin/store-locator/content')
export const updateStoreLocatorContent = (payload) => api.put('/admin/store-locator/content', payload)
