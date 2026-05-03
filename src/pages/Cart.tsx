import { useNavigate } from "react-router-dom"
import "./Cart.css"
import { useState, useEffect } from "react"
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa"
import { cartApi } from "../services/cartApi"
import type { CartItem } from "../types/cart"

const Cart = () => {
  const navigate = useNavigate()

  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    loadCart()
  }, [])

  const loadCart = async () => {
    try {
      setLoading(true)

      const res = await cartApi.getCart()

      if (res.isSuccess && res.value) {
        setCartItems(res.value.items)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const removeItem = async (productId: string, variantId: string) => {
    try {
      const res = await cartApi.removeFromCart(productId, variantId)

      if (res.isSuccess) {
        setCartItems(prev =>
          prev.filter(x =>
            !(x.productId === productId && x.variantId === variantId)
          )
        )
      }
    } catch (err) {
      console.error(err)
    }
  }

  const updateQuantity = (productId: string, variantId: string, qty: number) => {
    if (qty < 1) return

    setCartItems(prev =>
      prev.map(item =>
        item.productId === productId && item.variantId === variantId
          ? { ...item, quantity: qty }
          : item
      )
    )
  }

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.discountPrice ?? item.price
    return sum + price * item.quantity
  }, 0)

  const shippingFee = 0
  const finalTotal = totalPrice + shippingFee

  if (loading) {
    return (
      <div className="cart-container">
        <p>Đang tải giỏ hàng...</p>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Giỏ hàng của tôi</h1>
        <button onClick={() => navigate("/")}>
          ← Tiếp tục mua sắm
        </button>
      </div>

      <div className="cart-content">

        {/* LEFT */}
        <div className="cart-items-section">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Giỏ hàng trống</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.productId + item.variantId} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.productName} />
                </div>

                <div className="item-info">
                  <h3>{item.productName}</h3>
                  <p className="item-variant">
                    {item.color} {item.size ? `- ${item.size}` : ""}
                  </p>
                  <p className="item-price">
                    {(item.discountPrice ?? item.price).toLocaleString()}đ
                  </p>
                  <select
                    className="variant-select"
                    value={item.variantId}
                    onChange={(e) => console.log(e.target.value)}
                  >
                    <option value={item.variantId}>
                      {item.color} - {item.size}
                    </option>
                  </select>
                </div>

                <div className="qty">
                  <button
                    className="quantity-btn"
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        item.variantId,
                        item.quantity - 1
                      )
                    }
                  >
                    <FaMinus />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="quantity-btn"
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        item.variantId,
                        item.quantity + 1
                      )
                    }
                  >
                    <FaPlus />
                  </button>
                </div>

                <div className="item-total">
                  {(item.quantity * (item.discountPrice ?? item.price)).toLocaleString()}đ
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.productId, item.variantId)}
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>

        {/* RIGHT */}
        <div className="cart-summary">
          <h2>Tóm tắt</h2>

          <div className="summary-row">
            <span>Tạm tính</span>
            <span>{totalPrice.toLocaleString()}đ</span>
          </div>

          <div className="summary-row">
            <span>Ship</span>
            <span>{shippingFee.toLocaleString()}đ</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total-row">
            <span>Tổng</span>
            <span>{finalTotal.toLocaleString()}đ</span>
          </div>

          <button className="btn-checkout" onClick={() => navigate("/checkout")}>Mua hàng</button>
        </div>

      </div>
    </div>
  )
}

export default Cart