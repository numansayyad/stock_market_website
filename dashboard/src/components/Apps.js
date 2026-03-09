import React from "react";

import { 
  BarChart, 
  ShowChart, 
  TrendingUp, 
  Assessment,
  BugReport,
  Extension
} from "@mui/icons-material";

const Apps = () => {
  const apps = [
    {
      name: "Sensibull",
      description: "Options trading platform",
      icon: <BarChart />,
      color: "#f093fb"
    },
    {
      name: "Streak",
      description: "Algo trading platform",
      icon: <TrendingUp />,
      color: "#48c6ef"
    },
    {
      name: "SmallCase",
      description: "Thematic investing",
      icon: <Assessment />,
      color: "#6f86d6"
    },
    {
      name: "Coin",
      description: "Mutual fund investment",
      icon: <ShowChart />,
      color: "#f5576c"
    },
    {
      name: "Tijori",
      description: "Research and insights",
      icon: <BugReport />,
      color: "#667eea"
    },
    {
      name: "TradingView",
      description: "Advanced charting",
      icon: <Extension />,
      color: "#764ba2"
    }
  ];

  return (
    <div className="apps-container">
      <h3 className="title">Trading Apps</h3>
      
      <div className="apps-grid">
        {apps.map((app, index) => (
          <div className="app-card" key={index}>
            <div className="app-icon" style={{ background: `linear-gradient(135deg, ${app.color} 0%, #fff 100%)` }}>
              {app.icon}
            </div>
            <div className="app-info">
              <h4>{app.name}</h4>
              <p>{app.description}</p>
            </div>
            <button className="btn btn-blue">Launch</button>
          </div>
        ))}
      </div>

      <div className="coming-soon-section">
        <h3 className="title">Coming Soon</h3>
        <div className="coming-soon-grid">
          <div className="coming-soon-card">
            <h4>API Trading</h4>
            <p>Build your own trading algorithms</p>
          </div>
          <div className="coming-soon-card">
            <h4>Options Analytics</h4>
            <p>Advanced options chain analysis</p>
          </div>
          <div className="coming-soon-card">
            <h4>Portfolio Analytics</h4>
            <p>Detailed portfolio performance metrics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apps;

