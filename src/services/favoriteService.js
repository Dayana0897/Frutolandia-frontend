/**
 * Servicio para gestión de favoritos
 */

import axiosInstance from './axiosConfig';

/**
 * Obtiene los productos favoritos del usuario autenticado
 */
export const getFavorites = async () => {
  const response = await axiosInstance.get('/users/favorites');
  return response.data;
};

/**
 * Agrega un producto a favoritos
 */
export const addFavorite = async (productId) => {
  console.log('🔵 [FavoriteService] POST /users/favorites/' + productId);
  try {
    const response = await axiosInstance.post(`/users/favorites/${productId}`);
    console.log('✅ [FavoriteService] Respuesta:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ [FavoriteService] Error:', error);
    console.error('❌ [FavoriteService] Error response:', error.response?.data);
    console.error('❌ [FavoriteService] Status:', error.response?.status);
    throw error;
  }
};

/**
 * Elimina un producto de favoritos
 */
export const removeFavorite = async (productId) => {
  const response = await axiosInstance.delete(`/users/favorites/${productId}`);
  return response.data;
};

/**
 * Obtiene el perfil del usuario autenticado
 */
export const getProfile = async () => {
  const response = await axiosInstance.get('/users/profile');
  return response.data;
};
