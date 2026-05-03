import { FaBox } from "react-icons/fa"
import type { CartItem } from "../../types/cart"
import "./OrderItems.css"

interface OrderItemsProps {
  items: CartItem[]
}

const OrderItems = ({ items }: OrderItemsProps) => {
  return (
    <div className="checkout-section order-items-section">
      <div className="section-header">
        <h2>
          <FaBox /> Đơn hàng mua
        </h2>
        <span className="items-count">({items.length} sản phẩm)</span>
      </div>

      <div className="items-list">
        {items.map((item) => (
          <div key={item.variantId} className="order-item">
            <div className="item-image">
              <img src={item.image} alt={item.productName} />
              <span className="item-quantity">{item.quantity}</span>
            </div>
            <div className="item-info">
              <h4 className="item-name">{item.productName}</h4>
              <p className="item-variant">
                {item.color}
                {item.size && ` - Size: ${item.size}`}
              </p>
              <p className="item-price">
                {item.price.toLocaleString("vi-VN")}đ × {item.quantity}
              </p>
            </div>
            <div className="item-total">
              {(item.price * item.quantity).toLocaleString("vi-VN")}đ
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderItems
