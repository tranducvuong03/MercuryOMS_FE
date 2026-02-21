import { useState, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { products } from "../data/products"
import { searchProducts } from "../data/search"
import Pagination from "../components/Pagination/Pagination"
import "../components/Pagination/Pagination.css"
import "./Products.css"
import ProductFilter from "../components/ProductFilter/ProductFilter"
import { FaShoppingCart } from "react-icons/fa"

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const [filteredProducts, setFilteredProducts] = useState(products)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all")
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(500000)
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState("newest")
  const [promotionFilter, setPromotionFilter] = useState(searchParams.get("promotion") || "all")

  // Danh mục
  const categories = [
    { id: "all", name: "Tất cả sản phẩm" },
    { id: "Điện tử", name: "Điện tử" },
    { id: "Thời trang", name: "Thời trang" },
    { id: "Nhà cửa", name: "Nhà cửa" },
    { id: "Thể thao", name: "Thể thao" }
  ]

  // Lọc sản phẩm
  const flashOnly = searchParams.get("flash") === "true"

  useEffect(() => {
    let result = products

    // Flash sale filter (URL param ?flash=true)
    if (flashOnly) {
      result = products.filter(p => p.badge === "FLASH SALE")
    } else {
      // Filter by search query
      if (searchQuery.trim()) {
        result = searchProducts({ query: searchQuery })
      } else {
        // Filter by category
        if (selectedCategory !== "all") {
          result = result.filter(p => (p.category || "").toLowerCase() === selectedCategory.toLowerCase())
        }
      }
    }

    // Filter by price
    result = result.filter(p => p.price >= minPrice && p.price <= maxPrice)

    // Filter by rating
    result = result.filter(p => p.rating >= minRating)

    // Filter by promotion
    if (promotionFilter === "flash") {
      result = result.filter(p => p.badge === "FLASH SALE")
    } else if (promotionFilter === "discount") {
      result = result.filter(p => (p.discount || 0) > 0)
    }

    // Sort
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => b.id - a.id)
        break
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "popular":
        result.sort((a, b) => b.sold - a.sold)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    setFilteredProducts(result)
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, minPrice, maxPrice, minRating, sortBy, promotionFilter])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  // Scroll to top when page changes (improves UX for pagination)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentPage])

  // Keep local searchQuery in sync when URL ?search=... changes
  useEffect(() => {
    const param = searchParams.get("search") || ""
    if (param !== searchQuery) {
      setSearchQuery(param)
    }
  }, [searchParams])

  const handleReset = () => {
    setSelectedCategory("all")
    setMinPrice(0)
    setMaxPrice(500000)
    setMinRating(0)
    setSortBy("newest")
    setPromotionFilter("all")
    setSearchParams({})
  }


  return (
    <div className="products-page">
      <div className="products-container">
        {/* Sidebar Filter */}
        <ProductFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          minRating={minRating}
          setMinRating={setMinRating}
          promotionFilter={promotionFilter}
          setPromotionFilter={setPromotionFilter}
          handleReset={handleReset}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />

        {/* Main Content */}
        <main className="products-main">
          {/* Top Bar */}
          <div className="products-top-bar">
            <div className="results-info">
              {searchQuery ? (
                <p>
                  Kết quả tìm kiếm cho "<strong>{searchQuery}</strong>" ({filteredProducts.length} sản phẩm)
                  <button
                    className="clear-search-btn"
                    onClick={() => {
                      setSearchQuery("")
                      setSearchParams({})
                    }}
                  >
                    ✕
                  </button>
                </p>
              ) : (
                <p>Tìm thấy <strong>{filteredProducts.length}</strong> sản phẩm</p>
              )}
            </div>
            <div className="sort-options">
              <label>Sắp xếp:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="newest">Mới nhất</option>
                <option value="popular">Bán chạy nhất</option>
                <option value="rating">Đánh giá cao nhất</option>
                <option value="price-low">Giá thấp → cao</option>
                <option value="price-high">Giá cao → thấp</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {currentProducts.length > 0 ? (
            <>
              <div className="products-grid">
                {currentProducts.map(product => (
                  <div
                    key={product.id}
                    className="product-card-grid"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="product-image-wrapper">
                      <img src={product.images[0]} alt={product.name} />
                      {product.badge && <div className="product-badge">{product.badge}</div>}
                      {product.discount && product.discount > 0 && (
                        <div className="product-discount">-{product.discount}%</div>
                      )}
                    </div>
                    <div className="product-info-wrapper">
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-rating">
                        <span className="stars">★★★★★</span>
                        <span className="rating-value">({(product.sold / 1000).toFixed(1)}k)</span>
                      </div>
                      <div className="product-price">
                        <span className="price">₫{product.price.toLocaleString().replace(/,/g, '.')}</span>
                        {product.originalPrice && (
                          <span className="original-price">₫{product.originalPrice.toLocaleString().replace(/,/g, '.')}</span>
                        )}
                      </div>
                      <button className="add-to-cart-btn">
                        <FaShoppingCart />
                        <span> </span>
                        Thêm vào giỏ
                        </button>
                    </div>
                  </div>
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onChange={setCurrentPage}
                showPageNumbers={true}
              />
            </>
          ) : (
            <div className="no-products">
              <p>Không tìm thấy sản phẩm phù hợp</p>
              <button className="reset-filter-btn" onClick={handleReset}>
                Đặt lại bộ lọc
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Products
