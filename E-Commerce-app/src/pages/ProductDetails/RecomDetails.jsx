import "./productDetails.css";
import { useParams } from "react-router-dom";
import { FaStar, FaRegStar, FaHeart } from "react-icons/fa";
import { HiMinus, HiPlus } from "react-icons/hi";
import { useState } from "react";

import { products } from "../../data/recomonded";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function RecomDetails() {
  const { id } = useParams();

  const product = products.find((item) => item.id === Number(id));

  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes?.[0] || ""
  );

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
    <section className="details-page">
      {/* Left Section */}
      <div className="details-left">
        <div className="small-images">
          {[1, 2, 3, 4].map((item) => (
            <div className="small-box" key={item}>
              <img src={product.image} alt={product.title} />
            </div>
          ))}
        </div>

        <div className="main-image">
          <img src={product.image} alt={product.title} />
        </div>
      </div>

      {/* Right Section */}
      <div className="details-right">
        <h2>{product.title}</h2>

        {/* Rating */}
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

        {/* Price */}
        <h3 className="price">${product.price}</h3>

        {/* Description */}
        <p className="description">
          {product.description}
        </p>

        <hr />

        {/* Colors */}
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

        {/* Sizes */}
        {product.sizes && (
          <div className="size-row">
            <strong>Size:</strong>

            {product.sizes.map((size) => (
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
            ))}
          </div>
        )}

        {/* Buy Section */}
        <div className="buy-row">
          <div className="quantity">
            <button
              onClick={() =>
                qty > 1 && setQty(qty - 1)
              }
            >
              <HiMinus />
            </button>

            <span>{qty}</span>

            <button
              onClick={() =>
                setQty(qty + 1)
              }
            >
              <HiPlus />
            </button>
          </div>

          <button
            className="buy-btn"
            onClick={() =>
              addToCart({
                ...product,
                quantity: qty,
                size: selectedSize,
              })
            }
          >
            Buy Now
          </button>

          <button
            className="fav-btn"
            onClick={() =>
              toggleWishlist(product)
            }
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
      </div>
    </section>
  );
}