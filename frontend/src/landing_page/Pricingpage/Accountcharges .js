import React from "react";

function Accountcharges() {
  return (
    <div style={{ width: "75%", margin: "80px auto" }}>

      {/* ACCOUNT OPENING CHARGES */}
      <h2 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "25px" }}>
        Charges for account opening
      </h2>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "16px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f8f8f8" }}>
            <th style={{ padding: "18px", border: "1px solid #e0e0e0", textAlign: "left" }}>Type of account</th>
            <th style={{ padding: "18px", border: "1px solid #e0e0e0", textAlign: "left" }}>Charges</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={{ padding: "18px", border: "1px solid #e0e0e0" }}>Online account</td>
            <td style={{ padding: "18px", border: "1px solid #e0e0e0", color: "green", fontWeight: "600" }}>FREE</td>
          </tr>

          <tr style={{ backgroundColor: "#fafafa" }}>
            <td style={{ padding: "18px", border: "1px solid #e0e0e0" }}>Offline account</td>
            <td style={{ padding: "18px", border: "1px solid #e0e0e0", color: "green", fontWeight: "600" }}>FREE</td>
          </tr>

          <tr>
            <td style={{ padding: "18px", border: "1px solid #e0e0e0" }}>NRI account (offline only)</td>
            <td style={{ padding: "18px", border: "1px solid #e0e0e0" }}>₹ 500</td>
          </tr>

          <tr style={{ backgroundColor: "#fafafa" }}>
            <td style={{ padding: "18px", border: "1px solid #e0e0e0" }}>
              Partnership, LLP, HUF or Corporate accounts (offline only)
            </td>
            <td style={{ padding: "18px", border: "1px solid #e0e0e0" }}>₹ 500</td>
          </tr>
        </tbody>
      </table>

      {/* AMC CHARGES SECTION */}
      <h2 style={{ fontSize: "28px", fontWeight: "600", margin: "50px 0 25px" }}>
        Demat AMC (Annual Maintenance Charge)
      </h2>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "16px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f8f8f8" }}>
            <th style={{ padding: "18px", border: "1px solid #e0e0e0" }}>Value of holdings</th>
            <th style={{ padding: "18px", border: "1px solid #e0e0e0" }}>AMC</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={{ padding: "18px", border: "1px solid #e0e0e0" }}>Up to ₹4 lakh</td>
            <td style={{ padding: "18px", border: "1px solid #e0e0e0", color: "green", fontWeight: "600" }}>FREE*</td>
          </tr>

          <tr style={{ backgroundColor: "#fafafa" }}>
            <td style={{ padding: "18px", border: "1px solid #e0e0e0" }}>₹4 lakh – ₹10 lakh</td>
            <td style={{ padding: "18px", border: "1px solid #e0e0e0" }}>₹100 per year, charged quarterly*</td>
          </tr>

          <tr>
            <td style={{ padding: "18px", border: "1px solid #e0e0e0" }}>Above ₹10 lakh</td>
            <td style={{ padding: "18px", border: "1px solid #e0e0e0" }}>₹300 per year, charged quarterly</td>
          </tr>
        </tbody>
      </table>

      {/* VALUE ADDED SERVICES */}
      <h2 style={{ fontSize: "28px", fontWeight: "600", margin: "50px 0 25px" }}>
        Charges for optional value added services
      </h2>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "16px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f8f8f8" }}>
            <th style={{ padding: "18px", border: "1px solid #e0e0e0" }}>Service</th>
            <th style={{ padding: "18px", border: "1px solid #e0e0e0" }}>Billing Frequency</th>
            <th style={{ padding: "18px", border: "1px solid #e0e0e0" }}>Charges</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={{ padding: "18px", border: "1px solid #e0e0e0" }}>Tickertape</td>
            <td style={{ padding: "18px", border: "1px solid #e0e0e0" }}>Monthly / Annual</td>
            <td style={{ padding: "18px", border: "1px solid #e0e0e0" }}>Free: 0 | Pro: 249/2399</td>
          </tr>

          <tr style={{ backgroundColor: "#fafafa" }}>
            <td style={{ padding: "18px", border: "1px solid #e0e0e0" }}>Smallcase</td>
            <td style={{ padding: "18px", border: "1px solid #e0e0e0" }}>Per transaction</td>
            <td style={{ padding: "18px", border: "1px solid #e0e0e0" }}>Buy & Invest More: 100 | SIP: 10</td>
          </tr>

          <tr>
            <td style={{ padding: "18px", border: "1px solid #e0e0e0" }}>Kite Connect</td>
            <td style={{ padding: "18px", border: "1px solid #e0e0e0" }}>Monthly</td>
            <td style={{ padding: "18px", border: "1px solid #e0e0e0" }}>
              Connect: 500 | Personal: Free
            </td>
          </tr>
        </tbody>
      </table>

      {/* DISCLAIMER */}
      <div style={{ marginTop: "60px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "18px" }}>
          Disclaimer
        </h2>

        <p
          style={{
            fontSize: "15px",
            color: "#555",
            lineHeight: "1.7",
            maxWidth: "90%",
          }}
        >
          For Delivery based trades, a minimum of ₹0.01 will be charged per contract note.
          Clients who opt to receive physical contract notes will be charged ₹20 per contract
          note plus courier charges. Brokerage will not exceed the rates specified by SEBI
          and the exchanges. All statutory and regulatory charges will be levied at actuals.
          Brokerage is also charged on expired, exercised, and assigned options contracts.
          Free investments are available only for our retail individual clients. Companies,
          Partnerships, Trusts, and HUFs need to pay 0.1% or ₹20 (whichever is less) as delivery
          brokerage. A brokerage of 0.25% will be charged for physical delivery contracts.
        </p>
      </div>
    </div>
  );
}

export default Accountcharges;
