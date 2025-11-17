/**
 * Página de Inicio - HomePage
 * Banner de bienvenida y productos destacados
 */

import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useProductStore } from '../store/productStore';
import './HomePage.css';

export const HomePage = () => {
  const { products, fetchProducts, loading } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Obtener últimos 3 productos como destacados
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="home-page">
      {/* Banner de bienvenida */}
      <section className="banner">
        <div className="banner-content">
          <h1 className="banner-title">
            🍎 Bienvenido a Frutolandia 🍎
          </h1>
          <p className="banner-subtitle">
            Tu tienda online de frutas frescas, deliciosas y de alta calidad
          </p>
          <Link to="/productos" className="btn btn-primary btn-lg">
            Explorar Productos
          </Link>
        </div>
      </section>

      {/* Sección de productos destacados */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Productos Destacados</h2>
          <p className="section-subtitle">
            Descubre nuestras frutas más populares
          </p>

          {loading ? (
            <div className="loader-center">
              <div className="loader"></div>
              <p>Cargando productos...</p>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="empty-state">
              <p>No hay productos disponibles</p>
            </div>
          ) : (
            <div className="featured-grid">
              {featuredProducts.map((product) => (
                <div key={product.id} className="featured-card">
                  <div className="featured-image">🍎</div>
                  <h3>{product.name}</h3>
                  <p className="price">${product.price?.toFixed(2) || '0.00'}</p>
                  <p className="description">{product.description}</p>
                  <Link
                    to={`/producto/${product.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Ver Detalles
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sección de características */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">¿Por qué elegir Frutolandia?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Entrega Rápida</h3>
              <p>Recibe tus pedidos frescos en 24-48 horas</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Productos Frescos</h3>
              <p>Frutas seleccionadas cuidadosamente cada día</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Mejores Precios</h3>
              <p>Ofertas especiales y descuentos exclusivos</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Garantía de Calidad</h3>
              <p>100% satisfacción garantizada o tu dinero de vuelta</p>
            </div>
          </div>
        </div>
      </section>

      {/* Llamada a la acción */}
      <section className="cta-section">
        <div className="container">
          <h2>¿Listo para comprar?</h2>
          <p>Explora nuestro catálogo completo de frutas frescas</p>
          <Link to="/productos" className="btn btn-primary btn-lg">
            Ver Todos los Productos
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
