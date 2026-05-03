import { FaComments } from "react-icons/fa"
import "./ShipperMessage.css"

interface ShipperMessageProps {
  message: string
  onMessageChange: (message: string) => void
}

const ShipperMessage = ({ message, onMessageChange }: ShipperMessageProps) => {
  const maxChars = 500

  return (
    <div className="checkout-section shipper-message-section">
      <div className="section-header">
        <h2>
          <FaComments /> Lời nhắn cho shipper
        </h2>
      </div>

      <div className="message-input-wrapper">
        <textarea
          value={message}
          onChange={(e) => onMessageChange(e.target.value.slice(0, maxChars))}
          placeholder="Ví dụ: Gọi trước khi giao, để hàng ở phòng trước..."
          className="message-textarea"
          rows={4}
        />
        <div className="char-counter">
          {message.length}/{maxChars}
        </div>
      </div>

      <p className="message-hint">
        💡 Ghi chú: Bạn có thể yêu cầu shipper để lại hàng tại một vị trí cụ thể, gọi trước khi giao,
        hoặc những yêu cầu đặc biệt khác.
      </p>
    </div>
  )
}

export default ShipperMessage
