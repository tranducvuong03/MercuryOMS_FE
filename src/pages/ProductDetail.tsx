import { useParams, useNavigate } from "react-router-dom"
import { products } from "../data/products"
import RelatedProducts from "../components/Product/RelatedProducts"
import Breadcrumb from "../components/BreadCrumb/Breadcrumb"
import "./ProductDetail.css"
import { useState, useEffect } from "react"
import ImageSection from "../components/ProductDetail/ImageSection"
import InfoSection from "../components/ProductDetail/InfoSection"
import ShopInfo from "../components/ProductDetail/ShopInfo"
import ReviewsSection from "../components/ProductDetail/ReviewsSection"

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => p.id === Number(id))
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [mainImageIndex, setMainImageIndex] = useState(0)
  const [selectedVariantId, setSelectedVariantId] = useState(product?.variants?.[0]?.id || "")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  useEffect(() => {
    setSelectedVariantId(product?.variants?.[0]?.id || "")
    setQuantity(1)
    setMainImageIndex(0)
  }, [product?.id])

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="not-found">
          <h2>Sản phẩm không tìm thấy</h2>
          <button onClick={() => navigate("/")} className="back-button">
            ← Quay lại trang chủ
          </button>
        </div>
      </div>
    )
  }

  const selectedVariant = product.variants?.find(v => v.id === selectedVariantId)
  const currentImages = selectedVariant?.images || product.images
  const currentStock = selectedVariant?.stock || 50

  const handleAddToCart = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handlePrevImage = () => {
    setMainImageIndex(i => (i - 1 + currentImages.length) % currentImages.length)
  }

  const handleNextImage = () => {
    setMainImageIndex(i => (i + 1) % currentImages.length)
  }

  return (
    <div className="product-detail-container">
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: "Trang chủ", link: "/" },
        { label: product.category || "Danh mục", link: `/products?category=${encodeURIComponent(product.category || "")}` },
        { label: product.name }
      ]} />

      <div className="product-detail-content">
        <ImageSection
          product={product}
          mainImageIndex={mainImageIndex}
          setMainImageIndex={setMainImageIndex}
          currentImages={currentImages}
          handlePrevImage={handlePrevImage}
          handleNextImage={handleNextImage}
        />

        <InfoSection
          product={product}
          selectedVariantId={selectedVariantId}
          setSelectedVariantId={setSelectedVariantId}
          quantity={quantity}
          setQuantity={setQuantity}
          currentStock={currentStock}
          added={added}
          handleAddToCart={handleAddToCart}
        />
      </div>

      {/* Shop Info Section */}
      <ShopInfo product={product} />

      {/* Product Description */}
      {product.description && (
        <div className="product-description">
          <h2>Chi tiết sản phẩm</h2>
          <div className="description-content">
            <p>{product.description}</p>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <ReviewsSection product={product} />

      {/* Related Products */}
      <RelatedProducts currentProduct={product} />
    </div>
  )
}

export default ProductDetail
