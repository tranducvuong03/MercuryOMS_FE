import { useState } from "react"
import type { Address } from "../../types/address"
import "./AddressModal.css"

interface AddressModalProps {
  isOpen: boolean
  currentAddress: Address
  onClose: () => void
  onSave: (address: Address) => void
}

const AddressModal = ({ isOpen, currentAddress, onClose, onSave }: AddressModalProps) => {
  const [formData, setFormData] = useState<Address>(currentAddress)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    if (!formData.recipient || !formData.phone || !formData.street || !formData.city) {
      alert("Vui lòng nhập đầy đủ thông tin")
      return
    }
    onSave(formData)
  }

  if (!isOpen) return null

  return (
    <div className="address-modal-overlay" onClick={onClose}>
      <div className="address-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Thay đổi địa chỉ giao hàng</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="form-row">
            <div className="form-group">
              <label>Tên người nhận *</label>
              <input
                type="text"
                name="recipient"
                value={formData.recipient}
                onChange={handleChange}
                placeholder="Nhập tên người nhận"
              />
            </div>
            <div className="form-group">
              <label>Số điện thoại *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Địa chỉ chi tiết *</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Nhập địa chỉ (số nhà, đường, ...)"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Quận/Huyện</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="Nhập quận/huyện"
              />
            </div>
            <div className="form-group">
              <label>Thành phố/Tỉnh *</label>
              <select name="city" value={formData.city} onChange={handleChange}>
                <option value="">Chọn thành phố</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Hải Phòng">Hải Phòng</option>
                <option value="Cần Thơ">Cần Thơ</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Tỉnh/Thành phố cấp 2</label>
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleChange}
              placeholder="Nhập tỉnh/thành phố"
            />
          </div>

          <div className="form-group">
            <label>Nhãn địa chỉ</label>
            <input
              type="text"
              name="label"
              value={formData.label}
              onChange={handleChange}
              placeholder="Ví dụ: Nhà riêng, Công ty, ..."
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Hủy
          </button>
          <button className="btn-save" onClick={handleSave}>
            Lưu địa chỉ
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddressModal
