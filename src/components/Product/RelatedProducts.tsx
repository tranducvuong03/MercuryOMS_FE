import { useNavigate } from "react-router-dom"
import { products } from "../../data/products"
import type { Product } from "../../types/product"
import ProductCard from "./ProductCard"
import "./RelatedProducts.css"

interface RelatedProductsProps {
  currentProduct: Product
}

const RelatedProducts = ({ currentProduct }: RelatedProductsProps) => {
  const navigate = useNavigate()

  // Filter products by same category, exclude current product
  const relatedProducts = products.filter(
    p => p.category === currentProduct.category && p.id !== currentProduct.id
  ).slice(0, 6)

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <div className="related-products-section">
      <div className="related-header">
        <h2>Sản phẩm liên quan</h2>
        <p className="related-category">
          Khám phá thêm từ danh mục <strong>{currentProduct.category}</strong>
        </p>
      </div>

      <div className="related-grid">
        {relatedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="related-footer">
        <button
          onClick={() => navigate(`/products?category=${currentProduct.category?.toLowerCase()}`)}
          className="btn-view-all"
        >
          Xem tất cả sản phẩm trong danh mục →
        </button>
      </div>
    </div>
  )
}

export default RelatedProducts
