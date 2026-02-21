export interface Notification {
  id: number
  title: string
  message: string
  type: "order" | "promotion" | "system" | "message"
  createdAt: string
  isRead: boolean
  relatedLink?: string
}

export const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Đơn hàng được xác nhận",
    message: "Đơn hàng #12345 của bạn đã được xác nhận. Cửa hàng sẽ chuẩn bị hàng trong 1-2 giờ.",
    type: "order",
    createdAt: "2 giờ trước",
    isRead: false,
    relatedLink: "/tracking"
  },
  {
    id: 2,
    title: "Khuyến mãi vui vẻ",
    message: "Flash sale hôm nay: Giảm tới 50% cho các sản phẩm thời trang yêu thích",
    type: "promotion",
    createdAt: "5 giờ trước",
    isRead: false,
    relatedLink: "/products"
  },
  {
    id: 3,
    title: "Hàng đã giao",
    message: "Đơn hàng #12340 của bạn đã được giao thành công. Cảm ơn bạn đã mua sắm!",
    type: "order",
    createdAt: "1 ngày trước",
    isRead: true,
    relatedLink: "/tracking"
  },
  {
    id: 4,
    title: "Tin nhắn từ shop",
    message: "Shop 'Fashion Plus Store' đã trả lời câu hỏi của bạn",
    type: "message",
    createdAt: "2 ngày trước",
    isRead: true,
    relatedLink: "/shop/1"
  },
  {
    id: 5,
    title: "Cập nhật hệ thống",
    message: "Mercury đã cập nhật giao diện mới. Trải nghiệm mua sắm thêm tuyệt vời!",
    type: "system",
    createdAt: "3 ngày trước",
    isRead: true
  }
]
