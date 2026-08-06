import "./productDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar, FaRegStar, FaHeart } from "react-icons/fa";
import { HiMinus, HiPlus } from "react-icons/hi";
import { useState } from "react";

import { sidebarProducts } from "../../data/sidebarProducts";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import RecomDetails from "./RecomDetails";

import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

export default function SidebarDetails() {
  const products = Object.values(sidebarProducts).flat();
  const { id } = useParams();
  const navigate = useNavigate();

  // FIX: id is a string like "wf-001" — Number(id) was turning it into NaN,
  // so the product was never found. Compare as string instead.
  const product = products.find((item) => item.id === id);

  const [qty, setQty] = useState(1);

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");

  const [selectedImage, setSelectedImage] = useState(0);
  const [showImage, setShowImage] = useState(false);

  // Our data has only a single "image" per product (no images[] array).
  // Same as ProductDetails.jsx: reuse that one image at 4 different
  // rotations so we still get 4 thumbnails + a matching main image.
  const imageRotation = [
    "rotate(0deg)",
    "rotate(-25deg)",
    "rotate(25deg)",
    "rotate(180deg)",
  ];

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Product Not Found
      </h2>
    );
  }

  return (
    <div className="product-container">
      <section className="details-page">
        {/* LEFT */}
        <div className="details-left">
          <div className="small-images">
            {imageRotation.map((rotation, index) => (
              <div
                key={index}
                className={`small-box ${
                  selectedImage === index ? "active-thumb" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={product.image}
                  alt={`${product.name}-${index}`}
                  style={{ transform: rotation }}
                />
              </div>
            ))}
          </div>

          <div className="main-image" onClick={() => setShowImage(true)}>
            <img
              src={product.image}
              alt={product.name}
              style={{ transform: imageRotation[selectedImage] }}
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="details-right">
          {/* was product.title -> data uses "name" */}
          <h2>{product.title || product.name}</h2>

          <div className="rating-row">
            {[...Array(5)].map((_, index) =>
              index < Math.floor(product.rating) ? (
                <FaStar key={index} color="#FFAD33" />
              ) : (
                <FaRegStar key={index} color="#FFAD33" />
              )
            )}

            <span>({product.reviews} Reviews)</span>

            {/* FIX: our data doesn't have a "stock" field yet.
                Defaulting to "In Stock" so it doesn't always show red/out-of-stock.
                Add a real `stock` field to sidebarProducts.js if you want this accurate. */}
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

          {/* FIX: no "description" field in data yet — guard so it doesn't render "undefined" */}
          {product.description && (
            <p className="description">{product.description}</p>
          )}

          <hr />

          {/* COLORS - only renders if you add a colors[] field to a product */}
          {product.colors && (
            <div className="color-row">
              <strong>Colours:</strong>
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className="circle"
                  style={{ background: color }}
                ></div>
              ))}
            </div>
          )}

          {/* SIZE - only renders if you add a sizes[] field to a product */}
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
  <div
    className="image-modal"
    onClick={() => setShowImage(false)}
  >
    <span className="close-image">&times;</span>

    <img
      src={product.image}
      alt={product.title}
      className="zoom-image"
      style={{
        transform: imageRotation[selectedImage],
      }}
    />
  </div>
)}
    </div>
  );
}
