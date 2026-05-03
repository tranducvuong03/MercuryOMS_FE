export interface ProductVariantResponse {
  id: string
  color: string
  size?: string
  imageUrl?: string

  originalPrice: number
  discountPrice?: number

  stock: number
}

export interface ProductDetailResponse {
  id: string
  name: string
  description?: string

  isActive: boolean
  category?: string

  originalPrice: number
  discountPrice?: number

  images: string[]
  variants: ProductVariantResponse[]

  seller: {
    id?: string
    name?: string
    avatar?: string
  }

  rating: number
  reviewCount: number
  sold: number

  discount?: number
}