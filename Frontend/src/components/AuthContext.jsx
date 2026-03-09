import { createContext, useState, useEffect } from 'react';
import api from '../utils/axios';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // The interceptor will attach the token to the header
          const res = await api.get(`${process.env.VITE_API_BASE_URL}/user/verify`);
          setUser(res.data.user);
        }
      } catch (err) {
        localStorage.removeItem('token');
        setUser(null);
        console.error('Session restoration failed:', err);
      } finally {
        setLoading(false);
      }
    };

    restoreUser();
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, setUser, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
