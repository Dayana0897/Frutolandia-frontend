/**
 * Componente Navbar - Barra de navegación principal
 * Contiene el logo, menú de navegación y selector de tema
 */

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { AuthModal } from './AuthModal';
import { Cart } from './Cart';
import { useAuth } from '../context/AuthContext';
import { useCartStore } from '../store/cartStore';
import './Navbar.css';

export const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [cartOpen, setCartOpen] = useState(false);
  const getTotalItems = useCartStore(state => state.getTotalItems);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const handleOpenAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="navbar-icon">🍎</span>
          <span>Frutolandia</span>
        </Link>

        {/* Menú de navegación */}
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Inicio
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/productos" className="navbar-link">
              Productos
            </Link>
          </li>
          {isAdmin && (
            <>
              <li className="navbar-item">
                <Link to="/usuarios" className="navbar-link">
                  Usuarios
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/admin" className="navbar-link navbar-link-admin">
                  ⚙️ Admin
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Sección de Usuario y Tema */}
        <div className="navbar-right">
          {/* Botón del Carrito */}
          <button 
            className="cart-button"
            onClick={() => setCartOpen(true)}
            title="Ver carrito"
          >
            🛒
            {getTotalItems() > 0 && (
              <span className="cart-badge">{getTotalItems()}</span>
            )}
          </button>

          {/* Selector de tema */}
          <ThemeToggle />

          {/* Autenticación */}
          {user ? (
            <div className="user-menu">
              <button
                className="user-button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                title={`${user.name} (${user.role})`}
              >
                <span className="user-avatar">{user.name.charAt(0).toUpperCase()}</span>
                <span className="user-name">{user.name}</span>
              </button>

              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <p className="user-email">{user.email}</p>
                    <p className="user-role">{user.role === 'ADMIN' ? '👑 Admin' : '👤 Usuario'}</p>
                  </div>
                  <button onClick={handleLogout} className="logout-btn">
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <button
                className="btn-secondary"
                onClick={() => handleOpenAuthModal('login')}
              >
                🔑 Iniciar Sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Autenticación */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />

      {/* Carrito de Compras */}
      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
