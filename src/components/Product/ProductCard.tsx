import { useNavigate } from "react-router-dom"
import type { Product } from "../../types/product"
import "./Product.css"

interface Props {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate()
  const discountPercent = product.discount || 0
  
  const handleClick = () => {
    navigate(`/product/${product.id}`)
  }

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image-wrapper">
        <img src={product.images[0]} alt={product.name} />
        {product.badge && (
          <div className="product-badge">{product.badge}</div>
        )}
        {discountPercent > 0 && (
          <div className="product-discount-badge">-{discountPercent}%</div>
        )}
      </div>
      
      <div className="product-info">
        <div className="product-name">{product.name}</div>
        
        <div className="product-rating">
          <span className="stars">★★★★★</span>
          <span className="rating-text">{product.rating}</span>
          <span className="sold-count">Đã bán {(product.sold / 1000).toFixed(1)}k</span>
        </div>

        <div className="product-price-section">
          <div className="product-price">
            {product.price.toLocaleString()}đ
          </div>
          {product.originalPrice && (
            <div className="product-original-price">
              {product.originalPrice.toLocaleString()}đ
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard