import api from './axios'

export const getPrescriptionOrders = (params) => api.get('/admin/prescription-orders', { params })
export const getPrescriptionOrder = (id) => api.get(`/admin/prescription-orders/${id}`)
export const updatePrescriptionOrder = (id, payload) => api.put(`/admin/prescription-orders/${id}`, payload)
export const getPrescriptionOrderFileUrl = (id) => {
  const base = api.defaults.baseURL || ''
  return `${base}/admin/prescription-orders/${id}/file`
}
export const fetchPrescriptionOrderFileBlob = (id) =>
  api.get(`/admin/prescription-orders/${id}/file`, { responseType: 'blob' })
