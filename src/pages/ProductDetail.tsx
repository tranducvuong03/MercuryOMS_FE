import { useParams, useNavigate } from "react-router-dom"
import RelatedProducts from "../components/Product/RelatedProducts"
import Breadcrumb from "../components/BreadCrumb/Breadcrumb"
import "./ProductDetail.css"
import { useState, useEffect } from "react"
import ImageSection from "../components/ProductDetail/ImageSection"
import InfoSection from "../components/ProductDetail/InfoSection"
import ShopInfo from "../components/ProductDetail/ShopInfo"
import ReviewsSection from "../components/ProductDetail/ReviewsSection"
import type { Product } from "../types/product"
import type { ProductDetailResponse } from "../types/productVariant"
import { productApi } from "../services/productApi"
import { cartApi } from "../services/cart"

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState<Product | null>(null)

  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const [selectedVariantId, setSelectedVariantId] = useState("")
  const [mainImageIndex, setMainImageIndex] = useState(0)
  const [mainImageSrc, setMainImageSrc] = useState("")

  const mapToFE = (data: ProductDetailResponse): Product => {
    return {
      id: data.id,      name: data.name,
      description: data.description,

      discountPrice: data.discountPrice,
      originalPrice: data.originalPrice,
      discount: data.discount,

      category: data.category,

      rating: data.rating,
      sold: data.sold,

      images: data.images,

      variants: data.variants.map(v => ({
        id: v.id,
        color: v.color,
        size: v.size,
        originalPrice: v.originalPrice,
        discountPrice: v.discountPrice,
        image: v.imageUrl ?? null,
        stock: v.stock
      }))
    }
  }

  useEffect(() => {
    if (!id) return

    productApi.getDetail(id).then(res => {
      if (res.isSuccess && res.value) {
        const mapped = mapToFE(res.value)
        setProduct(mapped)
      } else {
        setProduct(null)
      }
    })
  }, [id])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  useEffect(() => {
    if (!product) return

    setSelectedVariantId("")
    setQuantity(1)
    setMainImageIndex(0)

    setMainImageSrc(product.images[0] || "")
  }, [product?.id])

  const selectedVariant = product?.variants?.find(v => v.id === selectedVariantId)

  const currentImages = product?.images || []

  useEffect(() => {
    if (selectedVariant?.image && selectedVariant.image.trim() !== "") {
      setMainImageSrc(selectedVariant.image)
      setMainImageIndex(0)
    } else if (product?.images?.length) {
      setMainImageSrc(product.images[0])
      setMainImageIndex(0)
    }
  }, [selectedVariantId, product])

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

  const currentStock = selectedVariant?.stock || 0

  const handleAddToCartSafe = async () => {
    if (!selectedVariantId) return

    try {
      const res = await cartApi.addToCart({
        productId: String(product.id),
        variantId: selectedVariantId,
        quantity
      })

      if (res.isSuccess) {
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
      } else {
        alert(res.message || "Thêm vào giỏ hàng thất bại")
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handlePrevImage = () => {
    const newIndex = (mainImageIndex - 1 + currentImages.length) % currentImages.length
    setMainImageIndex(newIndex)
    setMainImageSrc(currentImages[newIndex])
  }

  const handleNextImage = () => {
    const newIndex = (mainImageIndex + 1) % currentImages.length
    setMainImageIndex(newIndex)
    setMainImageSrc(currentImages[newIndex])
  }

  return (
    <div className="product-detail-container">
      <Breadcrumb items={[
        { label: "Trang chủ", link: "/" },
        { label: product.category || "Danh mục", link: `/products` },
        { label: product.name }
      ]} />

      <div className="product-detail-content">
        <ImageSection
          product={product}
          mainImageIndex={mainImageIndex}
          setMainImageIndex={(i) => {
            setMainImageIndex(i)
            setMainImageSrc(currentImages[i])
          }}
          currentImages={currentImages}
          mainImageSrc={mainImageSrc}
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
          handleAddToCart={handleAddToCartSafe}
        />
      </div>

      <ShopInfo product={product} />

      {product.description && (
        <div className="product-description">
          <h2>Chi tiết sản phẩm</h2>
          <p>{product.description}</p>
        </div>
      )}

      <ReviewsSection product={product} />
      <RelatedProducts currentProduct={product} />
    </div>
  )
}

export default ProductDetail