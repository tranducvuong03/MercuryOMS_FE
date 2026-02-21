# API Integration Implementation Guide

## Quy trình thay thế dữ liệu mẫu bằng API calls

### Step 1: Thiết lập Backend
Đảm bảo backend đã chuẩn bị sẵn sàng với tất cả endpoints được liệt kê trong `/services/README.md`

### Step 2: Cấu hình Environment Variables
Tạo file `.env.local` ở root project:
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 3: Bỏ Comment API Functions
Mở file `/src/services/api.ts` và bỏ comment các function cần sử dụng.

### Step 4: Cập nhật Pages

#### ProductDetail.tsx
**Hiện tại (mock data):**
```typescript
import { products } from "../data/products"
const product = products.find(p => p.id === Number(id))
```

**Sẽ thành (API):**
```typescript
import { fetchProductDetail } from "../services/api"

useEffect(() => {
  const getProduct = async () => {
    try {
      const data = await fetchProductDetail(Number(id))
      setProduct(data)
    } catch (error) {
      console.error("Error:", error)
      setError("Không thể tải sản phẩm")
    }
  }
  getProduct()
}, [id])
```

#### Home.tsx (ProductList)
**Hiện tại:**
```typescript
import { products } from "../data/products"
```

**Sẽ thành:**
```typescript
import { fetchProducts } from "../services/api"

useEffect(() => {
  const getProducts = async () => {
    try {
      const data = await fetchProducts()
      setProducts(data)
    } catch (error) {
      console.error("Error:", error)
    }
  }
  getProducts()
}, [])
```

#### Cart.tsx
**Hiện tại:**
```typescript
// Sử dụng localStorage
```

**Sẽ thành:**
```typescript
import { fetchCart, addToCart, removeFromCart } from "../services/api"

useEffect(() => {
  const userId = localStorage.getItem("userId")
  if (userId) {
    const getCart = async () => {
      const data = await fetchCart(userId)
      setCart(data)
    }
    getCart()
  }
}, [])
```

#### Login.tsx & Register.tsx
**Hiện tại:**
```typescript
// Sử dụng localStorage mẫu
```

**Sẽ thành:**
```typescript
import { login, register } from "../services/api"

const handleLogin = async (email, password) => {
  try {
    const data = await login(email, password)
    // Token sẽ được lưu tự động trong localStorage
  } catch (error) {
    setError("Đăng nhập thất bại")
  }
}
```

### Step 5: Xử lý State & Loading
Thêm loading state cho các component:
```typescript
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

useEffect(() => {
  const fetchData = async () => {
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
  fetchData()
}, [])

if (loading) return <div>Đang tải...</div>
if (error) return <div>Lỗi: {error}</div>
```

### Step 6: Kiểm tra Authentication
Đảm bảo token được gửi trong request:
```typescript
// Tất cả function trong api.ts đã thêm header Authorization
// Chỉ cần đảm bảo token được lưu đúng sau đăng nhập
```

### Backend API Response Format (mẫu)

#### Products
```javascript
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Product Name",
      "price": 100000,
      "originalPrice": 150000,
      "rating": 4.8,
      "sold": 1000,
      "images": ["url1", "url2"],
      "variants": [{...}],
      "shop": {...}
    }
  ]
}
```

#### Auth Response
```javascript
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

### Xử lý Errors
Mỗi function trong api.ts đã có try-catch. Thêm xử lý UI:
```typescript
try {
  const data = await fetchProducts()
} catch (error) {
  if (error.response?.status === 401) {
    // Unauthorized - redirect to login
  } else if (error.response?.status === 404) {
    // Not found
  } else {
    // Generic error
  }
}
```

### Testing
1. Kiểm tra Network tab trong DevTools
2. Xác nhận token được gửi trong headers
3. So sánh response format với code xử lý
4. Test error cases (network timeout, 404, 500, etc.)

## Checklist
- [ ] Backend endpoints đã sẵn sàng
- [ ] Environment variables đã cấu hình
- [ ] API functions đã bỏ comment
- [ ] Pages đã cập nhật gọi API
- [ ] Loading states đã thêm
- [ ] Error handling đã thêm
- [ ] Authentication tokens đã kiểm tra
- [ ] Tested với real backend
