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

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email.");
      return;
    }

    alert("✅ Thank you! Your email has been subscribed successfully.");
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Exclusive */}

        <div className="footer-column">

          <h2 className="footer-logo">
            <Link
              to="/"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              Exclusive
            </Link>
          </h2>

          <h3>Subscribe</h3>

          <p>Get 10% off your first order</p>

          <form
            className="subscribe-box"
            onSubmit={handleSubscribe}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit">
              <IoSendOutline />
            </button>
          </form>

        </div>

        {/* Support */}

        <div className="footer-column">

          <h3>Support</h3>

          <p>
            111 Bijoy sarani,
            <br />
            Dhaka,
            <br />
            DH 1515,
            Bangladesh.
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
              <a href="#">Privacy Policy</a>
            </li>

            <li>
              <a href="#">Terms Of Use</a>
            </li>

            <li>
              <a href="#">FAQ</a>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>

          </ul>

        </div>

        {/* Download App */}

        <div className="footer-column">

          <h3>Download App</h3>

          <p className="download-text">
            Save $3 with App New User Only
          </p>

          <div className="app-download">

            <img
              src={qr}
              alt="QR"
              className="qr"
            />

            <div className="store-buttons">

              <img
                src={googlePlay}
                alt="Google Play"
              />

              <img
                src={appStore}
                alt="App Store"
              />

            </div>

          </div>

          <div className="social-icons">

            <FaFacebookF />

            <FaTwitter />

            <FaInstagram />

            <FaLinkedinIn />

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © Copyright Rimel 2022. All right reserved
        </p>

      </div>
    </footer>
  );
}