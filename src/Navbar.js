
// new code 

import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
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

            <li className="nav-item">
              <Link className="nav-link" to="/signup">Signup</Link>
            </li>

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
