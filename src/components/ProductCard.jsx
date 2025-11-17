/**
 * Componente ProductCard - Tarjeta de producto
 * Muestra información resumida del producto
 */

import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

export const ProductCard = ({ product, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/producto/${product.id}`);
  };

  return (
    <div className="product-card">
      {/* Imagen placeholder */}
      <div className="product-image">
        <div className="image-placeholder">🍎</div>
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
          <span className="price">${product.price?.toFixed(2) || '0.00'}</span>
          {product.ingredients && (
            <span className="ingredients">Ingredientes: {product.ingredients}</span>
          )}
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
          className="btn btn-warning btn-sm"
          title="Agregar al carrito (próximamente)"
        >
          🛒 Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
