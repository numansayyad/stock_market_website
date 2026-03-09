import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { 
  AccountBalanceWallet, 
  AddCard, 
  MoneyOff, 
  TrendingUp,
  PieChart
} from "@mui/icons-material";

const Funds = () => {
  const [holdings, setHoldings] = useState([]);

  // Get userId - check both localStorage and URL params
  const getUserId = () => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      const urlParams = new URLSearchParams(window.location.search);
      userId = urlParams.get('userId');
      if (userId) {
        localStorage.setItem("userId", userId);
      }
    }
    return userId;
  };

  useEffect(() => {
    const userId = getUserId();
    const queryParams = userId ? `?userId=${userId}` : '';
    
    axios.get(`/allHoldings${queryParams}`)
      .then((res) => {
        setHoldings(res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching holdings:", err);
      });
  }, []);

  // Calculate fund analytics
  const portfolioValue = holdings.reduce((acc, stock) => acc + (stock.price * stock.qty), 0);
  const totalInvestment = holdings.reduce((acc, stock) => acc + (stock.avg * stock.qty), 0);
  
  // These would typically come from the backend
  const availableMargin = 4043.10;
  const usedMargin = 3757.30;
  const totalMargin = availableMargin + usedMargin;

  return (
    <>
      {/* Fund Actions */}
      <div className="funds-section" style={{ marginBottom: '24px' }}>
        <div className="analytics-grid">
          <div className="fund-action-card">
            <div className="fund-icon green-bg">
              <AddCard />
            </div>
            <div className="fund-action-content">
              <h4>Add Funds</h4>
              <p>Instant, zero-cost fund transfers with UPI</p>
            </div>
            <Link className="btn btn-green">Add funds</Link>
          </div>
          
          <div className="fund-action-card">
            <div className="fund-icon blue-bg">
              <AccountBalanceWallet />
            </div>
            <div className="fund-action-content">
              <h4>Withdraw</h4>
              <p>Withdraw funds to your bank account</p>
            </div>
            <Link className="btn btn-blue">Withdraw</Link>
          </div>
        </div>
      </div>

      {/* Fund Analytics */}
      <div className="analytics-grid" style={{ marginBottom: '20px' }}>
        <div className="analytics-card">
          <div className="card-icon profit-bg">
            <AccountBalanceWallet />
          </div>
          <div className="card-content">
            <p className="card-label">Available Margin</p>
            <h3 className="card-value profit">₹{availableMargin.toLocaleString()}</h3>
          </div>
        </div>

        <div className="analytics-card">
          <div className="card-icon blue-bg">
            <MoneyOff />
          </div>
          <div className="card-content">
            <p className="card-label">Used Margin</p>
            <h3 className="card-value">₹{usedMargin.toLocaleString()}</h3>
          </div>
        </div>

        <div className="analytics-card">
          <div className="card-icon purple-bg">
            <TrendingUp />
          </div>
          <div className="card-content">
            <p className="card-label">Total Margin</p>
            <h3 className="card-value">₹{totalMargin.toLocaleString()}</h3>
          </div>
        </div>

        <div className="analytics-card">
          <div className="card-icon blue-bg">
            <PieChart />
          </div>
          <div className="card-content">
            <p className="card-label">Portfolio Value</p>
            <h3 className="card-value">₹{portfolioValue.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* Margin Breakdown */}
      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">{availableMargin.toLocaleString()}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">{usedMargin.toLocaleString()}</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp colored">{availableMargin.toLocaleString()}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>{availableMargin.toLocaleString()}</p>
            </div>
            <div className="data">
              <p>Today's Payin</p>
              <p>3,736.40</p>
            </div>
            <div className="data">
              <p>Today's Payout</p>
              <p>4,064.00</p>
            </div>
            <hr />
            <div className="data">
              <p>SPAN Margin</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Options Premium</p>
              <p>0.00</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p className="imp">0.00</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <Link className="btn btn-blue">Open Account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;

