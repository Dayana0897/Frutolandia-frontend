import axios from 'axios';

// Crear instancia de axios con configuración base
// Spring Boot Backend corre en puerto 8080 con prefijo /api
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejo de errores
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Error de respuesta del servidor
      console.error('Error del servidor:', error.response.status, error.response.data);
    } else if (error.request) {
      // Error de petición (sin respuesta)
      console.error('Error de conexión:', error.request);
    } else {
      console.error('Error en la petición:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
