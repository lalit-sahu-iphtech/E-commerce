import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const cartKey = currentUser
    ? `cart_${currentUser.email}`
    : null;

  const [cart, setCart] = useState(() => {
    if (!cartKey) return [];

    return (
      JSON.parse(localStorage.getItem(cartKey)) || []
    );
  });

  // Load cart when user changes
  useEffect(() => {
    if (!cartKey) {
      setCart([]);
      return;
    }

    const data =
      JSON.parse(localStorage.getItem(cartKey)) || [];

    setCart(data);
  }, [cartKey]);

  // Save cart
  useEffect(() => {
    if (cartKey) {
      localStorage.setItem(
        cartKey,
        JSON.stringify(cart)
      );
    }
  }, [cart, cartKey]);

  // Add Product
  const addToCart = (product) => {

    const exist = cart.find(
      (item) => item.id === product.id
    );

    if (exist) {

      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);

    }
  };

  // Remove
  const removeFromCart = (id) => {
    setCart(
      cart.filter((item) => item.id !== id)
    );
  };

  // Increase
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // Decrease
  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )
    );
  };

  // Clear
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () =>
  useContext(CartContext);