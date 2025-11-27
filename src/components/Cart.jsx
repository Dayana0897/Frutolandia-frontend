/**
 * Componente del Carrito de Compras
 * Modal que muestra los productos agregados al carrito
 */

import { useCartStore } from '../store/cartStore';
import './Cart.css';

export const Cart = ({ isOpen, onClose }) => {
  const { items, incrementQuantity, decrementQuantity, removeItem, clearCart, getTotalPrice } = useCartStore();

  if (!isOpen) return null;

  const totalPrice = getTotalPrice();

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>🛒 Carrito de Compras</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <div className="cart-empty">
              <p>Tu carrito está vacío</p>
              <span className="empty-icon">🛒</span>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="cart-item">
                    <div className="cart-item-info">
                      <h4>{product.name}</h4>
                      <p className="cart-item-price">€{product.price?.toFixed(2)}</p>
                    </div>
                    
                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button 
                          className="qty-btn"
                          onClick={() => decrementQuantity(product.id)}
                        >
                          -
                        </button>
                        <span className="quantity">{quantity}</span>
                        <button 
                          className="qty-btn"
                          onClick={() => incrementQuantity(product.id)}
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="cart-item-total">
                        €{(product.price * quantity).toFixed(2)}
                      </div>
                      
                      <button 
                        className="remove-btn"
                        onClick={() => removeItem(product.id)}
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-total">
                  <span className="total-label">Total:</span>
                  <span className="total-price">€{totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="cart-actions">
                  <button className="btn btn-secondary" onClick={clearCart}>
                    Vaciar Carrito
                  </button>
                  <button className="btn btn-primary">
                    Proceder al Pago
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
