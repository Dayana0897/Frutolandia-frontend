/**
 * Página No Encontrada - NotFoundPage
 * Página 404 personalizada
 */

import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-content">
          <h1 className="error-code">404</h1>
          <h2>Página No Encontrada</h2>
          <p>Lo sentimos, la página que buscas no existe o ha sido movida.</p>

          <div className="error-illustration">
            😕
          </div>

          <p className="error-description">
            Parece que te has perdido en Frutolandia. No te preocupes, vuelve al inicio e intenta continuar comprando tus zumos y batidos.
          </p>

          <div className="action-links">
            <Link to="/" className="btn btn-primary btn-lg">
              ← Volver al Inicio
            </Link>
            <Link to="/productos" className="btn btn-secondary btn-lg">
              Ver Productos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
