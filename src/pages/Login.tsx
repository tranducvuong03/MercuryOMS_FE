import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import "./Auth.css"

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin")
      return
    }

    // Simple validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Email không hợp lệ")
      return
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự")
      return
    }

    // Simulate login success
    const userData = { email, name: email.split("@")[0] }
    localStorage.setItem("user", JSON.stringify(userData))
    // Dispatch custom event để Header cập nhật
    window.dispatchEvent(new CustomEvent("userLoggedIn", { detail: userData }))
    navigate("/")
  }

  const handleFacebookLogin = () => {
    // Simulate Facebook login
    const userData = { email: "user@facebook.com", name: "Facebook User" }
    localStorage.setItem("user", JSON.stringify(userData))
    // Dispatch custom event để Header cập nhật
    window.dispatchEvent(new CustomEvent("userLoggedIn", { detail: userData }))
    navigate("/")
  }

  const handleGoogleLogin = () => {
    // Simulate Google login
    const userData = { email: "user@gmail.com", name: "Google User" }
    localStorage.setItem("user", JSON.stringify(userData))
    // Dispatch custom event để Header cập nhật
    window.dispatchEvent(new CustomEvent("userLoggedIn", { detail: userData }))
    navigate("/")
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

          <button type="submit" className="auth-button">
            Đăng Nhập
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
