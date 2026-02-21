import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { initialOrders } from "../../data/profile"
import Pagination from "../Pagination/Pagination"
import { FaStopwatch, FaTruck } from "react-icons/fa"

const ITEMS_PER_PAGE = 5

const ProfileOrders = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(initialOrders.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const displayedOrders = initialOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="profile-section">
      <h2>Đơn mua của tôi</h2>
      <div className="orders-list">
        {displayedOrders.map(order => (
          <div key={order.id} className="order-item">
            <div className="order-header">
              <div>
                <p className="order-id">Đơn hàng #{order.id}</p>
                <p className="order-date">Ngày đặt: {order.date}</p>
              </div>
              <div className={`order-status ${order.status}`}>
                {order.status === "completed" && "✓ Đã giao"}
                {order.status === "processing" && <span><FaTruck /> Đang giao</span>}
                {order.status === "pending" && <span><FaStopwatch /> Chờ xác nhận</span>}
              </div>
            </div>
            <div className="order-products">
              {order.products.map((product, idx) => (
                <p key={idx}>{product}</p>
              ))}
            </div>
            <div className="order-footer">
              <span className="order-total">Tổng: {order.total.toLocaleString()}đ</span>
              <button
                className="btn-track"
                onClick={() => navigate("/tracking", { state: { orderId: order.id } })}
              >
                Theo dõi
              </button>
            </div>
          </div>
        ))}
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

export default ProfileOrders
