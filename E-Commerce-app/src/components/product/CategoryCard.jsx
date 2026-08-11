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
// import { useToast } from "../../context/ToastContext";
import { showToast } from "../../redux/slices/toastSlice";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  removeFromCart,
} from "../../redux/slices/cartSlice";

import { toggleWishlist } from "../../redux/slices/wishlistSlice";

export default function CategoryCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { showToast } = useToast();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

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
      dispatch(showToast({
        message:"Please login first to add products to wishlist.",
       type: "error"}
      ));

      navigate("/signup");
      return;
    }

    dispatch(toggleWishlist(product));

    dispatch(showToast({
      message : isInWishlist
        ? "Product removed from wishlist."
        : "Product added to wishlist.",
     type : "success"}
    ));
  };

  const handleAddCart = () => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );

    if (!currentUser) {
      dispatch(showToast({
       message: "Please login first to add products to cart.",
       type: "error"}
      ));

      navigate("/signup");
      return;
    }

    if (isInCart) {
      dispatch(removeFromCart(product.id));

      dispatch(showToast({
       message: "Product removed from cart.",
        type:"success"}
      ));
    } else {
      dispatch(addToCart(product));

      dispatch(showToast({
        message:"Product added to cart.",
        type:"success"}
      ));
    }
  };

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
            {isInWishlist ? (
              <FaHeart className="heart active-heart" />
            ) : (
              <FaRegHeart className="heart" />
            )}
          </button>

          <button
            className="eye-btn"
            onClick={() =>
              navigate(
                `/category-product/${product.id}`
              )
            }
          >
            <FaRegEye />
          </button>

        </div>

        <img
          src={product.image}
          alt={product.title || product.name}
        />

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

      <h3>
        {product.title || product.name}
      </h3>

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