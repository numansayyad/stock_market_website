
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status on mount and on navigation
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg border-bottom bg-white py-2 fixed-top shadow-sm">
      <div className="container">

        {/* LEFT LOGO */}
        <Link className="navbar-brand" to="/">
          <img src="media/logo.svg" alt="Zerodha Logo" height="22" />
        </Link>

        {/* TOGGLER (Mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#zerodhaNavbar"
          aria-controls="zerodhaNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* RIGHT MENU */}
        <div className="collapse navbar-collapse justify-content-end" id="zerodhaNavbar">
          <ul className="navbar-nav align-items-center gap-3">

            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link btn-link" 
                    onClick={handleLogout}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Sign In</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Signup</Link>
                </li>
              </>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/product">Products</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/pricing">Pricing</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/support">Support</Link>
            </li>

            {/* HAMBURGER ICON */}
            <li className="nav-item">
              <Link className="nav-link fs-4" to="#">☰</Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
