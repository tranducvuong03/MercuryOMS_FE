import type { Voucher } from "./voucher"

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