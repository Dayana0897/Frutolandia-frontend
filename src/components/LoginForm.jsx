import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthForms.css';

/**
 * Componente LoginForm - Formulario de inicio de sesión
 * Puede usarse en página completa o dentro de modal
 */
const LoginForm = ({ onSuccess, inModal = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 3) {
      newErrors.password = 'La contraseña debe tener al menos 3 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const success = await login(email, password);
      if (success) {
        if (onSuccess) {
          onSuccess();
        } else if (!inModal) {
          navigate('/');
        }
      }
    } catch (error) {
      setErrors({ submit: error.message || 'Error al iniciar sesión' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {errors.submit && (
        <div className="form-error-message">{errors.submit}</div>
      )}

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className={errors.email ? 'input-error' : ''}
          disabled={loading}
          autoComplete="off"
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <div className="password-input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            autoComplete="off"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={errors.password ? 'input-error' : ''}
            disabled={loading}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        {errors.password && <span className="field-error">{errors.password}</span>}
      </div>

      <button type="submit" className="btn-primary-form" disabled={loading}>
        {loading ? '🔄 Cargando...' : '🔑 Iniciar Sesión'}
      </button>
    </form>
  );
};

export default LoginForm;
