import "./productDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar, FaRegStar, FaHeart } from "react-icons/fa";
import { HiMinus, HiPlus } from "react-icons/hi";
import { useState } from "react";

import { products as mainProducts } from "../../data/products";
import { categoryProducts } from "../../data/categoryProducts";
import { sidebarProducts } from "../../data/sidebarProducts";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
// import { useToast } from "../../context/ToastContext";
import { showToast } from "../../redux/slices/toastSlice";
import { useDispatch } from "react-redux";

import RecomDetails from "./RecomDetails";

import { TbTruckDelivery, TbRefresh } from "react-icons/tb";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

// Ek hi jagah teeno data source ko combine kar diya (products, categoryProducts, sidebarProducts).
// Ab id chahe products.js se aaye, categoryProducts.js se aaye ya sidebarProducts.js se — sab yahin milega.
const allProducts = [
  ...mainProducts,
  ...Object.values(categoryProducts).flat(),
  ...Object.values(sidebarProducts).flat(),
];

// Rotation fallback un products ke liye jinke paas sirf ek "image" hai, images[] nahi
// (products.js aur sidebarProducts.js mein aisa hi hai)
const imageRotation = [
  "rotate(0deg)",
  "rotate(-25deg)",
  "rotate(25deg)",
  "rotate(180deg)",
];

export default function ProductDetails() {
  // const { showToast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // products.js/categoryProducts.js ka id number hai, sidebarProducts.js ka id string (e.g. "wf-001")
  // isliye String() se compare kiya taaki dono type ke id match ho jaayein
  const product = allProducts.find((item) => String(item.id) === String(id));

  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [selectedImage, setSelectedImage] = useState(0);
  const [showImage, setShowImage] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

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

  // kahin "title" hai kahin "name"
  const title = product.title || product.name;

  // categoryProducts.js ke paas images[] array hai, baaki dono ke paas sirf ek "image"
  const hasMultipleImages = Array.isArray(product.image) && product.image.length > 0;
  const imageList = hasMultipleImages
    ? product.image
    : [product.image, product.image, product.image, product.image];

  const handleNextImage = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleBuyNow = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
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
  
  
  
    navigate("/checkout", {
      state: {
        buyNowProduct: productToBuy,
      },
    });
  };

  return (
    <div className="product-container">
      <section className="details-page">
        {/* LEFT */}

        <div className="details-left">
          <div className="small-images">
            {imageList.map((img, index) => (
              <div
                key={index}
                className={`small-box ${
                  selectedImage === index ? "active-thumb" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={img}
                  alt={`${title}-${index}`}
                  style={!hasMultipleImages ? { transform: imageRotation[index] } : undefined}
                />
              </div>
            ))}
          </div>

          <div className="main-image" onClick={() => setShowImage(true)}>
            <img
              src={imageList[selectedImage]}
              alt={title}
              style={!hasMultipleImages ? { transform: imageRotation[selectedImage] } : undefined}
            />
          </div>
        </div>

        {/* RIGHT */}

        <div className="details-right">
          <h2>{title}</h2>

          <div className="rating-row">
            {[...Array(5)].map((_, index) =>
              index < Math.floor(product.rating) ? (
                <FaStar key={index} color="#FFAD33" />
              ) : (
                <FaRegStar key={index} color="#FFAD33" />
              )
            )}

            <span>({product.reviews} Reviews)</span>

            <span
              className="stock"
              style={{
                color: product.stock === false ? "red" : "#00A651",
              }}
            >
              {product.stock === false ? "Out of Stock" : "In Stock"}
            </span>
          </div>

          <h3 className="price">${(product.price * qty).toFixed(2)}</h3>

          {product.description && (
            <p className="description">{product.description}</p>
          )}

          <hr />

          {/* COLORS - sirf tab dikhega jab product ke paas colors[] ho */}
          {product.colors && (
            <div className="color-row">
              <strong>Colours:</strong>

              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className={`circle ${
                    selectedColor === color ? "active-color" : ""
                  }`}
                  style={{
                    background: color,
                  }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          )}

          {/* SIZE - sirf tab dikhega jab product ke paas sizes[] ho */}
          {product.sizes && (
            <div className="size-row">
              <strong>Size:</strong>

              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={selectedSize === size ? "active-size" : ""}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          {/* BUY */}

          <div className="buy-row">
            <div className="quantity">
              <button onClick={() => setQty((prev) => Math.max(1, prev - 1))}>
                <HiMinus />
              </button>

              <span>{qty}</span>

              <button onClick={() => setQty((prev) => prev + 1)}>
                <HiPlus />
              </button>
            </div>

            <button className="buy-btn" onClick={handleBuyNow}>
              Buy Now
            </button>

            <button className="fav-btn" onClick={() => toggleWishlist(product)}>
              <FaHeart color={isInWishlist(product.id) ? "red" : "black"} />
            </button>
          </div>

          {/* DELIVERY */}

          <div className="delivery-box">
            <div className="delivery-item">
              <div className="delivery-icon">
                <TbTruckDelivery />
              </div>

              <div>
                <h4>Free Delivery</h4>

                <p>Enter your postal code for Delivery Availability</p>
              </div>
            </div>

            <div className="delivery-item">
              <div className="delivery-icon">
                <TbRefresh />
              </div>

              <div>
                <h4>Return Delivery</h4>

                <p>Free 30 Days Delivery Returns. Details</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showImage && (
        <div className="image-modal" onClick={() => setShowImage(false)}>
          <span className="close-image" onClick={() => setShowImage(false)}>
            &times;
          </span>

          <button className="prev-image" onClick={handlePrevImage}>
            <HiChevronLeft />
          </button>

          <img
            src={imageList[selectedImage]}
            alt={title}
            className="zoom-image"
            style={!hasMultipleImages ? { transform: imageRotation[selectedImage] } : undefined}
            onClick={(e) => e.stopPropagation()}
          />

          <button className="next-image" onClick={handleNextImage}>
            <HiChevronRight />
          </button>
        </div>
      )}

      {/* Related Products */}

      <RecomDetails />
    </div>
  );
}