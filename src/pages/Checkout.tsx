import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import type { VoucherOption } from "../data/vouchers"
import { checkoutVouchers } from "../data/vouchers"
import "./Checkout.css"
import {
  ShippingAddress,
  OrderItems,
  PaymentMethod,
  ShippingMethod,
  ShopVoucher,
  ShipperMessage,
  OrderSummary,
  AddressModal
} from "../components/Checkout"
import type { CartItem } from "../types/cart"
import type { Address } from "../types/address"
import { paymentApi, PaymentMethods } from "../services/payment"
import { orderApi } from "../services/orders"
import { addressApi } from "../services/address"

interface Toast {
  id: number
  type: "success" | "error" | "warning" | "info"
  message: string
}

const Checkout = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [isShowAddressModal, setIsShowAddressModal] = useState(false)
  const [pendingOrderId, setPendingOrderId] = useState<string | null>(null)

  // State
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [address, setAddress] = useState<Address>({
    id: "",
    label: "",
    receiverName: "",
    phone: "",
    street: "",
    city: "",
    district: "",
    province: "",
    isDefault: false,
  })

  // Checkout states
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherOption | null>(null)
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [shipperMessage, setShipperMessage] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isRedirectingToPayment, setIsRedirectingToPayment] = useState(false)

  // Initialize
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const init = async () => {
      const storedUser = localStorage.getItem("user")

      if (!storedUser) {
        navigate("/login")
        return
      }

      const userData = JSON.parse(storedUser)
      setUser(userData)

      try {
        // 1. Lấy địa chỉ mặc định
        const addressRes = await addressApi.getDefaultAddress()
        if (addressRes.isSuccess && addressRes.value) {
          setAddress(addressRes.value)
        }

        // 2. Lấy đơn hàng pending từ API
        const pendingRes = await orderApi.getPending()

        if (!pendingRes.isSuccess || !pendingRes.value?.length) {
          return
        }

        const latestPendingOrder = pendingRes.value[0]
        setPendingOrderId(latestPendingOrder.id)

        // Map items từ PendingOrderResponse sang CartItem UI
        if (latestPendingOrder.items) {
          const mappedItems: CartItem[] = latestPendingOrder.items.map((item) => ({
            productId: item.productId,
            variantId: item.productVariantId,
            productName: item.productName,
            price: item.unitPrice,
            quantity: item.quantity,
            image: "https://via.placeholder.com/150",
            color: "",
            size: "",
            stock: 99
          }))
          setCartItems(mappedItems)
        }

      } catch (err) {
        console.error("Lỗi khi khởi tạo Checkout:", err)
      }
    }

    init()
  }, [navigate])

  useEffect(() => {
    const handleWindowFocus = () => {
      if (isRedirectingToPayment) {
        setIsRedirectingToPayment(false)
        setIsProcessing(false)
      }
    }

    window.addEventListener("focus", handleWindowFocus)
    return () => window.removeEventListener("focus", handleWindowFocus)
  }, [isRedirectingToPayment])

  // Toast notification
  const showToast = (type: Toast["type"], message: string) => {
    const id = Date.now()
    const newToast: Toast = { id, type, message }
    setToasts((prev) => [...prev, newToast])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  // Calculate prices
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const getShippingFee = () => {
    const baseShippingFee = 29000
    switch (shippingMethod) {
      case "fast":
        return baseShippingFee * 2
      case "express":
        return baseShippingFee * 3
      default:
        return baseShippingFee
    }
  }

  const shippingFee = getShippingFee()

  let discount = 0
  if (selectedVoucher) {
    if (selectedVoucher.discountType === "fixed") {
      discount = Math.min(selectedVoucher.discount, subtotal)
    } else {
      discount = Math.floor(subtotal * (selectedVoucher.discount / 100))
    }
  }

  // Handlers
  const handleApplyVoucher = (code: string) => {
    if (!code.trim()) {
      showToast("warning", "Vui lòng nhập mã voucher")
      return
    }

    const found = checkoutVouchers.find((v) => v.code === code.toUpperCase())
    if (found) {
      setSelectedVoucher(found)
      showToast("success", `Áp dụng voucher thành công: ${found.title}`)
    } else {
      showToast("error", "Mã voucher không hợp lệ")
    }
  }

  const handleSelectVoucher = (voucher: VoucherOption | null) => {
    setSelectedVoucher(voucher)
  }

  const handleSaveAddress = (newAddress: Address) => {
    setAddress(newAddress)
    setIsShowAddressModal(false)
    showToast("success", "Cập nhật địa chỉ thành công")
  }

  const handlePlaceOrder = async () => {
    if (
      !address ||
      !address.receiverName ||
      !address.phone ||
      !address.street ||
      !address.city
    ) {
      showToast("warning", "Vui lòng cập nhật đầy đủ địa chỉ giao hàng")
      return
    }

    setIsProcessing(true)

    try {
      // 1. Tái sử dụng pendingOrderId nếu có, ngược lại tạo order mới
      let orderId = pendingOrderId

      if (!orderId) {
        orderId = await orderApi.createOrder()
      }

      // 2. Tạo Payment
      const payment = await paymentApi.createPayment(
        orderId,
        paymentMethod === "cod"
          ? PaymentMethods.COD
          : PaymentMethods.VNPay
      )

      // 3. Nếu có URL thanh toán thì chuyển sang cổng thanh toán
      if (payment.paymentUrl) {
        setIsRedirectingToPayment(true)
        window.open(payment.paymentUrl, "_blank", "noopener,noreferrer")
        showToast("info", "Đang chuyển sang cổng thanh toán...")
        return
      }

      // 4. COD hoặc phương thức không cần redirect
      showToast("success", "Đặt hàng thành công")

    } catch (err) {
      showToast(
        "error",
        err instanceof Error ? err.message : "Đặt hàng thất bại"
      )
    } finally {
      setIsProcessing(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="checkout-container">
      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <span>{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="toast-close">
              ✕
            </button>
          </div>
        ))}
      </div>

      {(isProcessing || isRedirectingToPayment) && (
        <div className="payment-loading-overlay" role="status" aria-live="polite">
          <div className="payment-loading-card">
            <div className="payment-loading-spinner" />
            <h3>Đang chuyển sang cổng thanh toán</h3>
            <p>Vui lòng chờ trong giây lát...</p>
          </div>
        </div>
      )}

      <div className="checkout-header">
        <h1>Tiến hành thanh toán</h1>
        <p>Kiểm tra thông tin và hoàn tất đơn hàng</p>
      </div>

      <div className="checkout-content">
        {/* Left Section - Forms */}
        <div className="checkout-left">
          {/* Shipping Address */}
          <ShippingAddress address={address} onEdit={() => setIsShowAddressModal(true)} />

          {/* Order Items */}
          <OrderItems items={cartItems} />

          {/* Payment Method */}
          <PaymentMethod selectedMethod={paymentMethod} onMethodChange={setPaymentMethod} />

          {/* Shipping Method */}
          <ShippingMethod
            selectedMethod={shippingMethod}
            onMethodChange={setShippingMethod}
            shippingFee={29000}
          />

          {/* Shop Voucher */}
          <ShopVoucher
            availableVouchers={checkoutVouchers}
            selectedVoucher={selectedVoucher}
            onVoucherSelect={handleSelectVoucher}
            onApplyCode={handleApplyVoucher}
          />

          {/* Shipper Message */}
          <ShipperMessage message={shipperMessage} onMessageChange={setShipperMessage} />
        </div>

        {/* Right Section - Order Summary */}
        <div className="checkout-right">
          <OrderSummary
            subtotal={subtotal}
            shippingFee={shippingFee}
            discount={discount}
            selectedVoucher={selectedVoucher}
            onPlaceOrder={handlePlaceOrder}
            isProcessing={isProcessing || isRedirectingToPayment}
          />
        </div>
      </div>

      {/* Address Modal */}
      <AddressModal
        isOpen={isShowAddressModal}
        currentAddress={address}
        onClose={() => setIsShowAddressModal(false)}
        onSave={handleSaveAddress}
      />
    </div>
  )
}

export default Checkout