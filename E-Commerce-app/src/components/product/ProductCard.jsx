import {
  FaRegHeart,
  FaRegEye,
    FaStar,
    FaRegStar,
  } from "react-icons/fa";
  
  import "./product.css";
  
  export default function ProductCard({ product }) {
    return (
      <div className="product-card">
  
        <div className="product-image">
  
          <span className="discount">
            {product.disCount}
          </span>
  
          <div className="icons">
            <FaRegHeart />
            <FaRegEye />
          </div>
  
          <img src={product.image} alt={product.title} />
  
          <button className="cart-btn">
            Add To Cart
          </button>
  
        </div>
  
        <h3>{product.title}</h3>
  
        <div className="price">
          <span className="new-price">
            ${product.price}
          </span>
  
          <span className="old-price">
            ${product.oldPrice}
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
  
      </div>
    );
  }