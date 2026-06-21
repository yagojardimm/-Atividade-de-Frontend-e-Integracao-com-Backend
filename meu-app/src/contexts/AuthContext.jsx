/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Busca o usuario ja logado
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      if (storedUser && storedToken) {
        return JSON.parse(storedUser);
      }
    } catch (e) {
      console.error('Erro ao ler dados de autenticação do localStorage', e);
    }
    return null;
  });

  const [loading] = useState(false);

  const login = async (email, password) => {
    try {
      const response = await api.post('/login', { user: email, senha: password });
      
      const { token, user: userData } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      console.error("Login falhou", error);
      return { 
        success: false, 
        message: error.response?.data?.msg || error.response?.data?.message || 'Erro ao realizar login. Verifique suas credenciais.' 
      };
    }
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error("Erro ao registrar logout no servidor:", error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
