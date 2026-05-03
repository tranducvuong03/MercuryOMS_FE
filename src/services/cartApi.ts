import type { CartResponse } from "../types/cart"
import type { Result } from "../types/result"
import { request } from "./apiClient"

export interface AddToCartRequest {
  productId: string
  variantId: string
  quantity: number
}

export const cartApi = {
  getCart: () => {
    return request<Result<CartResponse>>("/carts", {
      method: "GET",
      auth: true
    })
  },

  addToCart: (data: AddToCartRequest) => {
    return request<Result<void>>("/carts/items", {
      method: "POST",
      auth: true,
      body: JSON.stringify(data),
    })
  },

  removeFromCart: (productId: string, variantId: string) => {
    return request<Result<void>>(
      `/carts/items?productId=${productId}&variantId=${variantId}`,
      {
        method: "DELETE",
        auth: true
      }
    )
  },
}