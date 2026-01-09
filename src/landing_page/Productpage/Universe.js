import React from "react";

function Universe() {
  return (
    <div className="container text-center" style={{ marginTop: "100px" }}>

      {/* TOP SENTENCE */}
      <p
        style={{
          fontSize: "20px",
          color: "#444",
          marginBottom: "60px",
        }}
      >
        Want to know more about our technology stack? Check out the{" "}
        <a
          href="https://zerodha.tech"
          style={{
            color: "#387ed1",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Zerodha.tech
        </a>{" "}
        blog.
      </p>

      {/* MAIN TITLE */}
      <h2
        style={{
          fontSize: "32px",
          fontWeight: "500",
          marginBottom: "10px",
        }}
      >
        The Zerodha Universe
      </h2>

      <p
        style={{
          fontSize: "18px",
          color: "#666",
          marginBottom: "50px",
        }}
      >
        Extend your trading and investment experience even further with our partner platforms
      </p>

      {/* GRID SECTION */}
      <div className="row justify-content-center">

        {/* Fund House */}
        <div className="col-md-4 mb-5">
          <img
            src="media/image.png"
            alt="Fund House"
            style={{ width: "110px", marginBottom: "15px" }}
          />
          <h5 style={{ fontWeight: "600" }}>Zerodha Fund House</h5>
          <p style={{ color: "#666", fontSize: "15px", width: "80%", margin: "auto" }}>
            Our asset management venture that is creating simple and transparent 
            index funds to help you save for your goals.
          </p>
        </div>

        {/* Sensibull */}
        <div className="col-md-4 mb-5">
          <img
            src="media/sensibullLogo.svg"
            alt="Sensibull"
            style={{ width: "140px", marginBottom: "15px" }}
          />
          <h5 style={{ fontWeight: "600" }}>Sensibull</h5>
          <p style={{ color: "#666", fontSize: "15px", width: "80%", margin: "auto" }}>
            Options trading platform that lets you create strategies, analyze 
            positions, and examine market data like open interest, FII/DII, and more.
          </p>
        </div>

        {/* Tijori */}
        <div className="col-md-4 mb-5">
          <img
            src="media/tijori.svg"
            alt="Tijori"
            style={{ width: "120px", marginBottom: "15px" }}
          />
          <h5 style={{ fontWeight: "600" }}>Tijori</h5>
          <p style={{ color: "#666", fontSize: "15px", width: "80%", margin: "auto" }}>
            Investment research platform that offers detailed insights on stocks, 
            sectors, supply chains, and more.
          </p>
        </div>

        {/* Streak */}
        <div className="col-md-4 mb-5">
          <img
            src="media/streak-logo.png"
            alt="Streak"
            style={{ width: "120px", marginBottom: "15px" }}
          />
          <h5 style={{ fontWeight: "600" }}>Streak</h5>
          <p style={{ color: "#666", fontSize: "15px", width: "80%", margin: "auto" }}>
            Systematic trading platform that allows you to create and backtest 
            strategies without coding.
          </p>
        </div>

        {/* Smallcase */}
        <div className="col-md-4 mb-5">
          <img
            src="media/smallcase-logo.png"
            alt="smallcase"
            style={{ width: "120px", marginBottom: "15px" }}
          />
          <h5 style={{ fontWeight: "600" }}>smallcase</h5>
          <p style={{ color: "#666", fontSize: "15px", width: "80%", margin: "auto" }}>
            Thematic investing platform that helps you invest in diversified baskets 
            of stocks or ETFs.
          </p>
        </div>

        {/* Ditto */}
        <div className="col-md-4 mb-5">
          <img
            src="media/ditto-logo.png"
            alt="ditto"
            style={{ width: "120px", marginBottom: "15px" }}
          />
          <h5 style={{ fontWeight: "600" }}>ditto</h5>
          <p style={{ color: "#666", fontSize: "15px", width: "80%", margin: "auto" }}>
            Personalized advice on life and health insurance. No spam and no mis-selling.
          </p>
        </div>

      </div>

      {/* SIGN UP BUTTON */}
      <a
        href="#"
        className="btn btn-primary"
        style={{
          backgroundColor: "#387ed1",
          padding: "12px 30px",
          fontSize: "18px",
          borderRadius: "4px",
          marginTop: "30px",
          marginBottom: "60px",
        }}
      >
        Sign up for free
      </a>

    </div>
  );
}

export default Universe;
