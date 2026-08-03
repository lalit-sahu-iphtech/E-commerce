import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/AccountPage/Signup";
import Home from "./components/Home/Home";
import Wishlist from "./components/Wishlist/Wishlist"
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import RecomDetails from "./pages/ProductDetails/RecomDetails";

import Cart from "./components/Cart/Cart.jsx";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import AllProducts from "./pages/AllProducts/AllProducts";

import Profile from "./pages/Profile/Profile";

import { useState } from "react";
import Checkout from "./pages/Checkout/Checkout";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated}
/>} />

<Route path="/profile" element={<Profile />} />

        <Route path = "/wishlist"element={<Wishlist/>}/>

        <Route path="/cart"element={<Cart />} />

           <Route path="/products" element={<AllProducts />} />
        <Route
        path="/product/:id"
        element={<ProductDetails />}
        />
        <Route path="/product/:id/:title" element={<RecomDetails/>} />

        <Route path="/checkout"element={<Checkout/>}/>
     
      </Routes>
    </>
  );
}

export default App;