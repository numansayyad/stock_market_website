import React from "react";

function VarsitySection({
  imageURL,
  productName,
  productDescription,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container py-5" style={{ marginTop: "80px" }}>
      <div className="row align-items-center">

        {/* LEFT IMAGE */}
        <div className="col-md-6 text-center">
          <img
            src={imageURL}
            alt={productName}
            className="img-fluid"
            style={{
              width: "70%",
              opacity: 0.98,
            }}
          />
        </div>

        {/* RIGHT TEXT CONTENT */}
        <div className="col-md-6">

          {/* TITLE */}
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

          {/* BADGES */}
          <div style={{ marginTop: "10px" }}>
            <a href={googlePlay}>
              <img
                src="/media/googlePlayBadge.svg"
                alt="Google Play"
                style={{
                  width: "160px",
                  marginRight: "15px",
                }}
              />
            </a>

            <a href={appStore}>
              <img
                src="/media/appstoreBadge.svg"
                alt="App Store"
                style={{
                  width: "160px",
                }}
              />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}

export default VarsitySection;
