/**
 * Store de Carrito de Compras
 * Maneja el estado del carrito usando Zustand
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // Array de items: { product, quantity }
      
      // Agregar producto al carrito
      addItem: (product) => {
        const { items } = get();
        const existingItem = items.find(item => item.product.id === product.id);
        
        if (existingItem) {
          // Si ya existe, incrementar cantidad
          set({
            items: items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          // Si no existe, agregar nuevo item
          set({ items: [...items, { product, quantity: 1 }] });
        }
      },
      
      // Remover producto del carrito
      removeItem: (productId) => {
        set({ items: get().items.filter(item => item.product.id !== productId) });
      },
      
      // Actualizar cantidad de un producto
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          )
        });
      },
      
      // Incrementar cantidad
      incrementQuantity: (productId) => {
        const item = get().items.find(item => item.product.id === productId);
        if (item) {
          get().updateQuantity(productId, item.quantity + 1);
        }
      },
      
      // Decrementar cantidad
      decrementQuantity: (productId) => {
        const item = get().items.find(item => item.product.id === productId);
        if (item) {
          get().updateQuantity(productId, item.quantity - 1);
        }
      },
      
      // Limpiar carrito
      clearCart: () => {
        set({ items: [] });
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
    }),
    {
      name: 'cart-storage', // Nombre en localStorage
    }
  )
);
