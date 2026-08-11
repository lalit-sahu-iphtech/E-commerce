import { FaRegHeart,FaHeart,FaRegEye, FaStar, FaRegStar,  FaStarHalfAlt, } from "react-icons/fa";

import "./exploreProducts.css";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useToast } from "../../context/ToastContext";
import { showToast } from "../../redux/slices/toastSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from "../../redux/slices/cartSlice";
import { toggleWishlist, removeFromWishlist, clearWishlist } from "../../redux/slices/wishlistSlice";

export default function ExploreCard({ product }) {
  
  // const {
  //   addToCart,
  //   removeFromCart,
  //   isInCart,
  // } = useCart();
  // const { toggleWishlist, isInWishlist } = useWishlist();
  // const [added,setAdded]=useState(false);

  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || ""
  );

  const dispatch = useDispatch();

  const cart = useSelector((state)=>state.cart.items);
  const wishlist = useSelector((state)=>state.wishlist.items);

  const isInCart = (id)=>{
    return cart.some((item)=>item.id === id);
  }
  const isInWishlist = (id)=>{
    return wishlist.some((item)=>item.id === id);
  }

  const navigate = useNavigate();

  // const{showToast} = useToast();

  const handleWishlist = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
    if (!currentUser) {
      dispatch(showToast({message:"Please login first to add products to wishlist.", type:"error"}));
      navigate("/signup");
      return;
    }
  
    const alreadyInWishlist = isInWishlist(product.id);
  
    dispatch(toggleWishlist(product));
  
    if (alreadyInWishlist) {
      dispatch(showToast({message:"Product removed from wishlist.", type:"success"}));
    } else {
      dispatch(showToast({message:"Product added to wishlist.", type:"success"}));
    }
  };
  // handle add to catt
  // const handleAddCart = () => {
  //   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
  //   if (!currentUser) {
  //     showToast("Please login first to add products to cart.", "error");
  //     navigate("/signup");
  //     return;
  //   }
  
  //   addToCart(product);
  
  //   showToast("Product added to cart.", "success");
  
  //   setAdded(true);
  
  //   setTimeout(() => {
  //     setAdded(false);
  //   }, 1000);
  // };
  const handleAddCart = () => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );
  
    if (!currentUser) {
      dispatch(showToast({
        message:"Please login first to add products to cart.",
        type:"error"}
      ));
      navigate("/signup");
      return;
    }
  
    if (isInCart(product.id)) {
      dispatch(removeFromCart(product.id));
      dispatch(showToast({message:"Product removed from cart.", type:"success"}));
    } else {
      dispatch(addToCart(product));
      dispatch(showToast({message:"Product added to cart.", type:"success"}));
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        {product.badge && <span className="badge">{product.badge}</span>}

        <div className="icons">
          <button
            className="wishlist-btn"
            onClick={handleWishlist}
          >
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

        {product.showCart && <button className="cart-btn">Add To Cart</button>}
      </div>

      <h3>{product.title}</h3>

      <div className="price">
        <span className="new-price">${product.price}</span>
    

      <div className="rating">
  {[...Array(5)].map((_, index) => {
    if (index + 1 <= Math.floor(product.rating)) {
      return (
        <FaStar
          key={index}
          color="#FFAD33"
        />
      );
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
          color="#BFBFBF"
        />
      );
    }
  })}

  <span>({product.reviews})</span>
</div>
</div>

      {product.colors && product.colors.length > 0 && (
        <div className="color-options">
          {product.colors.map((color, index) => (
            <button
            key={index}
            type="button"
            className={`color-dot ${selectedColor === color ? "selected-color" : ""}`}
            style={{backgroundColor : color}}
            onClick ={()=>setSelectedColor(color)}
            aria-label={`Select ${color} color`}
            title={color}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
}
