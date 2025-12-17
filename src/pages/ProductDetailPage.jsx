/**
 * Página de Detalle de Producto - ProductDetailPage
 * Muestra información completa del producto
 */

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';
import { useAuth } from '../context/AuthContext';
import { useFavoriteStore } from '../store/favoriteStore';
import { Toast } from '../components/Toast';
import './ProductDetailPage.css';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedProduct, loading, error, fetchProductById } = useProductStore();
  const addItem = useCartStore(state => state.addItem);
  const { isAuthenticated } = useAuth();
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id, fetchProductById]);

  const handleAddToCart = () => {
    addItem(selectedProduct);
    setToast({ type: 'success', message: `${selectedProduct.name} agregado al carrito` });
    setTimeout(() => setToast(null), 2000);
  };

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      setToast({ type: 'error', message: 'Por favor inicia sesión para agregar favoritos' });
      setTimeout(() => setToast(null), 2000);
      return;
    }
    
    try {
      if (isFavorite(selectedProduct.id)) {
        await removeFavorite(selectedProduct.id);
        setToast({ type: 'success', message: `${selectedProduct.name} eliminado de favoritos` });
      } else {
        await addFavorite(selectedProduct.id);
        setToast({ type: 'success', message: `${selectedProduct.name} agregado a favoritos` });
      }
      setTimeout(() => setToast(null), 2000);
    } catch (error) {
      setToast({ type: 'error', message: 'Error al actualizar favoritos' });
      setTimeout(() => setToast(null), 2000);
    }
  };

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

  // Determinar si es batido (contiene leche) o zumo
  const isSmoothie = selectedProduct.ingredients?.toLowerCase().includes('leche') || 
                     selectedProduct.description?.toLowerCase().includes('leche') ||
                     selectedProduct.name?.toLowerCase().includes('batido');
  
  const productIcon = isSmoothie ? '🥤' : '🧃';

  return (
    <>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
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
            <div className="main-image">{productIcon}</div>
          </div>
        </div>

        {/* Información del producto */}
        <div className="detail-info">
          <div className="product-header">
            <h1>{selectedProduct.name}</h1>
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
              onClick={handleAddToCart}
              disabled={selectedProduct.stock === 0}
            >
              🛒 Agregar al Carrito
            </button>
            {isAuthenticated && (
              <button 
                className={`btn btn-lg ${isFavorite(selectedProduct.id) ? 'btn-danger' : 'btn-outline-danger'}`}
                onClick={handleToggleFavorite}
              >
                <i className={`fas fa-heart`}></i>
                {isFavorite(selectedProduct.id) ? ' En Favoritos' : ' Agregar a Favoritos'}
              </button>
            )}
          </div>

          {/* Envío */}
          <div className="shipping-section">
            <p>📦 Envío disponible a toda España</p>
            <p>🚚 Entrega en 24-48 horas</p>
            <p>✓ Garantía de frescura</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductDetailPage;
