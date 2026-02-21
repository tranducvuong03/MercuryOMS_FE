import { useNavigate } from "react-router-dom"
import "./Cart.css"
import { useState, useEffect } from "react"
import { FaTrash } from "react-icons/fa"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

const Cart = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const [cartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Áo thun nam cotton 100% cao cấp",
      price: 79000,
      quantity: 2,
      image: "https://picsum.photos/100/100?1"
    },
    {
      id: 5,
      name: "Giày Sneaker thể thao nam nữ",
      price: 299000,
      quantity: 1,
      image: "https://picsum.photos/100/100?5"
    }
  ])

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = 29000
  const finalTotal = totalPrice + shippingFee

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Giỏ hàng của tôi</h1>
        <button onClick={() => navigate("/")} className="continue-shopping">
          ← Tiếp tục mua sắm
        </button>
      </div>

      <div className="cart-content">
        <div className="cart-items-section">
          {cartItems.length > 0 ? (
            <div className="cart-items-list">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p className="item-price">{item.price.toLocaleString()}đ</p>
                  </div>
                  <div className="item-quantity">
                    <span>Số lượng: {item.quantity}</span>
                  </div>
                  <div className="item-total">
                    <span>{(item.price * item.quantity).toLocaleString()}đ</span>
                  </div>
                  <button className="remove-btn"><FaTrash /></button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-cart">
              <p>Giỏ hàng của bạn trống</p>
              <button onClick={() => navigate("/")} className="btn-shop">
                Quay lại mua sắm
              </button>
            </div>
          )}
        </div>

        <div className="cart-summary">
          <h2>Tóm tắt đơn hàng</h2>
          
          <div className="summary-item">
            <span>Tổng tiền hàng:</span>
            <span className="amount">{totalPrice.toLocaleString()}đ</span>
          </div>

          <div className="summary-item">
            <span>Phí vận chuyển:</span>
            <span className="amount">{shippingFee.toLocaleString()}đ</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Tổng cộng:</span>
            <span className="total-amount">{finalTotal.toLocaleString()}đ</span>
          </div>

          <button className="btn-checkout" onClick={() => navigate("/checkout")}>
            Tiến hành thanh toán
          </button>

          <div className="cart-benefits">
            <div className="benefit-item">
              <span className="benefit-icon">✓</span>
              <span>Miễn phí vận chuyển cho đơn hàng từ 20,000đ</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">✓</span>
              <span>Trả hàng miễn phí trong 30 ngày</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">✓</span>
              <span>Bảo mật thanh toán 100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
