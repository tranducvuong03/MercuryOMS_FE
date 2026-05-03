import type { Result } from "../types/result"

export const API_BASE_URL = import.meta.env.VITE_API_URL

// lấy access token
const getToken = () => localStorage.getItem("token")

// lưu access token
const setToken = (token: string) =>
  localStorage.setItem("token", token)

// xoá access token
const clearToken = () =>
  localStorage.removeItem("token")

type Options = RequestInit & {
  auth?: boolean
}

export async function request<T = any>(
  url: string,
  options: Options = {}
): Promise<T> {
  const { auth = false, headers, ...rest } = options

  // headers mặc định
  const finalHeaders = new Headers({
    "Content-Type": "application/json"
  })

  // merge headers custom
  if (headers) {
    Object.entries(headers as Record<string, string>).forEach(([k, v]) => {
      finalHeaders.set(k, v)
    })
  }

  // gắn access token nếu cần auth
  if (auth) {
    const token = getToken()
    if (token) {
      finalHeaders.set("Authorization", `Bearer ${token}`)
    }
  }

  let res = await fetch(`${API_BASE_URL}${url}`, {
    ...rest,
    headers: finalHeaders,
    credentials: "include"
  })

  if (res.status === 401 && auth) {
    const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include"
    })

    if (!refreshRes.ok) {
      clearToken()
      window.location.href = "/login"
      throw new Error("Session expired")
    }

    const refreshData = await refreshRes.json() as Result<string>

    // check Result
    if (!refreshData.isSuccess || !refreshData.value) {
      clearToken()
      window.location.href = "/login"
      throw new Error(refreshData.message || "Refresh failed")
    }

    const newAccessToken = refreshData.value

    // lưu token mới
    setToken(newAccessToken)

    // gắn header mới
    finalHeaders.set("Authorization", `Bearer ${newAccessToken}`)

    // retry request
    res = await fetch(`${API_BASE_URL}${url}`, {
      ...rest,
      headers: finalHeaders,
      credentials: "include"
    })
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => null)
    throw new Error(errorData?.message || `HTTP ${res.status}`)
  }

  // trả data
  return (await res.json()) as T
}

export { setToken, clearToken }