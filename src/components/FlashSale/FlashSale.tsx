import "./FlashSale.css"
import { products } from "../../data/products"
import ProductCard from "../Product/ProductCard"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaFire } from "react-icons/fa"

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState("02:30:45")

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const midnight = new Date(now)
      midnight.setHours(24, 0, 0, 0)
      
      let diff = midnight.getTime() - now.getTime()
      if (diff < 0) diff = 86400000 // reset to 24 hours if past midnight
      
      const hours = Math.floor(diff / 3600000)
      const minutes = Math.floor((diff % 3600000) / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)
      
      setTimeLeft(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const navigate = useNavigate()
  const flashSaleProducts = products.filter(p => p.badge === "FLASH SALE")

  return (
    <div className="flash-sale">
      <div className="flash-header">
        <div className="flash-title-section">
          <span className="flash-fire"><FaFire /></span>
          <span className="flash-title">FLASH SALE</span>
          <div className="flash-timer">
            <span className="timer-label">Kết thúc trong</span>
            <span className="timer">{timeLeft}</span>
          </div>
        </div>
        <button type="button" className="view-all" onClick={() => navigate('/products?promotion=flash')}>
          Xem tất cả &gt;
        </button>
      </div>

      <div className="flash-products">
        {flashSaleProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}

export default FlashSale