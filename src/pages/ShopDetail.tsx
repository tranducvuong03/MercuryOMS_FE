import { useParams, useNavigate } from "react-router-dom"
import { products } from "../data/products"
import "./ShopDetail.css"
import { useState, useEffect, useRef } from "react"
import ProductCard from "../components/Product/ProductCard"
import { FaShop, FaStar } from "react-icons/fa6"

interface Voucher {
  id: string | number
  discountType: "percent" | "fixed"
  discount: number
  title: string
  description: string
  code: string
  minPurchase: number
  quantity: number
  expiryDate: string
}

const ShopDetail = () => {
  const { shopId } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"products" | "vouchers" | "info">("products")

  // Find all products from this shop
  const shopProducts = products.filter(p => p.shop?.id === Number(shopId))
  const shop = shopProducts[0]?.shop

  // Follow state (persisted in localStorage as array of ids)
  const [isFollowed, setIsFollowed] = useState(false)
  const [localFollowers, setLocalFollowers] = useState<number>(shop?.followers || 0)

  // Chat state
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState<{ sender: "user" | "shop"; text: string; time: string }[]>([])
  const messageRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!shop) return
    const stored = localStorage.getItem("followedShops")
    const arr = stored ? (JSON.parse(stored) as number[]) : []
    setIsFollowed(arr.includes(shop.id))
    setLocalFollowers(shop.followers)

    const chatKey = `chat_shop_${shop.id}`
    const storedChat = localStorage.getItem(chatKey)
    setMessages(storedChat ? JSON.parse(storedChat) : [])
  }, [shop])

  // respond to global follow changes
  useEffect(() => {
    const handler = (e: Event) => {
      const ev = e as CustomEvent
      const shopId = ev.detail?.shopId
      const followed = ev.detail?.followed
      if (!shopId || shopId !== shop?.id) return
      setIsFollowed(Boolean(followed))
      setLocalFollowers((n: number) => (followed ? n + 1 : Math.max(0, n - 1)))
    }
    window.addEventListener("followChanged", handler as EventListener)
    return () => window.removeEventListener("followChanged", handler as EventListener)
  }, [shop])

  const toggleFollow = () => {
    if (!shop) return
    const stored = localStorage.getItem("followedShops")
    const arr: number[] = stored ? JSON.parse(stored) : []
    if (isFollowed) {
      const next = arr.filter(id => id !== shop.id)
      localStorage.setItem("followedShops", JSON.stringify(next))
      setIsFollowed(false)
      setLocalFollowers((n: number) => Math.max(0, n - 1))
    } else {
      arr.push(shop.id)
      localStorage.setItem("followedShops", JSON.stringify(arr))
      setIsFollowed(true)
      setLocalFollowers((n: number) => n + 1)
    }
  }

  const chatKey = shop ? `chat_shop_${shop.id}` : ""
  const sendMessage = (text: string) => {
    if (!shop || !text.trim()) return
    const msg = { sender: "user" as const, text: text.trim(), time: new Date().toISOString() }
    const next = [...messages, msg]
    setMessages(next)
    localStorage.setItem(chatKey, JSON.stringify(next))
    // simulate shop reply
    setTimeout(() => {
      const reply = { sender: "shop" as const, text: "Cảm ơn bạn! Shop sẽ phản hồi sớm.", time: new Date().toISOString() }
      const next2 = [...next, reply]
      setMessages(next2)
      localStorage.setItem(chatKey, JSON.stringify(next2))
    }, 900)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [shopId])

  if (!shop) {
    return (
      <div className="shop-detail-container">
        <div className="not-found">
          <h2>Shop không tìm thấy</h2>
          <button onClick={() => navigate("/")} className="back-button">
            ← Quay lại trang chủ
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="shop-detail-container">
      <button onClick={() => navigate(-1)} className="back-button-shop">
        ← Quay lại
      </button>

      {/* Shop Header */}
      <div className="shop-detail-header">
        <div className="shop-logo-large">
          {shop.logo ? (
            <img src={shop.logo} alt={shop.name} />
          ) : (
            <div className="shop-logo-fallback">
              <FaShop />
            </div>
          )}
        </div>
        <div className="shop-header-info">
          <div className="shop-name-verified">
            <h1>{shop.name}</h1>
            {shop.verified && <span className="verified-badge">✓ Đã xác minh</span>}
          </div>
          <div className="shop-stats-grid">
            <div className="stat-box">
              <span className="stat-value">{shop.rating}</span>
              <span className="stat-label">Đánh giá ★</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">{localFollowers.toLocaleString()}</span>
              <span className="stat-label">Follower</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">{shop.products}</span>
              <span className="stat-label">Sản phẩm</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">{shop.responseRate}%</span>
              <span className="stat-label">Phản hồi</span>
            </div>
          </div>
        </div>
        <div className="shop-action-buttons">
          <button className="action-btn" onClick={toggleFollow}>
            {isFollowed ? "Đã theo dõi" : "Follow"}
          </button>
          <button
            className="action-btn"
            onClick={() => {
              if (shop) {
                window.dispatchEvent(new CustomEvent("openShopChat", { detail: { shopId: shop.id } }))
              }
            }}
          >
            Chat
          </button>
        </div>
      </div>

      {/* Shop Info */}
      <div className="shop-info-details">
        <div className="info-item">
          <span className="info-label">Mô tả:</span>
          <span className="info-value">{shop.description || "Cửa hàng uy tín cung cấp sản phẩm chất lượng cao"}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Tham gia:</span>
          <span className="info-value">{shop.joinedDate || "2020-01-01"}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Thời gian phản hồi:</span>
          <span className="info-value">{shop.responseTime}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="shop-tabs">
        <button
          className={`tab-btn ${activeTab === "products" ? "active" : ""}`}
          onClick={() => setActiveTab("products")}
        >
          Sản phẩm ({shopProducts.length})
        </button>
        <button
          className={`tab-btn ${activeTab === "vouchers" ? "active" : ""}`}
          onClick={() => setActiveTab("vouchers")}
        >
          Voucher ({shop.vouchers?.length || 0})
        </button>
        <button
          className={`tab-btn ${activeTab === "info" ? "active" : ""}`}
          onClick={() => setActiveTab("info")}
        >
          Thông tin
        </button>
      </div>

      {/* Tab Content */}
      <div className="shop-tab-content">
        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="products-section">
            {shopProducts.length > 0 ? (
              <div className="products-grid-shop">
                {shopProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <p className="empty-message">Shop chưa có sản phẩm nào</p>
            )}
          </div>
        )}

        {/* Vouchers Tab */}
        {activeTab === "vouchers" && (
          <div className="vouchers-section">
            {shop.vouchers && shop.vouchers.length > 0 ? (
              <div className="vouchers-list">
                {shop.vouchers.map((voucher: Voucher) => (
                  <div key={voucher.id} className="voucher-card">
                    <div className="voucher-header">
                      <div className="voucher-discount">
                        {voucher.discountType === "percent" ? (
                          <span className="discount-value-percent">{voucher.discount}%</span>
                        ) : (
                          <span className="discount-value-fixed">{(voucher.discount / 1000).toFixed(0)}K</span>
                        )}
                      </div>
                      <div className="voucher-info">
                        <h3>{voucher.title}</h3>
                        <p className="voucher-description">{voucher.description}</p>
                      </div>
                    </div>
                    <div className="voucher-footer">
                      <div className="voucher-details">
                        <span className="detail-item">Mã: <strong>{voucher.code}</strong></span>
                        <span className="detail-item">Min: ₫{voucher.minPurchase.toLocaleString()}</span>
                        <span className="detail-item">Còn: {voucher.quantity}</span>
                      </div>
                      <span className="expiry-date">Hết {voucher.expiryDate}</span>
                    </div>
                    <button className="copy-code-btn">Sao chép</button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-message">Shop chưa có voucher nào</p>
            )}
          </div>
        )}

        {/* Info Tab */}
        {activeTab === "info" && (
          <div className="info-section">
            <div className="info-box">
              <h3>Thông tin Shop</h3>
              <div className="info-details">
                <div className="detail-row">
                  <span className="label">Tên Shop:</span>
                  <span className="value">{shop.name}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Đánh giá:</span>
                  <span className="value"><FaStar/> {shop.rating}/5</span>
                </div>
                <div className="detail-row">
                  <span className="label">Số follower:</span>
                  <span className="value">{localFollowers.toLocaleString()}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Số sản phẩm:</span>
                  <span className="value">{shop.products}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Tỷ lệ phản hồi:</span>
                  <span className="value">{shop.responseRate}%</span>
                </div>
                <div className="detail-row">
                  <span className="label">Thời gian phản hồi:</span>
                  <span className="value">{shop.responseTime}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Mô tả:</span>
                  <span className="value">{shop.description}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Ngày tham gia:</span>
                  <span className="value">{shop.joinedDate}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Inline Chat Panel */}
      {showChat && shop && (
        <div className="shop-chat-panel">
          <div className="chat-header">
            <strong>Chat với {shop.name}</strong>
            <button className="close-chat" onClick={() => setShowChat(false)}>✕</button>
          </div>
          <div className="chat-messages">
            {messages.length === 0 && <div className="chat-empty">Bắt đầu cuộc trò chuyện với shop...</div>}
            {messages.map((m, idx) => (
              <div key={idx} className={`chat-message ${m.sender === "user" ? "from-user" : "from-shop"}`}>
                <div className="msg-text">{m.text}</div>
                <div className="msg-time">{new Date(m.time).toLocaleString()}</div>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input ref={el => { messageRef.current = el }} placeholder="Gửi tin nhắn cho shop..." />
            <button
              onClick={() => {
                const txt = messageRef.current?.value || ""
                sendMessage(txt)
                if (messageRef.current) messageRef.current.value = ""
              }}
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShopDetail