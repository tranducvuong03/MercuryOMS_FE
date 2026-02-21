import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import type { CartItem } from "../data/cartItems"
import { defaultCartItems } from "../data/cartItems"
import type { VoucherOption } from "../data/vouchers"
import { checkoutVouchers } from "../data/vouchers"
import "./Checkout.css"
import { 
  FaTicketAlt,
  FaBox,
  FaCreditCard,
  FaClipboard,
  FaTruck,
  FaUniversity,
  FaMobileAlt
} from "react-icons/fa"

interface Toast {
  id: number
  type: "success" | "error" | "warning" | "info"
  message: string
}

const Checkout = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      navigate("/login")
      return
    }
    setUser(JSON.parse(storedUser))
  }, [navigate])

  const showToast = (type: Toast["type"], message: string) => {
    const id = Date.now()
    const newToast: Toast = { id, type, message }
    setToasts(prev => [...prev, newToast])

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  // Cart items (hardcoded for now, can be from context/localStorage)
  const [cartItems] = useState<CartItem[]>(defaultCartItems)

  // Available vouchers
  const [availableVouchers] = useState<VoucherOption[]>(checkoutVouchers)

  // Form states
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    ward: ""
  })

  const [selectedVoucher, setSelectedVoucher] = useState<VoucherOption | null>(null)
  const [voucherInput, setVoucherInput] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [isProcessing, setIsProcessing] = useState(false)

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = 29000

  let discount = 0
  if (selectedVoucher) {
    if (selectedVoucher.discountType === "fixed") {
      discount = Math.min(selectedVoucher.discount, subtotal)
    } else {
      discount = Math.floor(subtotal * (selectedVoucher.discount / 100))
    }
  }

  const total = subtotal + shippingFee - discount

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleApplyVoucher = () => {
    if (!voucherInput.trim()) {
      showToast("warning", "Vui lòng nhập mã voucher")
      return
    }

    const found = availableVouchers.find(v => v.code === voucherInput.toUpperCase())
    if (found) {
      setSelectedVoucher(found)
      setVoucherInput("")
      showToast("success", `Áp dụng voucher thành công: ${found.title}`)
    } else {
      showToast("error", "Mã voucher không hợp lệ")
    }
  }

  const handleSelectVoucher = (voucher: VoucherOption) => {
    if (selectedVoucher?.id === voucher.id) {
      setSelectedVoucher(null)
    } else {
      setSelectedVoucher(voucher)
    }
  }

  const handleRemoveVoucher = () => {
    setSelectedVoucher(null)
  }

  const handlePlaceOrder = async () => {
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
      showToast("warning", "Vui lòng nhập đầy đủ thông tin giao hàng")
      return
    }

    setIsProcessing(true)
    // Simulate API call
    setTimeout(() => {
      const order = {
        id: `ORD-${Date.now()}`,
        items: cartItems,
        shipping: formData,
        voucher: selectedVoucher,
        subtotal,
        discount,
        shippingFee,
        total,
        paymentMethod,
        createdAt: new Date()
      }
      
      localStorage.setItem("lastOrder", JSON.stringify(order))
      showToast("success", `Đặt hàng thành công! Mã: ${order.id}`)
      setTimeout(() => {
        navigate("/tracking")
      }, 1500)
      setIsProcessing(false)
    }, 1500)
  }

  if (!user) {
    return null
  }

  return (
    <div className="checkout-container">
      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <span>{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="toast-close">✕</button>
          </div>
        ))}
      </div>
      <div className="checkout-header">
        <h1>Tiến hành thanh toán</h1>
        <p>Kiểm tra thông tin và hoàn tất đơn hàng</p>
      </div>

      <div className="checkout-content">
        {/* Left Section - Forms */}
        <div className="checkout-left">
          {/* Shipping Information */}
          <div className="checkout-section">
            <div className="section-header">
              <h2><FaBox /> Thông tin giao hàng</h2>
            </div>
            <form className="checkout-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Họ và tên *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Nhập họ và tên"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Nhập email"
                />
              </div>

              <div className="form-group">
                <label>Địa chỉ *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Nhập địa chỉ (số nhà, đường, phường)"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Thành phố/Tỉnh *</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Chọn thành phố</option>
                    <option value="ha-noi">Hà Nội</option>
                    <option value="ho-chi-minh">Thành phố Hồ Chí Minh</option>
                    <option value="da-nang">Đà Nẵng</option>
                    <option value="hai-phong">Hải Phòng</option>
                    <option value="other">Các tỉnh khác</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Phường/Xã</label>
                  <input
                    type="text"
                    name="ward"
                    value={formData.ward}
                    onChange={handleInputChange}
                    placeholder="Nhập phường/xã"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Voucher Section */}
          <div className="checkout-section">
            <div className="section-header">
              <h2><FaTicketAlt /> Chọn voucher</h2>
            </div>

            {/* Voucher Input */}
            <div className="voucher-input-section">
              <div className="voucher-input-group">
                <input
                  type="text"
                  value={voucherInput}
                  onChange={(e) => setVoucherInput(e.target.value.toUpperCase())}
                  placeholder="Nhập mã voucher"
                  className="voucher-code-input"
                />
                <button
                  onClick={handleApplyVoucher}
                  className="btn-apply-voucher"
                >
                  Áp dụng
                </button>
              </div>
              {selectedVoucher && (
                <div className="voucher-applied">
                  <span className="applied-label">✓ Mã đã áp dụng: {selectedVoucher.code}</span>
                  <button
                    type="button"
                    onClick={handleRemoveVoucher}
                    className="btn-remove-voucher"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* Available Vouchers */}
            <div className="available-vouchers">
              <p className="vouchers-label">Voucher có sẵn:</p>
              <div className="vouchers-grid">
                {availableVouchers.map(voucher => (
                  <div
                    key={voucher.id}
                    className={`voucher-option ${selectedVoucher?.id === voucher.id ? "selected" : ""}`}
                    onClick={() => handleSelectVoucher(voucher)}
                  >
                    <div className="voucher-code">{voucher.code}</div>
                    <div className="voucher-discount">
                      {voucher.discountType === "fixed"
                        ? `-${(voucher.discount / 1000).toFixed(0)}K`
                        : `-${voucher.discount}%`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="checkout-section">
            <div className="section-header">
              <h2><FaCreditCard /> Phương thức thanh toán</h2>
            </div>
            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="payment-label">
                  <span className="payment-icon"><FaTruck /></span>
                  <span className="payment-text">
                    <strong>Thanh toán khi nhận hàng (COD)</strong>
                    <small>Thanh toán bằng tiền mặt khi nhận hàng</small>
                  </span>
                </span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="payment-label">
                  <span className="payment-icon"><FaUniversity /></span>
                  <span className="payment-text">
                    <strong>Chuyển khoản ngân hàng</strong>
                    <small>Chuyển khoản trực tiếp đến tài khoản của chúng tôi</small>
                  </span>
                </span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="ewallet"
                  checked={paymentMethod === "ewallet"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="payment-label">
                  <span className="payment-icon"><FaMobileAlt /></span>
                  <span className="payment-text">
                    <strong>Ví điện tử</strong>
                    <small>Thanh toán bằng Momo, ZaloPay hoặc các ví khác</small>
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="checkout-right">
          <div className="order-summary">
            <h2><FaClipboard /> Tóm tắt đơn hàng</h2>

            {/* Items */}
            <div className="summary-items">
              {cartItems.map(item => (
                <div key={item.id} className="summary-item-card">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p className="item-qty">SL: {item.quantity}</p>
                    <p className="item-price">{(item.price * item.quantity).toLocaleString()}đ</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Costs */}
            <div className="summary-costs">
              <div className="cost-row">
                <span>Tổng tiền hàng:</span>
                <span className="cost-value">{subtotal.toLocaleString()}đ</span>
              </div>

              <div className="cost-row">
                <span>Phí vận chuyển:</span>
                <span className="cost-value">{shippingFee.toLocaleString()}đ</span>
              </div>

              {discount > 0 && (
                <div className="cost-row discount">
                  <span>Giảm giá ({selectedVoucher?.code}):</span>
                  <span className="cost-value">-{discount.toLocaleString()}đ</span>
                </div>
              )}

              <div className="summary-divider"></div>

              <div className="total-row">
                <span>Thành tiền:</span>
                <span className="total-amount">{total.toLocaleString()}đ</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="btn-place-order"
            >
              {isProcessing ? "Đang xử lý..." : `Đặt hàng - ${total.toLocaleString()}đ`}
            </button>

            {/* Policy Info */}
            <div className="policy-info">
              <div className="policy-item">
                <span className="policy-icon">✓</span>
                <span>Miễn phí trả hàng trong 30 ngày</span>
              </div>
              <div className="policy-item">
                <span className="policy-icon">✓</span>
                <span>Bảo mật thanh toán 100%</span>
              </div>
              <div className="policy-item">
                <span className="policy-icon">✓</span>
                <span>Hỗ trợ khách hàng 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
