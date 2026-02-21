// Orders API
// Sử dụng cho sau này thay thế dữ liệu mẫu
// Bỏ comment khi sẵn sàng tích hợp backend

import { API_BASE_URL, getHeaders } from "./config"

// Lấy danh sách đơn hàng của user
// export const fetchOrders = async (userId: string, page = 1, limit = 10) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/orders?userId=${userId}&page=${page}&limit=${limit}`, {
//       headers: getHeaders(true)
//     })
//     if (!response.ok) throw new Error("Failed to fetch orders")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error fetching orders:", error)
//     throw error
//   }
// }

// Lấy chi tiết đơn hàng
// export const fetchOrderDetail = async (orderId: string) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
//       headers: getHeaders(true)
//     })
//     if (!response.ok) throw new Error("Failed to fetch order detail")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error fetching order detail:", error)
//     throw error
//   }
// }

// Tạo đơn hàng
// export const createOrder = async (userId: string, orderData: any) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/orders`, {
//       method: "POST",
//       headers: getHeaders(true),
//       body: JSON.stringify({
//         userId,
//         items: orderData.items,
//         shippingAddress: orderData.shippingAddress,
//         shippingMethod: orderData.shippingMethod,
//         paymentMethod: orderData.paymentMethod,
//         totalAmount: orderData.totalAmount
//       })
//     })
//     if (!response.ok) throw new Error("Failed to create order")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error creating order:", error)
//     throw error
//   }
// }

// Hủy đơn hàng
// export const cancelOrder = async (orderId: string) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
//       method: "POST",
//       headers: getHeaders(true)
//     })
//     if (!response.ok) throw new Error("Failed to cancel order")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error cancelling order:", error)
//     throw error
//   }
// }

// Lấy trạng thái vận chuyển
// export const fetchShippingStatus = async (orderId: string) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/orders/${orderId}/shipping`, {
//       headers: getHeaders(true)
//     })
//     if (!response.ok) throw new Error("Failed to fetch shipping status")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error fetching shipping status:", error)
//     throw error
//   }
// }

// Cập nhật đơn hàng
// export const updateOrder = async (orderId: string, updateData: any) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
//       method: "PUT",
//       headers: getHeaders(true),
//       body: JSON.stringify(updateData)
//     })
//     if (!response.ok) throw new Error("Failed to update order")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error updating order:", error)
//     throw error
//   }
// }
