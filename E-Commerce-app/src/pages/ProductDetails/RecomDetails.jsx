import {
  FaRegEye,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
} from "react-icons/fa";

import { HiOutlineShoppingCart } from "react-icons/hi2";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";
import { showToast } from "../../redux/slices/toastSlice";

import { products } from "../../data/products";

import "./recomDetails.css";

export default function RecomDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ==========================
  // REDUX CART
  // ==========================

  const cart = useSelector((state) => state.cart.items);

  // ==========================
  // CHECK PRODUCT IN CART
  // ==========================

  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  // ==========================
  // ADD / REMOVE CART
  // ==========================

  const handleCart = (product) => {
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

    if (isInCart(product.id)) {
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

  return (
    <section className="recommended-section">

      <div className="recommended-container">

        {/* ==========================
            HEADING
        ========================== */}

        <div className="recommended-heading">
          <span className="heading-bar"></span>

          <h2>Related Item</h2>
        </div>

        {/* ==========================
            PRODUCTS
        ========================== */}

        <div className="recommended-grid">

          {products.slice(0, 4).map((product) => {

            const productInCart = isInCart(product.id);

            return (
              <div
                className="wishlist-card"
                key={product.id}
              >

                {/* ==========================
                    IMAGE
                ========================== */}

                <div className="wishlist-image">

                  {/* Discount */}

                  {product.discount && (
                    <span className="discount-badge">
                      {product.discount}
                    </span>
                  )}

                  {/* Preview */}

                  <button
                    className="preview-btn"
                    onClick={() =>
                      navigate(`/product/${product.id}`)
                    }
                  >
                    <FaRegEye />
                  </button>

                  {/* Image */}

                  <img
                    src={product.image}
                    alt={product.title}
                  />

                  {/* ==========================
                      CART BUTTON
                  ========================== */}

                  <button
                    className={`cart-btn ${
                      productInCart ? "in-cart" : ""
                    }`}
                    onClick={() => handleCart(product)}
                  >

                    {productInCart ? (
                      <>
                        <HiOutlineShoppingCart />
                        <span className="cart-normal-text">
                          In Cart
                        </span>

                        <span className="cart-remove-text">
                          Remove Item
                        </span>
                      </>
                    ) : (
                      <>
                        <HiOutlineShoppingCart />
                        Add To Cart
                      </>
                    )}

                  </button>

                </div>

                {/* ==========================
                    TITLE
                ========================== */}

                <h3>
                  {product.title}
                </h3>

                {/* ==========================
                    PRICE
                ========================== */}

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

                {/* ==========================
                    RATING
                ========================== */}

                <div className="rating">

                  {[...Array(5)].map((_, i) => {

                    if (
                      i + 1 <=
                      Math.floor(product.rating)
                    ) {
                      return (
                        <FaStar
                          key={i}
                          color="#FFAD33"
                        />
                      );
                    }

                    if (
                      i < product.rating &&
                      product.rating % 1 !== 0
                    ) {
                      return (
                        <FaStarHalfAlt
                          key={i}
                          color="#FFAD33"
                        />
                      );
                    }

                    return (
                      <FaRegStar
                        key={i}
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
          })}

        </div>

      </div>

    </section>
  );
}