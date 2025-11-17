import { createContext, useContext, useState, useEffect } from 'react';

/**
 * Contexto de Autenticación
 * Maneja login, logout y estado del usuario
 */
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar usuario desde localStorage al montar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Error al cargar usuario:', err);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Login
  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      // Obtener usuario por email del backend
      const response = await fetch(`http://localhost:8080/api/users/email/${encodeURIComponent(email)}`);
      
      if (!response.ok) {
        throw new Error('Usuario no encontrado');
      }

      const foundUser = await response.json();
      
      // En producción, verificarías la contraseña de forma segura con hash
      // Por ahora solo verificamos que la contraseña coincida
      if (foundUser.password !== password) {
        throw new Error('Contraseña incorrecta');
      }

      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return foundUser;
    } catch (err) {
      const errorMsg = err.message || 'Error en el login';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Registro
  const register = async (name, email, password) => {
    setError(null);
    setLoading(true);
    try {
      // Verificar que el email no exista
      const checkResponse = await fetch('http://localhost:8080/api/users');
      const existingUsers = await checkResponse.json();
      
      if (existingUsers.some(u => u.email === email)) {
        throw new Error('El email ya está registrado');
      }

      // Crear nuevo usuario
      const newUser = {
        name,
        email,
        password, // En producción, esto se hashearia en el backend
        role: 'USER', // Por defecto, nuevo usuario
      };

      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Error al crear usuario');
      }

      const createdUser = await response.json();
      setUser(createdUser);
      localStorage.setItem('user', JSON.stringify(createdUser));
      return createdUser;
    } catch (err) {
      const errorMsg = err.message || 'Error en el registro';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
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
