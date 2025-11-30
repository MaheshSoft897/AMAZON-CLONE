import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = {
  // Products
  getProducts: (params) => axios.get(`${API_URL}/products`, { params }),
  getProduct: (id) => axios.get(`${API_URL}/products/${id}`),
  getCategories: () => axios.get(`${API_URL}/products/categories/list`),

  // Cart
  getCart: () => axios.get(`${API_URL}/cart`),
  addToCart: (productId, quantity) => axios.post(`${API_URL}/cart/add`, { productId, quantity }),
  updateCartItem: (itemId, quantity) => axios.put(`${API_URL}/cart/update/${itemId}`, { quantity }),
  removeFromCart: (itemId) => axios.delete(`${API_URL}/cart/remove/${itemId}`),
  clearCart: () => axios.delete(`${API_URL}/cart/clear`),

  // Orders
  getOrders: () => axios.get(`${API_URL}/orders`),
  getOrder: (id) => axios.get(`${API_URL}/orders/${id}`),
  createOrder: (orderData) => axios.post(`${API_URL}/orders`, orderData),
  updateOrderStatus: (id, status) => axios.put(`${API_URL}/orders/${id}/status`, { orderStatus: status }),

  // Payment
  createRazorpayOrder: (orderId, amount) => axios.post(`${API_URL}/payment/create-order`, { orderId, amount }),
  verifyPayment: (paymentData) => axios.post(`${API_URL}/payment/verify`, paymentData),

  // Admin
  createProduct: (formData) => axios.post(`${API_URL}/admin/products`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateProduct: (id, formData) => axios.put(`${API_URL}/admin/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteProduct: (id) => axios.delete(`${API_URL}/admin/products/${id}`),
  getAdminOrders: (params) => axios.get(`${API_URL}/admin/orders`, { params }),
  updateOrderStatusAdmin: (id, status) => axios.put(`${API_URL}/admin/orders/${id}/status`, { orderStatus: status }),
  getAdminStats: () => axios.get(`${API_URL}/admin/stats`)
};

