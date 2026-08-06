import "./productDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar, FaRegStar, FaHeart } from "react-icons/fa";
import { HiMinus, HiPlus } from "react-icons/hi";
import { useState } from "react";

import { categoryProducts } from "../../data/categoryProducts";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import RecomDetails from "./RecomDetails";

import { TbTruckDelivery, TbRefresh } from "react-icons/tb";

export default function CategoryDetails() {
  const products = Object.values(categoryProducts).flat();
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((item) => item.id === Number(id));

  const [qty, setQty] = useState(1);

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");

  const [selectedImage, setSelectedImage] = useState(0);

  const { toggleWishlist, isInWishlist } = useWishlist();
  const [showImage, setShowImage] = useState(false);

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

  return (
    <div className="product-container">
      <section className="details-page">
        {/* LEFT */}

        <div className="details-left">
          <div className="small-images">
            {product.images.map((img, index) => (
              <div
                key={index}
                className={`small-box ${
                  selectedImage === index ? "active-thumb" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.title}-${index}`} />
              </div>
            ))}
          </div>

          <div className="main-image" onClick={() => setShowImage(true)}>
            <img src={product.images[selectedImage]} alt={product.title} />
          </div>
        </div>

        {/* RIGHT */}

        <div className="details-right">
          <h2>{product.title}</h2>

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
                color: product.stock ? "#00A651" : "red",
              }}
            >
              {product.stock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <h3 className="price">${(product.price * qty).toFixed(2)}</h3>

          <p className="description">{product.description}</p>

          <hr />

          {/* COLORS */}

          <div className="color-row">
            <strong>Colours:</strong>

            {product.colors?.map((color, index) => (
              <div
                key={index}
                className="circle"
                style={{
                  background: color,
                }}
              ></div>
            ))}
          </div>

          {/* SIZE */}

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
        <div className="image-modal" onClick={() => setShowImage(false)}>
          <span className="close-image">&times;</span>

          <img
            src={product.images[selectedImage]}
            alt={product.title}
            className="zoom-image"
            onClick={(e) => {
              e.stopPropagation(); 
              setShowImage(false)
            }}
          />
        </div>
      )}

      {/* Related Products */}

      {/* <RecomDetails /> */}
    </div>
  );
}
