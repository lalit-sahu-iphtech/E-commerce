import {
  FaRegHeart,
  FaRegEye,
  FaHeart,
  FaStar,
  FaRegStar,
} from "react-icons/fa";

import "./product.css";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [added, setAdded] = useState(false);

  const handleAddCart = () => {
    addToCart(product);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1000);
  };

  const handleWishlist = () =>{
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );

    if(!currentUser){
      alert("please login first to add products to wishlist.");
      navigate("/signup");
      return;
    }
    toggleWishlist(product);
  }

  return (
    <div className="product-card">
      <div className="product-image">
        {product.discount && (
          <span className="discount">
            {product.discount}
          </span>
        )}

        {product.badge && (
          <span className="discount new-badge">
            {product.badge}
          </span>
        )}

        <div className="icons">
          <button
            className="wishlist-btn"
            onClick={handleWishlist}
          >
            {isInWishlist(product.id) ? (
              <FaHeart className="heart active-heart" />
            ) : (
              <FaRegHeart className="heart" />
            )}
          </button>

          <button
        
           onClick={() => navigate(`/product/${product.id}`)}
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
            <FaRegEye style={{ fontSize: "18px" }}  />
          </button>
        </div>

        <img
          src={product.image}
          alt={product.title}
        />

        <button
          className={`cart-btn ${
            added ? "added" : ""
          }`}
          onClick={handleAddCart}
        >
          {added ? "✓ Added" : "Add To Cart"}
        </button>
      </div>

      <h3>{product.title}</h3>

      <div className="price">
        <span className="new-price">
          ${product.price}
        </span>

        {product.oldPrice && (
          <span className="old-price">
            ${product.oldPrice}
          </span>
        )}
      </div>

      <div className="rating">
        {[...Array(5)].map((_, index) =>
          index < Math.floor(product.rating) ? (
            <FaStar
              key={index}
              color="#FFAD33"
            />
          ) : (
            <FaRegStar
              key={index}
              color="#FFAD33"
            />
          )
        )}

        <span>({product.reviews})</span>
      </div>
    </div>
  );
}