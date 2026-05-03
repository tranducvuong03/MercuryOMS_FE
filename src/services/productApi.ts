import type { PaginatedResponse, ProductResponse } from "../types/product"
import type { ProductDetailResponse } from "../types/productVariant"
import type { Result } from "../types/result"
import { request } from "./apiClient"

export interface ProductFilterRequest {
  pageIndex: number
  pageSize: number

  search?: string
  category?: string

  minPrice?: number
  maxPrice?: number

  minRating?: number
  sortBy?: string

  isActive?: boolean
}

export const productApi = {
  getProducts: (params: ProductFilterRequest) => {
    const query = new URLSearchParams(
      Object.entries(params)
        .filter(([_, v]) => v !== undefined && v !== null && v !== "")
        .map(([k, v]) => [k, String(v)])
    ).toString()

    return request(`/products?${query}`) as Promise<
      Result<PaginatedResponse<ProductResponse>>
    >
  },

  getDetail: (id: string) => {
    return request(`/products/${id}/detail`) as Promise<
      Result<ProductDetailResponse>
    >
  }
}