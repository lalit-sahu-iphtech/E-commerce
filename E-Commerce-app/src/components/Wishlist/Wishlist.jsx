import "./wishlist.css";
import { FaTrashAlt } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useWishlist } from "../../context/WishlistContext";
import RecommendedCard from "./RecommendedCard";

import laptop from "../../assets/exploreProducts/laptop.png";
import monitor from "../../assets/products/monitor.png";
import gamepad from "../../assets/products/gamepad.png";
import keyboard from "../../assets/products/keyboard.png";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
const recommendedProducts = [
  {
    id: 5,
    image: laptop,
    title: "ASUS FHD Gaming Laptop",
    price: 960,
    oldPrice: 1160,
    discount: "-35%",
    rating: 5,
    reviews: 65,
  },
  {
    id: 6,
    image: monitor,
    title: "IPS LCD Gaming Monitor",
    price: 160,
    oldPrice: 170,
    rating: 5,
    reviews: 65,
  },
  {
    id: 7,
    image: gamepad,
    title: "HAVIT HV-G92 Gamepad",
    price: 560,
    oldPrice: 650,
    new: true,
    rating: 5,
    reviews: 65,
  },
  {
    id: 8,
    image: keyboard,
    title: "AK-900 Wired Keyboard",
    price: 200,
    oldPrice: 260,
    rating: 5,
    reviews: 65,
  },
];

export default function Wishlist() {
    const {
        addToCart
    } = useCart();
    const navigate = useNavigate();
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  const handleMoveAllToBag = () =>{
    if(wishlist.length === 0){
        alert("Wishlist is empty");
        return;
    }
    wishlist.forEach((item) => {
        addToCart(item);
      });
    
    clearWishlist();
    alert("All products moved to cart");
  }

  return (
    <div className="wishlist-page">

      {/* Wishlist Header */}

      <div className="wishlist-header">
        <h2>Wishlist ({wishlist.length})</h2>

        <button className="move-btn" onClick={handleMoveAllToBag}>
          Move All To Bag
        </button>
      </div>

      {/* Wishlist */}

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <h2>Your Wishlist is Empty ❤️</h2>
          <p>Add some products to your wishlist.</p>
        </div>
      ) : (
        <div className="wishlist-grid">

          {wishlist.map((product) => (

            <div
              className="wishlist-card"
              key={product.id}
            >

              <div className="wishlist-image">

                <img
                  src={product.image}
                  alt={product.title}
                />

                <button
                  className="delete-btn"
                  onClick={() =>
                    removeFromWishlist(product.id)
                  }
                >
                  <FaTrashAlt />
                </button>

                    <button
                    className="cart-btn"
                    onClick={() => addToCart(product)}
                    >
                    <HiOutlineShoppingCart />
                    Add To Cart
                    </button>

              </div>

              <h3>{product.title}</h3>

              <div className="price">

                <span className="new-price">
                  ${product.price}
                </span>
{/* 
                {product.oldPrice && (
                  <span className="old-price">
                    ${product.oldPrice}
                  </span>
                )} */}

              </div>

            </div>

          ))}

        </div>
      )}

      {/* Just For You */}

      <div className="just-header">

        <div className="just-left">
          <span className="red-bar"></span>
          <h2>Just For You</h2>
        </div>

        <button className="move-btn" onClick={() => navigate("/")}>
          See All
        </button>

      </div>

      <div className="wishlist-grid">

        {recommendedProducts.map((product) => (

          <RecommendedCard
            key={product.id}
            product={product}
          />

        ))}

      </div>
     

    </div>
  );
}