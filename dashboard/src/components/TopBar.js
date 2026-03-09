import React, { useState, useEffect, useContext } from "react";

import Menu from "./Menu";
import GeneralContext from "./GeneralContext";

const TopBar = () => {
  const [indices, setIndices] = useState({
    nifty: { value: 24567.85, change: 125.40, percent: 0.51 },
    sensex: { value: 81245.32, change: 425.18, percent: 0.53 },
    bnf: { value: 52345.67, change: -185.30, percent: -0.35 },
    niftyst: { value: 18567.23, change: 89.45, percent: 0.48 },
  });

  const { stockPrices } = useContext(GeneralContext);

  // Simulate real-time index updates
  useEffect(() => {
    const updateIndices = () => {
      setIndices(prev => ({
        nifty: {
          value: prev.nifty.value + (Math.random() - 0.5) * 20,
          change: prev.nifty.change + (Math.random() - 0.5) * 5,
          percent: ((prev.nifty.change + (Math.random() - 0.5) * 5) / prev.nifty.value) * 100
        },
        sensex: {
          value: prev.sensex.value + (Math.random() - 0.5) * 80,
          change: prev.sensex.change + (Math.random() - 0.5) * 20,
          percent: ((prev.sensex.change + (Math.random() - 0.5) * 20) / prev.sensex.value) * 100
        },
        bnf: {
          value: prev.bnf.value + (Math.random() - 0.5) * 60,
          change: prev.bnf.change + (Math.random() - 0.5) * 15,
          percent: ((prev.bnf.change + (Math.random() - 0.5) * 15) / prev.bnf.value) * 100
        },
        niftyst: {
          value: prev.niftyst.value + (Math.random() - 0.5) * 15,
          change: prev.niftyst.change + (Math.random() - 0.5) * 3,
          percent: ((prev.niftyst.change + (Math.random() - 0.5) * 3) / prev.niftyst.value) * 100
        }
      }));
    };

    const interval = setInterval(updateIndices, 3000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    return num.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  };

  const formatPercent = (num) => {
    return (num >= 0 ? '+' : '') + num.toFixed(2) + '%';
  };

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">{formatNumber(indices.nifty.value)}</p>
          <p className={`percent ${indices.nifty.change >= 0 ? 'up' : 'down'}`}>
            {formatPercent(indices.nifty.percent)}
          </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">{formatNumber(indices.sensex.value)}</p>
          <p className={`percent ${indices.sensex.change >= 0 ? 'up' : 'down'}`}>
            {formatPercent(indices.sensex.percent)}
          </p>
        </div>
        <div className="nifty">
          <p className="index">BANKNIFTY</p>
          <p className="index-points">{formatNumber(indices.bnf.value)}</p>
          <p className={`percent ${indices.bnf.change >= 0 ? 'up' : 'down'}`}>
            {formatPercent(indices.bnf.percent)}
          </p>
        </div>
        <div className="sensex">
          <p className="index">NIFTY MIDCAP</p>
          <p className="index-points">{formatNumber(indices.niftyst.value)}</p>
          <p className={`percent ${indices.niftyst.change >= 0 ? 'up' : 'down'}`}>
            {formatPercent(indices.niftyst.percent)}
          </p>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;

