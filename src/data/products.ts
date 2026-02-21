import type { Product } from "../types/product"

export const products: Product[] = [
  {
    id: 1,
    name: "Áo thun nam cotton 100% cao cấp",
    price: 79000,
    originalPrice: 120000,
    discount: 34,
    category: "Thời trang",
    brand: "Fashion Plus",
    description: "Áo thun nam được làm từ 100% cotton cao cấp, mang đến cảm giác thoải mái và thoáng khí tối đa. Được thiết kế với phom dáng hiện đại, phù hợp với nhiều kiểu trang phục. Chất liệu bền bỉ, không phai màu sau nhiều lần giặt. Đạt các tiêu chuẩn chất lượng quốc tế và được kiểm tra kỹ lưỡng trước khi xuất xưởng. Sản phẩm có bảo hành chính hãng 12 tháng.",
    rating: 4.8,
    sold: 1250,
    images: [
      "https://picsum.photos/500/500?1",
      "https://picsum.photos/500/500?11",
      "https://picsum.photos/500/500?12",
      "https://picsum.photos/500/500?13"
    ],
    badge: "FLASH SALE",
    createdDate: "2025-10-15",
    variants: [
      { id: "1-black", color: "Đen", images: ["https://picsum.photos/500/500?1", "https://picsum.photos/500/500?11"], stock: 45 },
      { id: "1-white", color: "Trắng", images: ["https://picsum.photos/500/500?12", "https://picsum.photos/500/500?13"], stock: 32 },
      { id: "1-blue", color: "Xanh dương", images: ["https://picsum.photos/500/500?14", "https://picsum.photos/500/500?15"], stock: 28 }
    ],
    reviews: [
      { id: 1, author: "Nguyễn Văn A", rating: 5, comment: "Rất đẹp, chất lượng tốt", date: "2 ngày trước", avatar: "https://picsum.photos/500/500?1" },
      { id: 2, author: "Trần Thị B", rating: 4, comment: "Hơi nhỏ một size", date: "5 ngày trước", avatar: "https://picsum.photos/500/500?11" }
    ],
    shop: {
      id: 1,
      name: "Fashion Plus Store",
      logo: "https://picsum.photos/120/120?shop1",
      rating: 4.7,
      followers: 8520,
      products: 245,
      responseRate: 99,
      responseTime: "2 giờ",
      verified: true
    }
  },

  {
    id: 2,
    name: "Tai nghe Bluetooth không dây",
    price: 149000,
    originalPrice: 299000,
    discount: 50,
    category: "Điện tử",
    brand: "Tech Sound Pro",
    description: "Tai nghe Bluetooth cao cấp với âm thanh stereo chất lượng cao...",
    rating: 4.6,
    sold: 856,
    images: [
      "https://picsum.photos/500/500?2",
      "https://picsum.photos/500/500?21",
      "https://picsum.photos/500/500?22",
      "https://picsum.photos/500/500?23"
    ],
    variants: [
      { id: "2-black", color: "Đen", images: ["https://picsum.photos/500/500?2", "https://picsum.photos/500/500?21"], stock: 38 },
      { id: "2-white", color: "Trắng", images: ["https://picsum.photos/500/500?22", "https://picsum.photos/500/500?23"], stock: 25 }
    ],
    createdDate: "2025-11-20",
    shop: {
      id: 2,
      name: "Tech Gadgets Vietnam",
      logo: "https://picsum.photos/120/120?shop2",
      rating: 4.8,
      followers: 15320,
      products: 512,
      responseRate: 98,
      responseTime: "30 phút",
      verified: true
    }
  },

  {
    id: 3,
    name: "Bàn phím cơ RGB gaming",
    price: 449000,
    originalPrice: 699000,
    discount: 36,
    category: "Điện tử",
    brand: "Mechanical Gaming",
    description: "Bàn phím cơ RGB chuyên dụng cho gamers...",
    rating: 4.7,
    sold: 432,
    images: [
      "https://picsum.photos/500/500?3",
      "https://picsum.photos/500/500?31",
      "https://picsum.photos/500/500?32",
      "https://picsum.photos/500/500?33"
    ],
    variants: [
      { id: "3-black", color: "Đen", images: ["https://picsum.photos/500/500?3", "https://picsum.photos/500/500?31"], stock: 22 }
    ],
    createdDate: "2025-12-05",
    shop: {
      id: 3,
      logo: "https://picsum.photos/120/120?shop3",
      name: "Gaming Hub Pro",
      rating: 4.6,
      followers: 12150,
      products: 378,
      responseRate: 97,
      responseTime: "1 giờ",
      verified: true
    }
  },

  {
    id: 4,
    name: "Chuột Gaming DPI cao",
    price: 199000,
    originalPrice: 350000,
    discount: 43,
    category: "Điện tử",
    brand: "Gaming Mouse Pro",
    description: "Chuột gaming với sensor DPI cao...",
    rating: 4.5,
    sold: 598,
    images: [
      "https://picsum.photos/500/500?4",
      "https://picsum.photos/500/500?41",
      "https://picsum.photos/500/500?42"
    ],
    variants: [
      { id: "4-black", color: "Đen", images: ["https://picsum.photos/500/500?4"], stock: 34 }
    ],
    createdDate: "2025-12-15",
    shop: {
      id: 3,
      name: "Gaming Hub Pro",
      logo: "https://picsum.photos/120/120?shop3",
      rating: 4.6,
      followers: 12150,
      products: 378,
      responseRate: 97,
      responseTime: "1 giờ",
      verified: true
    }
  },

  {
    id: 5,
    name: "Giày Sneaker thể thao nam nữ",
    price: 299000,
    originalPrice: 550000,
    discount: 46,
    category: "Thể thao",
    brand: "Sports Comfort",
    description: "Giày sneaker thể thao cao cấp...",
    rating: 4.9,
    sold: 2100,
    images: [
      "https://picsum.photos/500/500?5",
      "https://picsum.photos/500/500?51",
      "https://picsum.photos/500/500?52"
    ],
    variants: [
      { id: "5-black", color: "Đen", images: ["https://picsum.photos/500/500?5"], stock: 56 }
    ],
    createdDate: "2026-01-08",
    shop: {
      id: 5,
      logo: "https://picsum.photos/120/120?shop5",
      name: "Sports World Official",
      rating: 4.8,
      followers: 22450,
      products: 589,
      responseRate: 99,
      responseTime: "20 phút",
      verified: true
    }
  },

  {
    id: 6,
    name: "Backpack du lịch chống nước",
    price: 189000,
    originalPrice: 350000,
    discount: 46,
    category: "Nhà cửa & Đời sống",
    brand: "Travel Gear",
    description: "Balo du lịch chống nước...",
    rating: 4.7,
    sold: 745,
    images: [
      "https://picsum.photos/500/500?6",
      "https://picsum.photos/500/500?61",
      "https://picsum.photos/500/500?62"
    ],
    variants: [
      { id: "6-black", color: "Đen", images: ["https://picsum.photos/500/500?6"], stock: 29 }
    ],
    createdDate: "2026-01-22",
    shop: {
      logo: "https://picsum.photos/120/120?shop6",
      id: 6,
      name: "Travel Gear Store",
      rating: 4.5,
      followers: 6780,
      products: 156,
      responseRate: 96,
      responseTime: "3 giờ",
      verified: false
    }
  },

  {
    id: 7,
    name: "Đồng hồ thông minh smartwatch",
    price: 499000,
    originalPrice: 999000,
    discount: 50,
    category: "Điện tử",
    brand: "Smart Tech Watch",
    description: "Smartwatch cao cấp...",
    rating: 4.4,
    sold: 564,
    images: [
      "https://picsum.photos/500/500?7",
      "https://picsum.photos/500/500?71",
      "https://picsum.photos/500/500?72"
    ],
    variants: [
      { id: "7-black", color: "Đen", images: ["https://picsum.photos/500/500?7"], stock: 18 }
    ],
    createdDate: "2026-02-05",
    shop: {
      id: 2,
      name: "Tech Gadgets Vietnam",
      logo: "https://picsum.photos/120/120?shop2",
      rating: 4.8,
      followers: 15320,
      products: 512,
      responseRate: 98,
      responseTime: "30 phút",
      verified: true
    }
  },

  {
    id: 8,
    name: "Ốp lưng điện thoại bảo vệ",
    price: 49000,
    originalPrice: 99000,
    discount: 50,
    category: "Điện tử",
    brand: "Phone Shield Pro",
    description: "Ốp lưng điện thoại bảo vệ cao cấp...",
    rating: 4.8,
    sold: 3450,
    images: [
      "https://picsum.photos/500/500?8",
      "https://picsum.photos/500/500?81",
      "https://picsum.photos/500/500?82"
    ],
    variants: [
      { id: "8-black", color: "Đen", images: ["https://picsum.photos/500/500?8"], stock: 78 }
    ],
    createdDate: "2026-02-10",
    shop: {
      logo: "https://picsum.photos/120/120?shop7",
      id: 7,
      name: "Mobile Accessories Plus",
      rating: 4.7,
      followers: 18900,
      products: 682,
      responseRate: 99,
      responseTime: "15 phút",
      verified: true
    }
  },

  {
    id: 9,
    name: "Sạc nhanh USB-C 65W",
    price: 159000,
    originalPrice: 299000,
    discount: 47,
    category: "Điện tử",
    brand: "Fast Charge Tech",
    description: "Sạc nhanh USB-C công suất 65W...",
    rating: 4.6,
    sold: 1200,
    images: [
      "https://picsum.photos/500/500?9",
      "https://picsum.photos/500/500?91",
      "https://picsum.photos/500/500?92"
    ],
    variants: [
      { id: "9-black", color: "Đen", images: ["https://picsum.photos/500/500?9"], stock: 41 }
    ],
    createdDate: "2026-02-15",
    shop: {
      id: 2,
      name: "Tech Gadgets Vietnam",
      logo: "https://picsum.photos/120/120?shop2",
      rating: 4.8,
      followers: 15320,
      products: 512,
      responseRate: 98,
      responseTime: "30 phút",
      verified: true
    }
  },

  {
    id: 10,
    name: "Loa Bluetooth di động",
    price: 499000,
    category: "Điện tử",
    brand: "Portable Sound",
    description: "Loa Bluetooth di động với âm thanh 360 độ...",
    rating: 4.7,
    sold: 892,
    images: [
      "https://picsum.photos/500/500?10",
      "https://picsum.photos/500/500?101",
      "https://picsum.photos/500/500?102"
    ],
    variants: [
      { id: "10-black", color: "Đen", images: ["https://picsum.photos/500/500?10"], stock: 33 }
    ],
    createdDate: "2026-02-11",
    shop: {
      id: 2,
      name: "Tech Gadgets Vietnam",
      logo: "https://picsum.photos/120/120?shop2",
      rating: 4.8,
      followers: 15320,
      products: 512,
      responseRate: 98,
      responseTime: "30 phút",
      verified: true
    }
  }
]