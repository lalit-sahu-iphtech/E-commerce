import {
  FaRegHeart,
  FaRegEye,
  FaHeart,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
} from "react-icons/fa";

import "./product.css";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";

import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
} from "../../redux/slices/cartSlice";

import { toggleWishlist } from "../../redux/slices/wishlistSlice";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isInCart = cartItems.some(
    (item) => item.id === product.id
  );

  const isInWishlist = wishlistItems.some(
    (item) => item.id === product.id
  );

  const handleWishlist = () => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );

    if (!currentUser) {
      showToast(
        "Please login first to add products to wishlist.",
        "error"
      );
      navigate("/signup");
      return;
    }

    dispatch(toggleWishlist(product));

    showToast(
      isInWishlist
        ? "Product removed from wishlist."
        : "Product added to wishlist.",
      "success"
    );
  };

  const handleAddCart = () => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );

    if (!currentUser) {
      showToast(
        "Please login first to add products to cart.",
        "error"
      );
      navigate("/signup");
      return;
    }

    if (isInCart) {
      dispatch(removeFromCart(product.id));

      showToast(
        "Product removed from cart.",
        "success"
      );
    } else {
      dispatch(addToCart(product));

      showToast(
        "Product added to cart.",
        "success"
      );
    }
  };

  return (
    <div className="product-card">

      {/* Product Image */}
      <div className="product-image">

        {/* Discount */}
        {product.discount && (
          <span className="discount">
            {product.discount}
          </span>
        )}

        {/* Badge */}
        {product.badge && (
          <span className="discount new-badge">
            {product.badge}
          </span>
        )}

        {/* Wishlist + Eye */}
        <div className="icons">

          <button
            className="wishlist-btn"
            onClick={handleWishlist}
          >
            {isInWishlist ? (
              <FaHeart className="heart active-heart" />
            ) : (
              <FaRegHeart className="heart" />
            )}
          </button>

          <button
            className="eye-btn"
            onClick={() =>
              navigate(`/product/${product.id}`)
            }
          >
            <FaRegEye />
          </button>

        </div>

        {/* Image */}
        <img
          src={product.image}
          alt={product.title || product.name}
        />

        {/* Cart */}
        <button
          className={`cart-btn ${
            isInCart ? "added" : "removed"
          }`}
          onClick={handleAddCart}
        >
          {isInCart
            ? "Remove Item"
            : "Add to Cart"}
        </button>

      </div>

      {/* Product Name */}
      <h3>
        {product.title || product.name}
      </h3>

      {/* Price */}
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

      {/* Rating */}
      <div className="rating">

        {[...Array(5)].map((_, index) => {

          if (
            index + 1 <=
            Math.floor(product.rating)
          ) {
            return (
              <FaStar
                key={index}
                color="#FFAD33"
              />
            );
          }

          if (
            index < product.rating &&
            product.rating % 1 !== 0
          ) {
            return (
              <FaStarHalfAlt
                key={index}
                color="#FFAD33"
              />
            );
          }

          return (
            <FaRegStar
              key={index}
              color="#BFBFBF"
            />
          );
        })}

        <span>
          ({product.reviews})
        </span>

      </div>

    </div>
  );
}