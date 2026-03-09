import React from "react";

function ApiSection({ imageURL, productName, productDescription, learnMore }) {
  return (
    <div className="container py-5" style={{ marginTop: "80px" }}>
      <div className="row align-items-center">

        {/* LEFT TEXT */}
        <div className="col-md-5">
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "500",
              marginBottom: "20px",
            }}
          >
            {productName}
          </h1>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.6",
              color: "#666",
              marginBottom: "25px",
            }}
          >
            {productDescription}
          </p>

          <a
            href={learnMore}
            style={{
              fontSize: "18px",
              textDecoration: "none",
              color: "#387ed1",
            }}
          >
            {productName} →
          </a>
        </div>

        {/* RIGHT IMAGE */}
        <div className="col-md-7 text-center">
          <img
            src={imageURL}
            alt={productName}
            className="img-fluid"
            style={{
              width: "95%",
              marginLeft: "20px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ApiSection;
