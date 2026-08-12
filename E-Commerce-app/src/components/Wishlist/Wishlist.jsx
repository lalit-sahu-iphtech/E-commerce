import "./wishlist.css";

import { FaTrashAlt } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi2";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import RecommendedCard from "./RecommendedCard";

import { products } from "../../data/recomonded";

import {
  removeFromWishlist,
  clearWishlist,
} from "../../redux/slices/wishlistSlice";

import {
  addToCart,
  removeFromCart,
} from "../../redux/slices/cartSlice";

import { showToast } from "../../redux/slices/toastSlice";

export default function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ==========================================
  // REDUX DATA
  // ==========================================

  const wishlist = useSelector(
    (state) => state.wishlist?.items || []
  );

  const cart = useSelector(
    (state) => state.cart?.items || []
  );

  // ==========================================
  // CHECK PRODUCT IN CART
  // ==========================================

  const isInCart = (id) => {
    return cart.some((item) => item.id === id);
  };

  // ==========================================
  // ADD / REMOVE CART
  // ==========================================

  const handleAddCart = (product) => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );

    // Login check
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

    // Remove from cart
    if (isInCart(product.id)) {
      dispatch(removeFromCart(product.id));

      dispatch(
        showToast({
          message: "Product removed from cart.",
          type: "success",
        })
      );

      return;
    }

    // Add to cart
    dispatch(addToCart(product));

    dispatch(
      showToast({
        message: "Product added to cart.",
        type: "success",
      })
    );
  };

  // ==========================================
  // REMOVE FROM WISHLIST
  // ==========================================

  const handleRemoveWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));

    dispatch(
      showToast({
        message: "Product removed from wishlist.",
        type: "success",
      })
    );
  };

  // ==========================================
  // MOVE ALL TO BAG
  // ==========================================

  const handleMoveAllToBag = () => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );

    // Login check
    if (!currentUser) {
      dispatch(
        showToast({
          message: "Please login first.",
          type: "error",
        })
      );

      navigate("/signup");

      return;
    }

    // Empty wishlist
    if (wishlist.length === 0) {
      dispatch(
        showToast({
          message: "Wishlist is empty.",
          type: "error",
        })
      );

      return;
    }

    // Add all wishlist products to cart
    wishlist.forEach((item) => {
      if (!isInCart(item.id)) {
        dispatch(addToCart(item));
      }
    });

    // Clear wishlist
    dispatch(clearWishlist());

    dispatch(
      showToast({
        message: "All products moved to cart.",
        type: "success",
      })
    );
  };

  // ==========================================
  // JSX
  // ==========================================

  return (
    <section className="wishlist-page">

      {/* ========================================
          WISHLIST HEADER
      ======================================== */}

      <div className="wishlist-header">

        <div className="wishlist-title-wrapper">
          <h2>
            Wishlist
          </h2>

          <span>
            ({wishlist.length})
          </span>
        </div>

        <button
          type="button"
          className="move-btn"
          onClick={handleMoveAllToBag}
        >
          Move All To Bag
        </button>

      </div>

      {/* ========================================
          WISHLIST PRODUCTS
      ======================================== */}

      {wishlist.length === 0 ? (

        /* ========================================
           EMPTY WISHLIST
        ======================================== */

        <div className="empty-wishlist">

          <div className="empty-wishlist-icon">
            ♡
          </div>

          <h2>
            Your Wishlist is Empty
          </h2>

          <p>
            Save your favorite products here and
            shop them whenever you want.
          </p>

          <button
            type="button"
            className="browse-products-btn"
            onClick={() => navigate("/products")}
          >
            Browse Products
          </button>

        </div>

      ) : (

        /* ========================================
           WISHLIST GRID
        ======================================== */

        <div className="wishlist-grid">

          {wishlist.map((product, index) => (

            <div
              className="wishlist-card"
              key={product.id}
            >

              {/* ==================================
                  IMAGE
              ================================== */}

              <div className="wishlist-image">

                {/* Discount */}
                {index === 0 &&
                  product.discount && (
                    <span className="discount-badge">
                      {product.discount}
                    </span>
                  )}

                {/* New */}
                {product.new && (
                  <span className="new-badge">
                    NEW
                  </span>
                )}

                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.title || product.name}
                />

                {/* Delete */}
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() =>
                    handleRemoveWishlist(product.id)
                  }
                  aria-label="Remove from wishlist"
                >
                  <FaTrashAlt />
                </button>

                {/* Cart */}
                <button
                  type="button"
                  className={`wishlist-cart-btn ${
                    isInCart(product.id)
                      ? "wishlist-cart-added"
                      : ""
                  }`}
                  onClick={() =>
                    handleAddCart(product)
                  }
                >
                  <HiOutlineShoppingCart />

                  {isInCart(product.id)
                    ? "Remove Item"
                    : "Add To Cart"}
                </button>

              </div>

              {/* ==================================
                  TITLE
              ================================== */}

              <h3 className="wishlist-product-title">
                {product.title || product.name}
              </h3>

              {/* ==================================
                  PRICE
              ================================== */}

              <div className="wishlist-price">

                <span className="wishlist-new-price">
                  ${Number(product.price || 0).toFixed(0)}
                </span>

                {index === 0 &&
                  product.oldPrice && (
                    <span className="wishlist-old-price">
                      $
                      {Number(
                        product.oldPrice
                      ).toFixed(0)}
                    </span>
                  )}

              </div>

            </div>

          ))}

        </div>
      )}

      {/* ========================================
          JUST FOR YOU
      ======================================== */}

      <section className="just-for-you-section">

        <div className="just-header">

          <div className="just-left">

            <span className="red-bar"></span>

            <h2>
              Just For You
            </h2>

          </div>

          <button
            type="button"
            className="see-all-btn"
            onClick={() => navigate("/products")}
          >
            See All
          </button>

        </div>

        {/* ======================================
            RECOMMENDED PRODUCTS
        ====================================== */}

        <div className="wishlist-grid recommended-products-grid">

          {products.slice(0, 4).map(
            (product, index) => (

              <RecommendedCard
                key={product.id}
                product={product}
                index={index}
              />

            )
          )}

        </div>

      </section>

    </section>
  );
}