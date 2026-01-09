import React from "react";

function Education() {
  return (
    <div className="container my-5">
      <div className="row align-items-center">

        {/* ✅ Left Image Section */}
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img
            src="media/education.svg"
            alt="Varsity"
            className="img-fluid"
            style={{ maxWidth: "350px" }}
          />
        </div>

        {/* ✅ Right Text Content */}
        <div className="col-md-6">
          <h3 className="mb-3">Free and open market education</h3>

          <p>
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>
          <a href="#" style={{ textDecoration: "none" }}>
            Varsity →
          </a>

          <p className="mt-4">
            TradingQ&amp;A, the most active trading and investment community in
            India for all your market related queries.
          </p>
          <a href="#" style={{ textDecoration: "none" }}>
            TradingQ&amp;A →
          </a>
        </div>

      </div>
    </div>
  );
}

export default Education;
