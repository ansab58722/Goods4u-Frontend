import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import "../css/LoginSignup.css"; // Include your CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGooglePlusG,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import Spinner from "../Components/Spinner";
import Alert from "../Components/Alert";
import Footer from "../Components/Footer";
import Navbardesktop from "../Components/Navbar-desktop";
import { useNavigate } from "react-router-dom";


const LoginSignup = () => {
  const navigate = useNavigate();
  
  // Animation refs
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const socialRef = useRef(null);
  
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px 0px" });
  const isFormInView = useInView(formRef, { once: true, margin: "-100px 0px" });
  const isSocialInView = useInView(socialRef, { once: true, margin: "-50px 0px" });

  useEffect(() => {
    const verifyAuth = async () => {

      //localStorage.setItem("Is_logged_In", "true");
      try {
        //cecks if user has already login and validate the login from server

        if (localStorage.getItem("Is_logged_In")) {
          const response = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}/Checkauthentication`,
            {
              method: "GET",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
            }
          );

          const data = await response.json();

          if (data.statusCode === 200 || data.statusCode === 201) {


           localStorage.setItem("Is_logged_In", "true");
            localStorage.setItem("User",JSON.stringify(data.User));
           

           
         navigate("/");


          }else{

            //clears login status if cookie is expired or or manipulation detected

            localStorage.clear();
          }
        }
      } catch (error) {
        showAlert("Network error occurred. Please try again.", "error");
        console.error("Error:", error);
      }
    };

    verifyAuth();
  }, []);

  const initialSignupFormState = { Name: "", Email: "", Password: "" };
  const initialLoginFormState = { Email: "", Password: "" };

  const [Sign_up_data, Set_signup_data] = useState(initialSignupFormState);
  const [Login_data, Set_login_data] = useState(initialLoginFormState);

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  // Password strength validation
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false
  });

  const validatePassword = (password) => {
    const strength = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
    setPasswordStrength(strength);
    return strength;
  };

  const isPasswordValid = () => {
    return Object.values(passwordStrength).every(requirement => requirement === true);
  };

  // --- Signup Handlers ---
  const handle_signup_Input = (e) => {
    const { name, value } = e.target;
    Set_signup_data({
      ...Sign_up_data,
      [name]: value,
    });
    
    // Validate password in real-time
    if (name === "Password") {
      validatePassword(value);
    }
  };

  const clearSignupForm = () => {
    Set_signup_data(initialSignupFormState);
    setPasswordStrength({
      length: false,
      lowercase: false,
      uppercase: false,
      number: false,
      special: false
    });
  };

  // --- Login Handlers ---
  const handle_login_Input = (e) => {
    Set_login_data({
      ...Login_data,
      [e.target.name]: e.target.value,
    });
  };

  const clearLoginForm = () => {
    Set_login_data(initialLoginFormState);
  };

  // --- Common Handlers ---
  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
  };

  const hideAlert = () => {
    setAlert({ show: false, message: "", type: "" });
  };

  // --- API Call Handlers ---
  const Handle_signup = async (event) => {
    event.preventDefault();
    
    // Check password strength before submitting
    if (!isPasswordValid()) {
      showAlert("Please ensure your password meets all requirements", "error");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/Signup`, {
        method: "POST",
        body: JSON.stringify(Sign_up_data),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.statusCode === 200 || data.statusCode === 201) {
        showAlert(data.Details, "success");
      } else if (data.statusCode === 409) {
        showAlert("User already exists", "error");
      } else {
        showAlert(data.Details || "An error occurred during signup", "error");
      }
    } catch (error) {
      showAlert("Network error occurred. Please try again.", "error");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
      clearSignupForm();
    }
  };

  const Handle_login = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Login_data),
        credentials: "include",
      });

      const data = await response.json();

      if (data.status === "success") {

        localStorage.setItem("Is_logged_In", "true");
          localStorage.setItem("User",JSON.stringify(data.user));
        showAlert(data.Details, "success");
        // TODO: Handle successful login (e.g., save token, redirect)

        //console.log("Login successful, user data:", data.user);
             navigate("/");

       
      } else {
        showAlert(data.Details || "An error occurred during login", "error");
      }
    } catch (error) {
      showAlert("Network error occurred. Please try again.", "error");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
      clearLoginForm();
    }
  };

  // --- UI Switch Handler ---
  const [isSignupMode, setIsSignupMode] = useState(false);

  const Handle_login_signup_switch = () => {
    setIsSignupMode(!isSignupMode);
    // Clear forms when switching
    clearLoginForm();
    clearSignupForm();
  };

  return (
    <div className="login-signup-page">
      <Navbardesktop />
      
      {alert.show && (
        <Alert message={alert.message} type={alert.type} onClose={hideAlert} />
      )}

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="login-hero"
        initial={{ opacity: 0, y: 50 }}
        animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-background"></div>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Welcome to Goods4U
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Sign in to your account or create a new one to get started
          </motion.p>
        </div>
      </motion.section>

      {/* Login/Signup Form Section */}
      <motion.section 
        ref={formRef}
        className="login-main"
        initial={{ opacity: 0, y: 50 }}
        animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="login-grid">
            {/* Left side - Welcome content */}
            <motion.div 
              className="welcome-content"
              initial={{ opacity: 0, x: -50 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2>Join Our Community</h2>
              <p>Discover amazing products and exclusive deals</p>
              <div className="features-list">
                <div className="feature-item">
                  <span className="feature-icon">🎯</span>
                  <span>Curated Products</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🚚</span>
                  <span>Fast Delivery</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">💎</span>
                  <span>Premium Quality</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🔒</span>
                  <span>Secure Shopping</span>
                </div>
              </div>
            </motion.div>

            {/* Right side - Form */}
            <motion.div 
              className="form-container-wrapper"
              initial={{ opacity: 0, x: 50 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="login_signup_container">
                <div className="form-wrapper">
        {!isSignupMode ? (
          /* Login Form */
          <form className="login_signup_form" onSubmit={Handle_login}>
            <h1 className="login_signup_h1">Welcome Back! 👋</h1>
            <p className="login_signup_p">Sign in to your account</p>
            
            <motion.div 
              ref={socialRef}
              className="social-container"
              initial={{ opacity: 0, y: 20 }}
              animate={isSocialInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.a 
                href="#" 
                className="social login_signup_a"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </motion.a>
              <motion.a 
                href="#" 
                className="social login_signup_a"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <FontAwesomeIcon icon={faGooglePlusG} />
              </motion.a>
              <motion.a 
                href="#" 
                className="social login_signup_a"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </motion.a>
            </motion.div>
            
            <span className="divider-text">or use your email</span>
            
            <input
              className="login_signup_input"
              type="email"
              placeholder="📧 Email"
              required
              name="Email"
              value={Login_data.Email}
              onChange={handle_login_Input}
              disabled={isLoading}
            />
            <input
              className="login_signup_input"
              type="password"
              placeholder="🔒 Password"
              required
              name="Password"
              value={Login_data.Password}
              onChange={handle_login_Input}
              disabled={isLoading}
            />
            
            <a href="#" className="forgot-password">
              Forgot your password? 🤔
            </a>
            
            <button
              className="login_signup_button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Sign In"}
            </button>
            
            <div className="switch-form">
              <span>Don't have an account? </span>
              <button 
                type="button" 
                className="switch-link" 
                onClick={Handle_login_signup_switch}
              >
                Sign Up
              </button>
            </div>
          </form>
        ) : (
          /* Signup Form */
          <form className="login_signup_form" onSubmit={Handle_signup}>
            <h1 className="login_signup_h1">Create Account 🚀</h1>
            <p className="login_signup_p">Join us today!</p>
            
            <motion.div 
              className="social-container"
              initial={{ opacity: 0, y: 20 }}
              animate={isSocialInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.a 
                href="#" 
                className="social login_signup_a"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </motion.a>
              <motion.a 
                href="#" 
                className="social login_signup_a"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <FontAwesomeIcon icon={faGooglePlusG} />
              </motion.a>
              <motion.a 
                href="#" 
                className="social login_signup_a"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </motion.a>
            </motion.div>
            
            <span className="divider-text">or use your email</span>
            
            <input
              className="login_signup_input"
              type="text"
              placeholder="👤 Full Name"
              required
              name="Name"
              value={Sign_up_data.Name}
              onChange={handle_signup_Input}
              disabled={isLoading}
            />
            <input
              className="login_signup_input"
              type="email"
              placeholder="📧 Email"
              required
              name="Email"
              value={Sign_up_data.Email}
              onChange={handle_signup_Input}
              disabled={isLoading}
            />
            <input
              className="login_signup_input"
              type="password"
              placeholder="🔒 Password"
              required
              name="Password"
              value={Sign_up_data.Password}
              onChange={handle_signup_Input}
              disabled={isLoading}
            />
            
            {/* Password Strength Indicator */}
            {Sign_up_data.Password && (
              <div className="password-strength">
                <div className="password-requirements">
                  <div className={`requirement ${passwordStrength.length ? 'valid' : 'invalid'}`}>
                    <span className="requirement-icon">
                      {passwordStrength.length ? '✓' : '✗'}
                    </span>
                    <span>At least 8 characters</span>
                  </div>
                  <div className={`requirement ${passwordStrength.lowercase ? 'valid' : 'invalid'}`}>
                    <span className="requirement-icon">
                      {passwordStrength.lowercase ? '✓' : '✗'}
                    </span>
                    <span>One lowercase letter</span>
                  </div>
                  <div className={`requirement ${passwordStrength.uppercase ? 'valid' : 'invalid'}`}>
                    <span className="requirement-icon">
                      {passwordStrength.uppercase ? '✓' : '✗'}
                    </span>
                    <span>One uppercase letter</span>
                  </div>
                  <div className={`requirement ${passwordStrength.number ? 'valid' : 'invalid'}`}>
                    <span className="requirement-icon">
                      {passwordStrength.number ? '✓' : '✗'}
                    </span>
                    <span>One number</span>
                  </div>
                  <div className={`requirement ${passwordStrength.special ? 'valid' : 'invalid'}`}>
                    <span className="requirement-icon">
                      {passwordStrength.special ? '✓' : '✗'}
                    </span>
                    <span>One special character</span>
                  </div>
                </div>
                <div className="password-strength-bar">
                  <div 
                    className={`strength-fill ${isPasswordValid() ? 'strong' : 'weak'}`}
                    style={{ 
                      width: `${(Object.values(passwordStrength).filter(Boolean).length / 5) * 100}%` 
                    }}
                  ></div>
                </div>
                <div className={`password-strength-text ${isPasswordValid() ? 'strong' : 'weak'}`}>
                  {isPasswordValid() ? 'Strong password! 🔒' : 'Password strength: Weak'}
                </div>
              </div>
            )}
            
            <button
              className="login_signup_button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Sign Up"}
            </button>
            
            <div className="switch-form">
              <span>Already have an account? </span>
              <button 
                type="button" 
                className="switch-link" 
                onClick={Handle_login_signup_switch}
              >
                Sign In
              </button>
            </div>
          </form>
        )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      <Footer />
    </div>
  );
};

export default LoginSignup;
