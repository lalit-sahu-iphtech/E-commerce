import "./wishlist.css";

import { FaTrashAlt } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi2";

// Old Context imports
// import { useWishlist } from "../../context/WishlistContext";

import RecommendedCard from "./RecommendedCard";

import { useNavigate } from "react-router-dom";

// Old Cart Context
// import { useCart } from "../../context/CartContext";

// import { useState } from "react";

import { products } from "../../data/recomonded";

// import Footer from "../Footer/Footer";

// import { useToast } from "../../context/ToastContext";

// Redux
import { useDispatch, useSelector } from "react-redux";

import {
  // toggleWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../../redux/slices/wishlistSlice";

import {
  addToCart,
  removeFromCart,
} from "../../redux/slices/cartSlice";

export default function Wishlist() {

  // ================================
  // OLD CONTEXT CODE
  // ================================

  // const { addToCart, removeFromCart, isInCart } = useCart();

  // const {
  //   wishlist,
  //   removeFromWishlist,
  //   clearWishlist
  // } = useWishlist();


  // ================================
  // REDUX
  // ================================

  const dispatch = useDispatch();

  // Get wishlist products from Redux
  const wishlist = useSelector(
    (state) => state.wishlist.items
  );

  // Get cart products from Redux
  const cart = useSelector(
    (state) => state.cart.items
  );


  // ================================
  // CHECK PRODUCT IN CART
  // ================================

  const isInCart = (id) => {
    return cart.some(
      (item) => item.id === id
    );
  };


  // ================================
  // TOAST + NAVIGATION
  // ================================

  // const { showToast } = useToast();

  const navigate = useNavigate();


  // ================================
  // OLD ADDED STATE
  // ================================

  // const [added, setAdded] = useState(false);


  // ================================
  // ADD / REMOVE CART
  // ================================

  const handleAddCart = (product) => {

    // Check current logged-in user
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );


    // User is not logged in
    if (!currentUser) {

      dispatch(showToast(
        "Please login first to add products to cart.",
        "error"
      ));

      navigate("/signup");

      return;
    }


    // ================================
    // REMOVE FROM CART
    // ================================

    if (isInCart(product.id)) {

      dispatch(
        removeFromCart(product.id)
      );

      dispatch(showToast(
        "Product removed from cart.",
        "success"
      ));

    }

    // ================================
    // ADD TO CART
    // ================================

    else {

      dispatch(
        addToCart(product)
      );

      dispatch(showToast(
        "Product added to cart.",
        "success"
      ));
    }
  };


  // ================================
  // MOVE ALL TO BAG
  // ================================

  const handleMoveAllToBag = () => {

    // Wishlist empty
    if (wishlist.length === 0) {

      // alert("Wishlist is empty");

      dispatch(showToast(
        "Wishlist is empty",
        "error"
      ));

      return;
    }


    // Add all wishlist products to cart
    wishlist.forEach((item) => {

      dispatch(
        addToCart(item)
      );

    });


    // Clear wishlist after moving
    dispatch(
      clearWishlist()
    );


    // alert("All products moved to cart");

    dispatch(showToast(
      "All products moved to cart",
      "success"
    ));
  };


  // ================================
  // JSX
  // ================================

  return (
    <>

      {/* =================================
          WISHLIST HEADER
      ================================= */}

      <div className="wishlist-header">

        <h2>
          Wishlist ({wishlist.length})
        </h2>


        <button
          className="move-btn"
          onClick={handleMoveAllToBag}
        >
          Move All To Bag
        </button>

      </div>


      {/* =================================
          WISHLIST
      ================================= */}

      {wishlist.length === 0 ? (

        <div className="empty-wishlist">

          <h2>
            Your Wishlist is Empty ❤️
          </h2>

          <p>
            Add some products to your wishlist.
          </p>

        </div>

      ) : (

        <div className="wishlist-grid">

          {wishlist.map((products, index) => (

            <div
              className="wishlist-card"
              key={products.id}
            >

              {/* =================================
                  PRODUCT IMAGE
              ================================= */}

              <div className="wishlist-image">

                {/* Discount */}
                {index === 0 &&
                  products.discount && (

                    <span className="discount-badge">
                      {products.discount}
                    </span>

                )}


                {/* Product Image */}

                <img
                  src={products.image}
                  alt={products.title}
                />


                {/* =================================
                    DELETE WISHLIST BUTTON
                ================================= */}

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => {

                    dispatch(
                      removeFromWishlist(
                        products.id
                      )
                    );

                    dispatch(showToast(
                      "Product removed from wishlist.",
                      "success"
                    ));

                  }}
                >

                  <FaTrashAlt />

                </button>


                {/* =================================
                    CART BUTTON
                ================================= */}

                <button
                  type="button"
                  className={`cart-btn ${
                    isInCart(products.id)
                      ? "added"
                      : "removed"
                  }`}
                  onClick={() =>
                    handleAddCart(products)
                  }
                >

                  <HiOutlineShoppingCart />


                  {isInCart(products.id)
                    ? "Remove Item"
                    : "Add To Cart"
                  }

                </button>

              </div>


              {/* =================================
                  PRODUCT TITLE
              ================================= */}

              <h3>
                {products.title}
              </h3>


              {/* =================================
                  PRODUCT PRICE
              ================================= */}

              <div className="price">

                <span className="new-price">
                  ${products.price}
                </span>


                {index === 0 &&
                  products.oldPrice && (

                    <span className="old-price">
                      ${products.oldPrice}
                    </span>

                )}

              </div>

            </div>

          ))}

        </div>

      )}


      {/* =================================
          JUST FOR YOU
      ================================= */}

      <div className="just-header">

        <div className="just-left">

          <span className="red-bar"></span>

          <h2>
            Just For You
          </h2>

        </div>


        <button
          className="move-btn"
          onClick={() => navigate("/")}
        >
          See All
        </button>

      </div>


      {/* =================================
          RECOMMENDED PRODUCTS
      ================================= */}

      <div className="wishlist-grid">

        {products.map((product, index) => (

          <RecommendedCard
            key={product.id}
            product={product}
            index={index}
          />

        ))}

      </div>

    </>
  );
}