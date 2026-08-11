import "./footer.css";
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import { IoSendOutline } from "react-icons/io5";

import qr from "../../assets/footer/qr.png";
import googlePlay from "../../assets/footer/googleplay.png";
import appStore from "../../assets/footer/appstore.png";
import { useDispatch } from "react-redux";
// import { useToast } from "../../context/ToastContext";
import { showToast } from "../../redux/slices/toastSlice";
import { showToast } from "../../redux/slices/toastSlice";

export default function Footer() {
  // const{showToast} = useToast();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({
    email: "",
  });
  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Enter a valid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // alert("✅ Thank you! Your email has been subscribed successfully.");
    dispatch(showToast({message:"Thank you! Your email has been subscribed successfully.", type:"success"}));

    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Exclusive */}

        <div className="footer-column">
          <h2 className="footer-logo">
            <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
              Exclusive
            </Link>
          </h2>

          <h3>Subscribe</h3>

          <p>Get 10% off your first order</p>

          <form className="subscribe-box" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ email: "" });
              }}
            />

            <button type="submit">
              <IoSendOutline />
            </button>
          </form>

          {errors.email && <p className="footer-error">*{errors.email}</p>}
        </div>

        {/* Support */}

        <div className="footer-column">
          <h3>Support</h3>

          <p>
            111 Bijoy sarani,
            <br />
            Dhaka,
            <br />
            DH 1515, Bangladesh.
          </p>

          <p>exclusive@gmail.com</p>

          <p>+88015-88888-9999</p>
        </div>

        {/* Account */}

        <div className="footer-column">
          <h3>Account</h3>

          <ul>
            <li>
              <Link to="/profile">My Account</Link>
            </li>

            <li>
              <Link to="/signup">Login / Register</Link>
            </li>

            <li>
              <Link to="/cart">Cart</Link>
            </li>

            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>

            <li>
              <Link to="/">Shop</Link>
            </li>
          </ul>
        </div>

        {/* Quick Link */}

        <div className="footer-column">
          <h3>Quick Link</h3>

          <ul>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>

            <li>
              <Link to="/terms">Terms Of Use</Link>
            </li>

            <li>
              {/* <a >FAQ</a> */}
              <Link to="/faq">FAQ</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Download App */}

        <div className="footer-column">
          <h3>Download App</h3>

          <p className="download-text">Save $3 with App New User Only</p>

          <div className="download-wrapper">
            <img src={qr} alt="QR" className="qr" />

            <div className="store-buttons">
              <img src={googlePlay} alt="Google Play" />

              <img src={appStore} alt="App Store" />
            </div>
          </div>

          <div className="social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedinIn />
          </div>
        </div>
      </div>{" "}
      {/* <-- footer-container END */}
      <div className="footer-bottom">
        <p>© Copyright Rimel 2022. All right reserved</p>
      </div>
    </footer>
  );
}
