import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import Pagination from "../components/Pagination/Pagination"
import "../components/Pagination/Pagination.css"
import "./Products.css"
import ProductFilter from "../components/ProductFilter/ProductFilter"
import ProductGridCard from "../components/Product/ProductGridCard"
import { getCategories } from "../services/categoryApi"
import type { Category } from "../types/category"

import { productApi } from "../services/productApi"
import type { ProductResponse } from "../types/product"

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [filteredProducts, setFilteredProducts] = useState<ProductResponse[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all")
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(500000)
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState("newest")
  const [promotionFilter, setPromotionFilter] = useState(searchParams.get("promotion") || "all")

  const [categories, setCategories] = useState<Category[]>([])

  // ===== GET CATEGORIES =====
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategories()
        setCategories([{ id: "all", name: "Tất cả sản phẩm" }, ...data])
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])

  const flashOnly = searchParams.get("flash") === "true"

  // ===== GET PRODUCTS =====
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productApi.getProducts({
          pageIndex: 1,
          pageSize: 10,
          search: searchQuery || undefined,
          category: selectedCategory !== "all" ? selectedCategory : undefined,
          minPrice,
          maxPrice,
          minRating,
          sortBy,
          isActive: true
        })

        // ❗ FIX NULL CRASH
        let result: ProductResponse[] = res?.value?.items ?? []

        // flash sale
        if (flashOnly) {
          result = result.filter(p => p.badge === "FLASH SALE")
        }

        // promotion filter
        if (promotionFilter === "flash") {
          result = result.filter(p => p.badge === "FLASH SALE")
        } else if (promotionFilter === "discount") {
          result = result.filter(p => (p.discount || 0) > 0)
        }

        // sort
        switch (sortBy) {
          case "newest":
            result.sort((a, b) => b.id.localeCompare(a.id))
            break
          case "price-low":
            result.sort((a, b) => a.basePrice - b.basePrice)
            break
          case "price-high":
            result.sort((a, b) => b.basePrice - a.basePrice)
            break
          case "popular":
            result.sort((a, b) => b.sold - a.sold)
            break
          case "rating":
            result.sort((a, b) => b.rating - a.rating)
            break
        }

        setFilteredProducts(result)
        setCurrentPage(1)
      } catch (err) {
        console.error(err)
        setFilteredProducts([])
      }
    }

    fetchProducts()
  }, [
    searchQuery,
    selectedCategory,
    minPrice,
    maxPrice,
    minRating,
    sortBy,
    promotionFilter,
    flashOnly
  ])

  // ===== PAGINATION =====
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentPage])

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

        <main className="products-main">

          <div className="products-top-bar">
            <div className="results-info">
              <p>
                Tìm thấy <strong>{filteredProducts.length}</strong> sản phẩm
              </p>
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

          {currentProducts.length > 0 ? (
            <>
              <div className="products-grid">
                {currentProducts.map(product => (
                  <ProductGridCard key={product.id} product={product} />
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