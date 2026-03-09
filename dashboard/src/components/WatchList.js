import React, { useState, useContext, useEffect } from "react";

import GeneralContext from "./GeneralContext";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
  TrendingUp,
  TrendingDown,
} from "@mui/icons-material";

import { watchlist } from "../data/data";
import { DoughnutChart } from "./DoughnoutChart";

const labels = watchlist.map((subArray) => subArray["name"]);

const WatchList = () => {
  const { stockPrices } = useContext(GeneralContext);
  
  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => stockPrices[stock.name] || stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => {
          return <WatchListItem stock={stock} key={index} />;
        })}
      </ul>

      <DoughnutChart data={data} />
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);
  const { stockPrices, getPriceChange, getStockTrend } = useContext(GeneralContext);
  const [priceChange, setPriceChange] = useState({ change: 0, percent: "0%", isDown: false });
  const [prevPrice, setPrevPrice] = useState(stockPrices[stock.name] || stock.price);
  const [priceDirection, setPriceDirection] = useState(null);

  useEffect(() => {
    const currentPrice = stockPrices[stock.name] || stock.price;
    const change = getPriceChange(stock.name);
    setPriceChange(change);
    
    // Determine price direction for animation
    if (currentPrice > prevPrice) {
      setPriceDirection('up');
    } else if (currentPrice < prevPrice) {
      setPriceDirection('down');
    }
    setPrevPrice(currentPrice);
    
    // Reset direction after animation
    const timer = setTimeout(() => setPriceDirection(null), 500);
    return () => clearTimeout(timer);
  }, [stockPrices, stock.name, getPriceChange, prevPrice]);

  const handleMouseEnter = (e) => {
    setShowWatchlistActions(true);
  };

  const handleMouseLeave = (e) => {
    setShowWatchlistActions(false);
  };

  const currentPrice = stockPrices[stock.name] || stock.price;
  const trend = getStockTrend(stock.name);

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <div className="stock-info">
          <p className={`stock-name ${trend === 'up' ? 'up' : trend === 'down' ? 'down' : ''}`}>
            {stock.name}
            {trend === 'up' && <TrendingUp className="trend-icon up" />}
            {trend === 'down' && <TrendingDown className="trend-icon down" />}
          </p>
        </div>
        <div className="itemInfo">
          <span className={`price ${priceDirection === 'up' ? 'price-up' : priceDirection === 'down' ? 'price-down' : ''}`}>
            ₹{currentPrice.toFixed(2)}
          </span>
          <span className={`percent ${priceChange.isDown ? "down" : "up"}`}>
            {priceChange.percent}
          </span>
          {priceChange.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
        </div>
      </div>
      {showWatchlistActions && <WatchListActions uid={stock.name} />}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };

  const handleSellClick = () => {
    generalContext.openSellWindow(uid);
  };

  const handleAnalyticsClick = () => {
    generalContext.openAnalyticsWindow(uid);
  };

  return (
    <div className="watchlist-actions">
      <button className="wl-action-btn buy-btn" onClick={handleBuyClick}>
        <span className="btn-text">Buy</span>
      </button>
      <button className="wl-action-btn sell-btn" onClick={handleSellClick}>
        <span className="btn-text">Sell</span>
      </button>
      <button className="wl-action-btn analytics-btn" onClick={handleAnalyticsClick}>
        <BarChartOutlined className="action-icon" />
      </button>
      <button className="wl-action-btn more-btn">
        <MoreHoriz className="action-icon" />
      </button>
    </div>
  );
};

