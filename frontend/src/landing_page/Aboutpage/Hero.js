import React from 'react';

function Hero() {
    return (
        <div className="container-fluid">

            {/* ---------- HERO HEADING (FIXED PADDING) ---------- */}
            <div
                className="row d-flex justify-content-center"
                style={{
                    paddingTop: "130px",   // FIX: Navbar खाली जागा
                    paddingBottom: "40px"
                }}
            >
                <div className="col-10 col-md-8">
                    <h1
                        className="text-center"
                        style={{
                            fontSize: "32px",
                            lineHeight: "1.35",
                            fontWeight: "500",
                            color: "#333",
                            marginBottom: "50px"
                        }}
                    >
                        We pioneered the discount broking model in India.
                        <br />Now, we are breaking ground with our technology.
                    </h1>
                </div>
            </div>

            {/* ---------- ABOUT TEXT SECTION ---------- */}
            <div
                className="row justify-content-center px-5 pb-5"
                style={{ columnGap: "40px" }}
            >

                {/* LEFT COLUMN */}
                <div
                    className="col-md-5 mb-4"
                    style={{
                        fontSize: "17px",
                        lineHeight: "1.7",
                        color: "#444"
                    }}
                >
                    <p>
                        We kick-started operations on the 15th of August, 2010 with the goal of breaking all
                        barriers that traders and investors face in India in terms of cost, support, and
                        technology. We named the company Zerodha, a combination of Zero and "Rodha",
                        the Sanskrit word for barrier.
                    </p>

                    <p>
                        Today, our disruptive pricing models and in-house technology have made us the biggest
                        stock broker in India.
                    </p>

                    <p>
                        Over 1.6+ crore clients place billions of orders every year through our powerful
                        ecosystem of investment platforms, contributing over 15% of all Indian retail trading
                        volumes.
                    </p>
                </div>

                {/* RIGHT COLUMN */}
                <div
                    className="col-md-5"
                    style={{
                        fontSize: "17px",
                        lineHeight: "1.7",
                        color: "#444"
                    }}
                >
                    <p>
                        In addition, we run a number of popular open online educational and community initiatives
                        to empower retail traders and investors.
                    </p>

                    <p>
                        <a href="#" style={{ textDecoration: "none" }}>Rainmatter</a>, our fintech fund and incubator,
                        has invested in several fintech startups with the goal of growing the Indian capital markets.
                    </p>

                    <p>
                        And yet, we are always up to something new every day. Catch up on the latest updates on
                        our blog or see what the media is saying about us or learn more about our business and
                        product philosophies.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Hero;
