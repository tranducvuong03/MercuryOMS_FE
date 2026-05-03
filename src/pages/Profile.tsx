import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  FaUser,
  FaBox,
  FaTicketAlt,
  FaStore,
  FaCog,
  FaArrowLeft,
  FaMapMarkerAlt
} from "react-icons/fa"

import "./Profile.css"
import "../components/Pagination/Pagination.css"

import ProfileInfo from "../components/Profile/ProfileInfo"
import ProfileOrders from "../components/Profile/ProfileOrders"
import ProfileVouchers from "../components/Profile/ProfileVouchers"
import ProfileFollowedShops from "../components/Profile/ProfileFollowedShops"
import ProfileSettings from "../components/Profile/ProfileSettings"
import ProfileAddresses from "../components/Profile/ProfileAddresses"

interface User {
  name: string
  email: string
}

const Profile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState("info")
  const [followedShops, setFollowedShops] = useState<number[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      navigate("/login")
      return
    }

    setUser(JSON.parse(storedUser))

    const f = localStorage.getItem("followedShops")
    const arr = f ? (JSON.parse(f) as number[]) : []
    setFollowedShops(arr)
  }, [navigate])

  const handleUnfollow = (shopId: number) => {
    const next = followedShops.filter(id => id !== shopId)
    localStorage.setItem("followedShops", JSON.stringify(next))
    setFollowedShops(next)
  }

  if (!user) return null

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Tài khoản của tôi</h1>
        <button
          onClick={() => navigate("/")}
          className="back-to-home"
        >
          <FaArrowLeft style={{ marginRight: 6 }} />
          Quay lại trang chủ
        </button>
      </div>

      <div className="profile-content">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="profile-avatar">
            <div className="avatar-circle">
              <img
                src="https://picsum.photos/120/120?avatar"
                alt={user.name}
              />
            </div>
            <p className="user-name">{user.name}</p>
            <p className="user-email">{user.email}</p>
          </div>

          <div className="profile-menu">
            <button
              className={`menu-item ${activeTab === "info" ? "active" : ""}`}
              onClick={() => setActiveTab("info")}
            >
              <FaUser className="menu-icon" />
              <span> </span>
              Thông tin cá nhân
            </button>

            <button
              className={`menu-item ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <FaBox className="menu-icon" />
              <span> </span>
              Đơn mua
            </button>

            <button
              className={`menu-item ${activeTab === "vouchers" ? "active" : ""}`}
              onClick={() => setActiveTab("vouchers")}
            >
              <FaTicketAlt className="menu-icon" />
              <span> </span>
              Voucher của tôi
            </button>

            <button
              className={`menu-item ${activeTab === "followed" ? "active" : ""}`}
              onClick={() => setActiveTab("followed")}
            >
              <FaStore className="menu-icon" />
              <span> </span>
              Shop theo dõi
            </button>

            <button
              className={`menu-item ${activeTab === "addresses" ? "active" : ""}`}
              onClick={() => setActiveTab("addresses")}
            >
              <FaMapMarkerAlt className="menu-icon" />
              <span> </span>
              Quản lý địa chỉ
            </button>

            <button
              className={`menu-item ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <FaCog className="menu-icon" />
              <span> </span>
              Cài đặt
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="profile-main">
          {activeTab === "info" && <ProfileInfo user={user} />}
          {activeTab === "orders" && <ProfileOrders />}
          {activeTab === "vouchers" && <ProfileVouchers />}
          {activeTab === "followed" && (
            <ProfileFollowedShops
              followedShops={followedShops}
              onUnfollow={handleUnfollow}
            />
          )}
          {activeTab === "addresses" && <ProfileAddresses />}
          {activeTab === "settings" && <ProfileSettings />}
        </div>
      </div>
    </div>
  )
}

export default Profile