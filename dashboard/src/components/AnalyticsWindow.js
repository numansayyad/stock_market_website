import React, { useState, useEffect, useContext } from "react";
import GeneralContext from "./GeneralContext";
import {
  TrendingUp,
  TrendingDown,
  ShowChart,
  BarChart,
  PieChart,
  Info,
  Close,
} from "@mui/icons-material";

const AnalyticsWindow = ({ stockName, onClose }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useContext(GeneralContext);
  const stockPrices = context?.stockPrices || {};
  const baseStockPrices = context?.baseStockPrices || {};
  const getPriceChange = context?.getPriceChange || ((name) => ({ change: 0, percent: "0%", isDown: false }));
  const getStockTrend = context?.getStockTrend || ((name) => 'neutral');
  const priceHistory = context?.priceHistory || {};
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    if (!stockName || !stockPrices || Object.keys(stockPrices).length === 0) {
      return;
    }
    
    const currentPrice = stockPrices[stockName];
    const basePrice = baseStockPrices[stockName];
    
    // If stock not found in our prices, use a default value
    if (!currentPrice || !basePrice) {
      // Use a default price for unknown stocks
      const defaultPrice = 100;
      const priceChange = { change: "0.00", percent: "0.00%", isDown: false };
      const trend = 'neutral';
      
      const historicalData = [];
      let runningPrice = defaultPrice;
      for (let i = 30; i >= 0; i--) {
        const change = (Math.random() - 0.5) * (defaultPrice * 0.02);
        runningPrice = runningPrice + change;
        historicalData.push({
          day: i,
          price: Number(runningPrice.toFixed(2))
        });
      }

      setStockData({
        name: stockName,
        currentPrice: defaultPrice,
        basePrice: defaultPrice,
        priceChange,
        trend,
        history: { prices: [], trend: 'neutral' },
        high52Week: Number((defaultPrice * 1.25).toFixed(2)),
        low52Week: Number((defaultPrice * 0.75).toFixed(2)),
        marketCap: (Math.random() * 1000000).toFixed(2) + 'B',
        peRatio: (Math.random() * 50 + 10).toFixed(2),
        volume: Math.floor(Math.random() * 10000000),
        avgVolume: Math.floor(Math.random() * 8000000),
        beta: (Math.random() * 1.5 + 0.5).toFixed(2),
        dividend: (Math.random() * 3).toFixed(2),
        eps: (Math.random() * 50 + 10).toFixed(2),
        historicalData,
      });
      return;
    }
    
    const priceChange = getPriceChange(stockName);
    const trend = getStockTrend(stockName);
    const history = priceHistory[stockName] || { prices: [], trend: 'neutral' };

    // Generate mock historical data
    const historicalData = [];
    let runningPrice = basePrice;
    for (let i = 30; i >= 0; i--) {
      const change = (Math.random() - 0.5) * (basePrice * 0.02);
      runningPrice = runningPrice + change;
      historicalData.push({
        day: i,
        price: Number(runningPrice.toFixed(2))
      });
    }

    setStockData({
      name: stockName,
      currentPrice,
      basePrice,
      priceChange,
      trend,
      history,
      high52Week: Number((currentPrice * 1.25).toFixed(2)),
      low52Week: Number((currentPrice * 0.75).toFixed(2)),
      marketCap: (Math.random() * 1000000).toFixed(2) + 'B',
      peRatio: (Math.random() * 50 + 10).toFixed(2),
      volume: Math.floor(Math.random() * 10000000),
      avgVolume: Math.floor(Math.random() * 8000000),
      beta: (Math.random() * 1.5 + 0.5).toFixed(2),
      dividend: (Math.random() * 3).toFixed(2),
      eps: (Math.random() * 50 + 10).toFixed(2),
      historicalData,
    });
  }, [stockName, stockPrices, baseStockPrices, getPriceChange, getStockTrend, priceHistory]);

  if (!stockData) return null;

  return (
    <div className="analytics-overlay" onClick={onClose}>
      <div className="analytics-window" onClick={(e) => e.stopPropagation()}>
        <div className="analytics-header">
          <div className="analytics-title">
            <ShowChart className="analytics-icon" />
            <h2>{stockData.name} - Analytics</h2>
          </div>
          <button className="analytics-close" onClick={onClose}>
            <Close />
          </button>
        </div>

        <div className="analytics-content">
          {/* Price Overview */}
          <div className="analytics-section">
            <h3>Price Overview</h3>
            <div className="price-grid">
              <div className="price-card">
                <span className="label">Current Price</span>
                <span className={`value ${stockData.priceChange.isDown ? 'loss' : 'profit'}`}>
                  ₹{stockData.currentPrice.toFixed(2)}
                </span>
              </div>
              <div className="price-card">
                <span className="label">Change</span>
                <span className={`value ${stockData.priceChange.isDown ? 'loss' : 'profit'}`}>
                  {stockData.priceChange.isDown ? '' : '+'}{stockData.priceChange.change} ({stockData.priceChange.percent})
                </span>
              </div>
              <div className="price-card">
                <span className="label">Trend</span>
                <span className={`value ${stockData.trend === 'up' ? 'profit' : stockData.trend === 'down' ? 'loss' : ''}`}>
                  {stockData.trend === 'up' && <><TrendingUp /> Strong Upward</>}
                  {stockData.trend === 'down' && <><TrendingDown /> Strong Downward</>}
                  {stockData.trend === 'neutral' && <>— Stable</>}
                </span>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="analytics-section">
            <h3>Key Metrics</h3>
            <div className="metrics-grid">
              <div className="metric-item">
                <BarChart className="metric-icon" />
                <div className="metric-info">
                  <span className="label">52W High</span>
                  <span className="value">₹{stockData.high52Week}</span>
                </div>
              </div>
              <div className="metric-item">
                <BarChart className="metric-icon down" />
                <div className="metric-info">
                  <span className="label">52W Low</span>
                  <span className="value">₹{stockData.low52Week}</span>
                </div>
              </div>
              <div className="metric-item">
                <PieChart className="metric-icon" />
                <div className="metric-info">
                  <span className="label">Market Cap</span>
                  <span className="value">${stockData.marketCap}</span>
                </div>
              </div>
              <div className="metric-item">
                <Info className="metric-icon" />
                <div className="metric-info">
                  <span className="label">P/E Ratio</span>
                  <span className="value">{stockData.peRatio}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="analytics-section">
            <h3>Additional Information</h3>
            <div className="metrics-grid">
              <div className="metric-item">
                <ShowChart className="metric-icon" />
                <div className="metric-info">
                  <span className="label">Volume</span>
                  <span className="value">{stockData.volume.toLocaleString()}</span>
                </div>
              </div>
              <div className="metric-item">
                <ShowChart className="metric-icon" />
                <div className="metric-info">
                  <span className="label">Avg Volume</span>
                  <span className="value">{stockData.avgVolume.toLocaleString()}</span>
                </div>
              </div>
              <div className="metric-item">
                <TrendingUp className="metric-icon" />
                <div className="metric-info">
                  <span className="label">Beta</span>
                  <span className="value">{stockData.beta}</span>
                </div>
              </div>
              <div className="metric-item">
                <PieChart className="metric-icon" />
                <div className="metric-info">
                  <span className="label">Dividend Yield</span>
                  <span className="value">{stockData.dividend}%</span>
                </div>
              </div>
              <div className="metric-item">
                <Info className="metric-icon" />
                <div className="metric-info">
                  <span className="label">EPS</span>
                  <span className="value">₹{stockData.eps}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mini Chart Representation */}
          <div className="analytics-section">
            <h3>30-Day Price Movement</h3>
            <div className="mini-chart">
              {stockData.historicalData.map((data, index) => {
                const minPrice = Math.min(...stockData.historicalData.map(d => d.price));
                const maxPrice = Math.max(...stockData.historicalData.map(d => d.price));
                const height = ((data.price - minPrice) / (maxPrice - minPrice)) * 100;
                const isUp = index > 0 && data.price > stockData.historicalData[index - 1].price;
                
                return (
                  <div
                    key={index}
                    className={`chart-bar ${isUp ? 'up' : 'down'}`}
                    style={{ height: `${height}%` }}
                    title={`Day ${data.day}: ₹${data.price}`}
                  />
                );
              })}
            </div>
            <div className="chart-labels">
              <span>30 days ago</span>
              <span>Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsWindow;

