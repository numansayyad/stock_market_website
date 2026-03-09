import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { 
  TrendingUp, 
  TrendingDown, 
  SwapHoriz,
  CheckCircle,
  Cancel
} from "@mui/icons-material";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    
    axios.get(`/allOrders${queryParams}`)
      .then((res) => {
        setAllOrders(res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        // Only show demo orders for visitors (not logged in)
        if (!userId) {
          setAllOrders([
            { name: "INFY", qty: 1, price: 1550, mode: "BUY", date: new Date() },
            { name: "TCS", qty: 2, price: 3200, mode: "BUY", date: new Date() },
            { name: "RELIANCE", qty: 5, price: 2100, mode: "SELL", date: new Date() },
          ]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Calculate order analytics
  const buyOrders = allOrders.filter(order => order.mode === "BUY");
  const sellOrders = allOrders.filter(order => order.mode === "SELL");
  
  const buyValue = buyOrders.reduce((acc, order) => acc + (order.price * order.qty), 0);
  const sellValue = sellOrders.reduce((acc, order) => acc + (order.price * order.qty), 0);
  
  const netValue = sellValue - buyValue;
  
  // Get unique stocks
  const uniqueStocks = [...new Set(allOrders.map(order => order.name))];

  // Today's orders
  const todayOrders = allOrders.filter(order => {
    const orderDate = new Date(order.date);
    const today = new Date();
    return orderDate.toDateString() === today.toDateString();
  });

  // Check if user is logged in
  const userId = getUserId();
  const isLoggedIn = !!userId;
  const showEmptyState = isLoggedIn && allOrders.length === 0;

  // Show loading state
  if (isLoading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Loading orders...</p>
      </div>
    );
  }

  // Show empty state for new logged in users
  if (showEmptyState) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders yet</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders">
      {/* Order Analytics Cards */}
      <div className="analytics-grid" style={{ marginBottom: '20px' }}>
        <div className="analytics-card">
          <div className="card-icon blue-bg">
            <SwapHoriz />
          </div>
          <div className="card-content">
            <p className="card-label">Total Orders</p>
            <h3 className="card-value">{allOrders.length}</h3>
            <p className="card-sub">{todayOrders.length} today</p>
          </div>
        </div>

        <div className="analytics-card">
          <div className="card-icon profit-bg">
            <TrendingUp />
          </div>
          <div className="card-content">
            <p className="card-label">Buy Orders</p>
            <h3 className="card-value">{buyOrders.length}</h3>
            <p className="card-sub">₹{buyValue.toLocaleString()}</p>
          </div>
        </div>

        <div className="analytics-card">
          <div className="card-icon sell-bg">
            <TrendingDown />
          </div>
          <div className="card-content">
            <p className="card-label">Sell Orders</p>
            <h3 className="card-value">{sellOrders.length}</h3>
            <p className="card-sub">₹{sellValue.toLocaleString()}</p>
          </div>
        </div>

        <div className="analytics-card">
          <div className={`card-icon ${netValue >= 0 ? 'profit-bg' : 'purple-bg'}`}>
            {netValue >= 0 ? <CheckCircle /> : <Cancel />}
          </div>
          <div className="card-content">
            <p className="card-label">Net Value</p>
            <h3 className={`card-value ${netValue >= 0 ? 'profit' : 'loss'}`}>
              {netValue >= 0 ? '+' : ''}₹{netValue.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>

      {/* Order Statistics */}
      <div className="order-stats" style={{ marginBottom: '20px' }}>
        <div className="stat-item">
          <div className="stat-icon blue-bg">
            <SwapHoriz />
          </div>
          <div className="stat-info">
            <p className="stat-label">Unique Stocks</p>
            <h4 className="stat-value">{uniqueStocks.length}</h4>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon profit-bg">
            <CheckCircle />
          </div>
          <div className="stat-info">
            <p className="stat-label">Buy Orders</p>
            <h4 className="stat-value profit">{buyOrders.length}</h4>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon sell-bg">
            <Cancel />
          </div>
          <div className="stat-info">
            <p className="stat-label">Sell Orders</p>
            <h4 className="stat-value loss">{sellOrders.length}</h4>
          </div>
        </div>
      </div>

      <h3 className="title">Orders ({allOrders.length})</h3>

      <div className="order-table-container">
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Mode</th>
                <th>Date</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>{order.price}</td>
                  <td>
                    <span className={`order-mode ${order.mode.toLowerCase()}`}>
                      {order.mode === "BUY" ? <TrendingUp /> : <TrendingDown />}
                      {order.mode}
                    </span>
                  </td>
                  <td>{order.date ? new Date(order.date).toLocaleDateString() : '-'}</td>
                  <td className={order.mode === "BUY" ? "loss" : "profit"}>
                    {order.mode === "SELL" ? '+' : '-'}₹{(order.price * order.qty).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;

