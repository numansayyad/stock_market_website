import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import GeneralContext from "./GeneralContext";

import { 
  TrendingUp, 
  TrendingDown, 
  AccountBalance,
  PieChart,
  BarChart,
  TrendingFlat,
} from "@mui/icons-material";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
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
    
    const fetchData = async () => {
      setIsLoading(true);
      const queryParams = userId ? `?userId=${userId}` : '';
      
      try {
        const res = await axios.get(`/allHoldings${queryParams}`);
        setAllHoldings(res.data || []);
      } catch (err) {
        console.error("Error fetching holdings:", err);
        // Only use demo data when NOT logged in
        if (!userId) {
          setAllHoldings([
            { name: "BHARTIARTL", qty: 2, avg: 500.00, price: 600.00, day: "+2.99%", net: "+20.00%" },
            { name: "HDFCBANK", qty: 2, avg: 1400.00, price: 1522.35, day: "+0.11%", net: "+8.75%" },
            { name: "HINDUNILVR", qty: 1, avg: 2500.00, price: 2417.40, day: "+0.21%", net: "-3.31%" },
            { name: "INFY", qty: 1, avg: 1600.00, price: 1555.45, day: "-1.60%", net: "-2.78%" },
            { name: "ITC", qty: 5, avg: 250.00, price: 207.90, day: "+0.80%", net: "-16.84%" },
            { name: "KPITTECH", qty: 5, avg: 200.00, price: 266.45, day: "+3.54%", net: "+33.22%" },
            { name: "RELIANCE", qty: 1, avg: 2500.00, price: 2112.40, day: "+1.44%", net: "-14.52%" },
            { name: "SBIN", qty: 4, avg: 500.00, price: 430.20, day: "-0.34%", net: "-42.32%" },
            { name: "TCS", qty: 1, avg: 2800.00, price: 3194.80, day: "-0.25%", net: "+14.09%" },
            { name: "WIPRO", qty: 4, avg: 600.00, price: 577.75, day: "+0.32%", net: "-88.10%" },
          ]);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Calculate analytics with real-time prices
  const calculateRealTimeValue = (stock) => {
    const currentPrice = stockPrices[stock.name] || stock.price;
    return currentPrice * stock.qty;
  };

  // Get userId for checking login status
  const userId = getUserId();
  const isLoggedIn = !!userId;
  
  // Show empty state for logged in users with no holdings
  const showEmptyState = isLoggedIn && allHoldings.length === 0;

  // Use holdings from database
  const displayHoldings = allHoldings;

  const totalInvestment = displayHoldings.reduce((acc, stock) => acc + (stock.avg * stock.qty), 0);
  const currentValue = displayHoldings.reduce((acc, stock) => acc + calculateRealTimeValue(stock), 0);
  const totalPnL = currentValue - totalInvestment;
  const pnlPercent = totalInvestment > 0 ? ((totalPnL / totalInvestment) * 100).toFixed(2) : 0;
  
  // Calculate day's P&L with real-time prices
  const dayPnL = displayHoldings.reduce((acc, stock) => {
    const currentPrice = stockPrices[stock.name] || stock.price;
    const prevPrice = currentPrice / (1 + (parseFloat(stock.day) / 100));
    return acc + ((currentPrice - prevPrice) * stock.qty);
  }, 0);
  
  // Count profitable and losing stocks
  const profitableStocks = displayHoldings.filter(stock => {
    const currentPrice = stockPrices[stock.name] || stock.price;
    return (currentPrice * stock.qty) - (stock.avg * stock.qty) >= 0;
  }).length;
  const losingStocks = displayHoldings.length - profitableStocks;

  // Real-time P&L for each stock
  const getStockPnL = (stock) => {
    const currentPrice = stockPrices[stock.name] || stock.price;
    return (currentPrice * stock.qty) - (stock.avg * stock.qty);
  };

  const getStockPnLPercent = (stock) => {
    const currentPrice = stockPrices[stock.name] || stock.price;
    const investment = stock.avg * stock.qty;
    return investment > 0 ? ((currentPrice * stock.qty - investment) / investment * 100).toFixed(2) : 0;
  };

  const labels = displayHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: displayHoldings.map((stock) => stockPrices[stock.name] || stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // Show loading state
  if (isLoading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Loading your holdings...</p>
      </div>
    );
  }

  // Show empty state for new logged in users
  if (showEmptyState) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h3>No Holdings Yet</h3>
        <p>You haven't purchased any stocks yet. Start investing to see your holdings here!</p>
      </div>
    );
  }

  return (
    <>
      {/* Analytics Summary Cards */}
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
            <p className="card-sub">{displayHoldings.length} holdings</p>
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
          <div className={`card-icon ${dayPnL >= 0 ? 'profit-bg' : 'purple-bg'}`}>
            <BarChart />
          </div>
          <div className="card-content">
            <p className="card-label">Day's P&L</p>
            <h3 className={`card-value ${dayPnL >= 0 ? 'profit' : 'loss'}`}>
              {dayPnL >= 0 ? '+' : ''}₹{dayPnL.toFixed(2)}
            </h3>
            <p className="card-sub">Today</p>
          </div>
        </div>
      </div>

      {/* Stock Distribution */}
      <div className="order-stats" style={{ marginBottom: '20px' }}>
        <div className="stat-item">
          <div className="stat-icon profit-bg">
            <TrendingUp />
          </div>
          <div className="stat-info">
            <p className="stat-label">Profitable</p>
            <h4 className="stat-value profit">{profitableStocks}</h4>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon sell-bg">
            <TrendingDown />
          </div>
          <div className="stat-info">
            <p className="stat-label">Loss Making</p>
            <h4 className="stat-value loss">{losingStocks}</h4>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon blue-bg">
            <BarChart />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Holdings</p>
            <h4 className="stat-value">{displayHoldings.length}</h4>
          </div>
        </div>
      </div>

      <h3 className="title">Holdings ({displayHoldings.length})</h3>

      <div className="order-table-container">
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg. cost</th>
                <th>LTP</th>
                <th>Cur. val</th>
                <th>P&L</th>
                <th>Net chg.</th>
                <th>Day chg.</th>
              </tr>
            </thead>
            <tbody>
              {displayHoldings.map((stock, index) => {
                const currentPrice = stockPrices[stock.name] || stock.price;
                const curValue = currentPrice * stock.qty;
                const pnl = getStockPnL(stock);
                const pnlPercent = getStockPnLPercent(stock);
                const isProfit = pnl >= 0;
                const isHighProfit = isProfit && parseFloat(pnlPercent) >= 10;
                const isHighLoss = !isProfit && parseFloat(pnlPercent) <= -10;
                const profClass = isProfit ? "profit" : "loss";
                const priceChange = getPriceChange(stock.name);
                const dayClass = priceChange.isDown ? "loss" : "profit";

                return (
                  <tr key={index} className={isProfit ? "profit-row" : "loss-row"}>
                    <td>
                      <div className="stock-cell">
                        <span className={`stock-name ${profClass}`}>{stock.name}</span>
                        {isProfit ? <TrendingUp className="pnl-icon profit" /> : <TrendingDown className="pnl-icon loss" />}
                        {isHighProfit && <span className="high-badge profit-badge">High Profit</span>}
                        {isHighLoss && <span className="high-badge loss-badge">High Loss</span>}
                      </div>
                    </td>
                    <td>{stock.qty}</td>
                    <td>{stock.avg.toFixed(2)}</td>
                    <td className={priceChange.isDown ? "price-down" : "price-up"}>
                      ₹{currentPrice.toFixed(2)}
                    </td>
                    <td>₹{curValue.toFixed(2)}</td>
                    <td className={profClass}>
                      <div className="pnl-cell">
                        <span>{isProfit ? '+' : ''}₹{pnl.toFixed(2)}</span>
                        <span className="pnl-percent">({pnlPercent}%)</span>
                      </div>
                    </td>
                    <td className={profClass}>{stock.net}</td>
                    <td className={dayClass}>{stock.day}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row">
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
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;

