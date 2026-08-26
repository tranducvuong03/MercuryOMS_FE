import { FaCreditCard, FaTruck } from "react-icons/fa"
import "./PaymentMethod.css"

interface PaymentMethodProps {
  selectedMethod: string
  onMethodChange: (method: string) => void
}

const PaymentMethod = ({
  selectedMethod,
  onMethodChange,
}: PaymentMethodProps) => {
  const paymentMethods = [
    {
      id: "cod",
      icon: FaTruck,
      title: "Thanh toán khi nhận hàng (COD)",
      description: "Thanh toán bằng tiền mặt khi nhận hàng",
    },
    {
      id: "vnpay",
      icon: FaCreditCard,
      title: "Thanh toán qua VNPay",
      description: "Thanh toán bằng VNPay (ATM, QR, Visa, MasterCard...)",
    },
  ]

  return (
    <div className="checkout-section payment-method-section">
      <div className="section-header">
        <h2>
          <FaCreditCard /> Phương thức thanh toán
        </h2>
      </div>

      <div className="payment-options">
        {paymentMethods.map(({ id, icon: Icon, title, description }) => (
          <label key={id} className="payment-option">
            <input
              type="radio"
              name="payment-method"
              value={id}
              checked={selectedMethod === id}
              onChange={(e) => onMethodChange(e.target.value)}
            />

            <span className="payment-label">
              <span className="payment-icon">
                <Icon />
              </span>

              <span className="payment-text">
                <strong>{title}</strong>
                <small>{description}</small>
              </span>
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default PaymentMethod