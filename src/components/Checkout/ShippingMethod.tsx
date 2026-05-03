import { FaTruck, FaClock, FaBox } from "react-icons/fa"
import "./ShippingMethod.css"

interface ShippingMethodProps {
  selectedMethod: string
  onMethodChange: (method: string) => void
  shippingFee: number
}

const ShippingMethod = ({ selectedMethod, onMethodChange, shippingFee }: ShippingMethodProps) => {
  const shippingMethods = [
    {
      id: "standard",
      icon: FaTruck,
      title: "Giao hàng tiêu chuẩn",
      description: "Giao hàng trong 3-5 ngày",
      fee: shippingFee
    },
    {
      id: "fast",
      icon: FaClock,
      title: "Giao hàng nhanh",
      description: "Giao hàng trong 1-2 ngày",
      fee: shippingFee * 2
    },
    {
      id: "express",
      icon: FaBox,
      title: "Giao hàng siêu tốc",
      description: "Giao hàng cùng ngày (cho TP.HCM, Hà Nội)",
      fee: shippingFee * 3
    }
  ]

  return (
    <div className="checkout-section shipping-method-section">
      <div className="section-header">
        <h2>
          <FaTruck /> Phương thức vận chuyển
        </h2>
      </div>

      <div className="shipping-options">
        {shippingMethods.map(({ id, icon: Icon, title, description, fee }) => (
          <label key={id} className="shipping-option">
            <input
              type="radio"
              name="shipping-method"
              value={id}
              checked={selectedMethod === id}
              onChange={(e) => onMethodChange(e.target.value)}
            />
            <span className="shipping-label">
              <span className="shipping-icon">
                <Icon />
              </span>
              <span className="shipping-text">
                <strong>{title}</strong>
                <small>{description}</small>
              </span>
              <span className="shipping-fee">{fee.toLocaleString("vi-VN")}đ</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default ShippingMethod
