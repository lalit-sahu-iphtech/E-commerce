import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import "./index.css";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";
import { CategoryProvider } from "./context/CategoryContext";
import ScrollToTop from "./components/ScrollToTop";
import { ToastProvider } from "./context/ToastContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <ScrollToTop/>
     <SearchProvider>
     < CategoryProvider >
     <CartProvider>
      <WishlistProvider>
        <ToastProvider>
        <App />

        </ToastProvider>
       
      </WishlistProvider>
      </CartProvider>
     </ CategoryProvider >
     </SearchProvider>
    </BrowserRouter>
  </React.StrictMode>
);