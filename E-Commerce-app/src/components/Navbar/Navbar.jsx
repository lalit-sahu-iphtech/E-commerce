import "./navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import { FaRegHeart, FaBars, FaTimes } from "react-icons/fa";
import {
  HiOutlineShoppingCart,
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiOutlineXCircle,
  HiOutlineStar,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useSearch } from "../../context/SearchContext";
import { products } from "../../data/products";
import { categoryProducts } from "../../data/categoryProducts";
import { sidebarProducts } from "../../data/sidebarProducts";
import { useToast } from "../../context/ToastContext";

export default function Navbar() {
  const location = useLocation();
  const isSignupPage = location.pathname === "/signup";
  const navigate = useNavigate();

  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const { search, setSearch } = useSearch();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { showToast } = useToast();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");

    setShowProfile(false);

    // alert("Logged Out Successfully");
    showToast("Log Out Successfully", "success");

    navigate("/");

    window.location.reload();
  };

  const categoryItems = Object.values(categoryProducts)
    .flat()
    .map((item) => ({
      ...item,
      type: "category",
    }));

  const allSidebarProducts = Object.values(sidebarProducts)
    .flat()
    .map((item) => ({
      ...item,
      type: "sidebar",
    }));
  const allSidebarCategories = Object.keys(sidebarProducts).map((category) => ({
    id: category,
    name: category,
    image: sidebarProducts[category]?.[0]?.image,
    type: "sidebar-category",
  }));

  const mainProducts = products.map((item) => ({
    ...item,
    type: "main",
  }));

  const allProducts = [
    ...mainProducts,
    ...categoryItems,
    ...allSidebarProducts,
    ...allSidebarCategories,
  ];
  const handleSearch = () => {
    const value = search.trim().toLowerCase();
  
    if (!value) return;
  
    // 1. Sidebar Categories
    const sidebarCategory = Object.keys(sidebarProducts).find(
      (item) => item.toLowerCase() === value
    );
  
    if (sidebarCategory) {
      navigate(`/sidebar/${sidebarCategory}`);
      setSearch("");
      setShowSuggestions(false);
      return;
    }
  
    // 2. Main Category Page
    const categoryPage = Object.keys(categoryProducts).find(
      (item) => item.toLowerCase() === value
    );
  
    if (categoryPage) {
      navigate(`/category/${categoryPage}`);
      setSearch("");
      setShowSuggestions(false);
      return;
    }
  
    // 3. Product Suggestions (Details Page)
    if (filteredProducts.length > 0) {
      const product = filteredProducts[0];
  
      if (product.type === "main") {
        navigate(`/products?search=${encodeURIComponent(search)}`);
      } else if (product.type === "category") {
        navigate(`/category-product/${product.id}`);
      } else if (product.type === "sidebar") {
        navigate(`/sidebar-product/${product.id}`);
      }
  
      setSearch("");
      setShowSuggestions(false);
    }
  };

  const filteredProducts =
    search.trim() === ""
      ? []
      : allProducts
          .filter((product) => {
            const value = search.toLowerCase();

            return (
              product.title?.toLowerCase().includes(value) ||
              product.name?.toLowerCase().includes(value) ||
              product.category?.toLowerCase().includes(value) ||
              product.subCategory?.toLowerCase().includes(value)
            );
          })
          .slice(0, 15);

  return (
    <header className="navbar">
      {/* Mobile Menu */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
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
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </li>

          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
          </li>

          {!currentUser && (
            <li>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
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
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            onFocus={() => setShowSuggestions(true)}
          />

          <IoSearchOutline className="search-icon"onClick={handleSearch} />

          {showSuggestions && search && (
            <div className="search-suggestions">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="suggestion-item"
                    onClick={() => {
                      if (product.type === "main") {
                        navigate(`/product/${product.id}`);
                      } else if (product.type === "category") {
                        navigate(`/category-product/${product.id}`);
                      } else if (product.type === "sidebar") {
                        navigate(`/sidebar-product/${product.id}`);
                      } else if (product.type === "sidebar-category") {
                        navigate(`/sidebar/${product.name}`);
                      }

                      setSearch("");
                      setShowSuggestions(false);
                    }}
                  >
                    <img src={product.image} alt={product.title} />

                    <div className="suggestion-info">
                      <h4>{product.title || product.name}</h4>

                      <p>${product.price}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-result">No Product Found</p>
              )}
            </div>
          )}
        </div>

        {/* Wishlist */}
        {!isSignupPage && (
          <div
            className="wishlist-link"
            onClick={() => {
              if (!currentUser) {
                alert("Please Login First");
                navigate("/signup");
                return;
              }

              navigate("/wishlist");
            }}
          >
            <FaRegHeart className="icon" />

            {currentUser && wishlist.length > 0 && (
              <span className="wishlist-count">{wishlist.length}</span>
            )}
          </div>
        )}

        {/* Cart */}
        {!isSignupPage && (
          <div
            className="cart-icon"
            onClick={() => {
              if (!currentUser) {
                alert("Please Login First");
                navigate("/signup");
                return;
              }

              navigate("/cart");
            }}
          >
            <HiOutlineShoppingCart className="icon" />

            {currentUser && cart.length > 0 && (
              <span className="cart-count">{cart.length}</span>
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
                  <HiOutlineUser className="dropdown-icon" />
                  Manage My Account
                </div>

                <div
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/orders");
                  }}
                >
                  <HiOutlineShoppingBag className="dropdown-icon" />
                  My Orders
                </div>

                <div
                  onClick={() => {
                    setShowProfile(false);
                    alert("Coming Soon");
                  }}
                >
                  <HiOutlineXCircle className="dropdown-icon" />
                  My Cancellations
                </div>

                <div
                  onClick={() => {
                    setShowProfile(false);
                    alert("Coming Soon");
                  }}
                >
                  <HiOutlineStar className="dropdown-icon" />
                  My Reviews
                </div>

                <div onClick={handleLogout}>
                  <HiOutlineArrowRightOnRectangle className="dropdown-icon" />
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
