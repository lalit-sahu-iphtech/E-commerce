import "./cart.css";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";

export default function Cart() {
  const { cart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">

      <div className="breadcrumb">
        <Link to="/">Home</Link> / <span>Cart</span>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your Cart is Empty 🛒</h2>
          <Link to="/">
            <button>Continue Shopping</button>
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-table">

            <div className="cart-heading">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Subtotal</span>
            </div>

            {cart.map((product) => (
              <CartItem
                key={product.id}
                product={product}
              />
            ))}

          </div>

          <div className="cart-buttons">

            <Link to="/">
              <button className="outline-btn">
                Return To Shop
              </button>
            </Link>

            <button className="outline-btn">
              Update Cart
            </button>

          </div>

          <div className="cart-bottom">

            <div className="coupon">

              <input
                type="text"
                placeholder="Coupon Code"
              />

              <button>Apply Coupon</button>

            </div>

            <div className="cart-total">

              <h2>Cart Total</h2>

              <div className="total-row">
                <span>Subtotal:</span>
                <span>${total}</span>
              </div>

              <div className="total-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>

              <div className="total-row">
                <span>Total:</span>
                <span>${total}</span>
              </div>

              <button className="checkout-btn">
                Proceed To Checkout
              </button>

            </div>

          </div>
        </>
      )}
    </div>
  );
}