import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useUser } from "./UserContext";
import GeneralContext from "./GeneralContext";

import { 
  TrendingUp, 
  TrendingDown, 
  AccountBalance, 
  ShowChart,
  PieChart,
  BarChart,
  AccessTime,
} from "@mui/icons-material";

const Summary = () => {
  const { user } = useUser();
  const [holdings, setHoldings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(GeneralContext);
  const stockPrices = context?.stockPrices || {};
  const getPriceChange = context?.getPriceChange || ((name) => ({ change: 0, percent: "0%", isDown: false }));
  const openBuyWindow = context?.openBuyWindow || (() => {});
  const openSellWindow = context?.openSellWindow || (() => {});
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const navigate = useNavigate();

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
      try {
        const queryParams = userId ? `?userId=${userId}` : '';
        const [holdingsRes, ordersRes, positionsRes] = await Promise.all([
          axios.get(`/allHoldings${queryParams}`),
          axios.get(`/allOrders${queryParams}`),
          axios.get(`/allPositions${queryParams}`)
        ]);
        
        setHoldings(holdingsRes.data || []);
        setOrders(ordersRes.data || []);
        setPositions(positionsRes.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        // Don't set demo data for logged in users - show empty
        if (!userId) {
          setHoldings([
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
          setOrders([
            { name: "INFY", qty: 1, price: 1550, mode: "BUY", date: new Date() },
            { name: "TCS", qty: 2, price: 3200, mode: "BUY", date: new Date() },
            { name: "RELIANCE", qty: 5, price: 2100, mode: "SELL", date: new Date() },
          ]);
          setPositions([
            { name: "EVEREADY", qty: 2, avg: 316.27, price: 312.35, product: "CNC" },
            { name: "JUBLFOOD", qty: 1, avg: 3124.75, price: 3082.65, product: "CNC" },
          ]);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Update timestamp every time stockPrices change
  useEffect(() => {
    setLastUpdate(new Date());
  }, [stockPrices]);

  // Calculate analytics with real-time prices
  const calculateRealTimeValue = (stock) => {
    const currentPrice = stockPrices[stock.name] || stock.price;
    return currentPrice * stock.qty;
  };

  // Get userId for checking login status
  const userId = getUserId();
  const isLoggedIn = !!userId;

  // Use holdings from database for logged in users, demo data for visitors only
  const displayHoldings = !isLoggedIn ? holdings : holdings;
  
  // Show empty for logged in users with no holdings
  const showEmptyState = isLoggedIn && holdings.length === 0;

  const totalInvestment = displayHoldings.reduce((acc, stock) => acc + (stock.avg * stock.qty), 0);
  const currentValue = displayHoldings.reduce((acc, stock) => acc + calculateRealTimeValue(stock), 0);
  const totalPnL = currentValue - totalInvestment;
  const pnlPercent = totalInvestment > 0 ? ((totalPnL / totalInvestment) * 100).toFixed(2) : 0;

  // Calculate today's P&L with real-time prices
  const todayPnL = displayHoldings.reduce((acc, stock) => {
    const currentPrice = stockPrices[stock.name] || stock.price;
    const prevPrice = currentPrice / (1 + (parseFloat(stock.day) / 100));
    return acc + ((currentPrice - prevPrice) * stock.qty);
  }, 0);

  const todayPnLPercent = currentValue > 0 ? ((todayPnL / currentValue) * 100).toFixed(2) : 0;

  const buyOrders = orders.filter(order => order.mode === "BUY").length;
  const sellOrders = orders.filter(order => order.mode === "SELL").length;

  const userName = user?.name || "User";

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  // Quick action handlers
  const handleBuyStock = () => {
    openBuyWindow("INFY");
  };

  const handleSellStock = () => {
    openSellWindow("INFY");
  };

  const handleAddFunds = () => {
    navigate("/funds");
  };

  // Show loading state
  if (isLoading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Loading your portfolio...</p>
      </div>
    );
  }

  // Show empty state for new logged in users
  if (showEmptyState) {
    return (
      <>
        <div className="welcome-section">
          <div className="welcome-header">
            <div>
              <h6>Hi, {userName}!</h6>
              <p className="welcome-message">Welcome to your trading dashboard</p>
            </div>
            <div className="update-timestamp">
              <AccessTime className="update-icon" />
              <span>Last updated: {formatTime(lastUpdate)}</span>
            </div>
          </div>
          <hr className="divider" />
        </div>

        {/* Empty Portfolio State */}
        <div className="analytics-grid">
          <div className="analytics-card clickable" onClick={() => navigate("/holdings")}>
            <div className="card-icon blue-bg">
              <AccountBalance />
            </div>
            <div className="card-content">
              <p className="card-label">Portfolio Value</p>
              <h3 className="card-value">₹0</h3>
              <p className="card-change">Start investing!</p>
            </div>
          </div>

          <div className="analytics-card clickable" onClick={() => navigate("/holdings")}>
            <div className="card-icon blue-bg">
              <PieChart />
            </div>
            <div className="card-content">
              <p className="card-label">Total Investment</p>
              <h3 className="card-value">₹0</h3>
              <p className="card-sub">0 holdings</p>
            </div>
          </div>

          <div className="analytics-card clickable" onClick={() => navigate("/holdings")}>
            <div className="card-icon blue-bg">
              <ShowChart />
            </div>
            <div className="card-content">
              <p className="card-label">Today's P&L</p>
              <h3 className="card-value">₹0.00</h3>
              <p className="card-change">0.00%</p>
            </div>
          </div>
        </div>

        <hr className="divider" />

        <div className="section">
          <span><p>Equity</p></span>
          <div className="data">
            <div className="first">
              <h3>₹3,740</h3>
              <p>Margin available</p>
            </div>
            <hr />
            <div className="second">
              <p>Margins used <span>₹0</span></p>
              <p>Opening balance <span>₹3,740</span></p>
            </div>
          </div>
          <hr className="divider" />
        </div>

        <div className="section clickable" onClick={() => navigate("/holdings")}>
          <span><p>Holdings (0)</p></span>
          <div className="data">
            <div className="first">
              <h3 className="profit">₹0 <small>0%</small></h3>
              <p>P&L</p>
            </div>
            <hr />
            <div className="second">
              <p>Current Value <span>₹0</span></p>
              <p>Investment <span>₹0</span></p>
            </div>
          </div>
          <hr className="divider" />
        </div>

        {/* Quick Actions */}
        <div className="section quick-actions">
          <span><p>Quick Actions</p></span>
          <div className="action-buttons">
            <button className="action-btn buy-btn" onClick={handleBuyStock}>Buy Stock</button>
            <button className="action-btn sell-btn" onClick={handleSellStock}>Sell Stock</button>
            <button className="action-btn funds-btn" onClick={handleAddFunds}>Add Funds</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="welcome-section">
        <div className="welcome-header">
          <div>
            <h6>Hi, {userName}!</h6>
            <p className="welcome-message">Welcome back to your trading dashboard</p>
          </div>
          <div className="update-timestamp">
            <AccessTime className="update-icon" />
            <span>Last updated: {formatTime(lastUpdate)}</span>
          </div>
        </div>
        <hr className="divider" />
      </div>

      {/* Portfolio Overview Cards */}
      <div className="analytics-grid">
        <div className="analytics-card clickable" onClick={() => navigate("/holdings")}>
          <div className={`card-icon ${totalPnL >= 0 ? 'profit-bg' : 'loss-bg'}`}>
            <AccountBalance />
          </div>
          <div className="card-content">
            <p className="card-label">Portfolio Value</p>
            <h3 className="card-value">₹{currentValue.toLocaleString()}</h3>
            <p className={`card-change ${totalPnL >= 0 ? 'profit' : 'loss'}`}>
              {totalPnL >= 0 ? <TrendingUp /> : <TrendingDown />}
              <span className="pnl-indicator">
                {totalPnL >= 0 ? '+' : ''}₹{totalPnL.toFixed(2)} ({pnlPercent}%)
              </span>
            </p>
          </div>
        </div>

        <div className="analytics-card clickable" onClick={() => navigate("/holdings")}>
          <div className="card-icon blue-bg">
            <PieChart />
          </div>
          <div className="card-content">
            <p className="card-label">Total Investment</p>
            <h3 className="card-value">₹{totalInvestment.toLocaleString()}</h3>
            <p className="card-sub">{displayHoldings.length} holdings</p>
          </div>
        </div>

        <div className="analytics-card clickable" onClick={() => navigate("/holdings")}>
          <div className={`card-icon ${todayPnL >= 0 ? 'profit-bg' : 'purple-bg'}`}>
            <ShowChart />
          </div>
          <div className="card-content">
            <p className="card-label">Today's P&L</p>
            <h3 className={`card-value ${todayPnL >= 0 ? 'profit' : 'loss'}`}>
              {todayPnL >= 0 ? '+' : ''}₹{todayPnL.toFixed(2)}
            </h3>
            <p className={`card-change ${todayPnL >= 0 ? 'profit' : 'loss'}`}>
              {todayPnLPercent}%
            </p>
          </div>
        </div>
      </div>

      <hr className="divider" />

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>₹99,740</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>₹0</span>{" "}
            </p>
            <p>
              Opening balance <span>₹3,740</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section clickable" onClick={() => navigate("/holdings")}>
        <span>
          <p>Holdings ({displayHoldings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={totalPnL >= 0 ? "profit" : "loss"}>
              {totalPnL >= 0 ? '+' : ''}₹{totalPnL.toFixed(2)} <small>{pnlPercent}%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>₹{currentValue.toLocaleString()}</span>{" "}
            </p>
            <p>
              Investment <span>₹{totalInvestment.toLocaleString()}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      {/* Order Statistics */}
      <div className="section clickable" onClick={() => navigate("/orders")}>
        <span>
          <p>Order Statistics</p>
        </span>

        <div className="order-stats">
          <div className="stat-item">
            <div className="stat-icon buy-bg">
              <TrendingUp />
            </div>
            <div className="stat-info">
              <p className="stat-label">Buy Orders</p>
              <h4 className="stat-value">{buyOrders}</h4>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon sell-bg">
              <TrendingDown />
            </div>
            <div className="stat-info">
              <p className="stat-label">Sell Orders</p>
              <h4 className="stat-value">{sellOrders}</h4>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon blue-bg">
              <BarChart />
            </div>
            <div className="stat-info">
              <p className="stat-label">Total Orders</p>
              <h4 className="stat-value">{orders.length}</h4>
            </div>
          </div>

          <div className="stat-item clickable" onClick={(e) => { e.stopPropagation(); navigate("/positions"); }}>
            <div className="stat-icon purple-bg">
              <ShowChart />
            </div>
            <div className="stat-info">
              <p className="stat-label">Positions</p>
              <h4 className="stat-value">{positions.length}</h4>
            </div>
          </div>
        </div>
        <hr className="divider" />
      </div>

      {/* Quick Actions */}
      <div className="section quick-actions">
        <span>
          <p>Quick Actions</p>
        </span>
        <div className="action-buttons">
          <button className="action-btn buy-btn" onClick={handleBuyStock}>Buy Stock</button>
          <button className="action-btn sell-btn" onClick={handleSellStock}>Sell Stock</button>
          <button className="action-btn funds-btn" onClick={handleAddFunds}>Add Funds</button>
        </div>
      </div>
    </>
  );
};

export default Summary;

