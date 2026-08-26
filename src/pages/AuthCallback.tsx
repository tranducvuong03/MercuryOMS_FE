import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { authApi } from "../services/auth"
import { userApi } from "../services/user"

const AuthCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const run = async () => {
      try {
        const userData = await userApi.getUserInfo()

        localStorage.setItem("user", JSON.stringify(userData.value))

        window.dispatchEvent(
          new CustomEvent("userLoggedIn", { detail: userData.value })
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