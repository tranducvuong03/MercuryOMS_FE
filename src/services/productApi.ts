import type { PaginatedResponse, ProductResponse } from "../types/product"
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

    return request(`/products?${query}`) as Promise<{
      isSuccess: boolean
      message?: string
      value: PaginatedResponse<ProductResponse>
    }>
  },

  getById: (id: string) => {
    return request(`/products/${id}`) as Promise<{
      isSuccess: boolean
      value: ProductResponse
    }>
  }
}