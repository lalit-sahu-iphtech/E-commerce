import { useState } from "react"
import signUpImg from "../../assets/sign-up/sign-up.png"
import "./signup.css"

import { useNavigate } from "react-router-dom";
import googleIcon from "../../assets/google.png";
import Footer from "../Footer/Footer";

export default function SignUp({ setIsAuthenticated }){
    const navigate = useNavigate();
   const[isLogin, setIsLogin] = useState(false);
   const[formData, setFormData] = useState({
    name : "",
    email : "",
    password : "",
   })
   const handleChange = (e) =>{
    setFormData({...formData, [e.target.name] : e.target.value})
   }
   const handleSignup = () =>{
    if(formData.name === "" ||
       formData.email === "" ||
       formData.password === ""
    ){
        alert("please fill all fields");
        return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // check duplicate email
    const userExist = users.find((user) =>user.email === formData.email);
    if(userExist){
        alert("User already exists!")
        return;
    }
    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));
    console.log("Signup Success")
    console.log(users);
    alert("Account created Successfully");
    setIsAuthenticated(true);
    navigate("/");

    setFormData({
        name : "",
        email : "",
        password : "",
    })
    setIsLogin(true);
   }

   const handleLogin = () =>{
    if(
    formData.email === "" ||
    formData.password === ""
 ){
     alert("please fill all fields");
     return;
 }
    //get old data
   const users = JSON.parse(localStorage.getItem("users")) || [];
   const user = users.find((item) =>
        item.email === formData.email &&
        item.password === formData.password
    );
    if (user) {

        alert("Login Successful");
      
        localStorage.setItem(
          "currentUser",
          JSON.stringify(user)
        );
      
        setIsAuthenticated(true);
      
        navigate("/");
      
      } else {
      
        alert("Invalid Email or Password");
      
      }
    setFormData({
        name: "",
        email: "",
        password: "",
      });
   }
   
    return(
    <>
        <div className="signup-container">
          <div className="left">
          <img src={signUpImg} alt="signup img" />
          </div>
          <div className="right">
            <h1>
                {isLogin ? "Log in to Exclusive" : "Create an account"}
               </h1>
            <p>Enter your details below</p>
        <form >

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
                placeholder="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                
           
            />
            
    </form>
          
           <div className="btn-row">
           <button className="create-btn"
           onClick={isLogin ? handleLogin : handleSignup}
           >
                {isLogin ? "Log In" : "Create Account"}
                </button>
                {isLogin && (
                    <a href="#" className="forgot">Forgot Password</a>
                )}
           </div>
           
          
          {!isLogin && (
             <button className="google-btn">
             <img 
              src={googleIcon}
             alt="google" />
             sign up with Google
             </button>
          )}
            

            <p className="login-text">
                {isLogin ? (
                    <>Don't have an account ? 
                    <span onClick={() => setIsLogin(false)}>Sign Up</span></>
                ) : (
                    <>
                    Already have account ? <span onClick={()=>setIsLogin(true)}>Log in</span>
                    </>
                )}
                </p>
                
          </div>
        </div>
        <Footer/>
        <h1>footer</h1>
    </>
    )
}