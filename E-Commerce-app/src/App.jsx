import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/AccountPage/Signup";
import Home from "./components/Home/Home";
import Wishlist from "./components/Wishlist/Wishlist";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import RecomDetails from "./pages/ProductDetails/RecomDetails";

import Cart from "./components/Cart/Cart.jsx";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import AllProducts from "./pages/AllProducts/AllProducts";

import "./App.css";
import Profile from "./pages/Profile/Profile";
import { useState } from "react";
import Checkout from "./pages/Checkout/Checkout";
import Footer from "./components/Footer/Footer";
import CategoryProductsPage from "./pages/CategoryProducts/CategoryProductsPage.jsx";
import CategoryDetails from "./pages/ProductDetails/CategoryDetails.jsx";
import SidebarProductsPage from "./pages/SidebarProductsPage/SidebarProductsPage.jsx";
import SidebarDetails from "./pages/ProductDetails/SidebarDetails.jsx";
import FaqPage from "./pages/FAQ/FaqPage";
import PrivacyPage from "./pages/Privacy/PrivacyPage";
import TermsPage from "./pages/Terms/TermsPage";
// import   MainProductsPage from "./pages/MainProductsPage/MainProductsPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="app-content">
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq"element={<FaqPage/>}/>
          <Route path="/privacy"element={<PrivacyPage/>}/>
          <Route path="/terms"element={<TermsPage/>}/>


          <Route
            path="/signup"
            element={<SignUp setIsAuthenticated={setIsAuthenticated} />}
          />

          <Route path="/profile" element={<Profile />} />

          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/products" element={<AllProducts />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/product/:id/:title" element={<RecomDetails />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route
            path="/category/:categoryName"
            element={<CategoryProductsPage />}
          />

          <Route path="/category-product/:id" element={<CategoryDetails />} />

          <Route
            path="/sidebar/:categoryName"
            element={<SidebarProductsPage />}
          />

          <Route path="/sidebar-product/:id" element={<SidebarDetails />} />
          {/* <Route
  path="/main/:categoryName"
  element={<MainProductsPage />}
/> */}
        </Routes>

      </main>
      <Footer />
    </div>
  );
}

export default App;
