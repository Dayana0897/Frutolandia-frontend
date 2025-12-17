/**
 * Página de Inicio - HomePage
 * Banner de bienvenida y productos destacados
 */

import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';
import { useAuth } from '../context/AuthContext';
import { useFavoriteStore } from '../store/favoriteStore';
import './HomePage.css';

export const HomePage = () => {
  const { products, fetchProducts, loading } = useProductStore();
  const { addItem } = useCartStore();
  const { isAuthenticated } = useAuth();
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavoriteStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Obtener 6 productos destacados (variedad de zumos y batidos)
  const featuredProducts = products.slice(0, 6);

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      alert('Por favor inicia sesión para agregar productos al carrito');
      return;
    }
    
    try {
      await addItem(product);
      // Mostrar notificación de éxito (opcional)
      alert(`${product.name} añadido al carrito`);
    } catch (error) {
      alert('Error al añadir al carrito');
    }
  };

  const handleToggleFavorite = async (product) => {
    if (!isAuthenticated) {
      alert('Por favor inicia sesión para agregar favoritos');
      return;
    }
    
    try {
      if (isFavorite(product.id)) {
        await removeFavorite(product.id);
        alert(`${product.name} eliminado de favoritos`);
      } else {
        await addFavorite(product.id);
        alert(`${product.name} agregado a favoritos`);
      }
    } catch (error) {
      alert('Error al actualizar favoritos');
    }
  };

  return (
    <div className="home-page">
      {/* Banner de bienvenida */}
      <section className="banner">
        <div className="banner-content">
          <h1 className="banner-title">
            🍎 Bienvenido a Frutolandia 🍎
          </h1>
          <p className="banner-subtitle">
            Tu tienda online de zumos y batidos de frutas naturales
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
            Descubre nuestros zumos y batidos más populares
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
              {featuredProducts.map((product) => {
                // Determinar si es batido (contiene leche) o zumo
                const isSmoothie = product.ingredients?.toLowerCase().includes('leche') || 
                                   product.description?.toLowerCase().includes('leche') ||
                                   product.name?.toLowerCase().includes('batido');
                const productIcon = isSmoothie ? '🥤' : '🧃';
                
                return (
                  <div key={product.id} className="featured-card">
                    {isAuthenticated && (
                      <button
                        className={`favorite-btn ${isFavorite(product.id) ? 'active' : ''}`}
                        onClick={() => handleToggleFavorite(product)}
                        title={isFavorite(product.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                      >
                        <i className="fas fa-heart"></i>
                      </button>
                    )}
                    <div className="featured-image">{productIcon}</div>
                    <h3>{product.name}</h3>
                    <p className="price">€{product.price?.toFixed(2) || '0.00'}</p>
                    <p className="description">{product.description}</p>
                    <div className="featured-card-actions">
                      <Link
                        to={`/producto/${product.id}`}
                        className="btn btn-secondary btn-sm"
                      >
                        Ver Detalles
                      </Link>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="btn btn-primary btn-sm"
                        title="Agregar al carrito"
                      >
                        🛒 Agregar
                      </button>
                    </div>
                  </div>
                );
              })}
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
              <p>Recibe tus pedidos recien hechos en menos de una hora</p>
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
          </div>
        </div>
      </section>

      {/* Llamada a la acción */}
      <section className="cta-section">
        <div className="container">
          <h2>¿Listo para comprar?</h2>
          <p>Explora nuestro catálogo completo de zumos y batidos</p>
          <Link to="/productos" className="btn btn-primary btn-lg">
            Ver Todos los Productos
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
