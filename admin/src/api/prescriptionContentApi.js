import api from './axios'

export const getPrescriptionPageContent = () => api.get('/admin/prescription/content')
export const updatePrescriptionPageContent = (payload) => api.put('/admin/prescription/content', payload)

export const getPrescriptionProcessSteps = () => api.get('/admin/prescription/process-steps', { params: { paginate: 0 } })
export const getPrescriptionProcessStep = (id) => api.get(`/admin/prescription/process-steps/${id}`)
export const createPrescriptionProcessStep = (payload) => api.post('/admin/prescription/process-steps', payload)
export const updatePrescriptionProcessStep = (id, payload) => api.put(`/admin/prescription/process-steps/${id}`, payload)
export const deletePrescriptionProcessStep = (id) => api.delete(`/admin/prescription/process-steps/${id}`)

export const getPrescriptionHowtoInstructions = () => api.get('/admin/prescription/howto-instructions', { params: { paginate: 0 } })
export const getPrescriptionHowtoInstruction = (id) => api.get(`/admin/prescription/howto-instructions/${id}`)
export const createPrescriptionHowtoInstruction = (payload) => api.post('/admin/prescription/howto-instructions', payload)
export const updatePrescriptionHowtoInstruction = (id, payload) => api.put(`/admin/prescription/howto-instructions/${id}`, payload)
export const deletePrescriptionHowtoInstruction = (id) => api.delete(`/admin/prescription/howto-instructions/${id}`)

export const getPrescriptionSampleIllustration = () => api.get('/admin/prescription/sample-illustration')
export const updatePrescriptionSampleIllustration = (payload) => api.put('/admin/prescription/sample-illustration', payload)
