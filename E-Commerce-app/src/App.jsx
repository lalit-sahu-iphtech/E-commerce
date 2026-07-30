import { useState } from "react";
import SignUp from "./components/AccountPage/Signup";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
   
      {isAuthenticated ? (
        <Home />
      ) : (
        <SignUp setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
}

export default App;