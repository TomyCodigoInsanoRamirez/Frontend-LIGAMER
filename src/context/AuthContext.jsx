import React, { createContext, useContext, useState, useEffect } from 'react';
import API from './../utils/api';

const AuthContext = createContext(null);
export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { setLoading(false); return; }
    // validar token consultando /api/profile
    API.setToken(token);
    API.getProfile().then(profile => {
      // El endpoint /api/profile devuelve un objeto con datos del usuario
      setUser({ email: profile.email, role: profile.role });
    }).catch(() => {
      // token inválido o expirado
      API.logout();
    }).finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    // Llamada real al backend
    const res = await API.login(email, password); // { accessToken }
    const token = res.accessToken || res.token || res;
    if (!token) throw new Error('No se recibió token del servidor');
    API.setToken(token);
    // obtener perfil
    const profile = await API.getProfile();
    const userObj = { email: profile.email, role: profile.role };
    setUser(userObj);
    return userObj;
  };

  const logout = () => {
    API.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
