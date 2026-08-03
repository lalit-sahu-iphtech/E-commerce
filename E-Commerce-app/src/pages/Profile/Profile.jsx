import "./profile.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer"

export default function Profile() {
  const navigate = useNavigate();

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((user) => {
      if (user.email === currentUser.email) {
        return {
          ...user,
          name:
            formData.firstName +
            " " +
            formData.lastName,
          email: formData.email,
          address: formData.address,
          password:
            formData.newPassword === ""
              ? user.password
              : formData.newPassword,
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
      name:
        formData.firstName +
        " " +
        formData.lastName,
      email: formData.email,
      address: formData.address,
      password:
        formData.newPassword === ""
          ? currentUser.password
          : formData.newPassword,
    };

    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedCurrentUser)
    );

    alert("Profile Updated Successfully");
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
            Welcome!{" "}
            <span>{formData.firstName}</span>
          </h4>

        </div>

        <div className="account-wrapper">

          {/* Sidebar */}

          <div className="account-sidebar">

            <h3>Manage My Account</h3>

            <ul>
              <li className="active">
                My Profile
              </li>

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

            <h2>Edit Your Profile</h2>

            <div className="form-row">

              <div className="input-group">

                <label>First Name</label>

                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />

              </div>

              <div className="input-group">

                <label>Last Name</label>

                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />

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
                />

              </div>

              <div className="input-group">

                <label>Address</label>

                <input
                  type="text"
                  name="address"
                  placeholder="Enter Address"
                  value={formData.address}
                  onChange={handleChange}
                />

              </div>

            </div>

            <label className="password-title">
              Password Changes
            </label>

            <input
              className="password-input"
              type="password"
              placeholder="Current Password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
            />

            <input
              className="password-input"
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />

            <input
              className="password-input"
              type="password"
              placeholder="Confirm New Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <div className="buttons">

              <button
                className="cancel-btn"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={handleSave}
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

      </section>

      <Footer/>
    </>
  );
}