/**
 * Página de Detalle de Producto - ProductDetailPage
 * Muestra información completa del producto
 */

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useProductStore } from '../store/productStore';
import './ProductDetailPage.css';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedProduct, loading, error, fetchProductById } = useProductStore();

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id, fetchProductById]);

  if (loading) {
    return (
      <div className="product-detail">
        <div className="loader-center">
          <div className="loader"></div>
          <p>Cargando detalles del producto...</p>
        </div>
      </div>
    );
  }

  if (error || !selectedProduct) {
    return (
      <div className="product-detail">
        <div className="alert alert-danger">
          <strong>Error:</strong> {error || 'Producto no encontrado'}
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/productos')}
        >
          Volver a Productos
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail">
      {/* Botón para volver */}
      <button
        className="btn btn-outline"
        onClick={() => navigate('/productos')}
      >
        ← Volver a Productos
      </button>

      <div className="detail-container">
        {/* Galería de imágenes */}
        <div className="detail-image">
          <div className="image-gallery">
            <div className="main-image">🍎</div>
            <div className="thumbnail-gallery">
              <div className="thumbnail">🍎</div>
              <div className="thumbnail">🍎</div>
              <div className="thumbnail">🍎</div>
            </div>
          </div>
        </div>

        {/* Información del producto */}
        <div className="detail-info">
          <div className="product-header">
            <h1>{selectedProduct.name}</h1>
            {selectedProduct.stock > 0 ? (
              <span className="badge badge-success">En Stock</span>
            ) : (
              <span className="badge badge-danger">Agotado</span>
            )}
          </div>

          {/* Precio */}
          <div className="price-section">
            <span className="current-price">
              €{selectedProduct.price?.toFixed(2) || '0.00'}
            </span>
            <span className="unit">/unidad</span>
          </div>

          {/* Stock */}
          <div className="stock-section">
            <h3>Disponibilidad</h3>
            <p>Stock: <strong>{selectedProduct.stock} unidades</strong></p>
          </div>

          {/* Descripción */}
          <div className="description-section">
            <h3>Descripción</h3>
            <p>{selectedProduct.description}</p>
          </div>

          {/* Ingredientes */}
          {selectedProduct.ingredients && (
            <div className="ingredients-section">
              <h3>Ingredientes</h3>
              <p>{selectedProduct.ingredients}</p>
            </div>
          )}

          {/* Acciones */}
          <div className="actions-section">
            <button
              className="btn btn-primary btn-lg"
              disabled={selectedProduct.stock === 0}
            >
              🛒 Agregar al Carrito
            </button>
            <button className="btn btn-warning btn-lg">
              ❤️ Agregar a Favoritos
            </button>
          </div>

          {/* Envío */}
          <div className="shipping-section">
            <p>📦 Envío disponible a toda España</p>
            <p>🚚 Entrega en 24-48 horas</p>
            <p>✓ Garantía de frescura</p>
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      <div className="related-products">
        <h2>Productos Relacionados</h2>
        <div className="related-grid">
          <div className="related-card">
            <div className="related-image">🍊</div>
            <h4>Naranjas</h4>
            <p>$2.99</p>
          </div>
          <div className="related-card">
            <div className="related-image">🍌</div>
            <h4>Plátanos</h4>
            <p>$1.99</p>
          </div>
          <div className="related-card">
            <div className="related-image">🍉</div>
            <h4>Melones</h4>
            <p>$4.99</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
