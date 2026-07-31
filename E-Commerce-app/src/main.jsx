import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import "./index.css";

import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";
import { CategoryProvider } from "./context/CategoryContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
     <SearchProvider>
     < CategoryProvider >
     <CartProvider>
      <WishlistProvider>
        <App />
      </WishlistProvider>
      </CartProvider>
     </ CategoryProvider >
     </SearchProvider>
    </BrowserRouter>
  </React.StrictMode>
);