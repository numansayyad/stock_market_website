import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode: initialMode }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [mode, setMode] = useState(initialMode || "BUY");
  const [allHoldings, setAllHoldings] = useState([]);
  const [availableQty, setAvailableQty] = useState(0);
  
  // Use context properly
  const context = useContext(GeneralContext);

  useEffect(() => {
    // Get userId from localStorage or URL params
    let userId = localStorage.getItem("userId");
    if (!userId) {
      const urlParams = new URLSearchParams(window.location.search);
      userId = urlParams.get('userId');
      if (userId) {
        localStorage.setItem("userId", userId);
      }
    }
    
    // Fetch holdings to get current stock price and available quantity
    const queryParams = userId ? `?userId=${userId}` : '';
    axios.get(`/allHoldings${queryParams}`)
      .then((res) => {
        setAllHoldings(res.data);
        const stock = res.data.find(s => s.name === uid);
        if (stock) {
          setStockPrice(stock.price);
          setAvailableQty(stock.qty);
        }
      })
      .catch((err) => {
        console.error("Error fetching holdings:", err);
      });
  }, [uid]);

  const handleOrderClick = () => {
    // Get userId from localStorage or URL params
    let userId = localStorage.getItem("userId");
    if (!userId) {
      const urlParams = new URLSearchParams(window.location.search);
      userId = urlParams.get('userId');
    }
    
    axios.post("/newOrder", {
      userId: userId,
      name: uid,
      qty: parseInt(stockQuantity),
      price: parseFloat(stockPrice),
      mode: mode,
    }).then(() => {
      alert(`${mode} order placed successfully!`);
      // Refresh holdings after order
      if (mode === "BUY") {
        // After buying, add to holdings
        axios.get(`/allHoldings${userId ? `?userId=${userId}` : ''}`)
          .then((res) => {
            setAllHoldings(res.data);
            const stock = res.data.find(s => s.name === uid);
            if (stock) {
              setStockPrice(stock.price);
              setAvailableQty(stock.qty);
            }
          });
      }
    }).catch((err) => {
      console.error("Error placing order:", err);
      alert("Failed to place order. Please try again.");
    });

    if (context && context.closeBuyWindow) {
      context.closeBuyWindow();
    } else if (GeneralContext.closeBuyWindow) {
      GeneralContext.closeBuyWindow();
    }
  };

  const handleCancelClick = () => {
    if (context && context.closeBuyWindow) {
      context.closeBuyWindow();
    } else {
      GeneralContext.closeBuyWindow();
    }
  };

  const calculateTotal = () => {
    return (stockQuantity * stockPrice).toFixed(2);
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="header">
        <h3>{uid} <span>NSE</span></h3>
        <div className="market-options">
          <label>
            <input type="radio" name="market" defaultChecked /> CNC
          </label>
          <label>
            <input type="radio" name="market" /> MIS
          </label>
        </div>
      </div>

      <div className="tab">
        <button 
          className={mode === "BUY" ? "active" : ""} 
          onClick={() => setMode("BUY")}
        >
          BUY
        </button>
        <button 
          className={mode === "SELL" ? "active" : ""} 
          onClick={() => setMode("SELL")}
        >
          SELL
        </button>
      </div>

      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              min="0"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>

        <div className="options">
          <span>Qty: 1</span>
          <span>Price: {stockPrice}</span>
          <span>Total: ₹{calculateTotal()}</span>
        </div>

        {mode === "SELL" && availableQty > 0 && (
          <div className="available-qty">
            <small>Available: {availableQty} shares</small>
          </div>
        )}
      </div>

      <div className="buttons">
        <span>Order Value: ₹{calculateTotal()}</span>
        <div>
          <Link 
            className={`btn ${mode === "BUY" ? "btn-blue" : "btn-sell"}`} 
            onClick={handleOrderClick}
          >
            {mode}
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
