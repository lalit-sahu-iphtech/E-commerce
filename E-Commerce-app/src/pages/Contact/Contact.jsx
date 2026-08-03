import "./contact.css";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import Footer from "../../components/Footer/Footer";

export default function Contact() {
  return (
    <>
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
                <strong>Phone:</strong> +8801611112222
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
                Fill out our form and we will contact you
                within 24 hours.
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
            <form>
              <div className="input-row">
                <input
                  type="text"
                  placeholder="Your Name *"
                  required
                />

                <input
                  type="email"
                  placeholder="Your Email *"
                  required
                />

                <input
                  type="text"
                  placeholder="Your Phone *"
                  required
                />
              </div>

              <textarea
                rows="10"
                placeholder="Your Message"
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

      <Footer />
    </>
  );
}