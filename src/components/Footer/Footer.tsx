import { Link } from "react-router-dom"
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Chăm sóc khách hàng</h4>
          <ul>
            <li><Link to="/help-center">Trung tâm trợ giúp</Link></li>
            <li><Link to="/blog">Mercury Blog</Link></li>
            <li><Link to="/mall">Mercury Mall</Link></li>
            <li><Link to="/buying-guide">Hướng dẫn mua hàng</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Về Mercury</h4>
          <ul>
            <li><Link to="/about">Giới thiệu về Mercury</Link></li>
            <li><Link to="/careers">Tuyển dụng</Link></li>
            <li><Link to="/terms">Điều khoản</Link></li>
            <li><Link to="/privacy">Chính sách bảo mật</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Hỗ trợ người bán</h4>
          <ul>
            <li><Link to="/become-seller">Trở thành người bán Mercury</Link></li>
            <li><Link to="/seller-center">Trung tâm bán hàng</Link></li>
            <li><Link to="/university">Mercury University</Link></li>
            <li><Link to="/operating-policy">Chính sách vận hành</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Kênh liên hệ</h4>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copyright">
          <p>© 2026 Mercury. All rights reserved.</p>
          <p>Địa chỉ: Thành phố Hồ Chí Minh | HOTLINE: 1900 6035</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer