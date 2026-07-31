import "./navbar.css";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { FaBars, FaTimes} from "react-icons/fa";
import { useSearch } from "../../context/SearchContext";

export default function Navbar() {
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const{search, setSearch} = useSearch();


  return (
    <header className="navbar">
        <div className="menu-icon"
        onClick={()=>setMenuOpen(!menuOpen)}
        >
            {menuOpen ? <FaTimes/> : <FaBars/>}
        </div>
      <div className="logo">
        <Link to = "/"className="logo-link">
        <h2>Exclusive</h2>
        </Link>
      </div>
      <nav className={menuOpen ? "nav active" : "nav"}>
        <ul className="nav-links">
          <li>
            <Link to="/" onClick = {() =>setMenuOpen(false)}>Home</Link>
          </li>

          <li>
            <Link to="/contact"onClick = {() =>setMenuOpen(false)}>Contact</Link>
          </li>

          <li>
            <Link to="/about"onClick = {() =>setMenuOpen(false)}>About</Link>
          </li>

          <li>
            <Link to="/signup"onClick = {() =>setMenuOpen(false)}>Sign Up</Link>
          </li>
        </ul>
      </nav>
      <div className="right-section">
        <div className="search-box">
          <input type="text" placeholder="What are you lookin for?"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          />
          <IoSearchOutline className="search-icon" />
        </div>
        <Link to="/wishlist" className="wishlist-link">
          <FaRegHeart className="icon" />
          {wishlist.length > 0 && (
            <span className="wishlist-count">{wishlist.length}</span>
          )}
        </Link>
        <div className="cart-icon">
          <Link to="/cart">
            <HiOutlineShoppingCart className="icon" />
          </Link>

          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </div>
      </div>
    </header>
  );
}
