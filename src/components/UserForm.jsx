/**
 * Componente UserForm - Formulario para crear/editar usuarios
 * Incluye validación de email y campos requeridos
 */

import { useState, useEffect } from 'react';
import './UserForm.css';

export const UserForm = ({
  initialData = null,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'USER',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        role: initialData.role || 'USER',
      });
    }
  }, [initialData]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo
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
        email: '',
        role: 'USER',
      });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Nombre *
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className={`form-control ${errors.name ? 'form-control-error' : ''}`}
          value={formData.name}
          onChange={handleChange}
          placeholder="Ej: Juan Pérez"
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email *
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className={`form-control ${errors.email ? 'form-control-error' : ''}`}
          value={formData.email}
          onChange={handleChange}
          placeholder="usuario@ejemplo.com"
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="role" className="form-label">
          Rol
        </label>
        <select
          id="role"
          name="role"
          className="form-control form-select"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="USER">Usuario</option>
          <option value="ADMIN">Administrador</option>
        </select>
      </div>

      {/* Botones de acción */}
      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear Usuario'}
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

export default UserForm;
