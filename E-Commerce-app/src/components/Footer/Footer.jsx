import "./footer.css";

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
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Exclusive */}

        <div className="footer-column">

          <h2 className="footer-logo">Exclusive</h2>

          <h3>Subscribe</h3>

          <p>Get 10% off your first order</p>

          <div className="subscribe-box">
            <input
              type="email"
              placeholder="Enter your email"
            />

            <button>
              <IoSendOutline />
            </button>
          </div>

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
              <a href="#">My Account</a>
            </li>

            <li>
              <a href="#">Login / Register</a>
            </li>

            <li>
              <a href="#">Cart</a>
            </li>

            <li>
              <a href="#">Wishlist</a>
            </li>

            <li>
              <a href="#">Shop</a>
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
              <a href="#">Contact</a>
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

      {/* Bottom */}

      <div className="footer-bottom">

        <p>
          © Copyright Rimel 2022. All right reserved
        </p>

      </div>

    </footer>
  );
}