import { useState } from "react";
import signUpImg from "../../assets/sign-up/sign-up.png";
import "./signup.css";

import { useNavigate } from "react-router-dom";
import googleIcon from "../../assets/google.png";
import Footer from "../Footer/Footer";

export default function Signup({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SIGNUP =================

  const handleSignup = () => {
    console.log("click")
    if (
      formData.name.trim() === "" ||
      formData.email.trim() === "" ||
      formData.password.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

  console.log("click")

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const userExist = users.find(
      (user) => user.email === formData.email
    );

    if (userExist) {
      alert("User already exists!");
      return;
    }

    users.push(formData);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    // Current Logged In User
    localStorage.setItem(
      "currentUser",
      JSON.stringify(formData)
    );

    if (setIsAuthenticated) {
      setIsAuthenticated(true);
    }

    alert("Account Created Successfully");

    navigate("/");

    window.location.reload();
  };

  // ================= LOGIN =================

  const handleLogin = () => {
    if (
      formData.email.trim() === "" ||
      formData.password.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (item) =>
        item.email === formData.email &&
        item.password === formData.password
    );

    if (user) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
      );

      if (setIsAuthenticated) {
        setIsAuthenticated(true);
      }

      alert("Login Successful");

      navigate("/");

      window.location.reload();
    } else {
      alert("Invalid Email or Password");
    }
  };

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(isLogin){
      handleLogin();
    }else{
      handleSignup();
    }

  }

  return (
    <>
      <div className="signup-container">
        <div className="left">
          <img src={signUpImg} alt="signup" />
        </div>

        <div className="right">
          <h1>
            {isLogin
              ? "Log in to Exclusive"
              : "Create an account"}
          </h1>

          <p>Enter your details below</p>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            )}

            <input
              type="text"
              placeholder="Email or Phone Number"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </form>

          <div className="btn-row">
            <button
              className="create-btn"
              type="submit"
             
            >
              {isLogin
                ? "Log In"
                : "Create Account"}
            </button>

            {isLogin && (
              <a href="#" className="forgot">
                Forgot Password
              </a>
            )}
          </div>

          {!isLogin && (
            <button className="google-btn">
              <img
                src={googleIcon}
                alt="google"
              />
              Sign up with Google
            </button>
          )}

          <p className="login-text">
            {isLogin ? (
              <>
                Don't have an account?
                <span
                  onClick={() =>
                    setIsLogin(false)
                  }
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?
                <span
                  onClick={() =>
                    setIsLogin(true)
                  }
                >
                  Log In
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}