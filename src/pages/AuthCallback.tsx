import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { authApi } from "../services/auth"

const AuthCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const run = async () => {
      try {
        const res = await authApi.refreshToken()

        const userData = {
          email: "external-user",
          name: "External User"
        }

        localStorage.setItem("user", JSON.stringify(userData))

        window.dispatchEvent(
          new CustomEvent("userLoggedIn", { detail: userData })
        )

        navigate("/")
      } catch {
        navigate("/login")
      }
    }

    run()
  }, [])

  return <div>Đang đăng nhập...</div>
}

export default AuthCallback