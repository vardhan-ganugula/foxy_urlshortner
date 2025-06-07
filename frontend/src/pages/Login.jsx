import React, { useState, useCallback } from "react";
import Header from "../components/Header";
import { MdError } from "react-icons/md";
import {toast} from "react-toastify";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import { navlinks } from "../../utils";

// Validation utilities
const validateEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

const validatePassword = (password) => {
  return password.length > 6;
};

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false
  });

  const [isLoading, setIsLoading] = useState(false);
  
  const cookie = new Cookies();
  const navigate = useNavigate();

  // Memoized validation functions
  const handleEmailValidation = useCallback(() => {
    const isValid = validateEmail(formData.email);
    setErrors(prev => ({ ...prev, email: !isValid }));
    return isValid;
  }, [formData.email]);

  const handlePasswordValidation = useCallback(() => {
    const isValid = validatePassword(formData.password);
    setErrors(prev => ({ ...prev, password: !isValid }));
    return isValid;
  }, [formData.password]);

  // Optimized input handler
  const handleInputChange = useCallback((field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  }, []);

  // Show toast notifications
  const showToast = useCallback((type, message) => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isEmailValid = handleEmailValidation();
    const isPasswordValid = handlePasswordValidation();
    
    if (!isEmailValid || !isPasswordValid || !formData.email || !formData.password) {
      showToast("error", "Please fill all fields correctly");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === "success") {
        showToast("success", "Login successful!");
        
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 1);
        
        cookie.set('token', data.token, { expires: expiryDate });
        cookie.set('userId', data.userId, { expires: expiryDate });
        
        setTimeout(() => navigate('/dashboard'), 500);
      } else {
        showToast("error", data.msg || "Login failed");
      }
    } catch (error) {
      console.error('Login error:', error);
      showToast("error", "Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header navlinks={navlinks} />
      <main className="w-full h-[85vh] flex items-center justify-center px-3">
        <div className="w-[400px] rounded shadow-lg overflow-hidden">
          <h2 className="w-full py-4 bg-orange-500 text-white text-center text-2xl font-bold">
            Login Form
          </h2>
          
          <form className="p-4" onSubmit={handleLogin} noValidate>
            {/* Email Field */}
            <div className="flex gap-2 flex-col mt-5">
              <label htmlFor="email" className="ml-1 font-semibold">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className={`px-3 py-2 border-2 rounded outline-none font-mono transition-colors ${
                  errors.email ? 'border-red-300' : 'border-orange-300'
                }`}
                placeholder="name@email.com"
                value={formData.email}
                onChange={handleInputChange('email')}
                onBlur={handleEmailValidation}
                disabled={isLoading}
                required
              />
              {errors.email && (
                <p className="text-xs text-red-500 flex items-center gap-2">
                  <MdError size={15} />
                  Please enter a valid email
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="flex gap-2 flex-col mt-5">
              <label htmlFor="password" className="ml-1 font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`px-3 py-2 border-2 rounded outline-none font-mono transition-colors ${
                  errors.password ? 'border-red-300' : 'border-orange-300'
                }`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange('password')}
                onBlur={handlePasswordValidation}
                disabled={isLoading}
                required
              />
              {errors.password && (
                <p className="text-xs text-red-500 flex items-center gap-2">
                  <MdError size={15} />
                  Password must be longer than 6 characters
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-sm mt-3 ml-2">
              Forgot Password?{" "}
              <Link 
                to="/forgot-password" 
                className="decoration-wavy underline decoration-orange-500 underline-offset-2 hover:text-orange-600 transition-colors"
              >
                Click here
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded mt-5 font-semibold bg-orange-500 text-white hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Login;