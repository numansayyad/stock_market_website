import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

import Homepage from './landing_page/Homepage/Homepage';
import Signup from './landing_page/Signup/Signup';
import Login from './landing_page/Login/Login';
import Aboutpage from './landing_page/Aboutpage/Aboutpage';
import Productpage from './landing_page/Productpage/Productpage';
import Supportpage from './landing_page/Supportpage/Supportpage';
import Pricingpage from './landing_page/Pricingpage/Pricingpage';
import Dashboard from './landing_page/Dashboard/Dashboard';

import Navbar from './Navbar';
import Footer from './Footer';
import NotFound from './NotFound';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<Aboutpage />} />
      <Route path="/product" element={<Productpage />} />
      <Route path="/support" element={<Supportpage />} />
      <Route path="/pricing" element={<Pricingpage />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);
