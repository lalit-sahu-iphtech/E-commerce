import { useState } from "react";

import signUpImg from "../../assets/sign-up/sign-up.png";
import "./signup.css";

import { useNavigate } from "react-router-dom";

import googleIcon from "../../assets/google.png";

import Footer from "../Footer/Footer";

// import { useToast } from "../../context/ToastContext";
import { showToast } from "../../redux/slices/toastSlice";

// Redux
import { useDispatch } from "react-redux";

import {
  login,
  register,
} from "../../redux/slices/authSlice";

export default function Signup({ setIsAuthenticated }) {

  const navigate = useNavigate();

  // const { showToast } = useToast();

  // Redux dispatch
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });


  // ================= VALIDATION =================

  const validateForm = () => {

    const newErrors = {};

    // Name validation (signup only)
    if (!isLogin) {

      if (!formData.name.trim()) {

        newErrors.name = "Name is required";

      } else if (!/^[A-Za-z ]+$/.test(formData.name)) {

        newErrors.name = "Only alphabets are allowed";

      } else if (formData.name.trim().length < 3) {

        newErrors.name =
          "Name must be at least 3 characters";

      }
    }


    // Email Validation

    if (!formData.email.trim()) {

      newErrors.email = "Email is required";

    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        formData.email
      )
    ) {

      newErrors.email = "Enter a valid email";

    }


    // password validation

    if (!formData.password.trim()) {

      newErrors.password = "Password is required";

    } else if (formData.password.length < 6) {

      newErrors.password =
        "Password must be at least 6 characters";

    } else if (formData.password.length > 20) {

      newErrors.password =
        "Password cannot exceed 20 characters";

    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,20}$/.test(
        formData.password
      )
    ) {

      newErrors.password =
        "Password must contain uppercase, lowercase, number and special character";

    }


    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };


  // ================= GET USERS =================

  const getUsers = () => {

    try {

      const savedUsers =
        JSON.parse(localStorage.getItem("users"));

      return Array.isArray(savedUsers)
        ? savedUsers
        : [];

    } catch {

      return [];

    }
  };


  // ================= SIGNUP =================

  const handleSignup = () => {

    const name = formData.name.trim();

    const email =
      formData.email.trim().toLowerCase();

    const password = formData.password;


    // if (
    //   name === "" ||
    //   email === "" ||
    //   password.trim() === ""
    // ) {
    //   alert("Please fill all fields");
    //   return;
    // }


    const users = getUsers();


    const userExist = users.find(
      (user) => user.email === email
    );


    if (userExist) {

      // alert("User already exists!");

      dispatch(showToast({
        message:"User already exists",
        type:"error"}
      ));

      return;
    }


    const newUser = {
      name,
      email,
      password,
    };


    users.push(newUser);


    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );


    // ================= REDUX REGISTER =================

    dispatch(register(newUser));


    // Current Logged In User
    // Redux register action bhi currentUser ko localStorage me save karega

    // localStorage.setItem(
    //   "currentUser",
    //   JSON.stringify(newUser)
    // );


    if (setIsAuthenticated) {

      setIsAuthenticated(true);

    }


    // alert("Account Created Successfully");

    dispatch(showToast({message :
      "Account Created Successfully",
      type:"success"}
    ));


    navigate("/");
  };


  // ================= LOGIN =================

  const handleLogin = () => {

    const email =
      formData.email.trim().toLowerCase();

    const password = formData.password;


    // if (
    //   email === "" ||
    //   password.trim() === ""
    // ) {
    //   alert("Please fill all fields");
    //   return;
    // }


    const users = getUsers();


    const user = users.find(
      (item) =>
        item.email === email &&
        item.password === password
    );


    if (user) {

      // ================= REDUX LOGIN =================

      dispatch(login(user));


      // Current Logged In User
      // Redux login action localStorage me bhi save karega

      // localStorage.setItem(
      //   "currentUser",
      //   JSON.stringify(user)
      // );


      if (setIsAuthenticated) {

        setIsAuthenticated(true);

      }


      // alert("Login Successful");

      dispatch(showToast({
        message:"Login Successful",
       type:"success"}
      ));


      navigate("/");

    } else {

      // alert("Invalid Email or Password");

      dispatch(showToast({
        message:"Invalid Email or Password",
        type:"error"}
      ));

    }
  };


  // ================= FORM SUBMIT =================

  const handleSubmit = (e) => {

    e.preventDefault();


    if (!validateForm()) return;


    if (isLogin) {

      handleLogin();

    } else {

      handleSignup();

    }
  };


  // ================= JSX =================

  return (
    <>

      <div className="signup-container">

        {/* Left Image */}

        <div className="left">

          <img
            src={signUpImg}
            alt="Sign Up"
          />

        </div>


        {/* Right Form */}

        <div className="right">

          <h1>
            {isLogin
              ? "Log in to Exclusive"
              : "Create an account"}
          </h1>


          <p>
            Enter your details below
          </p>


          <form
            id="auth-form"
            onSubmit={handleSubmit}
          >

            {/* ================= NAME ================= */}

            {!isLogin && (

              <>

                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={
                    errors.name
                      ? "input-error"
                      : ""
                  }
                />

                {errors.name && (

                  <span className="error">
                    *{errors.name}
                  </span>

                )}

              </>

            )}


            {/* ================= EMAIL ================= */}

            <>

              <input
                type="email"
                placeholder="Email or Phone Number"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={
                  errors.email
                    ? "input-error"
                    : ""
                }
              />

              {errors.email && (

                <span className="error">
                  *{errors.email}
                </span>

              )}

            </>


            {/* ================= PASSWORD ================= */}

            <>

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={
                  errors.password
                    ? "input-error"
                    : ""
                }
              />

              {errors.password && (

                <span className="error">
                  *{errors.password}
                </span>

              )}

            </>

          </form>


          {/* ================= BUTTONS ================= */}

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


          {/* ================= GOOGLE ================= */}

          {!isLogin && (

            <button
              className="google-btn"
              type="button"
            >

              <img
                src={googleIcon}
                alt="google"
              />

              Sign up with Google

            </button>

          )}


          {/* ================= LOGIN / SIGNUP ================= */}

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

     

    </>
  );
}