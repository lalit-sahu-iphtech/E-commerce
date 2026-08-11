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
import Toast from "./components/Toast/Toast";
import { PersistGate } from "redux-persist/integration/react";
import {Provider} from "react-redux";
import{store,persistor} from "./redux/store"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <Provider store={store}>
      <PersistGate loading={null}persistor={persistor}>
    <BrowserRouter>
    <ScrollToTop/>
     <SearchProvider>
     < CategoryProvider >
     <CartProvider>
      <WishlistProvider>
        <ToastProvider>
        <App />
        <Toast />
       

        </ToastProvider>
       
      </WishlistProvider>
      </CartProvider>
     </ CategoryProvider >
     </SearchProvider>
    </BrowserRouter>
    </PersistGate>
    </Provider>

  </React.StrictMode>
);
