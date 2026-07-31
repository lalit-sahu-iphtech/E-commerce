import {
    
    FaChevronUp,
    FaChevronDown,
  } from "react-icons/fa";
  import {IoClose} from "react-icons/io5"
  
  import { useCart } from "../../context/CartContext";
  
  export default function CartItem({ product }) {
  
    const {
      increaseQty,
      decreaseQty,
      removeFromCart,
    } = useCart();
  
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
            onClick={() => removeFromCart(product.id)}
          >
            <IoClose />
          </button>
  
        </div>
  
        <div>
          ${product.price}
        </div>
  
        <div>
  
          <div className="qty-box">
  
            <span>{product.quantity}</span>
  
            <div className="qty-icons">
  
              <FaChevronUp
                onClick={() =>
                  increaseQty(product.id)
                }
              />
  
              <FaChevronDown
                onClick={() =>
                  decreaseQty(product.id)
                }
              />
  
            </div>
  
          </div>
  
        </div>
  
        <div>
          ${product.price * product.quantity}
        </div>
  
      </div>
    );
  }