import { request, setToken, clearToken } from "./apiClient"

export const login = async (email: string, password: string) => {
  const data = await request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  })

  setToken(data.accessToken)
  return data
}

export const register = async (
  email: string,
  password: string,
  fullName: string
) => {
  return request("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, fullName })
  })
}

export const logout = async () => {
  try {
    await request("/api/auth/logout", {
      method: "POST"
    })
  } finally {
    clearToken()
  }
}

export const refreshToken = async () => {
  const data = await request("/api/auth/refresh", {
    method: "POST"
  })

  setToken(data.accessToken)
  return data
}