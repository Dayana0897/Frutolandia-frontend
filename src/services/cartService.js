import axiosInstance from './axiosConfig';

/**
 * Servicio para la gestión del carrito de compras.
 * Todas las operaciones requieren autenticación (token JWT).
 */

/**
 * Obtiene todos los ítems del carrito del usuario actual.
 */
export const getCartItems = async () => {
  const response = await axiosInstance.get('/cart');
  return response.data;
};

/**
 * Añade un producto al carrito.
 */
export const addToCart = async (productId, quantity = 1) => {
  const response = await axiosInstance.post('/cart', {
    productId,
    quantity
  });
  return response.data;
};

/**
 * Actualiza la cantidad de un producto en el carrito.
 */
export const updateCartItem = async (productId, quantity) => {
  const response = await axiosInstance.put(`/cart/${productId}`, {
    quantity
  });
  return response.data;
};

/**
 * Elimina un producto del carrito.
 */
export const removeFromCart = async (productId) => {
  await axiosInstance.delete(`/cart/${productId}`);
};

/**
 * Vacía el carrito completamente.
 */
export const clearCart = async () => {
  await axiosInstance.delete('/cart');
};

export default {
  getCartItems,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};
