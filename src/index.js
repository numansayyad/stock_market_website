import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import Homepage from './landing_page/Homepage/Homepage';
import Signup from './landing_page/Signup/Signup';
import Aboutpage from './landing_page/Aboutpage/Aboutpage';
import Productpage from './landing_page/Productpage/Productpage';
import Supportpage from './landing_page/Supportpage/Supportpage';
import Pricingpage from './landing_page/Pricingpage/Pricingpage';

import Navbar from './Navbar';
import Footer from './Footer';
import NotFound from './NotFound';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<Aboutpage />} />
      <Route path="/product" element={<Productpage />} />
      <Route path="/support" element={<Supportpage />} />

      <Route path="/pricing" element={<Pricingpage />} />

      <Route path="*" element={<NotFound />} />  {/* MUST be last */}
    </Routes>
    <Footer />
  </BrowserRouter>
);
