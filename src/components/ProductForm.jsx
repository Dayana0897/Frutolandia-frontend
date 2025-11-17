/**
 * Componente ProductForm - Formulario para crear/editar productos
 * Incluye validación y manejo de errores
 */

import { useState, useEffect } from 'react';
import './ProductForm.css';

export const ProductForm = ({
  initialData = null,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    ingredients: '',
    stock: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        price: initialData.price || '',
        description: initialData.description || '',
        ingredients: initialData.ingredients || '',
        stock: initialData.stock || '',
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }
    if (formData.stock < 0) {
      newErrors.stock = 'El stock no puede ser negativo';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
      // Resetear formulario
      setFormData({
        name: '',
        price: '',
        description: '',
        ingredients: '',
        stock: '',
      });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Nombre del Producto *
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className={`form-control ${errors.name ? 'form-control-error' : ''}`}
          value={formData.name}
          onChange={handleChange}
          placeholder="Ej: Manzana Roja"
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="price" className="form-label">
            Precio *
          </label>
          <input
            id="price"
            type="number"
            name="price"
            className={`form-control ${errors.price ? 'form-control-error' : ''}`}
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
          {errors.price && <span className="form-error">{errors.price}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="stock" className="form-label">
            Stock
          </label>
          <input
            id="stock"
            type="number"
            name="stock"
            className={`form-control ${errors.stock ? 'form-control-error' : ''}`}
            value={formData.stock}
            onChange={handleChange}
            placeholder="0"
            min="0"
          />
          {errors.stock && <span className="form-error">{errors.stock}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Descripción *
        </label>
        <textarea
          id="description"
          name="description"
          className={`form-control ${errors.description ? 'form-control-error' : ''}`}
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe el producto..."
          rows="4"
        />
        {errors.description && <span className="form-error">{errors.description}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="ingredients" className="form-label">
          Ingredientes
        </label>
        <input
          id="ingredients"
          type="text"
          name="ingredients"
          className="form-control"
          value={formData.ingredients}
          onChange={handleChange}
          placeholder="Ej: 100% Fruta Natural"
        />
      </div>

      {/* Botones de acción */}
      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear Producto'}
        </button>
        <button
          type="button"
          className="btn btn-outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
