import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import "./Tracking.css"
import { getTracking, type TrackingInfo } from "../data/tracking"
import { FaCheckCircle, FaClock, FaComments, FaRedo, FaTimesCircle, FaTruck } from "react-icons/fa"
import { MdPending } from "react-icons/md"
import { BiMoneyWithdraw } from "react-icons/bi"
import { TbRefresh } from "react-icons/tb"

const Tracking = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [tracking, setTracking] = useState<TrackingInfo | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    // Lấy orderId từ state hoặc default sang 2024002
    const orderId = location.state?.orderId || "2024001"
    const trackingData = getTracking(orderId)
    setTracking(trackingData)
  }, [location.state?.orderId])

  const getStatusIcon = (status: string) => {
    if (status.includes("Đã giao"))
      return <FaCheckCircle className="text-green-500" />

    if (status.includes("Đang giao"))
      return <FaTruck className="text-blue-500" />

    if (status.includes("Hủy"))
      return <FaTimesCircle className="text-red-500" />

    if (status.includes("Chờ"))
      return <FaClock className="text-yellow-500" />

    return <MdPending className="text-gray-400" />
  }

  const getStatusColor = (status: string) => {
    if (status.includes("Đã giao")) return "completed"
    if (status.includes("Đang giao")) return "active"
    if (status.includes("Hủy")) return "cancelled"
    if (status.includes("Chờ")) return "pending"
    return "pending"
  }

  if (!tracking) {
    return null
  }

  const t = tracking
  const statusColor = getStatusColor(t.status)

  return (
    <div className="tracking-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Quay lại
      </button>

      <div className="tracking-content">
        <h1>Theo dõi đơn hàng</h1>

        <div className="tracking-card">
          <div className="order-info">
            <div className="info-item">
              <span className="info-label">Đơn hàng #:</span>
              <span className="info-value">{t.orderId}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Trạng thái:</span>
              <span className={`info-value status status-${statusColor}`}>
                {getStatusIcon(t.status)} {t.status}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Dự kiến giao:</span>
              <span className="info-value">{t.expectedDelivery}</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="tracking-timeline">
            {t.timeline.map((it, idx) => (
              <div key={idx} className={`timeline-item ${it.status || ""}`}>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>{it.title}</h3>
                  <p>{it.time || (it.status === "pending" ? "Chưa" : t.expectedDelivery)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Details */}
          <div className="shipping-details">
            <h2>Chi tiết giao hàng</h2>

            <div className="detail-box">
              <h3>Thông tin người nhận</h3>
              <p><strong>Tên:</strong> {t.recipient.name}</p>
              <p><strong>Điện thoại:</strong> {t.recipient.phone}</p>
              <p><strong>Địa chỉ:</strong> {t.recipient.address}</p>
            </div>

            <div className="detail-box">
              <h3>Sản phẩm</h3>
              {t.items.map(it => (
                <div className="product-item" key={it.id}>
                  <div className="product-img">
                    <img src={it.image || "https://picsum.photos/80/80"} alt={it.name} />
                  </div>
                  <div className="product-info-track">
                    <p className="product-name">{it.name}</p>
                    <p className="product-price">{it.price.toLocaleString()}đ × {it.qty}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="detail-box">
              <h3>Tóm tắt đơn hàng</h3>
              <div className="summary">
                <div className="summary-row">
                  <span>Tổng tiền hàng:</span>
                  <span>{t.summary.subtotal.toLocaleString()}đ</span>
                </div>
                <div className="summary-row">
                  <span>Phí vận chuyển:</span>
                  <span>{t.summary.shipping.toLocaleString()}đ</span>
                </div>
                <div className="summary-row total">
                  <span>Tổng cộng:</span>
                  <span>{t.summary.total.toLocaleString()}đ</span>
                </div>
              </div>
            </div>

            <div className="detail-box">
              <h3>Hình ảnh theo dõi</h3>
              <div className="tracking-images">
                {(t.images || []).map((src, i) => (
                  <img key={i} src={src} alt={`Tracking ${i}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="tracking-actions">
          {/* Nút chung cho tất cả trạng thái */}
          <button className="action-btn primary">
            <FaComments />
            <span> </span>
            Liên hệ người bán
          </button>

          {/* Đơn hàng đang giao */}
          {t.status.includes("Đang giao") && (
            <button className="action-btn danger">
              <FaTimesCircle />
              <span> </span>
              Hủy đơn
            </button>
          )}

          {/* Đơn hàng đã giao */}
          {t.status.includes("Đã giao") && (
            <button className="action-btn">
              <TbRefresh />
              <span> </span>
              Trả hàng
            </button>
          )}

          {/* Đơn hàng đã hủy */}
          {t.status.includes("Hủy") && (
            <>
              <button className="action-btn">
                <BiMoneyWithdraw />
                <span> </span>
                Yêu cầu hoàn tiền
              </button>
              <button className="action-btn">
                <FaRedo />
                <span> </span>
                Tạo đơn mới
              </button>
            </>
          )}

          {/* Đơn hàng chờ xác nhận */}
          {t.status.includes("Chờ") && (
            <button className="action-btn danger">
              <FaTimesCircle />
              <span> </span>
              Hủy đơn
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Tracking
