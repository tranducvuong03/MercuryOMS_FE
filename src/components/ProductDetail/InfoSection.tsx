import React from "react"
import type { Product } from "../../types/product"
import { FaExchangeAlt, FaShoppingCart, FaTruck } from "react-icons/fa"

interface Props {
  product: Product
  selectedVariantId: string
  setSelectedVariantId: React.Dispatch<React.SetStateAction<string>>
  quantity: number
  setQuantity: React.Dispatch<React.SetStateAction<number>>
  currentStock: number
  added: boolean
  handleAddToCart: () => void
}

const InfoSection: React.FC<Props> = ({
  product,
  selectedVariantId,
  setSelectedVariantId,
  quantity,
  setQuantity,
  currentStock,
  added,
  handleAddToCart
}) => {

  const handleSelectVariant = (variantId: string) => {
    setSelectedVariantId(prev =>
      prev === variantId ? "" : variantId
    )
  }

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase" && quantity < currentStock) {
      setQuantity(q => q + 1)
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(q => q - 1)
    }
  }

  const selectedVariant = product.variants?.find(v => v.id === selectedVariantId)
  const displayOriginalPrice =
    selectedVariant ? selectedVariant.originalPrice : product.originalPrice

  const displayDiscountPrice =
    selectedVariant
      ? selectedVariant.discountPrice
      : product.discountPrice

  const savingPrice =
    displayOriginalPrice && displayDiscountPrice
      ? displayOriginalPrice - displayDiscountPrice
      : 0

  return (
    <div className="product-info-section">
      <h1 className="product-title">{product.name}</h1>

      <div className="rating-section">
        <span className="rating-stars">★★★★★</span>
        <span className="rating-value">{product.rating}</span>
        <span className="rating-sold">({(product.sold / 1000).toFixed(1)}k lượt mua)</span>
      </div>

      <div className="price-section">
        <div className="price-main">
          <span className="currency">₫</span>
          <span className="price-value">
            {(displayDiscountPrice ?? displayOriginalPrice)
              ?.toLocaleString()
              .replace(/,/g, ".")}
          </span>
        </div>
        {displayDiscountPrice && displayOriginalPrice && (
          <div className="price-sub">
            <span className="original-price">
              ₫{displayOriginalPrice.toLocaleString().replace(/,/g, ".")}
            </span>
            <span className="saving">
              Tiết kiệm ₫{savingPrice.toLocaleString().replace(/,/g, ".")}
            </span>
          </div>
        )}
      </div>

      <div className="specifications">
        {product.category && (
          <div className="spec-item">
            <span className="spec-label">Danh mục:</span>
            <span className="spec-value">{product.category}</span>
          </div>
        )}
        {product.brand && (
          <div className="spec-item">
            <span className="spec-label">Thương hiệu:</span>
            <span className="spec-value">{product.brand}</span>
          </div>
        )}
        <div className="spec-item">
          <span className="spec-label">Kho:</span>
          <span className="spec-value"><span className="in-stock">Còn {currentStock} sản phẩm</span></span>
        </div>
      </div>

      {product.variants && product.variants.length > 0 && (
        <div className="variant-section">
          <div className="variant-label">{product.variants.some(v => v.size) ? "Size:" : "Màu sắc:"}</div>
          <div className="variant-options">
            {product.variants.map(variant => (
              <button
                key={variant.id}
                className={`variant-btn ${selectedVariantId === variant.id ? "active" : ""}`}
                onClick={() => handleSelectVariant(variant.id)}
                disabled={variant.stock === 0}
                title={variant.stock === 0 ? "Hết hàng" : (variant.size || variant.color)}
              >
                {variant.size || variant.color}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="quantity-section">
        <span className="quantity-label">Số lượng:</span>
        <div className="quantity-selector">
          <button onClick={() => handleQuantityChange("decrease")} className="qty-btn qty-minus" disabled={quantity <= 1}>−</button>
          <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, Math.min(currentStock, parseInt(e.target.value) || 1)))} className="qty-input" min={1} max={currentStock} />
          <button onClick={() => handleQuantityChange("increase")} className="qty-btn qty-plus">+</button>
        </div>
      </div>

      <div className="action-buttons">
        <button
          className="btn btn-cart"
          onClick={handleAddToCart}
          disabled={!selectedVariantId}
        >
          <FaShoppingCart />
          <span> </span>
          Thêm vào giỏ
        </button>
        <button className="btn btn-buy">Mua ngay</button>
      </div>
      {!selectedVariantId && (
        <div style={{ color: "red", marginTop: "8px" }}>
          Vui lòng chọn phân loại hàng
        </div>
      )}
      {added && <div className="success-message">Đã thêm vào giỏ hàng</div>}

      <div className="shipping-info">
        <div className="shipping-item">
          <span className="shipping-icon"><FaTruck /></span>
          <div>
            <p className="shipping-title">Miễn phí vận chuyển</p>
            <p className="shipping-detail">Cho đơn hàng từ ₫20,000</p>
          </div>
        </div>
        <div className="shipping-item">
          <span className="shipping-icon"><FaExchangeAlt /></span>
          <div>
            <p className="shipping-title">Trả hàng miễn phí</p>
            <p className="shipping-detail">Trong 30 ngày</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoSection
