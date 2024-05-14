
import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUserData = sessionStorage.getItem('userData');
    if (storedUserData) {
        setUserInfo(JSON.parse(storedUserData));
        setIsLoggedIn(true);
    }
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUserInfo(userData);
    sessionStorage.setItem('userData', JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
    sessionStorage.removeItem('userData');
    localStorage.removeItem('profilePhoto');
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, userInfo, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
    const context = useContext(UserContext);
    return context;
}
