import "./addressBook.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../../redux/slices/toastSlice";

export default function AddressBook() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const emptyAddress = {
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  };

  const [address, setAddress] = useState(emptyAddress);
  const [errors, setErrors] = useState({});
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate("/signup");
      return;
    }

    const stored =
      JSON.parse(
        localStorage.getItem(`addresses_${currentUser.email}`)
      ) || [];
    setSavedAddresses(stored);
  }, []);

  const persistAddresses = (list) => {
    localStorage.setItem(
      `addresses_${currentUser.email}`,
      JSON.stringify(list)
    );
    setSavedAddresses(list);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!address.firstName.trim())
      newErrors.firstName = "First name is required";

    if (!address.lastName.trim())
      newErrors.lastName = "Last name is required";

    if (!address.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(address.phone)) {
      newErrors.phone = "Enter a valid 10 digit phone number";
    }

    if (!address.address.trim())
      newErrors.address = "Address is required";

    if (!address.city.trim()) newErrors.city = "City is required";

    if (!address.state.trim())
      newErrors.state = "State is required";

    if (!address.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^[0-9]{6}$/.test(address.pincode)) {
      newErrors.pincode = "Enter a valid 6 digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    let updatedList;

    if (editingId) {
      // Update existing card
      updatedList = savedAddresses.map((item) =>
        item.id === editingId ? { ...address, id: editingId } : item
      );
    } else {
      // Add new card
      const newEntry = {
        ...address,
        id: Date.now().toString(),
      };
      updatedList = [...savedAddresses, newEntry];
    }

    persistAddresses(updatedList);

    dispatch(
      showToast({
        message: editingId
          ? "Address updated successfully."
          : "Address saved successfully.",
        type: "success",
      })
    );

    setAddress(emptyAddress);
    setErrors({});
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setAddress({
      firstName: item.firstName,
      lastName: item.lastName,
      phone: item.phone,
      address: item.address,
      city: item.city,
      state: item.state,
      pincode: item.pincode,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const updatedList = savedAddresses.filter(
      (item) => item.id !== id
    );
    persistAddresses(updatedList);

    dispatch(
      showToast({
        message: "Address removed.",
        type: "success",
      })
    );
  };

  const handleCancel = () => {
    setAddress(emptyAddress);
    setErrors({});
    setEditingId(null);
    setShowForm(false);
  };

  if (!currentUser) return null;

  return (
    <section className="address-page">
      {/* Breadcrumb */}
      <div className="address-top-bar">
        <div className="address-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/profile">My Account</Link>
          <span>/</span>
          <span>Address Book</span>
        </div>

        <h4>
          Welcome! <span>{currentUser.name?.split(" ")[0]}</span>
        </h4>
      </div>

      <div className="address-wrapper">
        {/* Sidebar */}
        <aside className="address-sidebar">
          <div className="address-sidebar-section">
            <h3>Manage My Account</h3>
            <Link to="/profile" className="address-sidebar-link">
              My Profile
            </Link>
            <Link
              to="/address-book"
              className="address-sidebar-link active"
            >
              Address Book
            </Link>
            <Link
              to="/payment-options"
              className="address-sidebar-link"
            >
              My Payment Options
            </Link>
          </div>

          <div className="address-sidebar-section">
            <Link to="/orders">My Orders</Link>
          </div>
          <div className="address-sidebar-section">
            <Link to="/cancellations">My Cancellations</Link>
          </div>
          <div className="address-sidebar-section">
            <Link to="/reviews">My Reviews</Link>
          </div>
          <div className="address-sidebar-section">
            <Link to="/wishlist">My Wishlist</Link>
          </div>
        </aside>

        {/* Content */}
        <div className="address-content">
          <div className="address-heading">
            <div>
              <span>Address Book</span>
              <h1>My Address</h1>
            </div>

            {!showForm && (
              <button
                type="button"
                className="address-add-btn"
                onClick={() => setShowForm(true)}
              >
                + Add New Address
              </button>
            )}
          </div>

          {/* ---------- Saved Address Cards ---------- */}
          {savedAddresses.length > 0 && (
            <div className="address-card-grid">
              {savedAddresses.map((item) => (
                <div className="address-card" key={item.id}>
                  <div className="address-card-header">
                    <h4>
                      {item.firstName} {item.lastName}
                    </h4>
                  </div>

                  <p className="address-card-line">
                    {item.address}
                  </p>
                  <p className="address-card-line">
                    {item.city}, {item.state} - {item.pincode}
                  </p>
                  <p className="address-card-line">
                    Phone: {item.phone}
                  </p>

                  <div className="address-card-actions">
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {savedAddresses.length === 0 && !showForm && (
            <p className="address-empty-text">
              No addresses saved yet. Click "Add New Address" to
              save one.
            </p>
          )}

          {/* ---------- Form ---------- */}
          {showForm && (
            <form onSubmit={handleSave}>
              <div className="address-form-row">
                <div className="address-input-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={address.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    className={
                      errors.firstName ? "address-error-input" : ""
                    }
                  />
                  {errors.firstName && (
                    <p className="address-error">
                      *{errors.firstName}
                    </p>
                  )}
                </div>

                <div className="address-input-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={address.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    className={
                      errors.lastName ? "address-error-input" : ""
                    }
                  />
                  {errors.lastName && (
                    <p className="address-error">
                      *{errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="address-form-row">
                <div className="address-input-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={address.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    maxLength="10"
                    className={
                      errors.phone ? "address-error-input" : ""
                    }
                  />
                  {errors.phone && (
                    <p className="address-error">*{errors.phone}</p>
                  )}
                </div>

                <div className="address-input-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className={
                      errors.city ? "address-error-input" : ""
                    }
                  />
                  {errors.city && (
                    <p className="address-error">*{errors.city}</p>
                  )}
                </div>
              </div>

              <div className="address-input-group full-width">
                <label>Street Address</label>
                <textarea
                  name="address"
                  value={address.address}
                  onChange={handleChange}
                  placeholder="Enter your complete address"
                  className={
                    errors.address ? "address-error-input" : ""
                  }
                />
                {errors.address && (
                  <p className="address-error">*{errors.address}</p>
                )}
              </div>

              <div className="address-form-row">
                <div className="address-input-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                    className={
                      errors.state ? "address-error-input" : ""
                    }
                  />
                  {errors.state && (
                    <p className="address-error">*{errors.state}</p>
                  )}
                </div>

                <div className="address-input-group">
                  <label>Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={address.pincode}
                    onChange={handleChange}
                    placeholder="Enter pincode"
                    maxLength="6"
                    className={
                      errors.pincode ? "address-error-input" : ""
                    }
                  />
                  {errors.pincode && (
                    <p className="address-error">
                      *{errors.pincode}
                    </p>
                  )}
                </div>
              </div>

              <div className="address-buttons">
                <button
                  type="button"
                  className="address-cancel-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

                <button type="submit" className="address-save-btn">
                  {editingId ? "Update Address" : "Save Address"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}