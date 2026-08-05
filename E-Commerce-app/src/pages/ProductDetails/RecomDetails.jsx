import {
  FaRegEye,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { products } from "../../data/products";

import "./recomDetails.css";

export default function RecomDetails() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [added, setAdded] = useState(null);

  const handleAddCart = (product) => {
    addToCart(product);

    setAdded(product.id);

    setTimeout(() => {
      setAdded(null);
    }, 1000);
  };

  return (
    <section className="recommended-section">
      <div className="recommended-container">

        <div className="recommended-heading">
          <span className="heading-bar"></span>
          <h2>Related Item</h2>
        </div>

        <div className="recommended-grid">
          {products.slice(0, 4).map((product) => (
            <div className="wishlist-card" key={product.id}>
              <div className="wishlist-image">

                {product.discount && (
                  <span className="discount-badge">
                    {product.discount}
                  </span>
                )}

                <button
                  className="preview-btn"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <FaRegEye />
                </button>

                <img
                  src={product.image}
                  alt={product.title}
                />

                <button
                  className={`cart-btn ${
                    added === product.id ? "added" : ""
                  }`}
                  onClick={() => handleAddCart(product)}
                >
                  <HiOutlineShoppingCart />
                  {added === product.id
                    ? "✓ Added"
                    : "Add To Cart"}
                </button>

              </div>

              <h3>{product.title}</h3>

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
                {[...Array(5)].map((_, i) => {
                  if (i + 1 <= Math.floor(product.rating)) {
                    return <FaStar key={i} color="#FFAD33" />;
                  } else if (
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
                      color="#FFAD33"
                    />
                  );
                })}

                <span>({product.reviews})</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}