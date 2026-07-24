import api from '../api/axios'

const unwrap = (promise) => promise.then((res) => res.data.data)

export const registerUser = (payload) => unwrap(api.post('/customer/register', payload))
export const loginUser = (payload) => unwrap(api.post('/customer/login', payload))
export const logoutUser = () => unwrap(api.post('/customer/logout'))
export const getMe = () => unwrap(api.get('/customer/me'))
export const updateProfile = (payload) => unwrap(api.put('/customer/profile', payload))
export const changePassword = (payload) => unwrap(api.put('/customer/password', payload))

export const getAddresses = () => unwrap(api.get('/addresses'))
export const createAddress = (payload) => unwrap(api.post('/addresses', payload))
export const updateAddress = (id, payload) => unwrap(api.put(`/addresses/${id}`, payload))
export const deleteAddress = (id) => unwrap(api.delete(`/addresses/${id}`))

export const getCart = () => unwrap(api.get('/cart'))
export const addToCartApi = (productId, quantity = 1) => unwrap(api.post('/cart', { product_id: productId, quantity }))
export const updateCartItem = (id, quantity) => unwrap(api.put(`/cart/${id}`, { quantity }))
export const removeCartItem = (id) => unwrap(api.delete(`/cart/${id}`))
export const updateCartItemByProduct = (productId, quantity) => unwrap(api.put(`/cart/by-product/${productId}`, { quantity }))
export const removeCartItemByProduct = (productId) => unwrap(api.delete(`/cart/by-product/${productId}`))
export const clearCartApi = () => unwrap(api.delete('/cart'))

export const getWishlist = () => unwrap(api.get('/wishlist'))
export const addToWishlistApi = (productId) => unwrap(api.post('/wishlist', { product_id: productId }))
export const removeWishlistItem = (id) => unwrap(api.delete(`/wishlist/${id}`))
export const removeWishlistItemByProduct = (productId) => unwrap(api.delete(`/wishlist/by-product/${productId}`))

export const createOrder = (payload) => unwrap(api.post('/orders', payload))
export const getOrderHistory = () => unwrap(api.get('/orders'))
export const getOrderDetails = (id) => unwrap(api.get(`/orders/${id}`))

export const downloadInvoice = async (orderId) => {
  const response = await api.get(`/orders/${orderId}/invoice`, { responseType: 'blob' })
  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `Invoice-Order-${orderId}.pdf`)
  document.body.appendChild(link)
  link.click()
  link.parentNode.removeChild(link)
  window.URL.revokeObjectURL(url)
}
