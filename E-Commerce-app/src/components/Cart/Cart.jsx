import "./cart.css";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";

export default function Cart() {
  const navigate = useNavigate();
  const { cart } = useCart();

  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Recalculate discount whenever cart total changes
  useEffect(() => {
    if (appliedCoupon === "SAVE10") {
      setDiscount(total * 0.1);
    } else if (appliedCoupon === "SAVE20") {
      setDiscount(total * 0.2);
    } else if (appliedCoupon === "FLAT50") {
      setDiscount(Math.min(50, total));
    } else {
      setDiscount(0);
    }
  }, [total, appliedCoupon]);

  const finalTotal = Math.max(total - discount, 0);

  const handleApplyCoupon = () => {
    const code = coupon.trim().toUpperCase();

    if (!code) {
      setCouponMsg("Please enter a coupon code");
      setAppliedCoupon("");
      return;
    }

    switch (code) {
      case "SAVE10":
        setAppliedCoupon("SAVE10");
        setCouponMsg("✅ SAVE10 applied successfully");
        setCoupon("");
        break;

      case "SAVE20":
        setAppliedCoupon("SAVE20");
        setCouponMsg("✅ SAVE20 applied successfully");
        setCoupon("");
        break;

      case "FLAT50":
        setAppliedCoupon("FLAT50");
        setCouponMsg("✅ FLAT50 applied successfully");
        setCoupon("");
        break;

      default:
        setAppliedCoupon("");
        setCouponMsg("❌ Invalid coupon code");
        setDiscount(0);
    }
  };

  return (
    <div className="cart-page">
      {/* Breadcrumb */}
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
          {/* Cart Table */}
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

          {/* Buttons */}
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

          {/* Bottom */}
          <div className="cart-bottom">
            {/* Coupon */}
            <div className="coupon">
              <input
                type="text"
                placeholder="Coupon Code"
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value);
                  setCouponMsg("");
                }}
              />

              <button onClick={handleApplyCoupon}>
                Apply Coupon
              </button>

              {couponMsg && (
                <p
                  className={
                    couponMsg.startsWith("✅")
                      ? "coupon-success"
                      : "coupon-error"
                  }
                >
                  {couponMsg}
                </p>
              )}
            </div>

            {/* Cart Total */}
            <div className="cart-total">
              <h2>Cart Total</h2>

              <div className="total-row">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="total-row">
                <span>Discount:</span>
                <span>
                  -${discount.toFixed(2)}
                </span>
              </div>

              <div className="total-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>

              <div className="total-row">
                <span>Total:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>

              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}