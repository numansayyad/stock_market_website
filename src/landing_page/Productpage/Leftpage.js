import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container py-5" style={{ marginTop: "50px" }}>
      <div className="row align-items-center">

        {/* LEFT IMAGE */}
        <div className="col-md-6">
          <img
            src={imageURL}
            alt={productName}
            className="img-fluid"
            style={{
              width: "95%",
              opacity: 0.95,
            }}
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="col-md-5 offset-md-1">

          {/* PRODUCT NAME */}
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "500",
              marginBottom: "20px",
            }}
          >
            {productName}
          </h1>

          {/* DESCRIPTION */}
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

          {/* TRY DEMO + LEARN MORE */}
          <div style={{ marginBottom: "25px" }}>
            <a
              href={tryDemo}
              style={{
                fontSize: "18px",
                textDecoration: "none",
                color: "#387ed1",
                marginRight: "25px",
              }}
            >
              Try demo →
            </a>

            <a
              href={learnMore}
              style={{
                fontSize: "18px",
                textDecoration: "none",
                color: "#387ed1",
              }}
            >
              Learn more →
            </a>
          </div>

          {/* BADGES */}
          <div>
            <a href={googlePlay}>
              <img
                src="media/googlePlayBadge.svg"
                alt="Google Play"
                style={{ width: "160px", marginRight: "15px" }}
              />
            </a>

            <a href={appStore}>
              <img
                src="media/appstoreBadge.svg"
                alt="App Store"
                style={{ width: "160px" }}
              />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LeftSection;
