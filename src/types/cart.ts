export interface CartItem {
  productId: string
  variantId: string

  productName: string
  image: string

  color: string
  size?: string

  price: number
  discountPrice?: number

  quantity: number
  stock: number
}

export interface CartItemResponse {
  productId: string
  variantId: string

  productName: string
  image: string

  color: string
  size?: string

  price: number
  discountPrice?: number

  quantity: number

  stock: number

  total: number
}

export interface CartResponse {
  items: CartItemResponse[]
  totalPrice: number
}