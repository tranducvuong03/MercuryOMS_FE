import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import "./Auth.css"

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [error, setError] = useState("")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const { name, email, password, confirmPassword } = formData

    if (!name || !email || !password || !confirmPassword) {
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

    if (password !== confirmPassword) {
      setError("Mật khẩu không trùng khớp")
      return
    }

    // Simulate register success
    const userData = { email, name }
    localStorage.setItem("user", JSON.stringify(userData))
    window.dispatchEvent(new CustomEvent("userLoggedIn", { detail: userData }))
    navigate("/")
  }

  const handleFacebookLogin = () => {
    // Simulate Facebook login
    const userData = { email: "user@facebook.com", name: "Facebook User" }
    localStorage.setItem("user", JSON.stringify(userData))
    window.dispatchEvent(new CustomEvent("userLoggedIn", { detail: userData }))
    navigate("/")
  }

  const handleGoogleLogin = () => {
    // Simulate Google login
    const userData = { email: "user@gmail.com", name: "Google User" }
    localStorage.setItem("user", JSON.stringify(userData))
    window.dispatchEvent(new CustomEvent("userLoggedIn", { detail: userData }))
    navigate("/")
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Đăng Ký</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Họ và tên</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Xác nhận mật khẩu"
              className="form-input"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="auth-button">
            Đăng Ký
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
            Đã có tài khoản?{" "}
            <Link to="/login" className="auth-link">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
