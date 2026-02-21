import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { products as allProducts } from "../../data/products"
import Pagination from "../Pagination/Pagination"
import { FaShop } from "react-icons/fa6"
import { FaStar } from "react-icons/fa"

const ITEMS_PER_PAGE = 6

interface FollowedShopsProps {
  followedShops: number[]
  onUnfollow: (shopId: number) => void
}

const ProfileFollowedShops = ({ followedShops, onUnfollow }: FollowedShopsProps) => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)

  // Build shop data list from products
  const shopsMap: Record<number, any> = {}
  allProducts.forEach(p => {
    if (p.shop && !shopsMap[p.shop.id]) shopsMap[p.shop.id] = p.shop
  })
  const followedShopData = followedShops.map(id => shopsMap[id]).filter(Boolean)

  const totalPages = Math.ceil(followedShopData.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const displayedShops = followedShopData.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="profile-section">
      <h2>Shop bạn đã theo dõi</h2>
      {followedShopData.length === 0 ? (
        <p>Bạn chưa theo dõi shop nào.</p>
      ) : (
        <>
          <div className="followed-shops-list">
            {displayedShops.map((s, idx) => (
              <div key={s.id || idx} className="followed-shop-card" onClick={() => navigate(`/shop/${s.id}`)}>
                <div className="shop-avatar">
                  {s.logo ? (
                    <img src={s.logo} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
                  ) : (
                    <span style={{ fontSize: '32px' }}><FaShop /></span>
                  )}
                </div>
                <div className="shop-info">
                  <h4>{s.name}</h4>
                  <div className="shop-meta"><FaStar /> {s.rating} · {s.followers.toLocaleString()} follower</div>
                </div>
                <button className="btn-unfollow" onClick={(e) => {
                  e.stopPropagation()
                  onUnfollow(s.id)
                }}>Bỏ theo dõi</button>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={setCurrentPage}
            showPageNumbers={false}
          />
        </>
      )}
    </div>
  )
}

export default ProfileFollowedShops
