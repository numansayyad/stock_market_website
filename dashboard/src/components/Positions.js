import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

import { 
  TrendingUp, 
  TrendingDown, 
  AccountBalance,
  PieChart,
  BarChart,
} from "@mui/icons-material";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(GeneralContext);
  const stockPrices = context?.stockPrices || {};
  const getPriceChange = context?.getPriceChange || ((name) => ({ change: 0, percent: "0%", isDown: false }));

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
    
    axios.get(`/allPositions${queryParams}`)
      .then((res) => {
        setAllPositions(res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching positions:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Calculate position analytics with real-time prices
  const calculateRealTimeValue = (stock) => {
    const currentPrice = stockPrices[stock.name] || stock.price;
    return currentPrice * stock.qty;
  };

  // Check if user is logged in
  const userId = getUserId();
  const isLoggedIn = !!userId;
  const showEmptyState = isLoggedIn && allPositions.length === 0;

  const totalInvestment = allPositions.reduce((acc, stock) => acc + (stock.avg * stock.qty), 0);
  const currentValue = allPositions.reduce((acc, stock) => acc + calculateRealTimeValue(stock), 0);
  const totalPnL = currentValue - totalInvestment;
  const pnlPercent = totalInvestment > 0 ? ((totalPnL / totalInvestment) * 100).toFixed(2) : 0;
  
  // Count profitable and losing positions
  const profitablePositions = allPositions.filter(stock => {
    const currentPrice = stockPrices[stock.name] || stock.price;
    return (currentPrice * stock.qty) - (stock.avg * stock.qty) >= 0;
  }).length;
  const losingPositions = allPositions.length - profitablePositions;

  // Group by product type
  const cncPositions = allPositions.filter(p => p.product === "CNC").length;
  const misPositions = allPositions.filter(p => p.product === "MIS").length;

  // Real-time P&L for each position
  const getPositionPnL = (stock) => {
    const currentPrice = stockPrices[stock.name] || stock.price;
    return (currentPrice * stock.qty) - (stock.avg * stock.qty);
  };

  const getPositionPnLPercent = (stock) => {
    const currentPrice = stockPrices[stock.name] || stock.price;
    const investment = stock.avg * stock.qty;
    return investment > 0 ? ((currentPrice * stock.qty - investment) / investment * 100).toFixed(2) : 0;
  };

  // Show loading state
  if (isLoading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Loading positions...</p>
      </div>
    );
  }

  // Show empty state for new logged in users
  if (showEmptyState) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h3>No Positions Yet</h3>
        <p>You don't have any open positions. Start trading to see your positions here!</p>
      </div>
    );
  }

  return (
    <>
      {/* Position Analytics Cards */}
      <div className="analytics-grid" style={{ marginBottom: '20px' }}>
        <div className="analytics-card">
          <div className="card-icon profit-bg">
            <AccountBalance />
          </div>
          <div className="card-content">
            <p className="card-label">Current Value</p>
            <h3 className="card-value">₹{currentValue.toLocaleString()}</h3>
            <p className="card-sub">Live updates</p>
          </div>
        </div>

        <div className="analytics-card">
          <div className="card-icon blue-bg">
            <PieChart />
          </div>
          <div className="card-content">
            <p className="card-label">Total Investment</p>
            <h3 className="card-value">₹{totalInvestment.toLocaleString()}</h3>
            <p className="card-sub">{allPositions.length} positions</p>
          </div>
        </div>

        <div className="analytics-card">
          <div className={`card-icon ${totalPnL >= 0 ? 'profit-bg' : 'purple-bg'}`}>
            {totalPnL >= 0 ? <TrendingUp /> : <TrendingDown />}
          </div>
          <div className="card-content">
            <p className="card-label">Total P&L</p>
            <h3 className={`card-value ${totalPnL >= 0 ? 'profit' : 'loss'}`}>
              {totalPnL >= 0 ? '+' : ''}₹{totalPnL.toFixed(2)}
            </h3>
            <p className={`card-change ${totalPnL >= 0 ? 'profit' : 'loss'}`}>
              {pnlPercent}%
            </p>
          </div>
        </div>

        <div className="analytics-card">
          <div className="card-icon blue-bg">
            <BarChart />
          </div>
          <div className="card-content">
            <p className="card-label">Total Positions</p>
            <h3 className="card-value">{allPositions.length}</h3>
            <p className="card-sub">Active</p>
          </div>
        </div>
      </div>

      {/* Position Statistics */}
      <div className="order-stats" style={{ marginBottom: '20px' }}>
        <div className="stat-item">
          <div className="stat-icon profit-bg">
            <TrendingUp />
          </div>
          <div className="stat-info">
            <p className="stat-label">Profitable</p>
            <h4 className="stat-value profit">{profitablePositions}</h4>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon sell-bg">
            <TrendingDown />
          </div>
          <div className="stat-info">
            <p className="stat-label">Loss Making</p>
            <h4 className="stat-value loss">{losingPositions}</h4>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon blue-bg">
            <PieChart />
          </div>
          <div className="stat-info">
            <p className="stat-label">CNC Positions</p>
            <h4 className="stat-value">{cncPositions}</h4>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon purple-bg">
            <BarChart />
          </div>
          <div className="stat-info">
            <p className="stat-label">MIS Positions</p>
            <h4 className="stat-value">{misPositions}</h4>
          </div>
        </div>
      </div>

      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table-container">
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg.</th>
                <th>LTP</th>
                <th>P&L</th>
                <th>Chg.</th>
              </tr>
            </thead>
            <tbody>
              {allPositions.map((stock, index) => {
                const currentPrice = stockPrices[stock.name] || stock.price;
                const curValue = currentPrice * stock.qty;
                const pnl = getPositionPnL(stock);
                const pnlPercent = getPositionPnLPercent(stock);
                const isProfit = pnl >= 0;
                const profClass = isProfit ? "profit" : "loss";
                const priceChange = getPriceChange(stock.name);
                const dayClass = priceChange.isDown ? "loss" : "profit";

                return (
                  <tr key={index} className={isProfit ? "profit-row" : "loss-row"}>
                    <td>
                      <span className={`order-mode ${stock.product.toLowerCase()}`}>
                        {stock.product}
                      </span>
                    </td>
                    <td>
                      <div className="stock-cell">
                        <span className={`stock-name ${profClass}`}>{stock.name}</span>
                        {isProfit ? <TrendingUp className="pnl-icon profit" /> : <TrendingDown className="pnl-icon loss" />}
                      </div>
                    </td>
                    <td>{stock.qty}</td>
                    <td>{stock.avg.toFixed(2)}</td>
                    <td className={priceChange.isDown ? "price-down" : "price-up"}>
                      ₹{currentPrice.toFixed(2)}
                    </td>
                    <td className={profClass}>
                      <div className="pnl-cell">
                        <span>{isProfit ? '+' : ''}₹{pnl.toFixed(2)}</span>
                        <span className="pnl-percent">({pnlPercent}%)</span>
                      </div>
                    </td>
                    <td className={dayClass}>{stock.day}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Position Summary */}
      <div className="row" style={{ marginTop: '20px' }}>
        <div className="col">
          <h5>
            {totalInvestment.toLocaleString()}.
            <span>{(totalInvestment % 1).toFixed(2).split('.')[1] || '00'}</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            {currentValue.toLocaleString()}.
            <span>{(currentValue % 1).toFixed(2).split('.')[1] || '00'}</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={totalPnL >= 0 ? 'profit' : 'loss'}>
            {totalPnL >= 0 ? '+' : ''}{totalPnL.toFixed(2)} ({pnlPercent}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Positions;

