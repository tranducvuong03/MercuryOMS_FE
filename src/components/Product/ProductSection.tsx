import "./ProductSection.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { products } from "../../data/products"
import ProductCard from "./ProductCard"

const ProductSection = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"popular" | "newest" | "bestselling">("popular")
  const [displayProducts, setDisplayProducts] = useState(products)

  useEffect(() => {
    let sorted = [...products]

    if (activeTab === "popular") {
      // Sắp xếp theo rating cao nhất
      sorted.sort((a, b) => b.rating - a.rating)
    } else if (activeTab === "bestselling") {
      // Sắp xếp theo số lượng bán cao nhất
      sorted.sort((a, b) => b.sold - a.sold)
    } else if (activeTab === "newest") {
      // Sắp xếp theo ngày tạo mới nhất
      sorted.sort((a, b) => {
        const dateA = new Date(a.createdDate || "").getTime()
        const dateB = new Date(b.createdDate || "").getTime()
        return dateB - dateA
      })
    }

    setDisplayProducts(sorted)
  }, [activeTab])

  return (
    <div className="product-section">
      <div className="tabs">
        <div 
          className={`tab ${activeTab === "popular" ? "active" : ""}`}
          onClick={() => setActiveTab("popular")}
        >
          Phổ biến
        </div>
        <div 
          className={`tab ${activeTab === "newest" ? "active" : ""}`}
          onClick={() => setActiveTab("newest")}
        >
          Mới nhất
        </div>
        <div 
          className={`tab ${activeTab === "bestselling" ? "active" : ""}`}
          onClick={() => setActiveTab("bestselling")}
        >
          Bán chạy
        </div>
      </div>

      <div className="product-grid">
        {displayProducts.slice(0, 10).map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="view-more-container">
        <button className="view-more-btn" onClick={() => navigate("/products")}>
          Xem thêm sản phẩm →
        </button>
      </div>
    </div>
  )
}

export default ProductSection