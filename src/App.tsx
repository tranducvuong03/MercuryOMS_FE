import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import ShopChatWidget from "./components/ShopChatWidget/ShopChatWidget"
import Home from "./pages/Home"
import ProductDetail from "./pages/ProductDetail"
import Products from "./pages/Products"
import ShopDetail from "./pages/ShopDetail"
import Login from "./pages/Login"
import Register from "./pages/Register"
import EmailVerification from "./pages/EmailVerification"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Profile from "./pages/Profile"
import Tracking from "./pages/Tracking"
import StaticPage from "./pages/StaticPage"
import "./App.css"
import AuthCallback from "./pages/AuthCallback"

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/shop/:shopId" element={<ShopDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm-email" element={<EmailVerification />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/help-center" element={<StaticPage title="Trung tâm trợ giúp" subtitle="Hỗ trợ nhanh, rõ ràng và luôn kịp thời" description="Mercury cung cấp đội ngũ chăm sóc khách hàng sẵn sàng hỗ trợ bạn từ đăng ký, đặt hàng cho đến vận chuyển và đổi trả." highlights={["Hỗ trợ 24/7 qua chat và hotline", "Theo dõi đơn hàng chi tiết", "Giải đáp thắc mắc về sản phẩm và thanh toán"]} actions={[{ label: "Về trang chủ", to: "/" }]} />} />
        <Route path="/blog" element={<StaticPage title="Mercury Blog" subtitle="Cập nhật xu hướng, mẹo mua sắm và khuyến mãi" description="Đọc các bài viết hữu ích về sản phẩm mới, mẹo chọn hàng và các chương trình ưu đãi trên Mercury." highlights={["Xu hướng mua sắm mới nhất", "Mẹo chọn sản phẩm phù hợp", "Tin khuyến mãi và sự kiện"]} actions={[{ label: "Khám phá sản phẩm", to: "/products" }]} />} />
        <Route path="/mall" element={<StaticPage title="Mercury Mall" subtitle="Cửa hàng tiện lợi cho mọi nhu cầu" description="Mercury Mall tập trung các gian hàng chất lượng, dễ tìm kiếm và phù hợp cho cả người mua lẫn người bán." highlights={["Danh mục đa dạng", "Giao diện dễ dàng tìm kiếm", "Kết nối người bán và người mua"]} actions={[{ label: "Xem sản phẩm", to: "/products" }]} />} />
        <Route path="/buying-guide" element={<StaticPage title="Hướng dẫn mua hàng" subtitle="Mua sắm dễ dàng, an tâm hơn" description="Từ cách chọn sản phẩm đến quy trình thanh toán và nhận hàng, Mercury luôn cố gắng làm cho trải nghiệm mua hàng trở nên đơn giản hơn." highlights={["Cách chọn sản phẩm phù hợp", "Bước thanh toán và giao hàng", "Hướng dẫn đổi trả và bảo hành"]} actions={[{ label: "Đi tới giỏ hàng", to: "/cart" }]} />} />
        <Route path="/about" element={<StaticPage title="Giới thiệu về Mercury" subtitle="Nền tảng thương mại điện tử hiện đại" description="Mercury là nơi kết nối người mua và người bán với trải nghiệm mua sắm nhanh chóng, an toàn và đáng tin cậy." highlights={["Cam kết chất lượng", "Đa dạng danh mục", "Hỗ trợ người dùng toàn diện"]} actions={[{ label: "Truy cập sản phẩm", to: "/products" }]} />} />
        <Route path="/careers" element={<StaticPage title="Tuyển dụng" subtitle="Cùng xây dựng trải nghiệm mua sắm tốt hơn" description="Mercury luôn tìm kiếm những người tài năng để phát triển sản phẩm, vận hành và dịch vụ khách hàng." highlights={["Cơ hội phát triển", "Môi trường làm việc hiện đại", "Đóng góp vào sản phẩm lớn"]} actions={[{ label: "Liên hệ với chúng tôi", to: "/help-center" }]} />} />
        <Route path="/terms" element={<StaticPage title="Điều khoản" subtitle="Các quy định cần nắm rõ trước khi sử dụng" description="Vui lòng đọc kỹ điều khoản sử dụng để hiểu các quyền và nghĩa vụ khi tham gia nền tảng Mercury." highlights={["Quy định tài khoản", "Chính sách giao dịch", "Trách nhiệm người dùng"]} actions={[{ label: "Quay lại trang chủ", to: "/" }]} />} />
        <Route path="/privacy" element={<StaticPage title="Chính sách bảo mật" subtitle="Bảo vệ dữ liệu của bạn" description="Mercury cam kết bảo mật thông tin cá nhân và dữ liệu giao dịch của người dùng theo các tiêu chuẩn cao nhất." highlights={["Bảo vệ thông tin cá nhân", "Không chia sẻ dữ liệu ngoài mục đích hợp pháp", "Quyền kiểm soát dữ liệu của bạn"]} actions={[{ label: "Đến trung tâm hỗ trợ", to: "/help-center" }]} />} />
        <Route path="/become-seller" element={<StaticPage title="Trở thành người bán Mercury" subtitle="Mở gian hàng và tăng doanh thu" description="Đăng ký bán hàng trên Mercury để tiếp cận hàng triệu khách hàng và quản lý cửa hàng hiệu quả hơn." highlights={["Tạo gian hàng miễn phí", "Quản lý đơn hàng dễ dàng", "Hỗ trợ vận hành và bán hàng"]} actions={[{ label: "Đến trung tâm bán hàng", to: "/seller-center" }]} />} />
        <Route path="/seller-center" element={<StaticPage title="Trung tâm bán hàng" subtitle="Tài nguyên cho người bán" description="Khám phá các công cụ và hướng dẫn để vận hành cửa hàng trên Mercury hiệu quả hơn." highlights={["Hướng dẫn đăng bán", "Theo dõi hoạt động gian hàng", "Hỗ trợ vận hành và marketing"]} actions={[{ label: "Đăng ký bán hàng", to: "/become-seller" }]} />} />
        <Route path="/university" element={<StaticPage title="Mercury University" subtitle="Khóa học và kiến thức cho người bán" description="Mercury University mang đến các bài học thực tế về bán hàng, vận hành và tối ưu trải nghiệm khách hàng." highlights={["Khóa học ngắn, thực tế", "Mẹo bán hàng hiệu quả", "Cập nhật chiến lược kinh doanh"]} actions={[{ label: "Tìm hiểu thêm", to: "/seller-center" }]} />} />
        <Route path="/operating-policy" element={<StaticPage title="Chính sách vận hành" subtitle="Nguyên tắc hoạt động minh bạch" description="Mercury xây dựng quy trình vận hành rõ ràng để giữ cho mọi giao dịch diễn ra an toàn và nhất quán." highlights={["Đảm bảo quy trình minh bạch", "Quản lý gian hàng đồng bộ", "Hỗ trợ giải quyết tranh chấp"]} actions={[{ label: "Xem điều khoản", to: "/terms" }]} />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
      <Footer />
      <ShopChatWidget />
    </Router>
  )
}

export default App