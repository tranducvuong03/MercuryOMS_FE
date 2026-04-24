// Cart API
// Sử dụng cho sau này thay thế dữ liệu mẫu
// Bỏ comment khi sẵn sàng tích hợp backend

import { API_BASE_URL, getHeaders } from "./apiClient"

// Lấy giỏ hàng của user
// export const fetchCart = async (userId: string) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/cart/${userId}`, {
//       headers: getHeaders(true)
//     })
//     if (!response.ok) throw new Error("Failed to fetch cart")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error fetching cart:", error)
//     throw error
//   }
// }

// Thêm sản phẩm vào giỏ
// export const addToCart = async (userId: string, productId: number, quantity: number, variantId?: string) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/cart/${userId}/items`, {
//       method: "POST",
//       headers: getHeaders(true),
//       body: JSON.stringify({ productId, quantity, variantId })
//     })
//     if (!response.ok) throw new Error("Failed to add to cart")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error adding to cart:", error)
//     throw error
//   }
// }

// Cập nhật số lượng sản phẩm trong giỏ
// export const updateCartItem = async (userId: string, itemId: string, quantity: number) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/cart/${userId}/items/${itemId}`, {
//       method: "PUT",
//       headers: getHeaders(true),
//       body: JSON.stringify({ quantity })
//     })
//     if (!response.ok) throw new Error("Failed to update cart item")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error updating cart item:", error)
//     throw error
//   }
// }

// Xóa sản phẩm từ giỏ
// export const removeFromCart = async (userId: string, itemId: string) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/cart/${userId}/items/${itemId}`, {
//       method: "DELETE",
//       headers: getHeaders(true)
//     })
//     if (!response.ok) throw new Error("Failed to remove from cart")
//     return true
//   } catch (error) {
//     console.error("Error removing from cart:", error)
//     throw error
//   }
// }

// Xóa toàn bộ giỏ hàng
// export const clearCart = async (userId: string) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/cart/${userId}`, {
//       method: "DELETE",
//       headers: getHeaders(true)
//     })
//     if (!response.ok) throw new Error("Failed to clear cart")
//     return true
//   } catch (error) {
//     console.error("Error clearing cart:", error)
//     throw error
//   }
// }
