# API Services Guide

## Cấu trúc thư mục

```
services/
├── config.ts           # Cấu hình API chung (URL, headers)
├── products.ts         # API cho sản phẩm
├── cart.ts            # API cho giỏ hàng
├── auth.ts            # API cho xác thực & người dùng
├── orders.ts          # API cho đơn hàng
├── reviews.ts         # API cho bình luận
├── shop.ts            # API cho shop
├── payment.ts         # API cho thanh toán
├── index.ts           # Export điểm cho tất cả API
└── README.md          # File này
```

## Giới thiệu

Mỗi feature được tách riêng thành file API riêng giúp:
- ✅ Dễ bảo trì và sử dụng lại
- ✅ Tách biệt concern (mỗi module chỉ lo một việc)
- ✅ Dễ kiểm tra (test) từng phần
- ✅ Tránh tệp quá to

## Cách sử dụng

### Cách 1: Import từ index.ts (Khuyến khích)
```typescript
import { fetchProducts, addToCart, login } from "../services"
```

### Cách 2: Import từ từng module
```typescript
import { fetchProducts } from "../services/products"
import { addToCart } from "../services/cart"
import { login } from "../services/auth"
```

## Thiết lập biến môi trường

Tạo file `.env` hoặc `.env.local`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Config API

File `config.ts` cung cấp:
- `API_BASE_URL` - URL gốc cho tất cả API calls
- `getHeaders(includeAuth)` - Tạo headers với/không có Authorization token

```typescript
// Trong file API bất kỳ:
import { API_BASE_URL, getHeaders } from "./config"

// Requests không cần auth:
const headers1 = getHeaders() // chỉ Content-Type: application/json

// Requests cần auth:
const headers2 = getHeaders(true) // + Authorization: Bearer token
```

## Từng Module

### products.ts
- `fetchProducts()` - Lấy danh sách sản phẩm
- `fetchProductDetail(id)` - Lấy chi tiết sản phẩm
- `searchProducts(query, filters)` - Tìm kiếm
- `fetchCategories()` - Lấy danh mục
- `fetchProductsByCategory(category)` - Sản phẩm theo danh mục

### cart.ts
- `fetchCart(userId)` - Lấy giỏ hàng
- `addToCart(userId, productId, quantity, variantId)` - Thêm vào giỏ
- `updateCartItem(userId, itemId, quantity)` - Cập nhật số lượng
- `removeFromCart(userId, itemId)` - Xóa khỏi giỏ
- `clearCart(userId)` - Xóa toàn bộ giỏ

### auth.ts
- `login(email, password)` - Đăng nhập
- `register(email, password, name)` - Đăng ký
- `logout()` - Đăng xuất
- `fetchUserProfile(userId)` - Lấy thông tin user
- `updateUserProfile(userId, data)` - Cập nhật thông tin
- `changePassword(userId, oldPassword, newPassword)` - Đổi mật khẩu
- `refreshToken()` - Làm mới token

### orders.ts
- `fetchOrders(userId, page, limit)` - Danh sách đơn hàng
- `fetchOrderDetail(orderId)` - Chi tiết đơn hàng
- `createOrder(userId, data)` - Tạo đơn hàng
- `cancelOrder(orderId)` - Hủy đơn hàng
- `fetchShippingStatus(orderId)` - Trạng thái vận chuyển
- `updateOrder(orderId, data)` - Cập nhật đơn hàng

### reviews.ts
- `fetchProductReviews(productId, page, limit)` - Bình luận sản phẩm
- `addProductReview(productId, data)` - Thêm bình luận
- `updateProductReview(productId, reviewId, data)` - Cập nhật bình luận
- `deleteProductReview(productId, reviewId)` - Xóa bình luận
- `fetchUserReviews(userId)` - Bình luận của user
- `toggleLikeReview(reviewId)` - Like/Unlike bình luận

### shop.ts
- `fetchShopInfo(shopId)` - Thông tin shop
- `fetchShopProducts(shopId, page, limit)` - Sản phẩm của shop
- `fetchShops(page, limit)` - Danh sách shop
- `followShop(shopId)` - Follow shop
- `unfollowShop(shopId)` - Unfollow shop
- `createChatWithShop(shopId)` - Chat với shop
- `fetchTopRatedShops(limit)` - Top-rated shops

### payment.ts
- `processPayment(orderId, data)` - Thanh toán
- `fetchPaymentHistory(userId, page, limit)` - Lịch sử thanh toán
- `fetchPaymentDetail(paymentId)` - Chi tiết thanh toán
- `refundOrder(orderId, reason)` - Hoàn tiền
- `fetchPaymentMethods()` - Danh sách phương thức
- `addPaymentMethod(userId, data)` - Thêm phương thức
- `removePaymentMethod(userId, methodId)` - Xóa phương thức

## Error Handling

Tất cả API functions đều có try-catch:
```typescript
try {
  const data = await fetchProducts()
  setProducts(data)
} catch (error) {
  console.error("Error:", error.message)
  // Xử lý lỗi
}
```

## Authentication

Token được tự động:
- **Lưu** vào localStorage khi đăng nhập thành công
- **Gửi** trong header Authorization cho requests cần auth
- **Xóa** khi đăng xuất

```typescript
// Token tự động được thêm bởi getHeaders(true)
const headers = getHeaders(true)
// { "Content-Type": "application/json", "Authorization": "Bearer token_here" }
```

## Từ dữ liệu mẫu sang API

### 1. Bỏ comment API functions
Mở file module API, bỏ comment các function cần dùng

### 2. Cập nhật component
```typescript
// Cũ - dữ liệu mẫu
import { products } from "../data/products"

// Mới - từ API
import { fetchProducts } from "../services"
useEffect(() => {
  const getProducts = async () => {
    const data = await fetchProducts()
    setProducts(data)
  }
  getProducts()
}, [])
```

### 3. Thêm loading & error states
```typescript
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

useEffect(() => {
  const load = async () => {
    try {
      setLoading(true)
      const data = await fetchProducts()
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  load()
}, [])
```

## Checklist khi triển khai

- [ ] Backend endpoints sẵn sàng
- [ ] Environment variables cấu hình
- [ ] Bỏ comment API functions
- [ ] Update components gọi API
- [ ] Thêm loading/error states
- [ ] Test lại tất cả flows
- [ ] Kiểm tra network tab trong DevTools
- [ ] Xác nhận tokens được gửi đúng

## Lưu ý

- Tất cả functions hiện đang comment (để dữ liệu mẫu active)
- Bỏ comment incrementally (từng phần) khi backend sẵn sàng
- Xác thực response format từ backend với code xử lý
- Thêm interceptors nếu cần xử lý errors global

## API Response Format (mẫu)

Backend nên trả về format đồng nhất:
```javascript
// Success
{
  "success": true,
  "data": {...}
}

// Error
{
  "success": false,
  "error": "Error message"
}
```

