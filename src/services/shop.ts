// Shop API
// Sử dụng cho sau này thay thế dữ liệu mẫu
// Bỏ comment khi sẵn sàng tích hợp backend

import { API_BASE_URL, getHeaders } from "./config"

// Lấy thông tin shop
// export const fetchShopInfo = async (shopId: number) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/shops/${shopId}`)
//     if (!response.ok) throw new Error("Failed to fetch shop info")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error fetching shop info:", error)
//     throw error
//   }
// }

// Lấy sản phẩm của shop
// export const fetchShopProducts = async (shopId: number, page = 1, limit = 20) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/shops/${shopId}/products?page=${page}&limit=${limit}`)
//     if (!response.ok) throw new Error("Failed to fetch shop products")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error fetching shop products:", error)
//     throw error
//   }
// }

// Lấy danh sách shop
// export const fetchShops = async (page = 1, limit = 10) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/shops?page=${page}&limit=${limit}`)
//     if (!response.ok) throw new Error("Failed to fetch shops")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error fetching shops:", error)
//     throw error
//   }
// }

// Follow shop
// export const followShop = async (shopId: number) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/shops/${shopId}/follow`, {
//       method: "POST",
//       headers: getHeaders(true)
//     })
//     if (!response.ok) throw new Error("Failed to follow shop")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error following shop:", error)
//     throw error
//   }
// }

// Unfollow shop
// export const unfollowShop = async (shopId: number) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/shops/${shopId}/unfollow`, {
//       method: "POST",
//       headers: getHeaders(true)
//     })
//     if (!response.ok) throw new Error("Failed to unfollow shop")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error unfollowing shop:", error)
//     throw error
//   }
// }

// Chat với shop
// export const createChatWithShop = async (shopId: number) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/shops/${shopId}/chat`, {
//       method: "POST",
//       headers: getHeaders(true)
//     })
//     if (!response.ok) throw new Error("Failed to create chat")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error creating chat:", error)
//     throw error
//   }
// }

// Lấy shop có rating cao nhất
// export const fetchTopRatedShops = async (limit = 10) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/shops/top-rated?limit=${limit}`)
//     if (!response.ok) throw new Error("Failed to fetch top rated shops")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error fetching top rated shops:", error)
//     throw error
//   }
// }
