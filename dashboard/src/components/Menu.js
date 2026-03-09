import React, { useState } from "react";

import { Link } from "react-router-dom";

import { useUser } from "./UserContext";

import { 
  Menu as MenuIcon, 
  Notifications, 
  Settings, 
  Logout,
  Person
} from "@mui/icons-material";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user } = useUser();

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  // Get user initials or fallback
  const userInitials = user?.initials || "U";
  const userName = user?.name || "User";
  const userId = user?.id || "USER123";

  return (
    <div className="menu-container">
      <img src="/logo.png" style={{ width: "50px" }} alt="Logo" />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        
        {/* User Profile Section */}
        <div className="profile-section">
          <div className="profile" onClick={handleProfileClick}>
            {user?.photo ? (
              <img src={user.photo} alt={userName} className="avatar-photo" />
            ) : (
              <div className="avatar">{userInitials}</div>
            )}
            <div className="user-info">
              <p className="username">{userName}</p>
              <p className="userid">{userId}</p>
            </div>
          </div>
          
          {/* Profile Dropdown */}
          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-item">
                <Person className="dropdown-icon" />
                <span>Profile</span>
              </div>
              <div className="dropdown-item">
                <Settings className="dropdown-icon" />
                <span>Settings</span>
              </div>
              <div className="dropdown-item">
                <Logout className="dropdown-icon" />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
