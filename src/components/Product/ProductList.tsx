import { products } from "../../data/products"
import ProductCard from "./ProductCard"
import "./Product.css"

const ProductList = () => {
  return (
    <div className="products">
      <h2>FLASH SALE</h2>
      <div className="product-grid">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}

export default ProductList