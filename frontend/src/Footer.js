import React from "react";

function Footer() {
    return (
        <footer
            className="container border-top"
            style={{
                fontFamily: "Inter, sans-serif",
                paddingTop: "60px",
                paddingBottom: "40px",
                color: "#424242"
            }}
        >

            {/* TOP SECTION */}
            <div className="row mb-5">

                {/* LEFT SECTION */}
                <div className="col-md-3 mb-4">

                    <img
                        src="media/logo.svg"
                        alt="Zerodha Logo"
                        style={{ height: "22px", marginBottom: "20px" }}
                    />

                    <p style={{ fontSize: "14px", margin: 0, color: "#666" }}>
                        © 2010 - 2025, Zerodha Broking Ltd.
                    </p>
                    <p style={{ fontSize: "14px", color: "#666" }}>
                        All rights reserved.
                    </p>

                    {/* Social Icons */}
                    <div className="d-flex gap-3 mt-3" style={{ fontSize: "20px", color: "#777" }}>
                        <i className="bi bi-twitter"></i>
                        <i className="bi bi-facebook"></i>
                        <i className="bi bi-instagram"></i>
                        <i className="bi bi-linkedin"></i>
                        <i className="bi bi-youtube"></i>
                        <i className="bi bi-whatsapp"></i>
                        <i className="bi bi-telegram"></i>
                    </div>
                </div>

                {/* ACCOUNT */}
                <div className="col-md-2 mb-4">
                    <h5 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>Account</h5>

                    <ul className="list-unstyled" style={{ fontSize: "14px", lineHeight: "2.3" }}>
                        <li><a href="#" className="footer-link">Open demat account</a></li>
                        <li><a href="#" className="footer-link">Minor demat account</a></li>
                        <li><a href="#" className="footer-link">NRI demat account</a></li>
                        <li><a href="#" className="footer-link">Commodity</a></li>
                        <li><a href="#" className="footer-link">Dematerialisation</a></li>
                        <li><a href="#" className="footer-link">Fund transfer</a></li>
                        <li><a href="#" className="footer-link">MTF</a></li>
                        <li><a href="#" className="footer-link">Referral program</a></li>
                    </ul>
                </div>

                {/* SUPPORT */}
                <div className="col-md-2 mb-4">
                    <h5 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>Support</h5>

                    <ul className="list-unstyled" style={{ fontSize: "14px", lineHeight: "2.3" }}>
                        <li><a href="#" className="footer-link">Contact us</a></li>
                        <li><a href="#" className="footer-link">Support portal</a></li>
                        <li><a href="#" className="footer-link">How to file a complaint?</a></li>
                        <li><a href="#" className="footer-link">Status of complaints</a></li>
                        <li><a href="#" className="footer-link">Bulletin</a></li>
                        <li><a href="#" className="footer-link">Circular</a></li>
                        <li><a href="#" className="footer-link">Z-Connect blog</a></li>
                        <li><a href="#" className="footer-link">Downloads</a></li>
                    </ul>
                </div>

                {/* COMPANY */}
                <div className="col-md-2 mb-4">
                    <h5 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>Company</h5>

                    <ul className="list-unstyled" style={{ fontSize: "14px", lineHeight: "2.3" }}>
                        <li><a href="#" className="footer-link">About</a></li>
                        <li><a href="#" className="footer-link">Philosophy</a></li>
                        <li><a href="#" className="footer-link">Press & media</a></li>
                        <li><a href="#" className="footer-link">Careers</a></li>
                        <li><a href="#" className="footer-link">Zerodha Cares (CSR)</a></li>
                        <li><a href="#" className="footer-link">Zerodha.tech</a></li>
                        <li><a href="#" className="footer-link">Open source</a></li>
                    </ul>
                </div>

                {/* QUICK LINKS */}
                <div className="col-md-3 mb-4">
                    <h5 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>Quick links</h5>

                    <ul className="list-unstyled" style={{ fontSize: "14px", lineHeight: "2.3" }}>
                        <li><a href="#" className="footer-link">Upcoming IPOs</a></li>
                        <li><a href="#" className="footer-link">Brokerage charges</a></li>
                        <li><a href="#" className="footer-link">Market holidays</a></li>
                        <li><a href="#" className="footer-link">Economic calendar</a></li>
                        <li><a href="#" className="footer-link">Calculators</a></li>
                        <li><a href="#" className="footer-link">Markets</a></li>
                        <li><a href="#" className="footer-link">Sectors</a></li>
                    </ul>
                </div>

            </div>

            {/* BOTTOM DISCLAIMER */}
            <div className="text-muted" style={{ fontSize: "12.5px", lineHeight: "1.8" }}>
                <p>
                    Zerodha Broking Ltd.: Member of NSE, BSE​ &​ MCX – SEBI Registration no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any complaints pertaining to securities broking please write to complaints@zerodha.com, for DP related to dp@zerodha.com. Please ensure you carefully read the Risk Disclosure Document as prescribed by SEBI | ICF
                </p>

                <p>
                    Procedure to file a complaint on SEBI SCORES: Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances                </p>

                <p>Smart Online Dispute Resolution | Grievances Redressal Mechanism                </p>
                <p>Investments in securities market are subject to market risks; read all the related documents carefully before investing.</p>
                <p>Attention investors: 1) Stock brokers can accept securities as margins from clients only by way of pledge in the depository system w.e.f September 01, 2020. 2) Update your e-mail and phone number with your stock broker / depository participant and receive OTP directly from depository on your e-mail and/or mobile number to create pledge. 3) Check your securities / MF / bonds in the consolidated account statement issued by NSDL/CDSL every month.             </p>
                <p>India's largest broker based on networth as per NSE. NSE broker factsheet              </p>
                <p>"Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers. Receive information of your transactions directly from Exchange on your mobile/email at the end of the day. Issued in the interest of investors. KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary." Dear Investor, if you are subscribing to an IPO, there is no need to issue a cheque. Please write the Bank account number and sign the IPO application form to authorize your bank to make payment in case of allotment. In case of non allotment the funds will remain in your bank account. As a business we don't give stock tips, and have not authorized anyone to trade on behalf of others. If you find anyone claiming to be part of Zerodha and offering such services, please create a ticket here.</p>
                <p>*Customers availing insurance advisory services offered by Ditto (Tacterial Consulting Private Limited | IRDAI Registered Corporate Agent (Composite) License No CA0738) will not have access to the exchange investor grievance redressal forum, SEBI SCORES/ODR, or arbitration mechanism for such products.</p>

            </div>
     <div
                className="d-flex justify-content-center gap-4 mt-4 pt-3 border-top"
                style={{ fontSize: "13.5px", color: "#666" }}
            >
                <a href="#" className="footer-link">NSE</a>
                <a href="#" className="footer-link">BSE</a>
                <a href="#" className="footer-link">MCX</a>
                <a href="#" className="footer-link">Terms & conditions</a>
                <a href="#" className="footer-link">Policies & procedures</a>
                <a href="#" className="footer-link">Privacy policy</a>
                <a href="#" className="footer-link">Disclosure</a>
                <a href="#" className="footer-link">For investor's attention</a>
                <a href="#" className="footer-link">Investor charter</a>
            </div>
        </footer>
    );
}

export default Footer;
