import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../services/axiosConfig';
import { useCartStore } from '../store/cartStore';
import { useFavoriteStore } from '../store/favoriteStore';

/**
 * Contexto de Autenticación
 * Maneja login, logout y estado del usuario con JWT
 */
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loadCart = useCartStore((state) => state.loadCart);
  const loadFavorites = useFavoriteStore((state) => state.loadFavorites);

  // Cargar usuario y token desde localStorage al montar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
        // Configurar token en axios
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        // Cargar carrito y favoritos del usuario
        loadCart();
        loadFavorites();
      } catch (err) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, [loadCart, loadFavorites]);

  // Login
  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password
      });

      const { token: jwtToken, ...userData } = response.data;
      
      // Guardar usuario y token
      setUser(userData);
      setToken(jwtToken);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', jwtToken);
      
      // Configurar token en axios para futuras peticiones
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

      // Cargar carrito y favoritos del usuario
      await loadCart();
      await loadFavorites();

      return userData;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error en el login';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Registro
  const register = async (name, email, password) => {
    setError(null);
    setLoading(true);
    try {
      const response = await axiosInstance.post('/auth/register', {
        name,
        email,
        password
      });

      const { token: jwtToken, ...userData } = response.data;
      
      // Guardar usuario y token
      setUser(userData);
      setToken(jwtToken);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', jwtToken);
      
      // Configurar token en axios para futuras peticiones
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

      // Cargar carrito y favoritos del usuario
      await loadCart();
      await loadFavorites();

      return userData;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error en el registro';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Remover token de axios
    delete axiosInstance.defaults.headers.common['Authorization'];
    // Limpiar carrito y favoritos
    useCartStore.setState({ items: [] });
    useFavoriteStore.getState().clearFavorites();
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook para usar el contexto de autenticación
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};
