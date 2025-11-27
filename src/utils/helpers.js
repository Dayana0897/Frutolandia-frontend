/**
 * Funciones utilitarias y helpers
 * Funciones reutilizables para la aplicación
 */

/**
 * Formatea un número como moneda
 * @param {number} value - Valor a formatear
 * @param {string} currency - Código de moneda (ej: 'EUR', 'USD')
 * @returns {string} Valor formateado
 */
export const formatCurrency = (value, currency = 'EUR') => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency,
  }).format(value);
};

/**
 * Valida si un email es válido
 * @param {string} email - Email a validar
 * @returns {boolean} True si es válido
 */
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Trunca texto a una longitud máxima
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Capitaliza la primera letra de una cadena
 * @param {string} text - Texto a capitalizar
 * @returns {string} Texto capitalizado
 */
export const capitalize = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Capitaliza todas las palabras
 * @param {string} text - Texto a capitalizar
 * @returns {string} Texto capitalizado
 */
export const capitalizeWords = (text) => {
  if (!text) return '';
  return text.split(' ').map(word => capitalize(word)).join(' ');
};

/**
 * Formatea fecha a formato legible
 * @param {Date|string} date - Fecha a formatear
 * @param {string} locale - Locale (ej: 'es-ES')
 * @returns {string} Fecha formateada
 */
export const formatDate = (date, locale = 'es-ES') => {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Formatea fecha y hora
 * @param {Date|string} date - Fecha a formatear
 * @param {string} locale - Locale (ej: 'es-ES')
 * @returns {string} Fecha y hora formateada
 */
export const formatDateTime = (date, locale = 'es-ES') => {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Debounce function para limitar llamadas
 * @param {Function} func - Función a debounce
 * @param {number} wait - Milisegundos de espera
 * @returns {Function} Función debounced
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Genera un ID único
 * @returns {string} ID único
 */
export const generateUniqueId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Clona un objeto profundamente
 * @param {object} obj - Objeto a clonar
 * @returns {object} Clon del objeto
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Verifica si un objeto está vacío
 * @param {object} obj - Objeto a verificar
 * @returns {boolean} True si está vacío
 */
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * Filtra un array de objetos por propiedad
 * @param {array} array - Array a filtrar
 * @param {string} property - Propiedad a filtrar
 * @param {any} value - Valor a buscar
 * @returns {array} Array filtrado
 */
export const filterByProperty = (array, property, value) => {
  return array.filter(item => item[property] === value);
};

/**
 * Ordena un array de objetos por propiedad
 * @param {array} array - Array a ordenar
 * @param {string} property - Propiedad por la cual ordenar
 * @param {string} order - 'asc' o 'desc'
 * @returns {array} Array ordenado
 */
export const sortByProperty = (array, property, order = 'asc') => {
  const sorted = [...array];
  sorted.sort((a, b) => {
    if (a[property] < b[property]) {
      return order === 'asc' ? -1 : 1;
    }
    if (a[property] > b[property]) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
  return sorted;
};

/**
 * Calcula el promedio de un array de números
 * @param {array} array - Array de números
 * @returns {number} Promedio
 */
export const calculateAverage = (array) => {
  if (array.length === 0) return 0;
  const sum = array.reduce((a, b) => a + b, 0);
  return sum / array.length;
};

/**
 * Agrupa array por propiedad
 * @param {array} array - Array a agrupar
 * @param {string} property - Propiedad para agrupar
 * @returns {object} Objeto con arrays agrupados
 */
export const groupByProperty = (array, property) => {
  return array.reduce((acc, item) => {
    const key = item[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
};

/**
 * Valida un objeto con schema
 * @param {object} obj - Objeto a validar
 * @param {object} schema - Schema de validación
 * @returns {object} { isValid: boolean, errors: array }
 */
export const validateSchema = (obj, schema) => {
  const errors = [];
  
  Object.keys(schema).forEach(key => {
    const rule = schema[key];
    const value = obj[key];

    if (rule.required && !value) {
      errors.push(`${key} es requerido`);
    }

    if (rule.type && value && typeof value !== rule.type) {
      errors.push(`${key} debe ser de tipo ${rule.type}`);
    }

    if (rule.minLength && value && value.length < rule.minLength) {
      errors.push(`${key} debe tener al menos ${rule.minLength} caracteres`);
    }

    if (rule.maxLength && value && value.length > rule.maxLength) {
      errors.push(`${key} debe tener máximo ${rule.maxLength} caracteres`);
    }

    if (rule.pattern && value && !rule.pattern.test(value)) {
      errors.push(`${key} tiene un formato inválido`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export default {
  formatCurrency,
  isValidEmail,
  truncateText,
  capitalize,
  capitalizeWords,
  formatDate,
  formatDateTime,
  debounce,
  generateUniqueId,
  deepClone,
  isEmpty,
  filterByProperty,
  sortByProperty,
  calculateAverage,
  groupByProperty,
  validateSchema,
};
