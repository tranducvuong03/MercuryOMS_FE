// Products API
// Sử dụng cho sau này thay thế dữ liệu mẫu
// Bỏ comment khi sẵn sàng tích hợp backend

import { API_BASE_URL } from "./config"

// Lấy danh sách tất cả sản phẩm
// export const fetchProducts = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/products`)
//     if (!response.ok) throw new Error("Failed to fetch products")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error fetching products:", error)
//     throw error
//   }
// }

// Lấy chi tiết sản phẩm theo ID
// export const fetchProductDetail = async (productId: number) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/products/${productId}`)
//     if (!response.ok) throw new Error("Failed to fetch product detail")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error(`Error fetching product ${productId}:`, error)
//     throw error
//   }
// }

// Tìm kiếm sản phẩm
// export const searchProducts = async (query: string, filters?: any) => {
//   try {
//     const params = new URLSearchParams()
//     params.append("q", query)
//     if (filters?.category) params.append("category", filters.category)
//     if (filters?.minPrice) params.append("minPrice", filters.minPrice)
//     if (filters?.maxPrice) params.append("maxPrice", filters.maxPrice)
//     if (filters?.rating) params.append("rating", filters.rating)
//     
//     const response = await fetch(`${API_BASE_URL}/products/search?${params}`)
//     if (!response.ok) throw new Error("Failed to search products")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error searching products:", error)
//     throw error
//   }
// }

// Lấy danh sách danh mục
// export const fetchCategories = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/categories`)
//     if (!response.ok) throw new Error("Failed to fetch categories")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error fetching categories:", error)
//     throw error
//   }
// }

// Lấy sản phẩm theo danh mục
// export const fetchProductsByCategory = async (category: string) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/categories/${category}/products`)
//     if (!response.ok) throw new Error("Failed to fetch products by category")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error(`Error fetching products for category ${category}:`, error)
//     throw error
//   }
// }
