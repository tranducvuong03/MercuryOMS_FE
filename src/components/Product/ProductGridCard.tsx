import { useNavigate } from "react-router-dom"
import { FaShoppingCart } from "react-icons/fa"
import type { ProductResponse } from "../../types/product"

interface ProductGridCardProps {
  product: ProductResponse
}

const ProductGridCard = ({ product }: ProductGridCardProps) => {
  const navigate = useNavigate()

  return (
    <div
      key={product.id}
      className="product-card-grid"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="product-image-wrapper">
        <img src={product.thumbnailUrl || ""} alt={product.name} />

        {product.badge && (
          <div className="product-badge">{product.badge}</div>
        )}

        {product.discount && product.discount > 0 && (
          <div className="product-discount">
            -{product.discount}%
          </div>
        )}
      </div>

      <div className="product-info-wrapper">
        <h3 className="product-name">{product.name}</h3>

        <div className="product-rating">
          <span className="stars">★★★★★</span>
          <span className="rating-value">
            ({(product.sold / 1000).toFixed(1)}k)
          </span>
        </div>

        <div className="product-price">
          <span className="price">
            ₫{product.basePrice.toLocaleString().replace(/,/g, ".")}
          </span>

          {product.originalPrice && (
            <span className="original-price">
              ₫{product.originalPrice.toLocaleString().replace(/,/g, ".")}
            </span>
          )}
        </div>

        <button className="add-to-cart-btn">
          <FaShoppingCart />
          <span> </span>
          Thêm vào giỏ
        </button>
      </div>
    </div>
  )
}

export default ProductGridCard