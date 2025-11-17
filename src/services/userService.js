import axiosInstance from './axiosConfig';

/**
 * Servicio para gestionar operaciones CRUD de usuarios
 */

// Obtener todos los usuarios
export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get('/users');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener usuarios: ' + error.message);
  }
};

// Obtener usuario por ID
export const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener usuario: ' + error.message);
  }
};

// Obtener usuario por email
export const getUserByEmail = async (email) => {
  try {
    const response = await axiosInstance.get(`/users/email/${email}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener usuario por email: ' + error.message);
  }
};

// Crear nuevo usuario
export const createUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/users', userData);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear usuario: ' + error.message);
  }
};

// Actualizar usuario
export const updateUser = async (id, userData) => {
  try {
    const response = await axiosInstance.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar usuario: ' + error.message);
  }
};

// Eliminar usuario
export const deleteUser = async (id) => {
  try {
    await axiosInstance.delete(`/users/${id}`);
    return { success: true, message: 'Usuario eliminado correctamente' };
  } catch (error) {
    throw new Error('Error al eliminar usuario: ' + error.message);
  }
};
