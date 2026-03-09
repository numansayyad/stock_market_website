import React from "react";

function Pricing() {
  return (
    <div className="container my-5">
      <div className="row align-items-center">

        {/* ✅ Left Content */}
        <div className="col-md-4">
          <h1 className="mb-3">Unbeatable pricing</h1>
          <p>
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
          <a href="#" style={{ textDecoration: "none" }}>
            See pricing →
          </a>
        </div>

        {/* ✅ Spacer */}
        <div className="col-md-2"></div>

        {/* ✅ Right Pricing Boxes */}
        <div className="col-md-6">
          <div className="row text-center">

            <div className="col border p-3">
              <h1>₹0</h1>
              <p>
                Free equity delivery and <br />
                direct mutual funds
              </p>
            </div>

            <div className="col border p-3">
              <h1>₹20</h1>
              <p>Intraday and F&amp;O</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Pricing;
