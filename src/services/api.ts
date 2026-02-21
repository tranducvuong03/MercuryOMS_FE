// API Service - Sử dụng cho sau này thay thế dữ liệu mẫu
// Bỏ comment khi sẵn sàng tích hợp backend

//const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

// ==================== PRODUCTS API ====================

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

// ==================== CART API ====================

// Lấy giỏ hàng của user
// export const fetchCart = async (userId: string) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/cart/${userId}`)
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
//       headers: { "Content-Type": "application/json" },
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
//       headers: { "Content-Type": "application/json" },
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
//       method: "DELETE"
//     })
//     if (!response.ok) throw new Error("Failed to remove from cart")
//     return true
//   } catch (error) {
//     console.error("Error removing from cart:", error)
//     throw error
//   }
// }

// ==================== USER & AUTHENTICATION ====================

// Đăng nhập
// export const login = async (email: string, password: string) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password })
//     })
//     if (!response.ok) throw new Error("Login failed")
//     const data = await response.json()
//     localStorage.setItem("token", data.token)
//     localStorage.setItem("user", JSON.stringify(data.user))
//     return data
//   } catch (error) {
//     console.error("Error logging in:", error)
//     throw error
//   }
// }

// Đăng ký
// export const register = async (email: string, password: string, name: string) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/auth/register`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password, name })
//     })
//     if (!response.ok) throw new Error("Registration failed")
//     const data = await response.json()
//     localStorage.setItem("token", data.token)
//     localStorage.setItem("user", JSON.stringify(data.user))
//     return data
//   } catch (error) {
//     console.error("Error registering:", error)
//     throw error
//   }
// }

// Đăng xuất
// export const logout = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/auth/logout`, {
//       method: "POST",
//       headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
//     })
//     localStorage.removeItem("token")
//     localStorage.removeItem("user")
//     return true
//   } catch (error) {
//     console.error("Error logging out:", error)
//     throw error
//   }
// }

// Lấy thông tin user
// export const fetchUserProfile = async (userId: string) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
//       headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
//     })
//     if (!response.ok) throw new Error("Failed to fetch user profile")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error fetching user profile:", error)
//     throw error
//   }
// }

// Cập nhật thông tin user
// export const updateUserProfile = async (userId: string, userData: any) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${localStorage.getItem("token")}`
//       },
//       body: JSON.stringify(userData)
//     })
//     if (!response.ok) throw new Error("Failed to update profile")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error updating profile:", error)
//     throw error
//   }
// }

// ==================== ORDERS API ====================

// Lấy danh sách đơn hàng của user
// export const fetchOrders = async (userId: string) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/orders?userId=${userId}`, {
//       headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
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
//       headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
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
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${localStorage.getItem("token")}`
//       },
//       body: JSON.stringify({ userId, ...orderData })
//     })
//     if (!response.ok) throw new Error("Failed to create order")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error creating order:", error)
//     throw error
//   }
// }

// ==================== REVIEWS API ====================

// Lấy bình luận của sản phẩm
// export const fetchProductReviews = async (productId: number) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews`)
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
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${localStorage.getItem("token")}`
//       },
//       body: JSON.stringify(reviewData)
//     })
//     if (!response.ok) throw new Error("Failed to add review")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error adding review:", error)
//     throw error
//   }
// }

// ==================== SHOP API ====================

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
// export const fetchShopProducts = async (shopId: number) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/shops/${shopId}/products`)
//     if (!response.ok) throw new Error("Failed to fetch shop products")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error fetching shop products:", error)
//     throw error
//   }
// }

// ==================== PAYMENT API ====================

// Thanh toán đơn hàng
// export const processPayment = async (orderId: string, paymentData: any) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/payments/process`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${localStorage.getItem("token")}`
//       },
//       body: JSON.stringify({ orderId, ...paymentData })
//     })
//     if (!response.ok) throw new Error("Payment failed")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error processing payment:", error)
//     throw error
//   }
// }
