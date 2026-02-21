import type { Product } from "../types/product"
import { products } from "./products"

interface SearchOptions {
  query: string
  limit?: number
}

export const searchProducts = (options: SearchOptions): Product[] => {
  const { query, limit = 20 } = options

  if (!query.trim()) {
    return []
  }

  const normalizedQuery = query.toLowerCase().trim()

  const results = products.filter(product => {
    // Search in product name
    if (product.name.toLowerCase().includes(normalizedQuery)) {
      return true
    }

    // Search in brand
    if (product.brand && product.brand.toLowerCase().includes(normalizedQuery)) {
      return true
    }

    // Search in category
    if (product.category && product.category.toLowerCase().includes(normalizedQuery)) {
      return true
    }

    // Search in description
    if (product.description && product.description.toLowerCase().includes(normalizedQuery)) {
      return true
    }

    // Search in shop name
    if (product.shop && product.shop.name.toLowerCase().includes(normalizedQuery)) {
      return true
    }

    return false
  })

  return results.slice(0, limit)
}

export const getTopSearches = (): string[] => {
  return [
    "Áo thun nam",
    "Giày thể thao",
    "Tai nghe",
    "Đầm dự tiệc",
    "Laptop",
    "Camera"
  ]
}
