import axiosInstance from './axiosConfig';

/**
 * Servicio para gestionar operaciones CRUD de productos
 */

// Obtener todos los productos
export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get('/products');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener productos: ' + error.message);
  }
};

// Obtener producto por ID
export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener producto: ' + error.message);
  }
};

// Buscar productos por nombre
export const searchProducts = async (name) => {
  try {
    // Spring Boot Backend soporta búsqueda con parámetro name
    const response = await axiosInstance.get('/products/search', {
      params: { name },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al buscar productos: ' + error.message);
  }
};

// Crear nuevo producto
export const createProduct = async (productData) => {
  try {
    const response = await axiosInstance.post('/products', productData);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear producto: ' + error.message);
  }
};

// Actualizar producto
export const updateProduct = async (id, productData) => {
  try {
    const response = await axiosInstance.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar producto: ' + error.message);
  }
};

// Eliminar producto
export const deleteProduct = async (id) => {
  try {
    await axiosInstance.delete(`/products/${id}`);
    return { success: true, message: 'Producto eliminado correctamente' };
  } catch (error) {
    throw new Error('Error al eliminar producto: ' + error.message);
  }
};
