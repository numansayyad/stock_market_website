import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  // Handle logout from iframe messages
  const handleMessage = (event) => {
    if (event.data === "logout") {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userId");
      localStorage.removeItem("isLoggedIn");
      navigate("/");
    }
  };

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className="dashboard-container">
      <iframe
        src="http://localhost:3000"
        title="Trading Dashboard"
        className="dashboard-iframe"
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    </div>
  );
}

export default Dashboard;

