import "./contact.css";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone, message } = formData;

    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !message.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email.");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    console.log("Contact Form Data");
    console.log(formData);

    alert("✅ Message sent successfully!");

    setFormData({
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
        <span className="active-page">
          Contact
        </span>
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

            <p>
              We are available 24/7, 7 days a week.
            </p>

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

            <p>
              Fill out our form and we will
              contact you within 24 hours.
            </p>

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

              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email *"
                value={formData.email}
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Your Phone *"
                value={formData.phone}
                onChange={handleChange}
              />

            </div>

            <textarea
              rows="10"
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>

            <div className="send-btn-wrapper">

              <button
                type="submit"
                className="send-btn"
              >
                Send Message
              </button>

            </div>

          </form>

        </div>

      </div>
    </section>
  );
}