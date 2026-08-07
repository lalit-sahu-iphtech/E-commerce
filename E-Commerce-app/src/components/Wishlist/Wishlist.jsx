import "./wishlist.css";
import { FaTrashAlt } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useWishlist } from "../../context/WishlistContext";
import RecommendedCard from "./RecommendedCard";

import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { products } from "../../data/recomonded";
import Footer from "../Footer/Footer";
import { useToast } from "../../context/ToastContext";

export default function Wishlist() {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  // const [added, setAdded] = useState(false);

  const handleAddCart = (product) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      showToast("Please login first to add products to cart.", "error");
      navigate("/signup");
      return;
    }

    if (isInCart(product.id)) {
      removeFromCart(product.id);
      showToast("Product removed from cart.", "success");
    } else {
      addToCart(product);
      showToast("Product added to cart.", "success");
    }
  };
  const handleMoveAllToBag = () => {
    if (wishlist.length === 0) {
      // alert("Wishlist is empty");
      showToast("Wishlist is empty", "error");
      return;
    }
    wishlist.forEach((item) => {
      addToCart(item);
    });

    clearWishlist();
    // alert("All products moved to cart");
    showToast("All products moved to cart", "success");
  };

  return (
    <>
      <div className="wishlist-page">
        {/* Wishlist Header */}

        <div className="wishlist-header">
          <h2>Wishlist ({wishlist.length})</h2>

          <button className="move-btn" onClick={handleMoveAllToBag}>
            Move All To Bag
          </button>
        </div>

        {/* Wishlist */}

        {wishlist.length === 0 ? (
          <div className="empty-wishlist">
            <h2>Your Wishlist is Empty ❤️</h2>
            <p>Add some products to your wishlist.</p>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((products, index) => (
              <div className="wishlist-card" key={products.id}>
                <div className="wishlist-image">
                  {index === 0 && products.discount && (
                    <span className="discount-badge">{products.discount}</span>
                  )}

                  <img src={products.image} alt={products.title} />

                  <button
                    className="delete-btn"
                    onClick={() => removeFromWishlist(products.id)}
                  >
                    <FaTrashAlt />
                  </button>
                  <button
                    className={`cart-btn ${
                      isInCart(products.id) ? "added" : "removed"
                    }`}
                    onClick={() => handleAddCart(products)}
                  >
                    <HiOutlineShoppingCart />

                    {isInCart(products.id) ? "Remove Item" : "Add To Cart"}
                  </button>
                </div>

                <h3>{products.title}</h3>

                <div className="price">
                  <span className="new-price">${products.price}</span>

                  {index === 0 && products.oldPrice && (
                    <span className="old-price">${products.oldPrice}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Just For You */}

        <div className="just-header">
          <div className="just-left">
            <span className="red-bar"></span>
            <h2>Just For You</h2>
          </div>

          <button className="move-btn" onClick={() => navigate("/")}>
            See All
          </button>
        </div>

        <div className="wishlist-grid">
          {products.map((product, index) => (
            <RecommendedCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}
