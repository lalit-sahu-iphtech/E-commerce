import "./paymentOptions.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  FaCreditCard,
  FaTrash,
  FaPlus,
  FaCheckCircle,
} from "react-icons/fa";
import { showToast } from "../../redux/slices/toastSlice";

export default function PaymentOptions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const [paymentMethods, setPaymentMethods] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    cardHolder: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  /* =========================
     LOGIN CHECK
  ========================= */

  useEffect(() => {
    if (!currentUser) {
      navigate("/signup");
      return;
    }

    const savedPayments =
      JSON.parse(
        localStorage.getItem(
          `paymentMethods_${currentUser.email}`
        )
      ) || [];

    setPaymentMethods(savedPayments);
  }, []);

  /* =========================
     HANDLE INPUT
  ========================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    // Card number
    if (name === "cardNumber") {
      updatedValue = value
        .replace(/\D/g, "")
        .slice(0, 16);
    }

    // Expiry
    if (name === "expiry") {
      updatedValue = value
        .replace(/\D/g, "")
        .slice(0, 4);

      if (updatedValue.length > 2) {
        updatedValue =
          updatedValue.slice(0, 2) +
          "/" +
          updatedValue.slice(2);
      }
    }

    // CVV
    if (name === "cvv") {
      updatedValue = value
        .replace(/\D/g, "")
        .slice(0, 3);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /* =========================
     VALIDATION
  ========================= */

  const validateForm = () => {
    const newErrors = {};

    if (!formData.cardHolder.trim()) {
      newErrors.cardHolder =
        "Card holder name is required";
    } else if (
      !/^[A-Za-z ]+$/.test(formData.cardHolder)
    ) {
      newErrors.cardHolder =
        "Only alphabets are allowed";
    }

    if (!formData.cardNumber) {
      newErrors.cardNumber =
        "Card number is required";
    } else if (
      formData.cardNumber.length !== 16
    ) {
      newErrors.cardNumber =
        "Card number must be 16 digits";
    }

    if (!formData.expiry) {
      newErrors.expiry =
        "Expiry date is required";
    } else if (
      !/^(0[1-9]|1[0-2])\/\d{2}$/.test(
        formData.expiry
      )
    ) {
      newErrors.expiry =
        "Enter expiry as MM/YY";
    }

    if (!formData.cvv) {
      newErrors.cvv =
        "CVV is required";
    } else if (
      formData.cvv.length !== 3
    ) {
      newErrors.cvv =
        "CVV must be 3 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================
     SAVE PAYMENT
  ========================= */

  const handleSavePayment = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.table(formData);

    const newPayment = {
      id: Date.now(),
      cardHolder: formData.cardHolder,
      cardNumber: formData.cardNumber,
      expiry: formData.expiry,
      cvv: formData.cvv,
      type: "Visa",
      isDefault: paymentMethods.length === 0,
    };

    const updatedPayments = [
      ...paymentMethods,
      newPayment,
    ];

    setPaymentMethods(updatedPayments);

    localStorage.setItem(
      `paymentMethods_${currentUser.email}`,
      JSON.stringify(updatedPayments)
    );

    dispatch(
      showToast({
        message: "Payment method added successfully.",
        type: "success",
      })
    );

    // Reset form
    setFormData({
      cardHolder: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    });

    setErrors({});

    setShowForm(false);
  };

  /* =========================
     DELETE PAYMENT
  ========================= */

  const handleDelete = (id) => {
    const updatedPayments =
      paymentMethods.filter(
        (payment) => payment.id !== id
      );

    setPaymentMethods(updatedPayments);

    localStorage.setItem(
      `paymentMethods_${currentUser.email}`,
      JSON.stringify(updatedPayments)
    );

    dispatch(
      showToast({
        message: "Payment method removed.",
        type: "success",
      })
    );
  };

  /* =========================
     DEFAULT PAYMENT
  ========================= */

  const handleSetDefault = (id) => {
    const updatedPayments =
      paymentMethods.map((payment) => ({
        ...payment,
        isDefault: payment.id === id,
      }));

    setPaymentMethods(updatedPayments);

    localStorage.setItem(
      `paymentMethods_${currentUser.email}`,
      JSON.stringify(updatedPayments)
    );

    dispatch(
      showToast({
        message: "Default payment method updated.",
        type: "success",
      })
    );
  };

  if (!currentUser) return null;

  return (
    <section className="payment-page">

      {/* =========================
          TOP BAR
      ========================= */}

      <div className="payment-top-bar">

        <div className="payment-breadcrumb">

          <Link to="/">Home</Link>

          <span>/</span>

          <Link to="/profile">
            My Account
          </Link>

          <span>/</span>

          <span>Payment Options</span>

        </div>

        <h4>
          Welcome!{" "}
          <span>
            {currentUser.name?.split(" ")[0]}
          </span>
        </h4>

      </div>

      {/* =========================
          WRAPPER
      ========================= */}

      <div className="payment-wrapper">

        {/* =========================
            SIDEBAR
        ========================= */}

        <aside className="payment-sidebar">

          <div className="payment-sidebar-section">

            <h3>
              Manage My Account
            </h3>

            <Link to="/profile">
              My Profile
            </Link>

            <Link to="/address-book">
              Address Book
            </Link>

            <Link
              to="/payment-options"
              className="active"
            >
              My Payment Options
            </Link>

          </div>

          <div className="payment-sidebar-section">
            <Link to="/orders">
              My Orders
            </Link>
          </div>

          <div className="payment-sidebar-section">
            <Link to="/cancellations">
              My Cancellations
            </Link>
          </div>

          <div className="payment-sidebar-section">
            <Link to="/reviews">
              My Reviews
            </Link>
          </div>

          <div className="payment-sidebar-section">
            <Link to="/wishlist">
              My Wishlist
            </Link>
          </div>

        </aside>

        {/* =========================
            CONTENT
        ========================= */}

        <div className="payment-content">

          <div className="payment-heading">

            <div>
              <span>
                Payment Options
              </span>

              <h1>
                My Payment Options
              </h1>
            </div>

            <button
              className="add-payment-btn"
              onClick={() =>
                setShowForm(!showForm)
              }
            >
              <FaPlus />

              {showForm
                ? "Close"
                : "Add Payment"}
            </button>

          </div>

          {/* =========================
              ADD PAYMENT FORM
          ========================= */}

          {showForm && (
            <form
              className="payment-form"
              onSubmit={handleSavePayment}
            >

              <h2>
                Add New Card
              </h2>

              {/* Card Holder */}

              <div className="payment-input-group">

                <label>
                  Card Holder Name
                </label>

                <input
                  type="text"
                  name="cardHolder"
                  value={formData.cardHolder}
                  onChange={handleChange}
                  placeholder="Enter card holder name"
                />

                {errors.cardHolder && (
                  <p className="payment-error">
                    *{errors.cardHolder}
                  </p>
                )}

              </div>

              {/* Card Number */}

              <div className="payment-input-group">

                <label>
                  Card Number
                </label>

                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="Enter 16 digit card number"
                  maxLength="16"
                />

                {errors.cardNumber && (
                  <p className="payment-error">
                    *{errors.cardNumber}
                  </p>
                )}

              </div>

              <div className="payment-form-row">

                {/* Expiry */}

                <div className="payment-input-group">

                  <label>
                    Expiry Date
                  </label>

                  <input
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    maxLength="5"
                  />

                  {errors.expiry && (
                    <p className="payment-error">
                      *{errors.expiry}
                    </p>
                  )}

                </div>

                {/* CVV */}

                <div className="payment-input-group">

                  <label>
                    CVV
                  </label>

                  <input
                    type="password"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="CVV"
                    maxLength="3"
                  />

                  {errors.cvv && (
                    <p className="payment-error">
                      *{errors.cvv}
                    </p>
                  )}

                </div>

              </div>

              <div className="payment-form-buttons">

                <button
                  type="button"
                  className="payment-cancel-btn"
                  onClick={() => {
                    setShowForm(false);

                    setFormData({
                      cardHolder: "",
                      cardNumber: "",
                      expiry: "",
                      cvv: "",
                    });

                    setErrors({});
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="payment-save-btn"
                >
                  Save Card
                </button>

              </div>

            </form>
          )}

          {/* =========================
              SAVED CARDS
          ========================= */}

          <div className="saved-payment-section">

            <h2>
              Saved Payment Methods
            </h2>

            {paymentMethods.length > 0 ? (

              <div className="payment-cards">

                {paymentMethods.map(
                  (payment) => (

                    <div
                      className={`payment-card ${
                        payment.isDefault
                          ? "default-card"
                          : ""
                      }`}
                      key={payment.id}
                    >

                      <div className="payment-card-top">

                        <div className="card-icon">
                          <FaCreditCard />
                        </div>

                        <div>

                          <h3>
                            {payment.type}
                          </h3>

                          {payment.isDefault && (
                            <span className="default-badge">
                              <FaCheckCircle />
                              Default
                            </span>
                          )}

                        </div>

                        <button
                          className="delete-payment-btn"
                          onClick={() =>
                            handleDelete(
                              payment.id
                            )
                          }
                        >
                          <FaTrash />
                        </button>

                      </div>

                      <div className="card-number">
                        •••• •••• ••••{" "}
                        {payment.cardNumber.slice(
                          -4
                        )}
                      </div>

                      <div className="card-bottom">

                        <div>
                          <small>
                            Card Holder
                          </small>

                          <p>
                            {payment.cardHolder}
                          </p>
                        </div>

                        <div>
                          <small>
                            Expires
                          </small>

                          <p>
                            {payment.expiry}
                          </p>
                        </div>

                      </div>

                      {/* {!payment.isDefault && (
                        <button
                          className="default-btn"
                          onClick={() =>
                            handleSetDefault(
                              payment.id
                            )
                          }
                        >
                          Set as Default
                        </button>
                      )} */}

                    </div>

                  )
                )}

              </div>

            ) : (

              <div className="empty-payment">

                <div className="empty-payment-icon">
                  <FaCreditCard />
                </div>

                <h2>
                  No Payment Methods
                </h2>

                <p>
                  You haven't added any
                  payment methods yet.
                </p>

                <button
                  onClick={() =>
                    setShowForm(true)
                  }
                >
                  Add Payment Method
                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </section>
  );
}