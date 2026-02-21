export type TimelineItem = {
  title: string
  time: string
  status?: "completed" | "active" | "pending"
}

export type TrackingInfo = {
  orderId: string
  status: string
  expectedDelivery: string
  timeline: TimelineItem[]
  recipient: {
    name: string
    phone: string
    address: string
  }
  items: { id: number; name: string; price: number; qty: number; image?: string }[]
  summary: { subtotal: number; shipping: number; total: number }
  images?: string[]
}

export const trackingDataMap: Record<string, TrackingInfo> = {
  "2024001": {
    orderId: "2024001",
    status: "Đã giao hàng",
    expectedDelivery: "16/02/2026",
    timeline: [
      { title: "Đơn hàng được xác nhận", time: "15/02/2026 09:15", status: "completed" },
      { title: "Hàng được gửi đi", time: "15/02/2026 14:30", status: "completed" },
      { title: "Đang giao hàng", time: "16/02/2026 08:00", status: "completed" },
      { title: "Đã giao hàng", time: "16/02/2026 15:45", status: "completed" }
    ],
    recipient: {
      name: "Nguyễn Văn A",
      phone: "0123 456 789",
      address: "100 Tây Sơn, Đống Đa, Hà Nội 100000"
    },
    items: [
      { id: 1, name: "Áo thun nam cotton 100% cao cấp", price: 79000, qty: 2, image: "https://picsum.photos/80/80?1" }
    ],
    summary: { subtotal: 158000, shipping: 15000, total: 173000 },
    images: [
      "https://via.placeholder.com/100x100?text=Package",
      "https://via.placeholder.com/100x100?text=In+Transit",
      "https://via.placeholder.com/100x100?text=Delivered"
    ]
  },
  "2024002": {
    orderId: "2024002",
    status: "Đang giao hàng",
    expectedDelivery: "20/02/2026",
    timeline: [
      { title: "Đơn hàng được xác nhận", time: "18/02/2026 14:30", status: "completed" },
      { title: "Hàng được gửi đi", time: "18/02/2026 18:45", status: "completed" },
      { title: "Đang giao hàng", time: "19/02/2026", status: "active" },
      { title: "Đã giao hàng", time: "", status: "pending" }
    ],
    recipient: {
      name: "Nguyễn Văn A",
      phone: "0123 456 789",
      address: "100 Tây Sơn, Đống Đa, Hà Nội 100000"
    },
    items: [
      { id: 5, name: "Giày Sneaker thể thao nam nữ", price: 299000, qty: 1, image: "https://picsum.photos/80/80?5" }
    ],
    summary: { subtotal: 299000, shipping: 29000, total: 328000 },
    images: [
      "https://via.placeholder.com/100x100?text=Package",
      "https://via.placeholder.com/100x100?text=In+Transit",
      "https://via.placeholder.com/100x100?text=Near+Delivery"
    ]
  }
}

export const sampleTracking = trackingDataMap["2024002"]

export const getTracking = (orderId: string): TrackingInfo => {
  return trackingDataMap[orderId] || sampleTracking
}
