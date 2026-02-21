export interface ProfileOrder {
  id: string
  status: "completed" | "processing" | "pending"
  date: string
  products: string[]
  total: number
}

export interface ProfileVoucher {
  code: string
  shopName: string
  title: string
  description: string
  discount: string
  expiryDate: string
  isPercent?: boolean
}

export const initialOrders: ProfileOrder[] = [
  {
    id: "2024001",
    status: "completed",
    date: "15/02/2026",
    products: ["Áo thun nam cotton 100% cao cấp x2"],
    total: 158000
  },
  {
    id: "2024002",
    status: "processing",
    date: "18/02/2026",
    products: ["Giày Sneaker thể thao nam nữ x1"],
    total: 299000
  }
]

export const initialVouchers: ProfileVoucher[] = [
  {
    code: "FASHION50",
    shopName: "Fashion Plus Store",
    title: "Giảm 50K - Fashion Plus Store",
    description: "Giảm 50.000đ cho đơn từ 200.000đ",
    discount: "-50K",
    expiryDate: "31/03/2026"
  },
  {
    code: "GADGET15",
    shopName: "Tech Gadgets Vietnam",
    title: "Giảm 20% - Tech Gadgets Vietnam",
    description: "Giảm 15% các sản phẩm công nghệ",
    discount: "-15%",
    expiryDate: "25/02/2026",
    isPercent: true
  },
  {
    code: "GAMING30",
    shopName: "Gaming Hub Pro",
    title: "Giảm 30K - Gaming Hub Pro",
    description: "Giảm 30.000đ cho đơn từ 150.000đ",
    discount: "-30K",
    expiryDate: "20/03/2026"
  }
]
