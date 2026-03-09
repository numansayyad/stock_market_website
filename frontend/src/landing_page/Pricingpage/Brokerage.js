import React, { useState } from "react";
import "./Brokerage.css";

function Brokerage() {
  const [activeTab, setActiveTab] = useState("equity");

  return (
    <div className="brokerage-container">

      {/* TABS */}
      <div className="tabs">
        <button
          className={activeTab === "equity" ? "active" : ""}
          onClick={() => setActiveTab("equity")}
        >
          Equity
        </button>

        <button
          className={activeTab === "currency" ? "active" : ""}
          onClick={() => setActiveTab("currency")}
        >
          Currency
        </button>

        <button
          className={activeTab === "commodity" ? "active" : ""}
          onClick={() => setActiveTab("commodity")}
        >
          Commodity
        </button>
      </div>


      {/* EQUITY TABLE */}
      {activeTab === "equity" && (
        <>
          <div className="table-box">
            <table>
              <thead>
                <tr>
                  <th>Equity delivery</th>
                  <th>Equity intraday</th>
                  <th>F&O - Futures</th>
                  <th>F&O - Options</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Zero Brokerage</td>
                  <td>0.03% or Rs. 20/executed order whichever is lower</td>
                  <td>0.03% or Rs. 20/executed order whichever is lower</td>
                  <td>Flat Rs. 20 per executed order</td>
                </tr>

                <tr>
                  <td>0.1% on buy & sell</td>
                  <td>0.025% on the sell side</td>
                  <td>0.02% on the sell side</td>
                  <td>
                    • 0.125% of intrinsic value <br />
                    • 0.1% on sell side (premium)
                  </td>
                </tr>

                <tr>
                  <td>
                    NSE: 0.00297% <br /> BSE: 0.00375%
                  </td>
                  <td>
                    NSE: 0.00297% <br /> BSE: 0.00375%
                  </td>
                  <td>
                    NSE: 0.00173% <br /> BSE: 0
                  </td>
                  <td>
                    NSE: 0.03503% <br /> BSE: 0.0325%
                  </td>
                </tr>

                <tr>
                  <td>
                    18% on (brokerage + SEBI charges + transaction charges)
                  </td>
                  <td>
                    18% on (brokerage + SEBI charges + transaction charges)
                  </td>
                  <td>
                    18% on (brokerage + SEBI charges + transaction charges)
                  </td>
                  <td>
                    18% on (brokerage + SEBI charges + transaction charges)
                  </td>
                </tr>

                <tr>
                  <td>₹10 / crore</td>
                  <td>₹10 / crore</td>
                  <td>₹10 / crore</td>
                  <td>₹10 / crore</td>
                </tr>

                <tr>
                  <td>0.015% or ₹1500 / crore on buy side</td>
                  <td>0.003% or ₹300 / crore on buy side</td>
                  <td>0.002% or ₹200 / crore on buy side</td>
                  <td>0.003% or ₹300 / crore on buy side</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* LINK BELOW EQUITY TABLE */}
          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
              marginBottom: "20px",
              fontSize: "20px",
            }}
          >
            <a href="#" style={{ color: "#387ed1", textDecoration: "none" }}>
              Calculate your costs upfront
            </a>{" "}
            using our brokerage calculator
          </div>
        </>
      )}



      {/* CURRENCY TABLE */}
      {activeTab === "currency" && (
        <>
          <div className="table-box">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Currency futures</th>
                  <th>Currency options</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Brokerage</td>
                  <td>0.03% or ₹ 20/executed order whichever is lower</td>
                  <td>₹ 20/executed order</td>
                </tr>

                <tr>
                  <td>STT/CTT</td>
                  <td>No STT</td>
                  <td>No STT</td>
                </tr>

                <tr>
                  <td>Transaction charges</td>
                  <td>
                    NSE: 0.00035% <br /> BSE: 0.00045%
                  </td>
                  <td>
                    NSE: 0.0311% <br /> BSE: 0.001%
                  </td>
                </tr>

                <tr>
                  <td>GST</td>
                  <td>18% on (brokerage + SEBI + transaction charges)</td>
                  <td>18% on (brokerage + SEBI + transaction charges)</td>
                </tr>

                <tr>
                  <td>SEBI charges</td>
                  <td>₹10 / crore</td>
                  <td>₹10 / crore</td>
                </tr>

                <tr>
                  <td>Stamp charges</td>
                  <td>0.0001% or ₹10 / crore on buy side</td>
                  <td>0.0001% or ₹10 / crore on buy side</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* LINK BELOW CURRENCY TABLE */}
          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
              marginBottom: "20px",
              fontSize: "20px",
            }}
          >
            <a href="#" style={{ color: "#387ed1", textDecoration: "none" }}>
              Calculate your costs upfront
            </a>{" "}
            using our brokerage calculator
          </div>
        </>
      )}



      {/* COMMODITY TABLE */}
      {activeTab === "commodity" && (
        <>
          <div className="table-box">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Commodity futures</th>
                  <th>Commodity options</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Brokerage</td>
                  <td>0.03% or ₹ 20/executed order whichever is lower</td>
                  <td>₹ 20/executed order</td>
                </tr>

                <tr>
                  <td>CTT</td>
                  <td>0.01% on sell side</td>
                  <td>0.05% on premium</td>
                </tr>

                <tr>
                  <td>Transaction charges</td>
                  <td>0.0026%</td>
                  <td>0.0026%</td>
                </tr>

                <tr>
                  <td>GST</td>
                  <td>18% on (brokerage + SEBI + transaction charges)</td>
                  <td>18% on (brokerage + SEBI + transaction charges)</td>
                </tr>

                <tr>
                  <td>SEBI charges</td>
                  <td>₹10 / crore</td>
                  <td>₹10 / crore</td>
                </tr>

                <tr>
                  <td>Stamp charges</td>
                  <td>0.002% on buy side</td>
                  <td>0.002% on buy side</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* LINK BELOW COMMODITY TABLE */}
          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
              marginBottom: "20px",
              fontSize: "20px",
            }}
          >
            <a href="#" style={{ color: "#387ed1", textDecoration: "none" }}>
              Calculate your costs upfront
            </a>{" "}
            using our brokerage calculator
          </div>
        </>
      )}

    </div>
  );
}

export default Brokerage;
