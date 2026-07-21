import type { ExternalProvider } from "../types/externalProvider"
import type { Result } from "../types/result"
import { request, setToken, clearToken } from "./apiClient"

export type LoginResponse = {
  accessToken: string
}

export type RefreshResponse = {
  accessToken: string
}

type RegisterRequest = {
  email: string
  password: string
  fullName: string
}

export const authApi = {
  login: async (email: string, password: string) => {
    const res = await request<Result<string>>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    })

    if (!res.isSuccess || !res.value) {
      throw new Error(res.message || "Login failed")
    }

    setToken(res.value)

    return res
  },

  externalLogin: (provider: ExternalProvider) => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/external-login?provider=${provider}`
  },

  register: async (data: RegisterRequest) => {
    const res = await request("/auth/register", {
      method: "POST",
      body: JSON.stringify(data)
    }) as Result<void>

    if (!res.isSuccess) {
      throw new Error(res.message || "Register failed")
    }

    return res
  },

  logout: async () => {
    try {
      await request("/auth/logout", {
        method: "POST",
        auth: true
      }) as Result<void>
    } finally {
      clearToken()
    }
  },

  refreshToken: async () => {
    const res = await request<Result<string>>("/auth/refresh", {
      method: "POST"
    })

    if (!res.isSuccess || !res.value) {
      clearToken()
      throw new Error(res.message || "Refresh failed")
    }

    setToken(res.value)

    return res
  }
}