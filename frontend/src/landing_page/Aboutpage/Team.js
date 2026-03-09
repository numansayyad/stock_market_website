import React from "react";

function Team() {
    return (
        <div className="container py-5">
            
            {/* Title */}
            <h2 
                className="text-center mb-5"
                style={{
                    fontSize: "28px",
                    fontWeight: "500",
                    color: "#333"
                }}
            >
                People
            </h2>

            <div className="row align-items-center justify-content-center">

                {/* IMAGE LEFT */}
                <div className="col-md-4 text-center mb-4">
                    <img
                        src="media/numan.jpeg"  // Change your image path here
                        alt="Numan Sayyad"
                        className="img-fluid"
                        style={{
                            width: "260px",
                            height: "260px",
                            borderRadius: "50%",
                            objectFit: "cover"
                        }}
                    />

                    <h4 className="mt-4 mb-1" style={{ fontWeight: "500", color: "#333" }}>
                        Numan Sayyad
                    </h4>

                    <p style={{ color: "#6c757d", marginTop: "-5px" }}>
                        Founder, CEO
                    </p>
                </div>

                {/* TEXT RIGHT */}
                <div className="col-md-6" 
                    style={{
                        fontSize: "17px",
                        lineHeight: "1.8",
                        color: "#444"
                    }}
                >
                    <p>
                        Numan bootstrapped and founded Zerodha in 2010 to overcome the
                        hurdles he faced during his decade long stint as a trader. Today,
                        Zerodha has changed the landscape of the Indian broking industry.
                    </p>

                    <p>
                        He is a member of the SEBI Secondary Market Advisory Committee
                        (SMAC) and the Market Data Advisory Committee (MDAC).
                    </p>

                    <p>
                        Playing basketball is his zen.
                    </p>

                    <p>
                        Connect on{" "}
                        <a href="#" className="text-primary text-decoration-none">Homepage</a>{" / "}
                        <a href="#" className="text-primary text-decoration-none">TradingQnA</a>{" / "}
                        <a href="#" className="text-primary text-decoration-none">Twitter</a>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Team;
