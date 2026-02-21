import type { Review } from "./review"

export interface Variant {
  id: string
  color: string
  size?: string
  images: string[]
  stock: number
}

export interface Voucher {
  id: string
  code: string
  title: string
  description: string
  discount: number
  discountType: "percent" | "fixed"
  minPurchase: number
  maxDiscount?: number
  expiryDate: string
  quantity: number
}

export interface Shop {
  id: number
  name: string
  logo?: string
  rating: number
  followers: number
  products: number
  responseRate: number
  responseTime: string
  verified: boolean
  vouchers?: Voucher[]
  description?: string
  joinedDate?: string
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