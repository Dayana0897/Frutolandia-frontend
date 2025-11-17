/**
 * Componente Navbar - Barra de navegación principal
 * Contiene el logo y menú de navegación
 */

import { Link } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
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
          <li className="navbar-item">
            <Link to="/usuarios" className="navbar-link">
              Usuarios
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/admin" className="navbar-link">
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
