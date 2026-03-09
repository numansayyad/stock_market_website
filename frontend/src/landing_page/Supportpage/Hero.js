import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <div className="support-hero">

      <div className="support-header">
        <h1>Support Portal</h1>
        <button className="ticket-btn">My tickets</button>
      </div>

      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input 
          type="text"
          placeholder="Eg: How do I open my account, How do I activate F&O..."
        />
      </div>

    </div>
  );
}

export default Hero;
