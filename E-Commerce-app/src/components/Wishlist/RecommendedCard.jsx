import { FaRegHeart, FaRegEye, FaStar, FaRegStar,FaStarHalfAlt, } from "react-icons/fa";

import { HiOutlineShoppingCart } from "react-icons/hi2";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import "../product/product.css"

export default function RecommendedCard({ product, index}) {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const navigate = useNavigate();

   const [added, setAdded] = useState(false);

    const handleAddCart = (product) =>{
     addToCart(product);
     setAdded(product.id);
     setTimeout(() =>{
      setAdded(null);
     },1000);

    }

  return (
    <div className="wishlist-card">
      <div className="wishlist-image">
        {index == 0 && product.discount && (
           <span className="discount-badge">{product.discount}</span>
        )}
       

        {product.new && <span className="new-badge">NEW</span>}

        {/* <button
            className="heart-btn"
            onClick={() => addToWishlist(product)}
          >
            <FaRegHeart />
          </button> */}

        {/* <button className="preview-btn">
          <FaRegEye />
        </button> */}
     <button
  className="preview-btn"
  onClick={() =>
    navigate(
      `/product/${product.id}/${product.title
        .toLowerCase()
        .replace(/\s+/g, "-")}`
    )
  }
>
  <FaRegEye />
</button>

        <img src={product.image} alt={product.title} />

            <button
              className={`cart-btn ${added === product.id ? "added" : ""}`}
              onClick={() => handleAddCart(product)}
            >
              <HiOutlineShoppingCart />
              {added === product.id ? "✓ Added" : "Add To Cart"}
            </button>
      </div>

      <h3>{product.title}</h3>

      <div className="price">
        <span className="new-price">${product.price}</span>
         {index == 0 && product.oldPrice && (
            <span className="old-price">
            ${product.oldPrice}
          </span>
         )}
      
      </div>

      <div className="rating">
        {[...Array(5)].map((_, index) => {
          if (index + 1 <= Math.floor(product.rating)) {
            return <FaStar key={index} color="#FFAD33" />;
          } else if (
            index < product.rating &&
            product.rating % 1 !== 0
          ) {
            return (
              <FaStarHalfAlt
                key={index}
                color="#FFAD33"
              />
            );
          } else {
            return (
              <FaRegStar
                key={index}
                color="#FFAD33"
              />
            );
          }
        })}

        <span>({product.reviews})</span>
      </div>

    </div>
  );
}
