import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Category.css"
import { 
  FaTshirt,
  FaMobileAlt,
  FaLaptop,
  FaHome,
  FaBaby,
  FaRunning,
  FaShoePrints,
  FaGem,
  FaPlug
} from "react-icons/fa"

const categories = [
  { name: "Thời Trang Nam", icon: <FaTshirt />, key: "fashion" },
  { name: "Điện Thoại", icon: <FaMobileAlt />, key: "electronics" },
  { name: "Thiết Bị Điện Tử", icon: <FaPlug />, key: "electronics" },
  { name: "Nhà Cửa", icon: <FaHome />, key: "home" },
  { name: "Sắc Đẹp", icon: <FaGem />, key: "fashion" },
  { name: "Mẹ & Bé", icon: <FaBaby />, key: "home" },
  { name: "Thể Thao", icon: <FaRunning />, key: "sports" },
  { name: "Laptop", icon: <FaLaptop />, key: "electronics" },
  { name: "Giày Dép", icon: <FaShoePrints />, key: "fashion" }
]

const Category = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const navigate = useNavigate()

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      })
    }
  }

  const handleCategoryClick = (categoryKey: string) => {
    navigate(`/products?category=${categoryKey}`)
  }

  return (
    <div className="category">
      <h3>DANH MỤC</h3>
      <div className="category-wrapper">
        {canScrollLeft && (
          <button className="category-nav left" onClick={() => scroll("left")}>
            ❮
          </button>
        )}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="category-grid"
        >
          {categories.map((c, i) => (
            <div
              key={i}
              className="category-item"
              onClick={() => handleCategoryClick(c.key)}
            >
              <div className="category-icon">{c.icon}</div>
              <span>{c.name}</span>
            </div>
          ))}
        </div>
        {canScrollRight && (
          <button className="category-nav right" onClick={() => scroll("right")}>
            ❯
          </button>
        )}
      </div>
    </div>
  )
}

export default Category