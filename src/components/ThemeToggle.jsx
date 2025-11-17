/**
 * Componente ThemeToggle - Selector elegante de tema claro/oscuro
 */

import { useTheme } from '../hooks/useTheme';
import './ThemeToggle.css';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Cambiar tema"
      title={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
    >
      <div className="theme-toggle-track">
        <span className="theme-toggle-icon theme-toggle-icon-light">☀️</span>
        <div className="theme-toggle-thumb" />
        <span className="theme-toggle-icon theme-toggle-icon-dark">🌙</span>
      </div>
    </button>
  );
};
