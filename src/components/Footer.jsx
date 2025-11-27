/**
 * Componente Footer - Pie de página
 * Información de contacto y links útiles
 */

import './Footer.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Sección de información */}
        <div className="footer-section">
          <h3>Frutolandia</h3>
          <p>Tu tienda online de zumos y batidos con fruta fresca y de calidad.</p>
        </div>

        {/* Sección de contacto */}
        <div className="footer-section">
          <h3>Contacto</h3>
          <ul className="footer-list">
            <li>📧 info@frutolandia.com</li>
            <li>📞 +34 123 456 789</li>
            <li>📍 Calle Principal, 123</li>
          </ul>
        </div>

        {/* Sección de links */}
        <div className="footer-section">
          <h3>Enlaces</h3>
          <ul className="footer-list">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <p>&copy; {currentYear} Frutolandia. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
