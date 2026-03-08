import React, { useState } from "react";
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignup = async () => {
    setError("");

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Validate password
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        alert("Signup successful! You can now login.");
      } else {
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="signup-wrapper">

      {/* LEFT SIDE IMAGE + TEXT */}
      <div className="signup-left">
        <h1 className="big-title">
          Open a free demat and trading account online
        </h1>
        <p className="sub-title">
          Start investing brokerage free and join a community of 1.6+ crore investors and traders
        </p>

        <img 
          src="/media/account_open.svg" 
          alt="signup"
          className="signup-left-img"
        />
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="signup-right">
        {success ? (
          <>
            <h2 className="form-title">Signup Successful!</h2>
            <p className="track-text">You can now login with your email and password.</p>
            <button 
              className="otp-btn" 
              onClick={() => window.location.href = "/login"}
            >
              Go to Login
            </button>
          </>
        ) : (
          <>
            <h2 className="form-title">Signup now</h2>
            <p className="track-text">Create an account with your email and password</p>

            {/* EMAIL INPUT */}
            <div className="input-group">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>

            {/* PASSWORD INPUT */}
            <div className="input-group">
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </div>

            {/* CONFIRM PASSWORD INPUT */}
            <div className="input-group">
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input"
              />
            </div>

            {/* ERROR MESSAGE */}
            {error && <p className="error-message">{error}</p>}

            <button className="otp-btn" onClick={handleSignup}>
              Signup
            </button>

            <p className="terms">
              By proceeding, you agree to the Zerodha 
              <a href="#"> terms</a> & <a href="#">privacy policy</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Signup;

