// Dữ liệu hành chính Việt Nam tham khảo từ danh sách tỉnh/thành và quận/huyện chính thức của các đơn vị quản lý.
// Đây là bộ dữ liệu mẫu cho giao diện; có thể mở rộng thêm đầy đủ khi cần.

export const provinceOptions = [
  { label: "Thành phố Hà Nội", value: "ha-noi" },
  { label: "Thành phố Hồ Chí Minh", value: "ho-chi-minh" },
  { label: "Thành phố Đà Nẵng", value: "da-nang" },
  { label: "Thành phố Hải Phòng", value: "hai-phong" },
  { label: "Thành phố Cần Thơ", value: "can-tho" },
  { label: "Tỉnh Đồng Nai", value: "dong-nai" },
  { label: "Tỉnh Bình Dương", value: "binh-duong" },
]

export const districtOptions: Record<string, string[]> = {
  "ha-noi": [
    "Quận Ba Đình",
    "Quận Hoàn Kiếm",
    "Quận Tây Hồ",
    "Quận Long Biên",
    "Quận Cầu Giấy",
    "Quận Đống Đa",
    "Quận Hai Bà Trưng",
    "Quận Hoàng Mai",
    "Quận Thanh Xuân",
  ],
  "ho-chi-minh": [
    "Quận 1",
    "Quận 3",
    "Quận 5",
    "Quận 7",
    "Quận 10",
    "Quận 11",
    "Quận Phú Nhuận",
    "Quận Tân Bình",
    "Quận Bình Thạnh",
  ],
  "da-nang": [
    "Quận Hải Châu",
    "Quận Thanh Khê",
    "Quận Sơn Trà",
    "Quận Ngũ Hành Sơn",
    "Quận Liên Chiểu",
    "Quận Cẩm Lệ",
  ],
  "hai-phong": [
    "Quận Ngô Quyền",
    "Quận Lê Chân",
    "Quận Hồng Bàng",
    "Quận Kiến An",
    "Quận Dương Kinh",
  ],
  "can-tho": [
    "Quận Ninh Kiều",
    "Quận Cái Răng",
    "Quận Bình Thủy",
    "Quận Ô Môn",
    "Huyện Thốt Nốt",
  ],
  "dong-nai": [
    "Thành phố Biên Hòa",
    "Thị xã Long Khánh",
    "Huyện Nhơn Trạch",
    "Huyện Trảng Bom",
    "Huyện Vĩnh Cửu",
  ],
  "binh-duong": [
    "Thành phố Thủ Dầu Một",
    "Thị xã Dĩ An",
    "Thị xã Thuận An",
    "Huyện Bàu Bàng",
    "Huyện Bắc Tân Uyên",
  ],
}
