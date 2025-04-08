// context/AuthContext.tsx
import React, { createContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  timeLeft: number;
  login: (token: string, expireTime: number) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  timeLeft: 0,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedExpiration = localStorage.getItem('expirationTime');

    if (storedToken && storedExpiration) {
      const expireTime = Number(storedExpiration);
      const now = Date.now();
      const remainingTime = expireTime - now;

      if (remainingTime > 0) {
        setToken(storedToken);
        setTimeLeft(remainingTime);
      } else {
        logout();
      }
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      const storedExpiration = localStorage.getItem('expirationTime');
      if (!storedExpiration) return;

      const now = Date.now();
      const expireTime = Number(storedExpiration);
      const remaining = expireTime - now;

      if (remaining <= 0) {
        logout();
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [token]);

  const login = (token: string, expireTime: number) => {
    console.log("inside context one")
    const expirationTime = Date.now() + expireTime * 1000;
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime.toString());
    setToken(token);
    setTimeLeft(expireTime * 1000);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    setToken(null);
    setTimeLeft(0);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ token, timeLeft, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
