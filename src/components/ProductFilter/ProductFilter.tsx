import React from "react"
import {
    FaTags,
    FaBolt,
} from "react-icons/fa"

interface Category {
    id: string
    name: string
}

interface Props {
    categories: Category[]
    selectedCategory: string
    setSelectedCategory: (c: string) => void
    minPrice: number
    setMinPrice: (v: number) => void
    maxPrice: number
    setMaxPrice: (v: number) => void
    minRating: number
    setMinRating: (v: number) => void
    promotionFilter: string
    setPromotionFilter: (s: string) => void
    handleReset: () => void
    searchParams: URLSearchParams
    setSearchParams: (init: any) => void
}

const ProductFilter: React.FC<Props> = ({
    categories,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    minRating,
    setMinRating,
    promotionFilter,
    setPromotionFilter,
    handleReset,
    searchParams,
    setSearchParams
}) => {
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
        setSearchParams({ category })
    }

    const handlePromotionChange = (promotion: string) => {
        setPromotionFilter(promotion)
        if (promotion !== "all") {
            setSearchParams({ ...Object.fromEntries(searchParams), promotion })
        } else {
            const params = Object.fromEntries(searchParams)
            delete params.promotion
            setSearchParams(params)
        }
    }

    return (
        <aside className="products-sidebar">
            <div className="filter-section">
                <h3>Danh mục</h3>
                <div className="category-list">
                    {categories.map(cat => (
                        <label key={cat.id} className="category-item">
                            <input
                                type="radio"
                                name="category"
                                value={cat.id}
                                checked={selectedCategory === cat.id}
                                onChange={() => handleCategoryChange(cat.id)}
                            />
                            <span>{cat.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="filter-section">
                <h3>Giá</h3>
                <div className="price-filter">
                    <div className="price-input">
                        <label>Từ:</label>
                        <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(Number(e.target.value))}
                            placeholder="0"
                        />
                    </div>
                    <div className="price-input">
                        <label>Đến:</label>
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            placeholder="500000"
                        />
                    </div>
                </div>
                <input
                    type="range"
                    min="0"
                    max="500000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="price-range"
                />
                <div className="price-display">
                    ₫{minPrice.toLocaleString().replace(/,/g, '.')} - ₫{maxPrice.toLocaleString().replace(/,/g, '.')}
                </div>
            </div>

            <div className="filter-section">
                <h3>Đánh giá</h3>
                <div className="rating-filter">
                    {[5, 4, 3, 2, 1].map(star => (
                        <label key={star} className="rating-item">
                            <input
                                type="radio"
                                name="rating"
                                value={star}
                                checked={minRating === star}
                                onChange={() => setMinRating(star)}
                            />
                            <span className="stars">{"★".repeat(star)}{"☆".repeat(5 - star)}</span>
                            <span className="rating-text">từ {star} sao</span>
                        </label>
                    ))}
                    <label className="rating-item">
                        <input
                            type="radio"
                            name="rating"
                            value={0}
                            checked={minRating === 0}
                            onChange={() => setMinRating(0)}
                        />
                        <span className="rating-text">Tất cả</span>
                    </label>
                </div>
            </div>

            <div className="filter-section">
                <h3>Ưu đãi</h3>
                <div className="promotion-filter">
                    <label className="promotion-item">
                        <input
                            type="radio"
                            name="promotion"
                            value="all"
                            checked={promotionFilter === "all"}
                            onChange={() => handlePromotionChange("all")}
                        />
                        <span>Tất cả</span>
                    </label>
                    <label className="promotion-item">
                        <input
                            type="radio"
                            name="promotion"
                            value="flash"
                            checked={promotionFilter === "flash"}
                            onChange={() => handlePromotionChange("flash")}
                        />
                        <span>
                            <FaBolt />
                            Flash Sale
                        </span>
                    </label>
                    <label className="promotion-item">
                        <input
                            type="radio"
                            name="promotion"
                            value="discount"
                            checked={promotionFilter === "discount"}
                            onChange={() => handlePromotionChange("discount")}
                        />
                        <span>
                            <FaTags />
                            <span> </span>
                            Có giảm giá
                        </span>
                    </label>
                </div>
            </div>

            <button className="reset-filter-btn" onClick={handleReset}>
                Đặt lại bộ lọc
            </button>
        </aside>
    )
}

export default ProductFilter
