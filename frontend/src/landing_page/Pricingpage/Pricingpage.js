import React from "react";
import Navbar from "../../Navbar";              // FIXED
import Footer from "../../Footer";              // FIXED
import Accountcharges  from "./Accountcharges ";
import Hero from "./Hero";
import Brokerage from "./Brokerage";            // SAME FOLDER (Correct)

function Pricingpage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Brokerage />
              <Accountcharges />

      <Footer />
    </>
  );
}

export default Pricingpage;
