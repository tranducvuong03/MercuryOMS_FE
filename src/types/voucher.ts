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
