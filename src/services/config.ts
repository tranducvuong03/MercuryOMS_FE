// Cấu hình API - Sử dụng chung cho tất cả services
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

const getHeaders = (includeAuth = false): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json"
  }
  
  if (includeAuth) {
    const token = localStorage.getItem("token")
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
  }
  
  return headers
}

export { API_BASE_URL, getHeaders }
