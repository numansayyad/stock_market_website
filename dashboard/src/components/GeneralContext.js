import React, { useState, useEffect, createContext } from "react";

import BuyActionWindow from "./BuyActionWindow";
import AnalyticsWindow from "./AnalyticsWindow";

// Base prices for stock simulation
const baseStockPrices = {
  // Watchlist stocks
  "INFY": 1555.45,
  "ONGC": 116.8,
  "TCS": 3194.8,
  "KPITTECH": 266.45,
  "QUICKHEAL": 308.55,
  "WIPRO": 577.75,
  "M&M": 779.8,
  "RELIANCE": 2112.4,
  "HUL": 512.4,
  // Holdings stocks
  "BHARTIARTL": 541.15,
  "HDFCBANK": 1522.35,
  "HINDUNILVR": 2417.4,
  "ITC": 207.9,
  "SBIN": 430.2,
  "SGBMAY29": 4719.0,
  "TATAPOWER": 124.15,
  // Position stocks
  "EVEREADY": 312.35,
  "JUBLFOOD": 3082.65,
};

const GeneralContext = createContext({
  openBuyWindow: (uid) => {},
  openSellWindow: (uid) => {},
  openAnalyticsWindow: (uid) => {},
  closeBuyWindow: () => {},
  closeAnalyticsWindow: () => {},
  getStockPrice: (name) => null,
  stockPrices: {},
  isAnalyticsOpen: false,
  analyticsStock: null,
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [analyticsStock, setAnalyticsStock] = useState(null);
  const [orderMode, setOrderMode] = useState("BUY");
  const [stockPrices, setStockPrices] = useState(baseStockPrices);
  const [priceHistory, setPriceHistory] = useState({});

  // Simulate real-time price updates
  useEffect(() => {
    const updatePrices = () => {
      setStockPrices((prevPrices) => {
        const newPrices = { ...prevPrices };
        const newHistory = { ...priceHistory };

        Object.keys(newPrices).forEach((stock) => {
          // Random price change between -0.5% and +0.5%
          const changePercent = (Math.random() - 0.5) * 1;
          const change = newPrices[stock] * (changePercent / 100);
          newPrices[stock] = Number((newPrices[stock] + change).toFixed(2));

          // Track price history for trend analysis
          if (!newHistory[stock]) {
            newHistory[stock] = { prices: [], trend: 'neutral' };
          }
          newHistory[stock].prices.push(newPrices[stock]);
          if (newHistory[stock].prices.length > 10) {
            newHistory[stock].prices.shift();
          }
          // Determine trend
          if (newHistory[stock].prices.length >= 2) {
            const recent = newHistory[stock].prices[newHistory[stock].prices.length - 1];
            const old = newHistory[stock].prices[0];
            newHistory[stock].trend = recent > old ? 'up' : recent < old ? 'down' : 'neutral';
          }
        });

        setPriceHistory(newHistory);
        return newPrices;
      });
    };

    // Update prices every 2 seconds for real-time effect
    const interval = setInterval(updatePrices, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenBuyWindow = (uid) => {
    setOrderMode("BUY");
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleOpenSellWindow = (uid) => {
    setOrderMode("SELL");
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleOpenAnalyticsWindow = (uid) => {
    setAnalyticsStock(uid);
    setIsAnalyticsOpen(true);
  };

  const handleCloseAnalyticsWindow = () => {
    setIsAnalyticsOpen(false);
    setAnalyticsStock(null);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
    setOrderMode("BUY");
  };

  const getStockPrice = (name) => {
    return stockPrices[name] || null;
  };

  const getPriceChange = (name) => {
    const currentPrice = stockPrices[name];
    const basePrice = baseStockPrices[name];
    if (!currentPrice || !basePrice) return { change: 0, percent: 0, isDown: false };
    
    const change = currentPrice - basePrice;
    const percent = (change / basePrice) * 100;
    return {
      change: change.toFixed(2),
      percent: percent.toFixed(2) + "%",
      isDown: change < 0
    };
  };

  const getStockTrend = (name) => {
    return priceHistory[name]?.trend || 'neutral';
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        openSellWindow: handleOpenSellWindow,
        openAnalyticsWindow: handleOpenAnalyticsWindow,
        closeBuyWindow: handleCloseBuyWindow,
        closeAnalyticsWindow: handleCloseAnalyticsWindow,
        getStockPrice,
        getPriceChange,
        getStockTrend,
        stockPrices,
        baseStockPrices,
        priceHistory,
        isAnalyticsOpen,
        analyticsStock,
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} mode={orderMode} />}
      {isAnalyticsOpen && analyticsStock && (
        <AnalyticsWindow stockName={analyticsStock} onClose={handleCloseAnalyticsWindow} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
