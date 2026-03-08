import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Validate password
    if (!password) {
      setError("Please enter your password");
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user info in localStorage
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userName", data.name || data.email.split('@')[0]);
        localStorage.setItem("isLoggedIn", "true");
        
        // Redirect to dashboard (port 3000) - force full page navigation
        window.location.replace("http://localhost:3000");
        return;
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      console.error("Login error:", err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-wrapper">

      {/* LEFT SIDE IMAGE + TEXT */}
      <div className="login-left">
        <h1 className="big-title">
          Login to your trading account
        </h1>
        <p className="sub-title">
          Access your demat and trading account to manage your investments and track your portfolio
        </p>

        <img 
          src="/media/account_open.svg" 
          alt="login"
          className="login-left-img"
        />
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="login-right">
        <h2 className="form-title">Login</h2>
        <p className="track-text">Enter your email and password</p>

        {/* EMAIL INPUT */}
        <div className="input-group">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            className="form-input"
          />
        </div>

        {/* PASSWORD INPUT */}
        <div className="input-group">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            className="form-input"
          />
        </div>

        {/* ERROR MESSAGE */}
        {error && <p className="error-message">{error}</p>}

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="login-footer-text">
          Don't have an account?{" "}
          <Link to="/signup" className="login-link">Signup</Link>
        </p>

        <p className="terms">
          By proceeding, you agree to the Zerodha 
          <a href="#"> terms</a> & <a href="#">privacy policy</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
