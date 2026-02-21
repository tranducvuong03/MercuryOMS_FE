// Authentication & User API
// Sử dụng cho sau này thay thế dữ liệu mẫu
// Bỏ comment khi sẵn sàng tích hợp backend

import { API_BASE_URL, getHeaders } from "./config"

// Đăng nhập
// export const login = async (email: string, password: string) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/auth/login`, {
//       method: "POST",
//       headers: getHeaders(),
//       body: JSON.stringify({ email, password })
//     })
//     if (!response.ok) throw new Error("Login failed")
//     const data = await response.json()
//     localStorage.setItem("token", data.token)
//     localStorage.setItem("user", JSON.stringify(data.user))
//     localStorage.setItem("userId", data.user.id)
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
//       headers: getHeaders(),
//       body: JSON.stringify({ email, password, name })
//     })
//     if (!response.ok) throw new Error("Registration failed")
//     const data = await response.json()
//     localStorage.setItem("token", data.token)
//     localStorage.setItem("user", JSON.stringify(data.user))
//     localStorage.setItem("userId", data.user.id)
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
//       headers: getHeaders(true)
//     })
//     localStorage.removeItem("token")
//     localStorage.removeItem("user")
//     localStorage.removeItem("userId")
//     return true
//   } catch (error) {
//     console.error("Error logging out:", error)
//     // Vẫn xóa local storage ngay cả khi API call thất bại
//     localStorage.removeItem("token")
//     localStorage.removeItem("user")
//     localStorage.removeItem("userId")
//     throw error
//   }
// }

// Lấy thông tin user
// export const fetchUserProfile = async (userId: string) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
//       headers: getHeaders(true)
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
//       headers: getHeaders(true),
//       body: JSON.stringify(userData)
//     })
//     if (!response.ok) throw new Error("Failed to update profile")
//     const data = await response.json()
//     // Cập nhật user info trong localStorage
//     localStorage.setItem("user", JSON.stringify(data.user))
//     return data
//   } catch (error) {
//     console.error("Error updating profile:", error)
//     throw error
//   }
// }

// Đổi mật khẩu
// export const changePassword = async (userId: string, oldPassword: string, newPassword: string) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/users/${userId}/change-password`, {
//       method: "POST",
//       headers: getHeaders(true),
//       body: JSON.stringify({ oldPassword, newPassword })
//     })
//     if (!response.ok) throw new Error("Failed to change password")
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error changing password:", error)
//     throw error
//   }
// }

// Refresh token
// export const refreshToken = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
//       method: "POST",
//       headers: getHeaders(true)
//     })
//     if (!response.ok) throw new Error("Failed to refresh token")
//     const data = await response.json()
//     localStorage.setItem("token", data.token)
//     return data
//   } catch (error) {
//     console.error("Error refreshing token:", error)
//     throw error
//   }
// }
