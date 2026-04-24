export const API_BASE_URL = import.meta.env.VITE_API_URL

const getToken = () => localStorage.getItem("token")
const setToken = (token: string) => localStorage.setItem("token", token)
const clearToken = () => localStorage.removeItem("token")

type Options = RequestInit & {
  auth?: boolean
}

export const request = async (url: string, options: Options = {}) => {
  const { auth = false, headers, ...rest } = options

  const finalHeaders = new Headers({
    "Content-Type": "application/json"
  })

  if (headers) {
    Object.entries(headers as Record<string, string>).forEach(([k, v]) => {
      finalHeaders.append(k, v)
    })
  }

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

  // tự refresh acccess token
  if (res.status === 401 && auth) {
    const refreshRes = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include"
    })

    if (refreshRes.ok) {
      const { accessToken } = await refreshRes.json()
      setToken(accessToken)

      finalHeaders.set("Authorization", `Bearer ${accessToken}`)

      res = await fetch(`${API_BASE_URL}${url}`, {
        ...rest,
        headers: finalHeaders,
        credentials: "include"
      })
    } else {
      clearToken()
      window.location.href = "/login"
      throw new Error("Session expired")
    }
  }

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }

  return res.json()
}

export { setToken, clearToken }