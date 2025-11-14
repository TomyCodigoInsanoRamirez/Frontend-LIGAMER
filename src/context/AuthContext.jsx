import React, { createContext, useContext, useState, useEffect } from 'react';
import { fakeApi } from './../utils/FakeApi';

const AuthContext = createContext(null);
export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { setLoading(false); return; }
    fakeApi.validateToken(token).then(res => {
      if (res.valid) setUser(res.user);
    }).finally(() => setLoading(false));
  }, []);

  const login = async (username, password) => {
    const res = await fakeApi.login(username, password);
    localStorage.setItem('token', res.token);
    setUser(res.user);
    return res.user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
