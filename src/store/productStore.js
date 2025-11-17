import { create } from 'zustand';
import * as productService from '../services/productService';

/**
 * Store de productos usando Zustand
 * Gestiona estado global de productos, loading, errores
 */

export const useProductStore = create((set, get) => ({
  // Estado
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  searchTerm: '',

  // Acciones
  
  // Obtener todos los productos
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const data = await productService.getAllProducts();
      set({ products: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Obtener producto por ID
  fetchProductById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await productService.getProductById(id);
      set({ selectedProduct: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Buscar productos
  searchProducts: async (name) => {
    set({ loading: true, error: null, searchTerm: name });
    try {
      const data = await productService.searchProducts(name);
      set({ products: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Crear producto
  createProduct: async (productData) => {
    set({ loading: true, error: null });
    try {
      const newProduct = await productService.createProduct(productData);
      set((state) => ({
        products: [...state.products, newProduct],
        loading: false,
      }));
      return newProduct;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Actualizar producto
  updateProduct: async (id, productData) => {
    set({ loading: true, error: null });
    try {
      const updated = await productService.updateProduct(id, productData);
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? updated : p)),
        selectedProduct: updated,
        loading: false,
      }));
      return updated;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Eliminar producto
  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await productService.deleteProduct(id);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Limpiar errores
  clearError: () => set({ error: null }),

  // Limpiar estado
  resetState: () => set({ products: [], selectedProduct: null, error: null, searchTerm: '' }),
}));
