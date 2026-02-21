// API Services - Export điểm từ tất cả API modules
// Import từ đây khi cần sử dụng các API functions

// Config
export { API_BASE_URL, getHeaders } from "./config"

// Products API
export {
  // fetchProducts,
  // fetchProductDetail,
  // searchProducts,
  // fetchCategories,
  // fetchProductsByCategory
} from "./products"

// Cart API
export {
  // fetchCart,
  // addToCart,
  // updateCartItem,
  // removeFromCart,
  // clearCart
} from "./cart"

// Auth & User API
export {
  // login,
  // register,
  // logout,
  // fetchUserProfile,
  // updateUserProfile,
  // changePassword,
  // refreshToken
} from "./auth"

// Orders API
export {
  // fetchOrders,
  // fetchOrderDetail,
  // createOrder,
  // cancelOrder,
  // fetchShippingStatus,
  // updateOrder
} from "./orders"

// Reviews API
export {
  // fetchProductReviews,
  // addProductReview,
  // updateProductReview,
  // deleteProductReview,
  // fetchUserReviews,
  // toggleLikeReview
} from "./reviews"

// Shop API
export {
  // fetchShopInfo,
  // fetchShopProducts,
  // fetchShops,
  // followShop,
  // unfollowShop,
  // createChatWithShop,
  // fetchTopRatedShops
} from "./shop"

// Payment API
export {
  // processPayment,
  // fetchPaymentHistory,
  // fetchPaymentDetail,
  // refundOrder,
  // fetchPaymentMethods,
  // addPaymentMethod,
  // removePaymentMethod
} from "./payment"
