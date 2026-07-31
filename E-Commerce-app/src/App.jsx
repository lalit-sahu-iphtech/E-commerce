import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/AccountPage/SignUp";
import Home from "./components/Home/Home";
import Wishlist from "./components/Wishlist/Wishlist"
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./components/Cart/Cart.jsx";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import { useState } from "react";
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

        <Route path = "/wishlist"element={<Wishlist/>}/>

        <Route path="/cart"element={<Cart />} />
        <Route
        path="/product/:id"
        element={<ProductDetails />}
        />
      </Routes>
    </>
  );
}

export default App;