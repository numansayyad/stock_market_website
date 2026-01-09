import React from "react";

function Hero() {
  return (
    <div className="container text-center" style={{ marginTop: "100px" }}>
      
      {/* TITLE */}
      <h2
        style={{
          fontSize: "36px",
          fontWeight: "500",
          marginBottom: "10px",
        }}
      >
        Charges
      </h2>

      {/* SUBTITLE */}
      <p
        style={{
          fontSize: "18px",
          color: "#666",
          marginBottom: "70px",
        }}
      >
        List of all charges and taxes
      </p>

      {/* 3 CARD GRID */}
      <div className="row justify-content-center">

        {/* CARD 1 */}
        <div className="col-md-4 mb-5">
          <div style={{ position: "relative" }}>
            <h1
              style={{
                fontSize: "120px",
                fontWeight: "600",
                color: "#f9a825",
              }}
            >
              ₹0
            </h1>

            {/* DOTTED BG */}
            <div
              style={{
                position: "absolute",
                top: "25px",
                left: "180px",
                width: "120px",
                height: "120px",
                backgroundImage: "url('/media/dots.png')",
                backgroundSize: "contain",
                opacity: 0.4,
              }}
            ></div>
          </div>

          <h4 style={{ marginTop: "20px", fontWeight: "600" }}>
            Free equity delivery
          </h4>
          <p style={{ color: "#666", fontSize: "15px", width: "80%", margin: "auto" }}>
            All equity delivery investments (NSE, BSE) are absolutely free — ₹0 brokerage.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="col-md-4 mb-5">
          <div style={{ position: "relative" }}>
            <h1
              style={{
                fontSize: "120px",
                fontWeight: "600",
                color: "#f9a825",
              }}
            >
              ₹20
            </h1>

            <div
              style={{
                position: "absolute",
                top: "25px",
                left: "200px",
                width: "120px",
                height: "120px",
                backgroundImage: "url('/media/dots.png')",
                backgroundSize: "contain",
                opacity: 0.4,
              }}
            ></div>
          </div>

          <h4 style={{ marginTop: "20px", fontWeight: "600" }}>
            Intraday and F&O trades
          </h4>
          <p style={{ color: "#666", fontSize: "15px", width: "80%", margin: "auto" }}>
            Flat ₹20 or 0.03% (whichever is lower) per executed order across intraday,
            equity, currency, and commodity trades. Flat ₹20 on all option trades.
          </p>
        </div>

        {/* CARD 3 */}
        <div className="col-md-4 mb-5">
          <div style={{ position: "relative" }}>
            <h1
              style={{
                fontSize: "120px",
                fontWeight: "600",
                color: "#f9a825",
              }}
            >
              ₹0
            </h1>

            <div
              style={{
                position: "absolute",
                top: "25px",
                left: "180px",
                width: "120px",
                height: "120px",
                backgroundImage: "url('/media/dots.png')",
                backgroundSize: "contain",
                opacity: 0.4,
              }}
            ></div>
          </div>

          <h4 style={{ marginTop: "20px", fontWeight: "600" }}>
            Free direct MF
          </h4>
          <p style={{ color: "#666", fontSize: "15px", width: "80%", margin: "auto" }}>
            All direct mutual fund investments are absolutely free — ₹0 commissions & DP charges.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Hero;
