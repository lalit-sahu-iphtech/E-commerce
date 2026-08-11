import "./profile.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
// import { useToast } from "../../context/ToastContext";

export default function Profile() {
  const navigate = useNavigate();
  // const{showToast} = useToast();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

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

  const validateForm = () => {
    const newErrors = {};

    // First Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Name is required";
    } else if (!/^[A-Za-z ]+$/.test(formData.firstName)) {
      newErrors.firstName = "Only alphabets are allowed";
    } else if (formData.firstName.trim().length < 3) {
      newErrors.firstName = "Name must be at least 3 characters";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Name is required";
    } else if (!/^[A-Za-z ]+$/.test(formData.firstName)) {
      newErrors.lastName = "Only alphabets are allowed";
    } else if (formData.lastName.trim().length < 3) {
      newErrors.lastName = "Name must be at least 3 characters";
    }

    // Last Name
    // if (!formData.lastName.trim()) {
    //   newErrors.lastName = "Last name is required";
    // } else if (formData.lastName.trim().length < 3) {
    //   newErrors.lastName = "Minimum 3 characters required";
    // }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    // Address
    // if (!formData.address.trim()) {
    //   newErrors.address = "Address is required";
    // }

    // Password Validation
    if (
      formData.currentPassword ||
      formData.newPassword ||
      formData.confirmPassword
    ) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = "Current password is required";
      } else if (formData.currentPassword !== currentUser.password) {
        newErrors.currentPassword = "Current password is incorrect";
      }

      if (!formData.newPassword) {
        newErrors.newPassword = "New password is required";
      } else if (formData.newPassword.length < 6) {
        newErrors.newPassword = "Password must be at least 6 characters";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirm password is required";
      } else if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/signup");
      return;
    }

    const fullName = currentUser.name || "";
    const names = fullName.split(" ");

    setFormData({
      firstName: names[0] || "",
      lastName: names.slice(1).join(" "),
      email: currentUser.email || "",
      address: currentUser.address || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }, []);

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

  const handleSave = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const {
      firstName,
      lastName,
      email,
      address,
      currentPassword,
      newPassword,
      confirmPassword,
    } = formData;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((user) => {
      if (user.email === currentUser.email) {
        return {
          ...user,
          name: `${firstName} ${lastName}`,
          email,
          address,
          password: newPassword === "" ? user.password : newPassword,
        };
      }

      return user;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const updatedCurrentUser = {
      ...currentUser,
      name: `${firstName} ${lastName}`,
      email,
      address,
      password: newPassword === "" ? currentUser.password : newPassword,
    };

    localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));

    console.log("Updated Profile");

    console.table(updatedCurrentUser);

    dispatch(showToast("Profile Updated Successfully.", "success"));
  

    setFormData({
      
      lastName: "",
      
      address: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    
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

  if (!currentUser) return null;

  return (
    <>
      <section className="account-page">
        {/* Breadcrumb */}

        <div className="top-bar">
          <div className="breadcrumb">
            <Link to="/">Home</Link>

            <span>/</span>

            <p>My Account</p>
          </div>

          <h4>
            Welcome! <span>{formData.firstName}</span>
          </h4>
        </div>

        <div className="account-wrapper">
          {/* Sidebar */}

          <div className="account-sidebar">
            <h3>Manage My Account</h3>

            <ul>
              <li className="active">My Profile</li>

              <li>Address Book</li>

              <li>My Payment Options</li>
            </ul>

            <h3>My Orders</h3>

            <ul>
              <li>My Returns</li>

              <li>My Cancellations</li>
            </ul>

            <h3>My Wishlist</h3>
          </div>

          {/* Right */}

          <div className="account-content">
            <form onSubmit={handleSave}>
              <h2>Edit Your Profile</h2>

              <div className="form-row">
                <div className="input-group">
                  <label>First Name</label>

                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? "profile-input-error" : ""}
                  />
                  {errors.firstName && (
                    <p className="profile-error">*{errors.firstName}</p>
                  )}
                </div>

                <div className="input-group">
                  <label>Last Name</label>

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? "profile-input-error" : ""}
                  />
                  {errors.lastName && (
                    <p className="profile-error">*{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "profile-input-error" : ""}
                  />

                  {errors.email && (
                    <p className="profile-error">*{errors.email}</p>
                  )}
                </div>

                <div className="input-group">
                  <label>Address</label>

                  <input
                    type="text"
                    name="address"
                    placeholder="Enter Address"
                    value={formData.address}
                    onChange={handleChange}
                    className={errors.address ? "profile-input-error" : ""}
                  />
                  {errors.address && (
                    <p className="profile-error">*{errors.address}</p>
                  )}
                </div>
              </div>

              <label className="password-title">Password Changes</label>

              <input
                type="password"
                placeholder="Current Password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className={`password-input ${
                  errors.currentPassword ? "profile-input-error" : ""
                }`}
              />
              {errors.currentPassword && (
                <p className="profile-error">*{errors.currentPassword}</p>
              )}

              <input
                type="password"
                placeholder="New Password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className={`password-input ${
                  errors.newPassword ? "profile-input-error" : ""
                }`}
              />
              {errors.newPassword && (
                <p className="profile-error">*{errors.newPassword}</p>
              )}

              <input
                type="password"
                placeholder="Confirm New Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`password-input ${
                  errors.confirmPassword ? "profile-input-error" : ""
                }`}
              />
              {errors.confirmPassword && (
                <p className="profile-error">*{errors.confirmPassword}</p>
              )}

              <div className="buttons">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </button>

                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
