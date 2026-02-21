import React from "react"
import type { Product } from "../../types/product"
import { useNavigate } from "react-router-dom"
import FollowButton from "../Shop/FollowButton"
import { FaStore } from "react-icons/fa"

interface Props {
  product: Product
}

const ShopInfo: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate()

  if (!product.shop) return null

  return (
    <div className="shop-info-section">
      <div className="shop-header">
        <div className="shop-avatar" style={{ cursor: 'pointer' }} onClick={() => product.shop && navigate(`/shop/${product.shop.id}`)}>
          {product.shop.logo ? (
            <img src={product.shop.logo} alt={product.shop.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
          ) : (
            <span style={{ fontSize: '24px' }}><FaStore /></span>
          )}
        </div>
        <div className="shop-info">
          <div className="shop-name-row">
            <h3 className="shop-name">{product.shop.name}</h3>
            {product.shop.verified && <span className="shop-verified">✓ Đã xác minh</span>}
          </div>
          <div className="shop-stats">
            <div className="shop-stat"><span className="stat-label">Đánh giá:</span><span className="stat-value"><span className="stars">★</span> {product.shop.rating}</span></div>
            <div className="shop-stat"><span className="stat-label">Follower:</span><span className="stat-value">{product.shop.followers.toLocaleString()}</span></div>
            <div className="shop-stat"><span className="stat-label">Sản phẩm:</span><span className="stat-value">{product.shop.products}</span></div>
          </div>
        </div>
      </div>
      <div className="shop-details">
        <div className="detail-item"><span className="detail-label">Tỷ lệ phản hồi:</span><span className="detail-value">{product.shop.responseRate}%</span></div>
        <div className="detail-item"><span className="detail-label">Thời gian phản hồi:</span><span className="detail-value">{product.shop.responseTime}</span></div>
      </div>
      <div className="shop-actions">
        <button className="shop-btn" onClick={() => product.shop && navigate(`/shop/${product.shop.id}`)}>Xem Shop</button>
        <button className="shop-btn" onClick={() => {
          if (product.shop) {
            const initial = `Mình quan tâm sản phẩm "${product.name}" (ID:${product.id}). Bạn có sẵn hàng không?`
            window.dispatchEvent(new CustomEvent('openShopChat', { detail: { shopId: product.shop.id, initialText: initial } }))
          }
        }}>Chat với Shop</button>
        <FollowButton shopId={product.shop.id} />
      </div>
    </div>
  )
}

export default ShopInfo
