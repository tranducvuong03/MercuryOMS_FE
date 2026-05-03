export interface Variant {
  id: string
  color: string
  size?: string
  image: string | null
  originalPrice: number
  discountPrice?: number
  stock: number
}

export interface Product {
  id: string
  name: string
  originalPrice: number
  discountPrice?: number
  discount?: number

  category?: string
  brand?: string
  description?: string

  rating: number
  sold: number

  images: string[]
  badge?: string

  variants?: Variant[]
}

export interface ProductResponse {
  id: string
  name: string
  description?: string

  originalPrice: number
  discountPrice?: number | null

  isActive: boolean
  thumbnailUrl?: string

  sold: number
  rating: number
  reviewCount: number

  badge?: string
  discount?: number
}

export interface PaginatedResponse<T> {
  items: T[]
  pageIndex: number
  pageSize: number
  totalItems: number
}