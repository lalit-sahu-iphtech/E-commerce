import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  FaRegHeart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import {
  HiOutlineShoppingCart,
  HiOutlineUser,
} from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useSearch } from "../../context/SearchContext";

export default function Navbar() {
  const navigate = useNavigate();

  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const { search, setSearch } = useSearch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const handleLogout = () => {
    localStorage.removeItem("currentUser");

    setShowProfile(false);

    alert("Logged Out Successfully");

    navigate("/");

    window.location.reload();
  };

  return (
    <header className="navbar">
      {/* Mobile Menu */}
      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Logo */}
      <div className="logo">
        <Link to="/" className="logo-link">
          <h2>Exclusive</h2>
        </Link>
      </div>

      {/* Navigation */}
      <nav className={menuOpen ? "nav active" : "nav"}>
        <ul className="nav-links">
          <li>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          </li>

          {!currentUser && (
            <li>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Right Section */}
      <div className="right-section">
        {/* Search */}
        <div className="search-box">
          <input
            type="text"
            placeholder="What are you looking for?"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <IoSearchOutline className="search-icon" />
        </div>

        {/* Wishlist - only when logged in */}
        {currentUser && (
          <Link
            to="/wishlist"
            className="wishlist-link"
          >
            <FaRegHeart className="icon" />

            {wishlist.length > 0 && (
              <span className="wishlist-count">
                {wishlist.length}
              </span>
            )}
          </Link>
        )}

        {/* Cart - only when logged in */}
        {currentUser && (
          <div className="cart-icon">
            <Link to="/cart">
              <HiOutlineShoppingCart className="icon" />
            </Link>

            {cart.length > 0 && (
              <span className="cart-count">
                {cart.length}
              </span>
            )}
          </div>
        )}

        {/* Profile - only when logged in */}
        {currentUser && (
        <div className="profile-menu">
          <HiOutlineUser
            className="profile-icon"
            onClick={() => setShowProfile(!showProfile)}
          />

          {showProfile && (
            <div className="profile-dropdown">

              <div
                onClick={() => {
                  setShowProfile(false);
                  navigate("/profile");
                }}
              >
                 Manage My Account
              </div>

              <div
                onClick={() => {
                  setShowProfile(false);
                  navigate("/orders");
                }}
              >
                 My Orders
              </div>

              <div
                onClick={() => {
                  setShowProfile(false);
                  alert("Coming Soon");
                }}
              >
                 My Cancellations
              </div>

              <div
                onClick={() => {
                  setShowProfile(false);
                  alert("Coming Soon");
                }}
              >
                 My Reviews
              </div>

              <div onClick={handleLogout}>
                 Logout
              </div>

            </div>
          )}
        </div>
        )}

      </div>
    </header>
  );
}