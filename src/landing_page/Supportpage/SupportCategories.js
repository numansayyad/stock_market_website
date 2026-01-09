import React, { useState } from "react";
import "./SupportCategories.css";

function SupportCategories() {
  const [openIndex, setOpenIndex] = useState(null);

  const categories = [
    {
      icon: "➕",
      title: "Account Opening",
      items: [
        "Resident individual",
        "Minor",
        "Non Resident Indian (NRI)",
        "Company, Partnership, HUF and LLP",
        "Glossary",
      ],
    },

    {
      icon: "👤",
      title: "Your Zerodha Account",
      items: [
        "Your Profile",
        "Account modification",
        "Client Master Report (CMR) and Depository Participant (DP)",
        "Nomination",
        "Transfer and conversion of securities",
      ],
    },

    {
      icon: "🌐",
      title: "Kite",
      items: [
        "IPO",
        "Trading FAQs",
        "Margin Trading Facility (MTF) and Margins",
        "Charts and orders",
        "Alerts and Nudges",
        "General",
      ],
    },

    {
      icon: "💰",
      title: "Funds",
      items: [
        "Add money",
        "Withdraw money",
        "Add bank accounts",
        "eMandates",
      ],
    },

    {
      icon: "📊",
      title: "Console",
      items: [
        "Portfolio",
        "Corporate actions",
        "Funds statement",
        "Reports",
        "Profile",
        "Segments",
      ],
    },

    {
      icon: "💱",
      title: "Coin",
      items: [
        "Mutual funds",
        "National Pension Scheme (NPS)",
        "Features on Coin",
        "Payments and Orders",
        "General",
      ],
    },
  ];

  return (
    <div className="support-layout">

      {/* LEFT SIDE CATEGORY LIST */}
      <div className="categories-box">
        {categories.map((cat, index) => (
          <div key={index} className="category-section">
            
            {/* Category Header */}
            <div
              className="category-row"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="left-icon">{cat.icon}</div>
              <div className="category-title">{cat.title}</div>
              <div className="arrow-icon">
                {openIndex === index ? "▲" : "▼"}
              </div>
            </div>

            {/* Dropdown Items */}
            {openIndex === index && (
              <ul className="dropdown-list">
                {cat.items.map((item, idx) => (
                  <li key={idx} className="dropdown-item">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className="right-side">

        {/* IMPORTANT UPDATES */}
        <div className="updates-box">
          <ul>
            <li>Adjustment of F&O contracts of NUVAMA on account of Split</li>
            <li>Rights Entitlements listing in December 2025</li>
          </ul>
        </div>

        {/* QUICK LINKS */}
        <div className="quick-links">
          <h3>Quick links</h3>
          <ul>
            <li>1. Track account opening</li>
            <li>2. Track segment activation</li>
            <li>3. Intraday margins</li>
            <li>4. Kite user manual</li>
            <li>5. Learn how to create a ticket</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default SupportCategories;
