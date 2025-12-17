/**
 * Store de Favoritos
 * Maneja el estado de los productos favoritos del usuario
 */

import { create } from 'zustand';
import * as favoriteService from '../services/favoriteService';

export const useFavoriteStore = create((set, get) => ({
  favorites: [], // Array de productos favoritos
  loading: false,
  error: null,
  
  // Cargar favoritos desde el backend
  loadFavorites: async () => {
    set({ loading: true, error: null });
    try {
      const favorites = await favoriteService.getFavorites();
      // Asegurarse de que favorites sea un array
      const favoritesArray = Array.isArray(favorites) ? favorites : [];
      set({ favorites: favoritesArray, loading: false });
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
      set({ error: error.message, loading: false, favorites: [] });
    }
  },
  
  // Agregar producto a favoritos
  addFavorite: async (productId) => {
    console.log('🔵 [FavoriteStore] Intentando agregar favorito:', productId);
    set({ loading: true, error: null });
    try {
      const result = await favoriteService.addFavorite(productId);
      console.log('✅ [FavoriteStore] Favorito agregado:', result);
      await get().loadFavorites(); // Recargar favoritos
      set({ loading: false });
    } catch (error) {
      console.error('❌ [FavoriteStore] Error al agregar favorito:', error);
      console.error('❌ [FavoriteStore] Error response:', error.response?.data);
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  // Eliminar producto de favoritos
  removeFavorite: async (productId) => {
    set({ loading: true, error: null });
    try {
      await favoriteService.removeFavorite(productId);
      await get().loadFavorites(); // Recargar favoritos
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  // Verificar si un producto está en favoritos
  isFavorite: (productId) => {
    const { favorites } = get();
    return favorites.some(fav => fav.id === productId);
  },
  
  // Limpiar favoritos (al cerrar sesión)
  clearFavorites: () => {
    set({ favorites: [], loading: false, error: null });
  }
}));
