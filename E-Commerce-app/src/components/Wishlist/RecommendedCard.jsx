import { FaRegHeart, FaRegEye, FaStar, FaRegStar } from "react-icons/fa";

import { HiOutlineShoppingCart } from "react-icons/hi2";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
export default function RecommendedCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="wishlist-card">
      <div className="wishlist-image">
        {product.discount && (
          <span className="discount">{product.discount}</span>
        )}

        {product.new && <span className="new-badge">NEW</span>}

        {/* <button
            className="heart-btn"
            onClick={() => addToWishlist(product)}
          >
            <FaRegHeart />
          </button> */}

        {/* <button className="preview-btn">
          <FaRegEye />
        </button> */}
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
          <FaRegEye style={{ fontSize: "18px" }} />
        </button>

        <img src={product.image} alt={product.title} />

        <button className="cart-btn" onClick={() => addToCart(product)}>
          <HiOutlineShoppingCart />
          Add To Cart
        </button>
      </div>

      <h3>{product.title}</h3>

      <div className="price">
        <span className="new-price">${product.price}</span>

        {/* <span className="old-price">
            ${product.oldPrice}
          </span> */}
      </div>

      <div className="rating">
        {[...Array(5)].map((_, index) =>
          index < Math.floor(product.rating) ? (
            <FaStar key={index} color="#FFAD33" />
          ) : (
            <FaRegStar key={index} color="#FFAD33" />
          )
        )}

        <span>({product.reviews})</span>
      </div>
    </div>
  );
}
