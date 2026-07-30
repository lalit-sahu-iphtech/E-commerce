import "./navbar.css";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
export default function Navbar(){
    return(
        <header className="navbar">
            <div className="logo">
            <h2>Exclusive</h2>
            </div>
            <nav>
            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>

                <li>
                    <Link to="/contact">Contact</Link>
                </li>

                <li>
                    <Link to="/about">About</Link>
                </li>

                <li>
                    <Link to="/signup">Sign Up</Link>
                </li>
           </ul>
            </nav>
            <div className="right-section">
                <div className="search-box">
                    <input 
                    type="text"
                     placeholder="What are you lookin for?"
                     />
                     <IoSearchOutline className="search-icon"/>
                </div>
                <FaRegHeart className="icon"/>
                <HiOutlineShoppingCart className="icon"/>
            </div>
        </header>
    )
}