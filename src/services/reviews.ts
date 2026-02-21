// Reviews API
// Sử dụng cho sau này thay thế dữ liệu mẫu
// Bỏ comment khi sẵn sàng tích hợp backend

import { API_BASE_URL, getHeaders } from "./config"

// Lấy bình luận của sản phẩm
// export const fetchProductReviews = async (productId: number, page = 1, limit = 10) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews?page=${page}&limit=${limit}`)
//     if (!response.ok) throw new Error("Failed to fetch reviews")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error fetching reviews:", error)
//     throw error
//   }
// }

// Thêm bình luận
// export const addProductReview = async (productId: number, reviewData: any) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews`, {
//       method: "POST",
//       headers: getHeaders(true),
//       body: JSON.stringify({
//         rating: reviewData.rating,
//         comment: reviewData.comment,
//         userId: reviewData.userId
//       })
//     })
//     if (!response.ok) throw new Error("Failed to add review")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error adding review:", error)
//     throw error
//   }
// }

// Cập nhật bình luận
// export const updateProductReview = async (productId: number, reviewId: string, reviewData: any) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews/${reviewId}`, {
//       method: "PUT",
//       headers: getHeaders(true),
//       body: JSON.stringify({
//         rating: reviewData.rating,
//         comment: reviewData.comment
//       })
//     })
//     if (!response.ok) throw new Error("Failed to update review")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error updating review:", error)
//     throw error
//   }
// }

// Xóa bình luận
// export const deleteProductReview = async (productId: number, reviewId: string) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews/${reviewId}`, {
//       method: "DELETE",
//       headers: getHeaders(true)
//     })
//     if (!response.ok) throw new Error("Failed to delete review")
//     return true
//   } catch (error) {
//     console.error("Error deleting review:", error)
//     throw error
//   }
// }

// Lấy bình luận của user
// export const fetchUserReviews = async (userId: string) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/users/${userId}/reviews`, {
//       headers: getHeaders(true)
//     })
//     if (!response.ok) throw new Error("Failed to fetch user reviews")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error fetching user reviews:", error)
//     throw error
//   }
// }

// Like/Unlike bình luận
// export const toggleLikeReview = async (reviewId: string) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}/like`, {
//       method: "POST",
//       headers: getHeaders(true)
//     })
//     if (!response.ok) throw new Error("Failed to toggle like")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error toggling like:", error)
//     throw error
//   }
// }
