import React from "react"
import type { Product } from "../../types/product"

interface Props {
  product: Product
  mainImageIndex: number
  setMainImageIndex: (n: number) => void
  currentImages: string[]
  mainImageSrc: string
  handlePrevImage: () => void
  handleNextImage: () => void
}

const ImageSection: React.FC<Props> = ({ product, mainImageIndex, setMainImageIndex, currentImages, mainImageSrc, handlePrevImage, handleNextImage }) => {
  const discountPercent = product.discount || 0

  return (
    <div className="product-image-section">
      <div className="main-image">
        <button onClick={handlePrevImage} className="image-nav prev-btn">❮</button>
        <img src={mainImageSrc} alt={product.name} />
        <button onClick={handleNextImage} className="image-nav next-btn">❯</button>
        {discountPercent > 0 && (
          <div className="discount-badge-large">-{discountPercent}%</div>
        )}
      </div>
      <div className="image-gallery">
        {currentImages.map((img, index) => (
          <div
            key={index}
            className={`gallery-item ${index === mainImageIndex ? "active" : ""}`}
            onClick={() => setMainImageIndex(index)}
          >
            <img src={img} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageSection
