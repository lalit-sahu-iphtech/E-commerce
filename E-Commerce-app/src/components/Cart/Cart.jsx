import "./cart.css";
import { Link, useNavigate } from "react-router-dom";

// Old Context
// import { useCart } from "../../context/CartContext";

import CartItem from "./CartItem";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

export default function Cart() {

  const navigate = useNavigate();

  // ================================
  // OLD CART CONTEXT
  // ================================

  // const { cart } = useCart();


  // ================================
  // REDUX
  // ================================

  const dispatch = useDispatch();

  const cart = useSelector(
    (state) => state.cart.items
  );


  // ================================
  // COUPON STATES
  // ================================

  const [coupon, setCoupon] = useState("");

  const [appliedCoupon, setAppliedCoupon] =
    useState("");

  const [discount, setDiscount] =
    useState(0);

  const [couponMsg, setCouponMsg] =
    useState("");


  // ================================
  // CART TOTAL
  // ================================

  const total = cart.reduce(
    (sum, item) =>
      sum +
      item.price * (item.quantity || 1),
    0
  );


  // ================================
  // DISCOUNT CALCULATION
  // ================================

  useEffect(() => {

    if (appliedCoupon === "SAVE10") {

      setDiscount(total * 0.1);

    } else if (appliedCoupon === "SAVE20") {

      setDiscount(total * 0.2);

    } else if (appliedCoupon === "FLAT50") {

      setDiscount(
        Math.min(50, total)
      );

    } else {

      setDiscount(0);

    }

  }, [total, appliedCoupon]);


  // ================================
  // FINAL TOTAL
  // ================================

  const finalTotal = Math.max(
    total - discount,
    0
  );


  // ================================
  // APPLY COUPON
  // ================================

  const handleApplyCoupon = () => {

    const code = coupon
      .trim()
      .toUpperCase();


    if (!code) {

      setCouponMsg(
        "Please enter a coupon code"
      );

      setAppliedCoupon("");

      return;
    }


    switch (code) {

      case "SAVE10":

        setAppliedCoupon("SAVE10");

        setCouponMsg(
          "✅ SAVE10 applied successfully"
        );

        setCoupon("");

        break;


      case "SAVE20":

        setAppliedCoupon("SAVE20");

        setCouponMsg(
          "✅ SAVE20 applied successfully"
        );

        setCoupon("");

        break;


      case "FLAT50":

        setAppliedCoupon("FLAT50");

        setCouponMsg(
          "✅ FLAT50 applied successfully"
        );

        setCoupon("");

        break;


      default:

        setAppliedCoupon("");

        setCouponMsg(
          "❌ Invalid coupon code"
        );

        setDiscount(0);

    }
  };


  // ================================
  // JSX
  // ================================

  return (

    <div className="cart-page">

      {/* =================================
          BREADCRUMB
      ================================= */}

      <div className="breadcrumb">

        <Link to="/">
          Home
        </Link>

        <span> / </span>

        <span>Cart</span>

      </div>


      {/* =================================
          EMPTY CART
      ================================= */}

      {cart.length === 0 ? (

        <div className="empty-cart">

          <h2>
            Your Cart is Empty 🛒
          </h2>

          <Link to="/">

            <button>
              Continue Shopping
            </button>

          </Link>

        </div>

      ) : (

        <>

          {/* =================================
              CART TABLE
          ================================= */}

          <div className="cart-table">

            <div className="cart-heading">

              <span>Product</span>

              <span>Price</span>

              <span>Quantity</span>

              <span>Subtotal</span>

            </div>


            {/* Cart Items */}

            {cart.map((product) => (

              <CartItem
                key={product.id}
                product={product}
              />

            ))}

          </div>


          {/* =================================
              CART BUTTONS
          ================================= */}

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


          {/* =================================
              CART BOTTOM
          ================================= */}

          <div className="cart-bottom">


            {/* =================================
                COUPON
            ================================= */}

            <div className="coupon">

              <input
                type="text"
                placeholder="Coupon Code"
                value={coupon}
                onChange={(e) => {

                  setCoupon(
                    e.target.value
                  );

                  setCouponMsg("");

                }}
              />


              <button
                onClick={
                  handleApplyCoupon
                }
              >

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


            {/* =================================
                CART TOTAL
            ================================= */}

            <div className="cart-total">

              <h2>
                Cart Total
              </h2>


              <div className="total-row">

                <span>
                  Subtotal:
                </span>

                <span>
                  ${total.toFixed(2)}
                </span>

              </div>


              <div className="total-row">

                <span>
                  Discount:
                </span>

                <span>
                  -${discount.toFixed(2)}
                </span>

              </div>


              <div className="total-row">

                <span>
                  Shipping:
                </span>

                <span>
                  Free
                </span>

              </div>


              <div className="total-row">

                <span>
                  Total:
                </span>

                <span>
                  ${finalTotal.toFixed(2)}
                </span>

              </div>


              {/* =================================
                  CHECKOUT
              ================================= */}

              <button
                className="checkout-btn"
                onClick={() =>
                  navigate("/checkout")
                }
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