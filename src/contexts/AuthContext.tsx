import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (type: 'user' | 'admin', token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check for existing tokens and user profile on mount
    const userToken = localStorage.getItem('userToken');
    const adminToken = localStorage.getItem('adminToken');
    const userProfile = localStorage.getItem('userProfile');
    
    if (adminToken && userProfile) {
      const profile = JSON.parse(userProfile);
      if (profile.role === 'admin') {
        setIsAuthenticated(true);
        setIsAdmin(true);
      }
    } else if (userToken && userProfile) {
      const profile = JSON.parse(userProfile);
      if (profile.role === 'user') {
        setIsAuthenticated(true);
        setIsAdmin(false);
      }
    }
  }, []);

  const login = (type: 'user' | 'admin', token: string) => {
    if (type === 'admin') {
      localStorage.setItem('adminToken', token);
      setIsAdmin(true);
    } else {
      localStorage.setItem('userToken', token);
      setIsAdmin(false);
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userProfile');
    setIsAuthenticated(false);
    setIsAdmin(false);
    router.push('/auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 