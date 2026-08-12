import {
  FaRegEye,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
} from "react-icons/fa";

import { HiOutlineShoppingCart } from "react-icons/hi2";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  removeFromCart,
} from "../../redux/slices/cartSlice";

import { showToast } from "../../redux/slices/toastSlice";

import "./recommended.css";

export default function RecommendedCard({ product, index }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.items);

  const isInCart = cart.some(
    (item) => item.id === product.id
  );

  const handleAddCart = () => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );

    if (!currentUser) {
      dispatch(
        showToast({
          message: "Please login first to add products to cart.",
          type: "error",
        })
      );

      navigate("/signup");
      return;
    }

    if (isInCart) {
      dispatch(removeFromCart(product.id));

      dispatch(
        showToast({
          message: "Product removed from cart.",
          type: "success",
        })
      );
    } else {
      dispatch(addToCart(product));

      dispatch(
        showToast({
          message: "Product added to cart.",
          type: "success",
        })
      );
    }
  };

  const handlePreview = () => {
    navigate(
      `/product/${product.id}/${product.title
        .toLowerCase()
        .replace(/\s+/g, "-")}`
    );
  };

  return (
    <div className="recommended-card">

      {/* ==============================
          IMAGE
      ============================== */}

      <div className="recommended-image">

        {/* Discount */}
        {index === 0 && product.discount && (
          <span className="recommended-discount">
            {product.discount}
          </span>
        )}

        {/* New */}
        {product.new && (
          <span className="recommended-new">
            NEW
          </span>
        )}

        {/* Preview */}
        <button
          type="button"
          className="recommended-preview"
          onClick={handlePreview}
        >
          <FaRegEye />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
        />

        {/* Cart */}
        <button
          type="button"
          className={`recommended-cart-btn ${
            isInCart ? "recommended-cart-added" : ""
          }`}
          onClick={handleAddCart}
        >
          <HiOutlineShoppingCart />

          {isInCart
            ? "Remove Item"
            : "Add To Cart"}
        </button>
      </div>

      {/* ==============================
          TITLE
      ============================== */}

      <h3 className="recommended-title">
        {product.title}
      </h3>

      {/* ==============================
          PRICE
      ============================== */}

      <div className="recommended-price">

        <span className="recommended-new-price">
          ${product.price}
        </span>

        {index === 0 && product.oldPrice && (
          <span className="recommended-old-price">
            ${product.oldPrice}
          </span>
        )}

      </div>

      {/* ==============================
          RATING
      ============================== */}

      <div className="recommended-rating">

        {[...Array(5)].map((_, starIndex) => {

          if (
            starIndex + 1 <=
            Math.floor(product.rating)
          ) {
            return (
              <FaStar
                key={starIndex}
                className="recommended-star"
              />
            );
          }

          if (
            starIndex < product.rating &&
            product.rating % 1 !== 0
          ) {
            return (
              <FaStarHalfAlt
                key={starIndex}
                className="recommended-star"
              />
            );
          }

          return (
            <FaRegStar
              key={starIndex}
              className="recommended-star"
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