import "./Banner.css"
import { useNavigate } from "react-router-dom"

const Banner = () => {
  const navigate = useNavigate()

  const handleCta = () => {
    // navigate to Products page and apply promotion filter (flash sale)
    navigate("/products?promotion=discount")
  }

  return (
    <div className="banner">
      <img src="https://picsum.photos/1200/500" alt="hero" />

      <div className="banner-overlay">
        <div className="banner-content">
          <h1>Siêu Khuyến Mãi</h1>
          <p>Giảm đến 50% cho nhiều sản phẩm - Chỉ hôm nay!</p>
          <button type="button" className="banner-cta" onClick={handleCta}>Mua Ngay</button>
        </div>
      </div>
    </div>
  )
}

export default Banner