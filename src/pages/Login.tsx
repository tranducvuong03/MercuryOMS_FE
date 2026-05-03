import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import "./Auth.css"
import { authApi } from "../services/auth"

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)

    const params = new URLSearchParams(window.location.search)
    const err = params.get("error")

    if (err === "facebook_cancel") {
      setError("Bạn đã hủy đăng nhập Facebook")
    }

    if (err === "external_failed") {
      setError("Đăng nhập mạng xã hội thất bại")
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Email không hợp lệ")
      return
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự")
      return
    }

    try {
      setLoading(true)

      const res = await authApi.login(email, password)

      if (!res.isSuccess) {
        setError(res.message || "Đăng nhập thất bại")
        return
      }

      const userData = {
        email,
        name: email.split("@")[0]
      }

      localStorage.setItem("user", JSON.stringify(userData))

      window.dispatchEvent(
        new CustomEvent("userLoggedIn", { detail: userData })
      )

      navigate("/")
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra")
    } finally {
      setLoading(false)
    }
  }

  const handleFacebookLogin = () => {
    authApi.externalLogin("Facebook")
  }

  const handleGoogleLogin = () => {
    authApi.externalLogin("Google")
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Đăng Nhập</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError("")
              }}
              placeholder="Nhập email của bạn"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError("")
              }}
              placeholder="Nhập mật khẩu"
              className="form-input"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
          </button>
        </form>

        <div className="social-divider">
          <span>Hoặc tiếp tục với</span>
        </div>

        <div className="social-login">
          <button type="button" className="social-button facebook" onClick={handleFacebookLogin}>
            <span className="social-icon">f</span> Facebook
          </button>
          <button type="button" className="social-button google" onClick={handleGoogleLogin}>
            <span className="social-icon">G</span> Google
          </button>
        </div>

        <div className="auth-footer">
          <p>
            Chưa có tài khoản?{" "}
            <Link to="/register" className="auth-link">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login