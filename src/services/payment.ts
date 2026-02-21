// Payment API
// Sử dụng cho sau này thay thế dữ liệu mẫu
// Bỏ comment khi sẵn sàng tích hợp backend

import { API_BASE_URL, getHeaders } from "./config"

// Thanh toán đơn hàng
// export const processPayment = async (orderId: string, paymentData: any) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/payments/process`, {
//       method: "POST",
//       headers: getHeaders(true),
//       body: JSON.stringify({
//         orderId,
//         paymentMethod: paymentData.paymentMethod,
//         amount: paymentData.amount,
//         currency: paymentData.currency || "VND",
//         ...paymentData
//       })
//     })
//     if (!response.ok) throw new Error("Payment failed")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error processing payment:", error)
//     throw error
//   }
// }

// Lấy lịch sử thanh toán
// export const fetchPaymentHistory = async (userId: string, page = 1, limit = 10) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/payments/history?userId=${userId}&page=${page}&limit=${limit}`, {
//       headers: getHeaders(true)
//     })
//     if (!response.ok) throw new Error("Failed to fetch payment history")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error fetching payment history:", error)
//     throw error
//   }
// }

// Lấy chi tiết thanh toán
// export const fetchPaymentDetail = async (paymentId: string) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/payments/${paymentId}`, {
//       headers: getHeaders(true)
//     })
//     if (!response.ok) throw new Error("Failed to fetch payment detail")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error fetching payment detail:", error)
//     throw error
//   }
// }

// Hoàn tiền đơn hàng
// export const refundOrder = async (orderId: string, reason: string) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/payments/refund`, {
//       method: "POST",
//       headers: getHeaders(true),
//       body: JSON.stringify({ orderId, reason })
//     })
//     if (!response.ok) throw new Error("Refund failed")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error processing refund:", error)
//     throw error
//   }
// }

// Lấy danh sách phương thức thanh toán
// export const fetchPaymentMethods = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/payments/methods`)
//     if (!response.ok) throw new Error("Failed to fetch payment methods")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error fetching payment methods:", error)
//     throw error
//   }
// }

// Thêm phương thức thanh toán
// export const addPaymentMethod = async (userId: string, methodData: any) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/users/${userId}/payment-methods`, {
//       method: "POST",
//       headers: getHeaders(true),
//       body: JSON.stringify(methodData)
//     })
//     if (!response.ok) throw new Error("Failed to add payment method")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error adding payment method:", error)
//     throw error
//   }
// }

// Xóa phương thức thanh toán
// export const removePaymentMethod = async (userId: string, methodId: string) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/users/${userId}/payment-methods/${methodId}`, {
//       method: "DELETE",
//       headers: getHeaders(true)
//     })
//     if (!response.ok) throw new Error("Failed to remove payment method")
//     return true
//   } catch (error) {
//     console.error("Error removing payment method:", error)
//     throw error
//   }
// }
