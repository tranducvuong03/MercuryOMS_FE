import { useState } from "react"
import { initialVouchers } from "../../data/profile"
import Pagination from "../Pagination/Pagination"

const ITEMS_PER_PAGE = 6

const ProfileVouchers = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(initialVouchers.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const displayedVouchers = initialVouchers.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="profile-section">
      <h2>Voucher của tôi</h2>
      <div className="my-vouchers-list">
        {displayedVouchers.map(voucher => (
          <div key={voucher.code} className="my-voucher-card">
            <div className="voucher-header-mini">
              <div className="voucher-info-mini">
                <h4>{voucher.title}</h4>
                <p>Mã: {voucher.code}</p>
              </div>
              <span className={`discount-badge ${voucher.isPercent ? "percent" : ""}`}>
                {voucher.discount}
              </span>
            </div>
            <p className="voucher-desc-mini">{voucher.description}</p>
            <div className="voucher-footer-mini">
              <span className="expiry-mini">Hết {voucher.expiryDate}</span>
              <button className="btn-use-voucher">Sử dụng</button>
            </div>
          </div>
        ))}
      </div>
      <div className="voucher-empty-hint">
        <p>Không có voucher chào mại? Ghé thăm các shop để nhận voucher hờ!</p>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={setCurrentPage}
        showPageNumbers={false}
      />
    </div>
  )
}

export default ProfileVouchers
