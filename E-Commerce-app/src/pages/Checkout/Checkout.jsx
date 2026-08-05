import "./checkout.css";
import { Link } from "react-router-dom";


import { useCart } from "../../context/CartContext";

import bkash from "../../assets/payment/bkash.png";
import visa from "../../assets/payment/visa.png";
import mastercard from "../../assets/payment/mastercard.png";
import nagad from "../../assets/payment/nagad.png";

export default function Checkout() {
  const { cart } = useCart();

  const subtotal = cart.reduce(
    (total, item) => total + item.price,
    0
  );

  const total = subtotal;

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    alert("Order Placed Successfully 🎉");
  };

  return (
    <>
      <section className="checkout-page">
        {/* Breadcrumb */}

        <div className="checkout-breadcrumb">
          <Link to="/">Account</Link>
          <span>/</span>

          <Link to="/profile">My Account</Link>
          <span>/</span>

          <Link to="/products">Product</Link>
          <span>/</span>

          <Link to="/cart">View Cart</Link>
          <span>/</span>

          <p>CheckOut</p>
        </div>

        <div className="checkout-wrapper">
          {/* Left */}

          <div className="billing-section">
            <h1>Billing Details</h1>

            <form className="billing-form">
              <div className="form-group">
                <label>
                  First Name <span>*</span>
                </label>

                <input type="text" />
              </div>

              <div className="form-group">
                <label>Company Name</label>

                <input type="text" />
              </div>

              <div className="form-group">
                <label>
                  Street Address <span>*</span>
                </label>

                <input type="text" />
              </div>

              <div className="form-group">
                <label>
                  Apartment, floor, etc. (optional)
                </label>

                <input type="text" />
              </div>

              <div className="form-group">
                <label>
                  Town / City <span>*</span>
                </label>

                <input type="text" />
              </div>

              <div className="form-group">
                <label>
                  Phone Number <span>*</span>
                </label>

                <input type="text" />
              </div>

              <div className="form-group">
                <label>
                  Email Address <span>*</span>
                </label>

                <input type="email" />
              </div>

              <label className="save-info">
                <input type="checkbox" />

                Save this information for faster check-out next time
              </label>
            </form>
          </div>

          {/* Right */}

          <div className="order-summary">
            {/* Products */}

            {cart.length === 0 ? (
              <h3>Your Cart is Empty</h3>
            ) : (
              cart.map((item) => (
                <div
                  className="checkout-product"
                  key={item.id}
                >
                  <div className="product-left">
                    <img
                      src={item.image}
                      alt={item.title}
                    />

                    <p>{item.title}</p>
                  </div>

                  <span>${item.price}</span>
                </div>
              ))
            )}

            {/* Total */}

            <div className="price-row">
              <span>Subtotal:</span>

              <span>${subtotal}</span>
            </div>

            <div className="price-row">
              <span>Shipping:</span>

              <span>Free</span>
            </div>

            <div className="price-row total-row">
              <span>Total:</span>

              <span>${total}</span>
            </div>

            {/* Payment */}

            <div className="payment-method">
              <label>
                <input
                  type="radio"
                  name="payment"
                  defaultChecked
                />

                Bank
              </label>

              <div className="payment-icons">
                <img src={bkash} alt="" />
                <img src={visa} alt="" />
                <img src={mastercard} alt="" />
                <img src={nagad} alt="" />
              </div>
            </div>

            <label className="cash-delivery">
              <input
                type="radio"
                name="payment"
              />

              Cash on delivery
            </label>

            {/* Coupon */}

            <div className="coupon-box">
              <input
                type="text"
                placeholder="Coupon Code"
              />

              <button>
                Apply Coupon
              </button>
            </div>

            <button
              className="place-order-btn"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </section>

    </>
  );
}