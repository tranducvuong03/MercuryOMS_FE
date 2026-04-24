import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { API_BASE_URL } from "../services/apiClient"
import "./Auth.css"

const EmailVerification = () => {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const userId = searchParams.get("userId")
    const token = searchParams.get("token")

    if (!userId || !token) {
      setStatus("error")
      setMessage("Thiếu thông tin xác thực. Vui lòng kiểm tra lại liên kết.")
      return
    }

    // Gọi API xác thực email
    const confirmEmail = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/confirm-email?userId=${userId}&token=${decodeURIComponent(token)}`)
        if (response.ok) {
          setStatus("success")
          setMessage("Email của bạn đã được xác thực thành công!")
        } else {
          const errorData = await response.json()
          setStatus("error")
          setMessage(errorData.message || "Xác thực email thất bại. Vui lòng thử lại.")
        }
      } catch (error) {
        console.error("Error confirming email:", error)
        setStatus("error")
        setMessage("Có lỗi xảy ra khi xác thực email. Vui lòng thử lại sau.")
      }
    }

    confirmEmail()
  }, [searchParams])

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Xác Thực Email</h1>

        {status === "loading" && (
          <div className="loading-message">
            <p>Đang xác thực email của bạn...</p>
          </div>
        )}

        {status === "success" && (
          <div className="success-message">
            <p>{message}</p>
            <p>Bây giờ bạn có thể đăng nhập vào tài khoản của mình.</p>
            <a href="/login" className="auth-link">Đăng nhập</a>
          </div>
        )}

        {status === "error" && (
          <div className="error-message">
            <p>{message}</p>
            <p>Vui lòng liên hệ hỗ trợ nếu vấn đề vẫn tiếp tục.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmailVerification