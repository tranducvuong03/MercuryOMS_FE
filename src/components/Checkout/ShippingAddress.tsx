import { FaMapMarkerAlt, FaEdit } from "react-icons/fa"
import type { Address } from "../../types/address"
import "./ShippingAddress.css"

interface ShippingAddressProps {
  address: Address
  onEdit: () => void
}

const ShippingAddress = ({ address, onEdit }: ShippingAddressProps) => {
  return (
    <div className="checkout-section shipping-address-section">
      <div className="section-header">
        <h2>
          <FaMapMarkerAlt /> Địa chỉ giao hàng
        </h2>
        <button className="btn-edit-address" onClick={onEdit}>
          <FaEdit /> Thay đổi
        </button>
      </div>

      <div className="address-display">
        <div className="address-info">
          <div className="info-row">
            <span className="label">Tên người nhận:</span>
            <span className="value">{address.recipient}</span>
          </div>
          <div className="info-row">
            <span className="label">Số điện thoại:</span>
            <span className="value">{address.phone}</span>
          </div>
          <div className="info-row">
            <span className="label">Địa chỉ:</span>
            <span className="value">{address.street}</span>
          </div>
          <div className="info-row">
            <span className="label">Quận/Huyện:</span>
            <span className="value">{address.district}</span>
          </div>
          <div className="info-row">
            <span className="label">Thành phố/Tỉnh:</span>
            <span className="value">{address.city}</span>
          </div>
          {address.province && (
            <div className="info-row">
              <span className="label">Tỉnh:</span>
              <span className="value">{address.province}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ShippingAddress
