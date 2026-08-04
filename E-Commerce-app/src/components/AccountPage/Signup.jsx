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

  const getUsers = () => {
    try {
      const savedUsers = JSON.parse(localStorage.getItem("users"));
      return Array.isArray(savedUsers) ? savedUsers : [];
    } catch {
      return [];
    }
  };

  // ================= SIGNUP =================

  const handleSignup = () => {
    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (
      name === "" ||
      email === "" ||
      password.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    const users = getUsers();

    const userExist = users.find(
      (user) => user.email === email
    );

    if (userExist) {
      alert("User already exists!");
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    // Current Logged In User
    localStorage.setItem(
      "currentUser",
      JSON.stringify(newUser)
    );

    if (setIsAuthenticated) {
      setIsAuthenticated(true);
    }

    alert("Account Created Successfully");

    navigate("/");

  };

  // ================= LOGIN =================

  const handleLogin = () => {
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (
      email === "" ||
      password.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    const users = getUsers();

    const user = users.find(
      (item) =>
        item.email === email &&
        item.password === password
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

          <form id="auth-form" onSubmit={handleSubmit}>
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
              type="email"
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

                {isLogin ? (
                  <>
                    <button
                      className="login-btn"
                      type="submit"
                      form="auth-form"
                    >
                      Log In
                    </button>

                    <button
                      type="button"
                      className="forgot-btn"
                    >
                      Forgot Password?
                    </button>
                  </>
                ) : (
                  <button
                    className="create-btn"
                    type="submit"
                    form="auth-form"
                  >
                    Create Account
                  </button>
                )}

</div>

          {!isLogin && (
            <button className="google-btn" type="button">
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
                {/* Don't have an account? */}
                <span
                  onClick={() =>
                    setIsLogin(false)
                  }
                >
                  {/* Sign Up */}
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
