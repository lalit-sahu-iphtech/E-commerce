import "./navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";

import { FaRegHeart, FaBars, FaTimes, FaRegUserCircle } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useSearch } from "../../context/SearchContext";

export default function Navbar() {
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const { search, setSearch } = useSearch();

  const [menuOpen, setMenuOpen] = useState(false);

  // Current Logged In User
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

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
            <Link to="/" onClick={() => setMenuOpen(false)}>
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

          {!currentUser ? (
            <li>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Right Section */}
      <div className="right-section">
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

        {/* Wishlist */}
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

        {/* Cart */}
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

        {/* Profile */}
        {currentUser && (
          <Link
            to="/profile"
            className="profile-link"
          >
            <FaRegUserCircle className="icon" />
          </Link>
        )}
      </div>
    </header>
  );
}