import {
  FaRegHeart,
  FaRegEye,
  FaHeart,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
} from "react-icons/fa";

import "./product.css";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";

export default function SidebarCard({ product }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart, removeFromCart, isInCart } = useCart();
  const navigate = useNavigate();
  const { showToast } = useToast();

  // const [added, setAdded] = useState(false);

  // const handleAddCart = () => {
  //   const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  //   if (!currentUser) {
  //     showToast("Please login first to add products to cart.", "error");
  //     navigate("/signup");
  //     return;
  //   }

  //   addToCart(product);

  //   showToast("Product added to cart.", "success");

  //   setAdded(true);

  //   setTimeout(() => {
  //     setAdded(false);
  //   }, 1000);
  // };

  const handleAddCart = () => {
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

  const handleWishlist = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      showToast("Please login first to add products to wishlist.", "error");
      navigate("/signup");
      return;
    }

    const alreadyInWishlist = isInWishlist(product.id);

    toggleWishlist(product);

    if (alreadyInWishlist) {
      showToast("Product removed from wishlist.", "success");
    } else {
      showToast("Product added to wishlist.", "success");
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        {product.discount && (
          <span className="discount">{product.discount}</span>
        )}

        {product.badge && (
          <span className="discount new-badge">{product.badge}</span>
        )}

        <div className="icons">
          <button className="wishlist-btn" onClick={handleWishlist}>
            {isInWishlist(product.id) ? (
              <FaHeart className="heart active-heart" />
            ) : (
              <FaRegHeart className="heart" />
            )}
          </button>

          <button
            onClick={() => navigate(`/sidebar-product/${product.id}`)}
            style={{
              border: "none",
              background: "#fff",
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              padding: 0,
              margin: 0,
            }}
          >
            <FaRegEye style={{ fontSize: "18px" }} />
          </button>
        </div>

        {/* was product.image / product.title -> data uses "image" and "name" */}
        <img src={product.image} alt={product.name} />

        <button
          className={`cart-btn ${isInCart(product.id) ? "added" : "removed"}`}
          onClick={handleAddCart}
        >
          {isInCart(product.id) ? "Remove Item" : "Add to Cart"}
        </button>
      </div>

      {/* was product.title -> data uses "name" */}
      <h3>{product.name}</h3>

      <div className="price">
        <span className="new-price">${product.price}</span>

        {product.oldPrice && (
          <span className="old-price">${product.oldPrice}</span>
        )}
      </div>

      <div className="rating">
        {[...Array(5)].map((_, index) => {
          if (index + 1 <= Math.floor(product.rating)) {
            return <FaStar key={index} color="#FFAD33" />;
          } else if (index < product.rating && product.rating % 1 !== 0) {
            return <FaStarHalfAlt key={index} color="#FFAD33" />;
          } else {
            return <FaRegStar key={index} color="#BFBFBF" />;
          }
        })}

        <span>({product.reviews})</span>
      </div>
    </div>
  );
}
