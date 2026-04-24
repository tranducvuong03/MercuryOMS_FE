import type { Review } from "./review"
import type { Shop } from "./shop"

export interface Variant {
  id: string
  color: string
  size?: string
  images: string[]
  stock: number
}

export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  discount?: number
  category?: string
  brand?: string
  description?: string
  rating: number
  sold: number
  images: string[]
  badge?: string
  createdDate?: string
  reviews?: Review[]
  variants?: Variant[]
  shop?: Shop
}

export interface ProductResponse {
  id: string
  name: string
  description?: string

  basePrice: number
  originalPrice?: number

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