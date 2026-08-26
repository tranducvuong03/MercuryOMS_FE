import { FaClipboard } from "react-icons/fa"
import type { VoucherOption } from "../../data/vouchers"
import "./OrderSummary.css"

interface OrderSummaryProps {
  subtotal: number
  shippingFee: number
  discount: number
  selectedVoucher: VoucherOption | null
  onPlaceOrder: () => void
  isProcessing: boolean
}

const OrderSummary = ({
  subtotal,
  shippingFee,
  discount,
  selectedVoucher,
  onPlaceOrder,
  isProcessing
}: OrderSummaryProps) => {
  const total = subtotal + shippingFee - discount

  return (
    <div className="order-summary">
      <h2>
        <FaClipboard /> Tóm tắt đơn hàng
      </h2>

      <div className="summary-costs">
        <div className="cost-row">
          <span>Tổng tiền hàng:</span>
          <span className="cost-value">{subtotal.toLocaleString("vi-VN")}đ</span>
        </div>

        <div className="cost-row">
          <span>Phí vận chuyển:</span>
          <span className="cost-value">{shippingFee.toLocaleString("vi-VN")}đ</span>
        </div>

        {discount > 0 && (
          <div className="cost-row discount">
            <span>Giảm giá ({selectedVoucher?.code}):</span>
            <span className="cost-value">-{discount.toLocaleString("vi-VN")}đ</span>
          </div>
        )}

        <div className="summary-divider"></div>

        <div className="total-row">
          <span>Thành tiền:</span>
          <span className="total-amount">{total.toLocaleString("vi-VN")}đ</span>
        </div>
      </div>

      <button onClick={onPlaceOrder} disabled={isProcessing} className="btn-place-order">
        {isProcessing ? "Đang xử lý..." : `Thanh toán - ${total.toLocaleString("vi-VN")}đ`}
      </button>

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
  )
}

export default OrderSummary
