import {
  FaRegHeart,
  FaRegEye,
  FaHeart,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
} from "react-icons/fa";

import "./product.css";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";

//redux
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, increaseQuantity,decreaseQuantity,clearCart } from "../../redux/slices/cartSlice";
import { toggleWishlist,removeFromWishlist, clearWishlist } from "../../redux/slices/wishlistSlice";

export default function ProductCard({ product }) {

  // const { toggleWishlist, isInWishlist } = useWishlist();
  // const { addToCart, removeFromCart, isInCart } = useCart();
  
  const dispatch = useDispatch();
  const cartItems = useSelector((state)=>state.cart.items);
  const wishlistItems = useSelector((state)=>state.wishlist.items);
  const isInCart = (id)=>cartItems.some((item)=>item.id === id);
  const isInWishlist = (id)=>wishlistItems.some((item)=>item.id === id);

  const navigate = useNavigate();
  const { showToast } = useToast();
  // const [added, setAdded] = useState(false);

  const handleWishlist = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      // alert("please login first to add products to wishlist.");
      showToast("please login first to add products to wishlist.", "error");
      navigate("/signup");
      return;
    }
    const alreadyInWishlist = isInWishlist(product.id);

    // toggleWishlist(product);
    dispatch(toggleWishlist(product));


    if (alreadyInWishlist) {
      showToast("Product removed from wishlist.", "success");
    } else {
      showToast("Product added to wishlist.", "success");
    }
  };
  // handle add to catt
  // const handleAddCart = () => {
  //   const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  //   if (!currentUser) {
  //     // alert("Please login first to add products to cart.");
  //     showToast("please login first to add products to Cart.", "error");

  //     navigate("/signup");
  //     return;
  //   }

  //   addToCart(product);
  //   showToast("Product added to cart.", "success");
  //   setAdded(true);
  // };
  const handleAddCart = () => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );
  
    if (!currentUser) {
      showToast(
        "Please login first to add products to cart.",
        "error"
      );
      navigate("/signup");
      return;
    }
  
    if (isInCart(product.id)) {
      // removeFromCart(product.id);
     
      dispatch(removeFromCart(product.id));

      showToast("Product removed from cart.", "success");

    } else {
      // addToCart(product);
      dispatch(addToCart(product));
      showToast("Product added to cart.", "success");
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        {product.discount && (
          <span className="discount">{product.discount}</span>
        )}

        {product.badge && (
          <span className="discount new-badge">{product.badge}</span>
        )}

        <div className="icons">
          <button className="wishlist-btn" onClick={handleWishlist}>
            {isInWishlist(product.id) ? (
              <FaHeart className="heart active-heart" />
            ) : (
              <FaRegHeart className="heart" />
            )}
          </button>

          <button
            onClick={() => navigate(`/product/${product.id}`)}
            style={{
              border: "none",
              background: "#fff",
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              padding: 0,
              margin: 0,
            }}
          >
            <FaRegEye style={{ fontSize: "18px" }} />
          </button>
        </div>

        <img src={product.image} alt={product.title} />

        <button
          className={`cart-btn ${
            isInCart(product.id) ? "added" : "removed"
          }`}
          onClick={handleAddCart}
        >
         {isInCart(product.id)
  ? "Remove Item"
  : "Add to Cart"}
        </button>
      </div>

      <h3>{product.title}</h3>

      <div className="price">
        <span className="new-price">${product.price}</span>

        {product.oldPrice && (
          <span className="old-price">${product.oldPrice}</span>
        )}
      </div>

      <div className="rating">
        {[...Array(5)].map((_, index) => {
          if (index + 1 <= Math.floor(product.rating)) {
            return <FaStar key={index} color="#FFAD33" />;
          } else if (index < product.rating && product.rating % 1 !== 0) {
            return <FaStarHalfAlt key={index} color="#FFAD33" />;
          } else {
            return <FaRegStar key={index} color="#BFBFBF" />;
          }
        })}

        <span>({product.reviews})</span>
      </div>
    </div>
  );
}
