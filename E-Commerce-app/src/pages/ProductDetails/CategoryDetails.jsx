import "./productDetails.css";

import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { FaStar, FaRegStar, FaHeart } from "react-icons/fa";
import { HiMinus, HiPlus } from "react-icons/hi";
import {
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

import { categoryProducts } from "../../data/categoryProducts";

// Redux
import { useDispatch, useSelector } from "react-redux";

import {
  toggleWishlist,
} from "../../redux/slices/wishlistSlice";

import {
  addToCart,
  removeFromCart,
} from "../../redux/slices/cartSlice";

import { showToast } from "../../redux/slices/toastSlice";

// Related Products
// import RecomDetails from "./RecomDetails";


export default function CategoryDetails() {
  const products = Object.values(categoryProducts).flat();

  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();


  // =====================================================
  // FIND PRODUCT
  // =====================================================

  const product = products.find(
    (item) => String(item.id) === String(id)
  );


  // =====================================================
  // STATE
  // =====================================================

  const [qty, setQty] = useState(1);

  const [selectedSize, setSelectedSize] = useState(
    product?.sizes?.[0] || ""
  );

  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || ""
  );

  const [selectedImage, setSelectedImage] = useState(0);

  const [showImage, setShowImage] = useState(false);


  // =====================================================
  // REDUX STATE
  // =====================================================

  const wishlist = useSelector(
    (state) => state.wishlist.items
  );

  const cart = useSelector(
    (state) => state.cart.items
  );


  // =====================================================
  // CHECK PRODUCT IN WISHLIST
  // =====================================================

  const isInWishlist = (productId) => {
    return wishlist.some(
      (item) => String(item.id) === String(productId)
    );
  };


  // =====================================================
  // CHECK PRODUCT IN CART
  // =====================================================

  const isInCart = (productId) => {
    return cart.some(
      (item) => String(item.id) === String(productId)
    );
  };


  // =====================================================
  // PRODUCT NOT FOUND
  // =====================================================

  if (!product) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Product Not Found
      </h2>
    );
  }


  // =====================================================
  // IMAGE NEXT
  // =====================================================

  const handleNextImage = (e) => {
    e.stopPropagation();

    setSelectedImage((prev) =>
      prev === product.images.length - 1
        ? 0
        : prev + 1
    );
  };


  // =====================================================
  // IMAGE PREVIOUS
  // =====================================================

  const handlePrevImage = (e) => {
    e.stopPropagation();

    setSelectedImage((prev) =>
      prev === 0
        ? product.images.length - 1
        : prev - 1
    );
  };


  // =====================================================
  // WISHLIST
  // =====================================================

  const handleWishlist = () => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );

    // Login check
    if (!currentUser) {
      dispatch(
        showToast({
          message: "Please login first to add products to wishlist.",
          type: "error",
        })
      );

      navigate("/signup");

      return;
    }


    // Redux wishlist
    dispatch(
      toggleWishlist(product)
    );


    // Toast
    if (isInWishlist(product.id)) {
      dispatch(
        showToast({
          message: "Product removed from wishlist.",
          type: "success",
        })
      );
    } else {
      dispatch(
        showToast({
          message: "Product added to wishlist.",
          type: "success",
        })
      );
    }
  };


  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = () => {
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


    const productToCart = {
      ...product,
      quantity: qty,
      size: selectedSize,
      color: selectedColor,
    };


    // If already in cart -> remove
    if (isInCart(product.id)) {
      dispatch(
        removeFromCart(product.id)
      );

      dispatch(
        showToast({
          message: "Product removed from cart.",
          type: "success",
        })
      );

      return;
    }


    // Add product
    dispatch(
      addToCart(productToCart)
    );


    dispatch(
      showToast({
        message: "Product added to cart.",
        type: "success",
      })
    );
  };


  // =====================================================
  // BUY NOW
  // =====================================================

  const handleBuyNow = () => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );


    // Login check
    if (!currentUser) {
      dispatch(
        showToast({
          message: "Please login first to buy this product.",
          type: "error",
        })
      );

      navigate("/signup");

      return;
    }


    const productToBuy = {
      ...product,
      quantity: qty,
      size: selectedSize,
      color: selectedColor,
    };


    // Add to Redux cart
    dispatch(
      addToCart(productToBuy)
    );


    // Go checkout
    navigate("/checkout", {
      state: {
        buyNowProduct: productToBuy,
      },
    });
  };


  return (
    <div className="product-container">

      {/* =================================================
          PRODUCT DETAILS
      ================================================= */}

      <section className="details-page">

        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="details-left">

          {/* Thumbnails */}

          <div className="small-images">

            {product.images.map((img, index) => (

              <div
                key={index}
                className={`small-box ${
                  selectedImage === index
                    ? "active-thumb"
                    : ""
                }`}
                onClick={() =>
                  setSelectedImage(index)
                }
              >

                <img
                  src={img}
                  alt={`${product.title}-${index}`}
                />

              </div>

            ))}

          </div>


          {/* Main Image */}

          <div
            className="main-image"
            onClick={() =>
              setShowImage(true)
            }
          >

            <img
              src={product.images[selectedImage]}
              alt={product.title}
            />

          </div>

        </div>


        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="details-right">

          {/* Product Title */}

          <h2>
            {product.title}
          </h2>


          {/* Rating */}

          <div className="rating-row">

            {[...Array(5)].map(
              (_, index) =>

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


            <span>
              ({product.reviews} Reviews)
            </span>


            {/* Stock */}

            <span
              className="stock"
              style={{
                color: product.stock
                  ? "#00A651"
                  : "red",
              }}
            >

              {product.stock
                ? "In Stock"
                : "Out of Stock"}

            </span>

          </div>


          {/* Price */}

          <h3 className="price">
            $
            {(product.price * qty).toFixed(2)}
          </h3>


          {/* Description */}

          {product.description && (
            <p className="description">
              {product.description}
            </p>
          )}


          <hr />


          {/* =================================================
              COLORS
          ================================================= */}

          {product.colors &&
            product.colors.length > 0 && (

              <div className="color-row">

                <strong>
                  Colours:
                </strong>


                {product.colors.map(
                  (color, index) => (

                    <div
                      key={index}
                      className={`circle ${
                        selectedColor === color
                          ? "active-color"
                          : ""
                      }`}
                      style={{
                        background: color,
                      }}
                      onClick={() =>
                        setSelectedColor(color)
                      }
                    ></div>

                  )
                )}

              </div>

            )}


          {/* =================================================
              SIZE
          ================================================= */}

          {product.sizes &&
            product.sizes.length > 0 && (

              <div className="size-row">

                <strong>
                  Size:
                </strong>


                {product.sizes.map(
                  (size) => (

                    <button
                      key={size}
                      className={
                        selectedSize === size
                          ? "active-size"
                          : ""
                      }
                      onClick={() =>
                        setSelectedSize(size)
                      }
                    >

                      {size}

                    </button>

                  )
                )}

              </div>

            )}


          {/* =================================================
              BUY SECTION
          ================================================= */}

          <div className="buy-row">

            {/* Quantity */}

            <div className="quantity">

              <button
                onClick={() =>
                  setQty((prev) =>
                    Math.max(1, prev - 1)
                  )
                }
              >

                <HiMinus />

              </button>


              <span>
                {qty}
              </span>


              <button
                onClick={() =>
                  setQty((prev) =>
                    prev + 1
                  )
                }
              >

                <HiPlus />

              </button>

            </div>


            {/* Buy Now */}

            <button
              className="buy-btn"
              onClick={() => {
                navigate("/checkout", {
                  state: {
                    buyNowProduct: {
                      ...product,
                      quantity: qty,
                      size: selectedSize,
                    },
                  },
                });
              }}
            >
              Buy Now
            </button>


            {/* Wishlist */}

            <button
              className="fav-btn"
              onClick={handleWishlist}
            >

              <FaHeart
                color={
                  isInWishlist(product.id)
                    ? "red"
                    : "black"
                }
              />

            </button>

          </div>


          {/* =================================================
              DELIVERY
          ================================================= */}

          <div className="delivery-box">

            {/* Free Delivery */}

            <div className="delivery-item">

              <div className="delivery-icon">

                <TbTruckDelivery />

              </div>


              <div>

                <h4>
                  Free Delivery
                </h4>

                <p>
                  Enter your postal code
                  for Delivery Availability
                </p>

              </div>

            </div>


            {/* Return Delivery */}

            <div className="delivery-item">

              <div className="delivery-icon">

                <TbRefresh />

              </div>


              <div>

                <h4>
                  Return Delivery
                </h4>

                <p>
                  Free 30 Days Delivery Returns.
                  Details
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          IMAGE MODAL
      ================================================= */}

      {showImage && (

        <div
          className="image-modal"
          onClick={() =>
            setShowImage(false)
          }
        >

          {/* Close */}

          <span
            className="close-image"
            onClick={() =>
              setShowImage(false)
            }
          >
            &times;
          </span>


          {/* Previous */}

          <button
            className="prev-image"
            onClick={handlePrevImage}
          >

            <HiChevronLeft />

          </button>


          {/* Zoom Image */}

          <img
            src={product.images[selectedImage]}
            alt={product.title}
            className="zoom-image"
            onClick={(e) =>
              e.stopPropagation()
            }
          />


          {/* Next */}

          <button
            className="next-image"
            onClick={handleNextImage}
          >

            <HiChevronRight />

          </button>

        </div>

      )}


      {/* =================================================
          RELATED PRODUCTS
      ================================================= */}

      {/* <RecomDetails /> */}

    </div>
  );
}