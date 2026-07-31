import "./productDetails.css";
import { useParams } from "react-router-dom";
import { FaStar, FaRegStar, FaHeart } from "react-icons/fa";
import { HiMinus, HiPlus } from "react-icons/hi";
import { useState } from "react";

import gamepad from "../../assets/products/gamepad.png";
import keyboard from "../../assets/products/keyboard.png";
import monitor from "../../assets/products/monitor.png";
import chair from "../../assets/products/chair.png";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const products = [
  {
    id: 1,
    image: gamepad,
    title: "HAVIT HV-G92 Gamepad",
    price: 120,
    oldPrice: 160,
    rating: 5,
    reviews: 88,
    description:
      "Play comfortably with ergonomic design, vibration support and responsive controls.",
  },

  {
    id: 2,
    image: keyboard,
    title: "AK-900 Wired Keyboard",
    price: 960,
    oldPrice: 1160,
    rating: 4,
    reviews: 75,
    description:
      "Mechanical gaming keyboard with RGB lighting and premium switches.",
  },

  {
    id: 3,
    image: monitor,
    title: "IPS LCD Gaming Monitor",
    price: 370,
    oldPrice: 400,
    rating: 5,
    reviews: 99,
    description:
      "24-inch IPS display with vibrant colors and ultra-smooth gameplay.",
  },

  {
    id: 4,
    image: chair,
    title: "S-Series Comfort Chair",
    price: 375,
    oldPrice: 400,
    rating: 5,
    reviews: 99,
    description:
      "Comfortable gaming chair with adjustable height and lumbar support.",
  },
];

export default function ProductDetails() {
  const { id } = useParams();

  const product = products.find((item) => item.id === Number(id));

  const [qty, setQty] = useState(1);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Product Not Found</h2>;
  }

  return (
    <section className="details-page">

      <div className="details-left">

        <div className="small-images">

          {[1, 2, 3, 4].map((item) => (
            <div className="small-box" key={item}>
              <img src={product.image} alt="" />
            </div>
          ))}

        </div>

        <div className="main-image">
          <img src={product.image} alt={product.title} />
        </div>

      </div>

      <div className="details-right">

        <h2>{product.title}</h2>

        <div className="rating-row">

          {[...Array(5)].map((_, index) =>
            index < product.rating ? (
              <FaStar key={index} color="#FFAD33" />
            ) : (
              <FaRegStar key={index} color="#FFAD33" />
            )
          )}

          <span>({product.reviews} Reviews)</span>

          <span className="stock">
            In Stock
          </span>

        </div>

        <h3 className="price">
          ${product.price}
        </h3>

        <p className="description">
          {product.description}
        </p>

        <hr />

        <div className="color-row">

          <strong>Colours:</strong>

          <div className="circle black"></div>
          <div className="circle red"></div>

        </div>

        <div className="size-row">

          <strong>Size:</strong>

          <button>XS</button>
          <button>S</button>
          <button className="active-size">
            M
          </button>
          <button>L</button>
          <button>XL</button>

        </div>

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