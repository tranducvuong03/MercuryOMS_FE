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
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Profile from "./pages/Profile"
import Tracking from "./pages/Tracking"
import "./App.css"

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
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tracking" element={<Tracking />} />
      </Routes>
      <Footer />
      <ShopChatWidget />
    </Router>
  )
}

export default App