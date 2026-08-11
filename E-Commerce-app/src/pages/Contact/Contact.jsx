import "./contact.css";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { useState } from "react";
// import { useToast } from "../../context/ToastContext";
import { showToast } from "../../redux/slices/toastSlice";


export default function Contact() {
  // const{showToast} = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const validateForm = () => {
    const newErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z ]+$/.test(formData.name)) {
      newErrors.name = "Only alphabets are allowed";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    // Message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (formData.message.trim().length > 200) {
      newErrors.message = "Message cannot exceed 200 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log(formData);

    // alert("✅ Message sent successfully!");
    dispatch(showToast({message:"Message sent successfully!", type:"success"}));

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    setErrors({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <section className="contact-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span className="active-page">Contact</span>
      </div>

      {/* Contact Container */}
      <div className="contact-container">
        {/* Left Side */}
        <div className="contact-info">
          <div className="info-box">
            <div className="info-title">
              <div className="info-icon">
                <FaPhoneAlt />
              </div>

              <h3>Call To Us</h3>
            </div>

            <p>We are available 24/7, 7 days a week.</p>

            <p>
              <strong>Phone:</strong>
              +8801611112222
            </p>
          </div>

          <hr />

          <div className="info-box">
            <div className="info-title">
              <div className="info-icon">
                <MdOutlineMailOutline />
              </div>

              <h3>Write To Us</h3>
            </div>

            <p>Fill out our form and we will contact you within 24 hours.</p>

            <p>
              <strong>Email:</strong>
              customer@exclusive.com
            </p>

            <p>
              <strong>Email:</strong>
              support@exclusive.com
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="input-row">
              <div className="contact-field">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "contact-input-error" : ""}
                />
                {errors.name && <p className="contact-error">*{errors.name}</p>}
              </div>

              <div className="contact-field">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "contact-input-error" : ""}
                />
                {errors.email && (
                  <p className="contact-error">*{errors.email}</p>
                )}
              </div>

              <div className="contact-field">
                <input
                  type="text"
                  name="phone"
                  placeholder="Your Phone *"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? "contact-input-error" : ""}
                />
                {errors.phone && (
                  <p className="contact-error">*{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="contact-field">
              <textarea
                rows="10"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? "contact-input-error" : ""}
              />

              {errors.message && (
                <p className="contact-error">*{errors.message}</p>
              )}
            </div>

            <div className="send-btn-wrapper">
              <button type="submit" className="send-btn">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
