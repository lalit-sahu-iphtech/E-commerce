import {
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";

import { IoClose } from "react-icons/io5";

import { useDispatch } from "react-redux";
import { removeFromCart, decreaseQuantity,increaseQuantity, clearCart } from "../../redux/slices/cartSlice";

// import { useCart } from "../../context/CartContext";

export default function CartItem({ product }) {

  // ================================
  // OLD CART CONTEXT
  // ================================

  // const {
  //   increaseQty,
  //   decreaseQty,
  //   removeFromCart,
  // } = useCart();


  // ================================
  // REDUX
  // ================================

  const dispatch = useDispatch();


  return (
    <div className="cart-row">

      <div className="cart-product">

        <img
          src={product.image}
          alt={product.title}
        />

        <span>{product.title}</span>

        <button
          className="remove-item"
          onClick={() =>
            dispatch(removeFromCart(product.id))
          }
        >
          <IoClose />
        </button>

      </div>


      <div>
        ${product.price}
      </div>


      <div>

        <div className="qty-box">

          <span>
            {product.quantity || 1}
          </span>

          <div className="qty-icons">

            <FaChevronUp
              onClick={() =>
                dispatch(
                  increaseQuantity(product.id)
                )
              }
            />

            <FaChevronDown
              onClick={() =>
                dispatch(
                  decreaseQuantity(product.id)
                )
              }
            />

          </div>

        </div>

      </div>


      <div>
        $
        {(
          product.price *
          (product.quantity || 1)
        ).toFixed(2)}
      </div>

    </div>
  );
}