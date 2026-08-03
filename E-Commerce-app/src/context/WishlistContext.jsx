import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

    // const data = localStorage.getItem("wishlist");
    // return data ? JSON.parse(data) : [];
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );
    const wishlistKey = currentUser ? `wishlist_${currentUser.email}`:null;

    const [wishlist, setWishlist] = useState(() => {

    if(!wishlistKey) return [];

    return( JSON.parse(localStorage.getItem(wishlistKey)) || []);
  });
  useEffect(() => {
    if (wishlistKey) {
      localStorage.setItem(
        wishlistKey,
        JSON.stringify(wishlist)
      );
    }
  }, [wishlist]);

  // useEffect(() => {
  //   localStorage.setItem("wishlist", JSON.stringify(wishlist) || []);
  // }, [wishlist]);

  // Add Product
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
  
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
  
      return [...prev, product];
    });
  };

  // Remove Product
  const removeFromWishlist = (id) => {

    setWishlist(
      wishlist.filter((item) => item.id !== id)
    );
  };

  // Heart Toggle
  const toggleWishlist = (product) => {

    const exists = wishlist.find(
      (item) => item.id === product.id
    );

    if (exists) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Check Product
  const isInWishlist = (id) => {
    return wishlist.some((item) => item.id === id);
  };

  const clearWishlist = () =>{
    setWishlist([]);
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);