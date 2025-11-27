/**
 * Componente ProductCard - Tarjeta de producto
 * Muestra información resumida del producto
 */

import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { Toast } from './Toast';
import { useState } from 'react';
import './ProductCard.css';

export const ProductCard = ({ product, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  const [toast, setToast] = useState(null);

  const handleViewDetails = () => {
    navigate(`/producto/${product.id}`);
  };

  const handleAddToCart = () => {
    addItem(product);
    setToast({ type: 'success', message: `${product.name} agregado al carrito` });
    setTimeout(() => setToast(null), 2000);
  };

  // Determinar si es batido (contiene leche) o zumo
  const isSmoothie = product.ingredients?.toLowerCase().includes('leche') || 
                     product.description?.toLowerCase().includes('leche') ||
                     product.name?.toLowerCase().includes('batido');
  
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
      <div className="product-card">
      {/* Imagen placeholder */}
      <div className="product-image">
        <div className="image-placeholder">{productIcon}</div>
        {product.stock && product.stock > 0 && (
          <span className="badge badge-success">En stock</span>
        )}
        {product.stock === 0 && (
          <span className="badge badge-danger">Agotado</span>
        )}
      </div>

      {/* Información del producto */}
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description || 'Sin descripción'}</p>

        {/* Precio */}
        <div className="product-price">
          <span className="price">€{product.price?.toFixed(2) || '0.00'}</span>
        </div>

        {/* Stock */}
        {product.stock !== undefined && (
          <p className="stock-info">Stock: {product.stock} unidades</p>
        )}
      </div>

      {/* Botones de acción */}
      <div className="product-actions">
        <button
          className="btn btn-primary btn-sm"
          onClick={handleViewDetails}
          title="Ver detalles del producto"
        >
          Ver Detalles
        </button>
        {onEdit && (
          <button
            className="btn btn-info btn-sm"
            onClick={() => onEdit(product)}
            title="Editar producto"
          >
            Editar
          </button>
        )}
        {onDelete && (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(product.id)}
            title="Eliminar producto"
          >
            Eliminar
          </button>
        )}
        <button
          className="btn btn-cart btn-sm"
          onClick={handleAddToCart}
          title="Agregar al carrito"
        >
          🛒 Agregar
        </button>
      </div>
    </div>
    </>
  );
};

export default ProductCard;
