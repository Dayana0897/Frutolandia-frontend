/**
 * Store de Carrito de Compras
 * Maneja el estado del carrito usando Zustand y lo sincroniza con el backend
 */

import { create } from 'zustand';
import * as cartService from '../services/cartService';

export const useCartStore = create((set, get) => ({
  items: [], // Array de items: { id, product, quantity }
  loading: false,
  error: null,
  
  // Cargar carrito desde el backend
  loadCart: async () => {
    set({ loading: true, error: null });
    try {
      const items = await cartService.getCartItems();
      set({ items, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false, items: [] });
    }
  },
  
  // Agregar producto al carrito
  addItem: async (product) => {
    set({ loading: true, error: null });
    try {
      await cartService.addToCart(product.id, 1);
      await get().loadCart(); // Recargar carrito desde backend
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  // Remover producto del carrito
  removeItem: async (productId) => {
    set({ loading: true, error: null });
    try {
      await cartService.removeFromCart(productId);
      await get().loadCart(); // Recargar carrito desde backend
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  // Actualizar cantidad de un producto
  updateQuantity: async (productId, quantity) => {
    set({ loading: true, error: null });
    try {
      if (quantity <= 0) {
        await cartService.removeFromCart(productId);
      } else {
        await cartService.updateCartItem(productId, quantity);
      }
      await get().loadCart(); // Recargar carrito desde backend
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  // Incrementar cantidad
  incrementQuantity: async (productId) => {
    const item = get().items.find(item => item.product.id === productId);
    if (item) {
      await get().updateQuantity(productId, item.quantity + 1);
    }
  },
  
  // Decrementar cantidad
  decrementQuantity: async (productId) => {
    const item = get().items.find(item => item.product.id === productId);
    if (item) {
      await get().updateQuantity(productId, item.quantity - 1);
    }
  },
  
  // Limpiar carrito
  clearCart: async () => {
    set({ loading: true, error: null });
    try {
      await cartService.clearCart();
      set({ items: [], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  // Obtener cantidad total de items
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
  
  // Obtener precio total
  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + (item.product.price * item.quantity),
      0
    );
  },
  
  // Obtener cantidad de un producto específico
  getItemQuantity: (productId) => {
    const item = get().items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  }
}));
