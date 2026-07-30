import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/AccountPage/SignUp";
import Home from "./components/Home/Home";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;