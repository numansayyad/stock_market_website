import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext(null);

// Function to get user data from URL params or localStorage
const getStoredUser = () => {
  // First check URL params (for cross-port communication)
  const urlParams = new URLSearchParams(window.location.search);
  const urlUserId = urlParams.get('userId');
  const urlUserName = urlParams.get('userName');
  const urlUserEmail = urlParams.get('userEmail');
  
  // If we have URL params, store them in localStorage and use them
  if (urlUserId && urlUserEmail) {
    localStorage.setItem("userId", urlUserId);
    localStorage.setItem("userEmail", urlUserEmail);
    localStorage.setItem("userName", urlUserName || urlUserEmail.split('@')[0]);
    localStorage.setItem("isLoggedIn", "true");
    
    // Create initials from name
    const nameParts = (urlUserName || urlUserEmail.split('@')[0]).split(' ');
    const initials = nameParts.length > 1 
      ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
      : nameParts[0].substring(0, 2).toUpperCase();

    return {
      id: urlUserId,
      name: urlUserName || urlUserEmail.split('@')[0],
      email: urlUserEmail,
      photo: null,
      initials: initials,
      accountType: 'Demat',
      joinedDate: new Date().toISOString().split('T')[0],
    };
  }
  
  // Fallback to localStorage
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) return null;

  const userId = localStorage.getItem("userId");
  const userEmail = localStorage.getItem("userEmail");
  const userName = localStorage.getItem("userName");

  if (!userId || !userEmail) return null;

  // Create initials from name (first letter of first and last name)
  const nameParts = (userName || userEmail.split('@')[0]).split(' ');
  const initials = nameParts.length > 1 
    ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
    : nameParts[0].substring(0, 2).toUpperCase();

  return {
    id: userId,
    name: userName || userEmail.split('@')[0],
    email: userEmail,
    photo: null,
    initials: initials,
    accountType: 'Demat',
    joinedDate: new Date().toISOString().split('T')[0],
  };
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("isLoggedIn");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;

