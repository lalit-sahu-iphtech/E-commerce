import {
    FaRegHeart,
    FaRegEye,
    FaStar,
    FaRegStar,
  } from "react-icons/fa";
  
  import "./exploreProducts.css";
  
  export default function ExploreCard({ product }) {
    return (
      <div className="product-card">
  
        <div className="product-image">
  
          {product.badge && (
            <span className="badge">
              {product.badge}
            </span>
          )}
  
          <div className="icons">
            <FaRegHeart />
            <FaRegEye />
          </div>
  
          <img src={product.image} alt={product.title} />
  
          {product.showCart && (
            <button className="cart-btn">
              Add To Cart
            </button>
          )}
  
        </div>
  
        <h3>{product.title}</h3>
  
        <div className="price">
          <span className="new-price">
            ${product.price}
          </span>
        </div>
  
        <div className="rating">
  
          {[...Array(5)].map((_, index) =>
            index < product.rating ? (
              <FaStar key={index} color="#FFAD33" />
            ) : (
              <FaRegStar key={index} color="#FFAD33" />
            )
          )}
  
          <span>({product.reviews})</span>
  
        </div>
  
        {product.colors && (
          <div className="color-options">
            {product.colors.map((color, index) => (
              <span
                key={index}
                className="color-dot"
                style={{ background: color }}
              />
            ))}
          </div>
        )}
  
      </div>
    );
  }