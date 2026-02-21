import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Chăm sóc khách hàng</h4>
          <ul>
            <li><a href="#">Trung tâm trợ giúp</a></li>
            <li><a href="#">Mercury Blog</a></li>
            <li><a href="#">Mercury Mall</a></li>
            <li><a href="#">Hướng dẫn mua hàng</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Về Mercury</h4>
          <ul>
            <li><a href="#">Giới thiệu về Mercury</a></li>
            <li><a href="#">Tuyển dụng</a></li>
            <li><a href="#">Điều khoản</a></li>
            <li><a href="#">Chính sách bảo mật</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Hỗ trợ người bán</h4>
          <ul>
            <li><a href="#">Trở thành người bán Mercury</a></li>
            <li><a href="#">Trung tâm bán hàng</a></li>
            <li><a href="#">Mercury University</a></li>
            <li><a href="#">Chính sách vận hành</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Kênh liên hệ</h4>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">YouTube</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copyright">
          <p>© 2026 Mercury. All rights reserved.</p>
          <p>Địa chỉ: 100 Tây Sơn, Đống Đa, Hà Nội | HOTLINE: 1900 6035</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer