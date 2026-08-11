import "./checkout.css";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import bkash from "../../assets/payment/bkash.png";
import visa from "../../assets/payment/visa.png";
import mastercard from "../../assets/payment/mastercard.png";
import nagad from "../../assets/payment/nagad.png";

import { useState, useEffect } from "react";
// import { useToast } from "../../context/ToastContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const location = useLocation();
  // const { showToast } = useToast();

  const buyNowProduct = location.state?.buyNowProduct;
  const checkoutItems = buyNowProduct ? [buyNowProduct] : cart;

  const subtotal = checkoutItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [formData, setFormData] = useState({
    firstName: "",
    company: "",
    street: "",
    apartment: "",
    city: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    street: "",
    city: "",
    phone: "",
    email: "",
  });

  // Coupon States
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");

  useEffect(() => {
    if (appliedCoupon === "SAVE10") {
      setDiscount(subtotal * 0.1);
    } else if (appliedCoupon === "SAVE20") {
      setDiscount(subtotal * 0.2);
    } else if (appliedCoupon === "FLAT50") {
      setDiscount(Math.min(50, subtotal));
    } else {
      setDiscount(0);
    }
  }, [subtotal, appliedCoupon]);
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        firstName: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
      }));
    }
  }, []);

  const total = Math.max(subtotal - discount, 0);

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
        setDiscount(0);
        setCouponMsg("❌ Invalid coupon code");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Name is required";
    } else if (!/^[A-Za-z ]+$/.test(formData.firstName)) {
      newErrors.firstName = "Only alphabets are allowed";
    } else if (formData.firstName.trim().length < 3) {
      newErrors.firstName = "Name must be at least 3 characters";
    }

    if (!formData.street.trim()) {
      newErrors.street = "Street address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) return;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      dispatch(showToast("Please login first to place your order.", "error"));
      navigate("/signup");
      return;
    }

    if (cart.length === 0) {
      // alert("Your cart is empty");
      dispatch(showToast("Your cart is empty", "error"));
      return;
    }

    // alert("🎉 Order Placed Successfully!");
    dispatch(showToast("🎉 Order Placed Successfully!", "success"));

    setFormData({
      firstName: "",
      company: "",
      street: "",
      apartment: "",
      city: "",
      phone: "",
      email: "",
    });

    setErrors({
      firstName: "",
      street: "",
      city: "",
      phone: "",
      email: "",
    });

    setCoupon("");
    setAppliedCoupon("");
    setCouponMsg("");
    setDiscount(0);
  };

  return (
    <>
      <section className="checkout-page">
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

                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? "checkout-input-error" : ""}
                />

                {errors.firstName && (
                  <p className="checkout-error">{errors.firstName}</p>
                )}
              </div>

              <div className="form-group">
                <label>Company Name</label>

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>
                  Street Address <span>*</span>
                </label>

                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className={errors.street ? "checkout-input-error" : ""}
                />

                {errors.street && (
                  <p className="checkout-error">{errors.street}</p>
                )}
              </div>

              <div className="form-group">
                <label>Apartment, floor, etc.</label>

                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>
                  Town / City <span>*</span>
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={errors.city ? "checkout-input-error" : ""}
                />

                {errors.city && <p className="checkout-error">{errors.city}</p>}
              </div>

              <div className="form-group">
                <label>
                  Phone Number <span>*</span>
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  className={errors.phone ? "checkout-input-error" : ""}
                />

                {errors.phone && (
                  <p className="checkout-error">{errors.phone}</p>
                )}
              </div>

              <div className="form-group">
                <label>
                  Email Address <span>*</span>
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "checkout-input-error" : ""}
                />

                {errors.email && (
                  <p className="checkout-error">{errors.email}</p>
                )}
              </div>

              <label className="save-info">
                <input type="checkbox" />
                Save this information for faster check-out next time
              </label>
            </form>
          </div>

          {/* Right */}

          <div className="order-summary">
            {checkoutItems.length === 0 ? (
              <h3>Your Cart is Empty</h3>
            ) : (
              checkoutItems.map((item) => (
                <div className="checkout-product" key={item.id}>
                  <div className="product-left">
                    <img src={item.image} alt={item.title} />

                    <p>{item.title}</p>
                  </div>

                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))
            )}

            <div className="price-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="price-row">
              <span>Discount:</span>
              <span>-${discount.toFixed(2)}</span>
            </div>

            <div className="price-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>

            <div className="price-row total-row">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {/* Payment */}

            <div className="payment-method">
              <label>
                <input type="radio" name="payment" defaultChecked />
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
              <input type="radio" name="payment" />
              Cash on delivery
            </label>

            {/* Coupon */}

            <div className="coupon-box">
              <input
                type="text"
                placeholder="Coupon Code"
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value);
                  setCouponMsg("");
                }}
              />

              <button type="button" onClick={handleApplyCoupon}>
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

            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
