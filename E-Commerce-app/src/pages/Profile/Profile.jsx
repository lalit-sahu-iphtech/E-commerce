import "./profile.css";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { showToast } from "../../redux/slices/toastSlice";

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ==========================================
  // VALIDATION
  // ==========================================

  const validateForm = () => {
    const newErrors = {};

    // First Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!/^[A-Za-z ]+$/.test(formData.firstName)) {
      newErrors.firstName = "Only alphabets are allowed";
    } else if (formData.firstName.trim().length < 3) {
      newErrors.firstName =
        "First name must be at least 3 characters";
    }

    // Last Name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!/^[A-Za-z ]+$/.test(formData.lastName)) {
      newErrors.lastName = "Only alphabets are allowed";
    } else if (formData.lastName.trim().length < 3) {
      newErrors.lastName =
        "Last name must be at least 3 characters";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        formData.email
      )
    ) {
      newErrors.email = "Enter a valid email";
    }

    // Password validation
    if (
      formData.currentPassword ||
      formData.newPassword ||
      formData.confirmPassword
    ) {
      if (!formData.currentPassword) {
        newErrors.currentPassword =
          "Current password is required";
      } else if (
        formData.currentPassword !== currentUser.password
      ) {
        newErrors.currentPassword =
          "Current password is incorrect";
      }

      if (!formData.newPassword) {
        newErrors.newPassword =
          "New password is required";
      } else if (formData.newPassword.length < 6) {
        newErrors.newPassword =
          "Password must be at least 6 characters";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword =
          "Confirm password is required";
      } else if (
        formData.newPassword !== formData.confirmPassword
      ) {
        newErrors.confirmPassword =
          "Passwords do not match";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================================
  // LOAD CURRENT USER
  // ==========================================

  useEffect(() => {
    if (!currentUser) {
      navigate("/signup");
      return;
    }

    const fullName = currentUser.name || "";
    const names = fullName.trim().split(" ");

    setFormData({
      firstName: names[0] || "",
      lastName: names.slice(1).join(" ") || "",
      email: currentUser.email || "",
      address: currentUser.address || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }, []);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ==========================================
  // SAVE PROFILE
  // ==========================================

  const handleSave = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const {
      firstName,
      lastName,
      email,
      address,
      newPassword,
    } = formData;

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((user) => {
      if (user.email === currentUser.email) {
        return {
          ...user,
          name: `${firstName} ${lastName}`.trim(),
          email,
          address,
          password:
            newPassword === ""
              ? user.password
              : newPassword,
        };
      }

      return user;
    });

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    const updatedCurrentUser = {
      ...currentUser,
      name: `${firstName} ${lastName}`.trim(),
      email,
      address,
      password:
        newPassword === ""
          ? currentUser.password
          : newPassword,
    };

    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedCurrentUser)
    );

    dispatch(
      showToast({
        message: "Profile Updated Successfully.",
        type: "success",
      })
    );

    // Only password fields reset
    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));

    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  if (!currentUser) {
    return null;
  }

  // ==========================================
  // SIDEBAR LINK CLASS
  // ==========================================

  const getLinkClass = (path, type = "link") => {
    const active =
      location.pathname === path ? " active" : "";

    return type === "heading"
      ? `account-heading${active}`
      : `account-link${active}`;
  };

  return (
    <section className="account-page">

      {/* ======================================
          TOP BAR
      ====================================== */}

      <div className="top-bar">

        <div className="breadcrumb">

          <Link to="/">
            Home
          </Link>

          <span>/</span>

          <p>My Account</p>

        </div>

        <h4>
          Welcome!{" "}
          <span>{formData.firstName}</span>
        </h4>

      </div>

      {/* ======================================
          ACCOUNT WRAPPER
      ====================================== */}

      <div className="account-wrapper">

        {/* ====================================
            ACCOUNT SIDEBAR
        ==================================== */}

        <aside className="account-sidebar">

          {/* Manage Account */}

          <div className="account-sidebar-section">

            <h3>
              Manage My Account
            </h3>

            <Link
              to="/profile"
              className={getLinkClass("/profile")}
            >
              My Profile
            </Link>

            <Link
              to="/address-book"
              className={getLinkClass(
                "/address-book"
              )}
            >
              Address Book
            </Link>

            <Link
              to="/payment-options"
              className={getLinkClass(
                "/payment-options"
              )}
            >
              My Payment Options
            </Link>

          </div>

          {/* Orders */}

          <div className="account-sidebar-section">

            <Link
              to="/orders"
              className={getLinkClass(
                "/orders",
                "heading"
              )}
            >
             <h3>My Orders</h3>
            </Link>

          </div>

          {/* Cancellations */}

          <div className="account-sidebar-section">

            <Link
              to="/cancellations"
              className={getLinkClass(
                "/cancellations",
                "heading"
              )}
            >
              My Cancellations
            </Link>

          </div>

          {/* Reviews */}

          <div className="account-sidebar-section">

            <Link
              to="/reviews"
              className={getLinkClass(
                "/reviews",
                "heading"
              )}
            >
              My Reviews
            </Link>

          </div>

          {/* Wishlist */}

          <div className="account-sidebar-section">

            <Link
              to="/wishlist"
              className={getLinkClass(
                "/wishlist",
                "heading"
              )}
            >
             <h3>My Wishlist</h3>
            </Link>

          </div>

        </aside>

        {/* ====================================
            PROFILE CONTENT
        ==================================== */}

        <div className="account-content">

          <form onSubmit={handleSave}>

            <h2>
              Edit Your Profile
            </h2>

            {/* First + Last Name */}

            <div className="form-row">

              <div className="input-group">

                <label>
                  First Name
                </label>

                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={
                    errors.firstName
                      ? "profile-input-error"
                      : ""
                  }
                />

                {errors.firstName && (
                  <p className="profile-error">
                    *{errors.firstName}
                  </p>
                )}

              </div>

              <div className="input-group">

                <label>
                  Last Name
                </label>

                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={
                    errors.lastName
                      ? "profile-input-error"
                      : ""
                  }
                />

                {errors.lastName && (
                  <p className="profile-error">
                    *{errors.lastName}
                  </p>
                )}

              </div>

            </div>

            {/* Email + Address */}

            <div className="form-row">

              <div className="input-group">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={
                    errors.email
                      ? "profile-input-error"
                      : ""
                  }
                />

                {errors.email && (
                  <p className="profile-error">
                    *{errors.email}
                  </p>
                )}

              </div>

              <div className="input-group">

                <label>
                  Address
                </label>

                <input
                  type="text"
                  name="address"
                  placeholder="Enter Address"
                  value={formData.address}
                  onChange={handleChange}
                  className={
                    errors.address
                      ? "profile-input-error"
                      : ""
                  }
                />

                {errors.address && (
                  <p className="profile-error">
                    *{errors.address}
                  </p>
                )}

              </div>

            </div>

            {/* Password */}

            <label className="password-title">
              Password Changes
            </label>

            <input
              type="password"
              placeholder="Current Password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className={`password-input ${
                errors.currentPassword
                  ? "profile-input-error"
                  : ""
              }`}
            />

            {errors.currentPassword && (
              <p className="profile-error">
                *{errors.currentPassword}
              </p>
            )}

            <input
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={`password-input ${
                errors.newPassword
                  ? "profile-input-error"
                  : ""
              }`}
            />

            {errors.newPassword && (
              <p className="profile-error">
                *{errors.newPassword}
              </p>
            )}

            <input
              type="password"
              placeholder="Confirm New Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`password-input ${
                errors.confirmPassword
                  ? "profile-input-error"
                  : ""
              }`}
            />

            {errors.confirmPassword && (
              <p className="profile-error">
                *{errors.confirmPassword}
              </p>
            )}

            {/* Buttons */}

            <div className="buttons">

              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-btn"
              >
                Save Changes
              </button>

            </div>

          </form>

        </div>

      </div>

    </section>
  );
}