import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { searchProducts, getTopSearches } from "../../data/search"
import { initialNotifications } from "../../data/notifications"
import type { Product } from "../../types/product"
import type { Notification } from "../../data/notifications"
import NotificationPanel from "./NotificationPanel"
import "./Header.css"
import logo from "../../assets/logo.png"

interface User {
  name: string
  email: string
}

const Header = () => {
  const [user, setUser] = useState<User | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [topSearches] = useState<string[]>(getTopSearches())
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const navigate = useNavigate()
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    // Lắng nghe event khi user đăng nhập
    const handleUserLoggedIn = (event: Event) => {
      const customEvent = event as CustomEvent
      setUser(customEvent.detail)
    }

    // Lắng nghe event khi user đăng xuất
    const handleUserLoggedOut = () => {
      setUser(null)
    }

    window.addEventListener("userLoggedIn", handleUserLoggedIn)
    window.addEventListener("userLoggedOut", handleUserLoggedOut)
    return () => {
      window.removeEventListener("userLoggedIn", handleUserLoggedIn)
      window.removeEventListener("userLoggedOut", handleUserLoggedOut)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)

    if (value.trim()) {
      const results = searchProducts({ query: value, limit: 6 })
      setSearchResults(results)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(true)
      setSearchResults([])
    }
  }

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setShowSuggestions(false)
      navigate(`/products?search=${encodeURIComponent(query)}`)
      setSearchQuery("")
      setSearchResults([])
    }
  }

  const handleTopSearchClick = (searchTerm: string) => {
    handleSearch(searchTerm)
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    window.dispatchEvent(new CustomEvent("userLoggedOut"))
    navigate("/")
  }

  const handleMarkAsRead = (notificationId: number) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    )
  }

  const handleDeleteNotification = (notificationId: number) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId))
  }

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      handleMarkAsRead(notification.id)
    }
    if (notification.relatedLink) {
      navigate(notification.relatedLink)
    }
  }

  return (
    <header className="header">
      <div className="top-header container">
        <div className="left-links">
          <span>Kênh Người Bán</span>
          <span>Tải ứng dụng</span>
        </div>
        <div className="right-links">
          <div className="notification-container">
            <NotificationPanel
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDeleteNotification}
              onNotificationClick={handleNotificationClick}
            />
          </div>

          <span>Hỗ trợ</span>
          {user ? (
            <>
              <Link to="/profile" className="user-profile-link">
                <div className="user-avatar-small">
                  <img src="https://picsum.photos/40/40?avatar" alt={user.name} />
                </div>
                <span className="user-name-header">{user.name}</span>
              </Link>
              <span onClick={handleLogout} className="logout-link">
                Đăng xuất
              </span>
            </>
          ) : (
            <>
              <Link to="/register" className="auth-link">
                Đăng ký
              </Link>
              <Link to="/login" className="auth-link">
                Đăng nhập
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="main-header container">
        <Link to="/" className="logo">
          <img src={logo} className="logo-img" />
          Mercury
        </Link>

        <div className="search-container" ref={searchRef}>
          <div className="search">
            <input
              placeholder="Tìm sản phẩm, thương hiệu..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch(searchQuery)
                }
              }}
            />
            <button onClick={() => handleSearch(searchQuery)}>
              <SearchIcon />
            </button>
          </div>

          {showSuggestions && (
            <div className="search-suggestions">
              {searchResults.length > 0 ? (
                <>
                  <div className="suggestions-label">Kết quả tìm kiếm</div>
                  <div className="suggestions-list">
                    {searchResults.map(product => (
                      <div
                        key={product.id}
                        className="suggestion-item"
                        onClick={() => {
                          navigate(`/product/${product.id}`)
                          setShowSuggestions(false)
                          setSearchQuery("")
                        }}
                      >
                        <div className="suggestion-image">
                          <img src={product.images[0]} alt={product.name} />
                        </div>
                        <div className="suggestion-info">
                          <div className="suggestion-name">{product.name}</div>
                          <div className="suggestion-meta">
                            <span className="suggestion-price">
                              {product.price.toLocaleString()}đ
                            </span>
                            <span className="suggestion-sold">
                              Đã bán {product.sold}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="suggestions-footer">
                    <button
                      className="view-all-btn"
                      onClick={() => handleSearch(searchQuery)}
                    >
                      Xem tất cả kết quả →
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="suggestions-label">Tìm kiếm phổ biến</div>
                  <div className="top-searches">
                    {topSearches.map((search, index) => (
                      <button
                        key={index}
                        className="top-search-btn"
                        onClick={() => handleTopSearchClick(search)}
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="cart">
          <div onClick={() => navigate("/cart")} style={{ cursor: "pointer" }}>
            <CartIcon />
          </div>
          <span className="cart-badge">3</span>
        </div>
      </div>
    </header>
  )
}

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M21 20l-5.8-5.8a7 7 0 10-1.4 1.4L20 21zM10 16a6 6 0 110-12 6 6 0 010 12z" />
  </svg>
)

const CartIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
    <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.44A2 2 0 009 19h12v-2H9l1.1-2h7.45a2 2 0 001.8-1.1l3.58-6.49A1 1 0 0020 6H6.21l-.94-2z" />
  </svg>
)

export default Header