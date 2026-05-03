import { useState } from "react"
import { FaTicketAlt } from "react-icons/fa"
import type { VoucherOption } from "../../data/vouchers"
import "./ShopVoucher.css"

interface ShopVoucherProps {
  availableVouchers: VoucherOption[]
  selectedVoucher: VoucherOption | null
  onVoucherSelect: (voucher: VoucherOption | null) => void
  onApplyCode: (code: string) => void
}

const ShopVoucher = ({
  availableVouchers,
  selectedVoucher,
  onVoucherSelect,
  onApplyCode
}: ShopVoucherProps) => {
  const [voucherInput, setVoucherInput] = useState("")

  const handleApply = () => {
    if (voucherInput.trim()) {
      onApplyCode(voucherInput.toUpperCase())
      setVoucherInput("")
    }
  }

  const handleSelectVoucher = (voucher: VoucherOption) => {
    if (selectedVoucher?.id === voucher.id) {
      onVoucherSelect(null)
    } else {
      onVoucherSelect(voucher)
    }
  }

  return (
    <div className="checkout-section shop-voucher-section">
      <div className="section-header">
        <h2>
          <FaTicketAlt /> Mã giảm giá
        </h2>
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
            onKeyPress={(e) => e.key === "Enter" && handleApply()}
          />
          <button onClick={handleApply} className="btn-apply-voucher">
            Áp dụng
          </button>
        </div>

        {selectedVoucher && (
          <div className="voucher-applied">
            <span className="applied-label">✓ Mã đã áp dụng: {selectedVoucher.code}</span>
            <button
              type="button"
              onClick={() => onVoucherSelect(null)}
              className="btn-remove-voucher"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Available Vouchers */}
      {availableVouchers.length > 0 && (
        <div className="available-vouchers">
          <p className="vouchers-label">Voucher có sẵn:</p>
          <div className="vouchers-grid">
            {availableVouchers.map((voucher) => (
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
                <div className="voucher-title">{voucher.title}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ShopVoucher
