import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthForms.css';

/**
 * Componente RegisterForm - Formulario de registro
 * Puede usarse en página completa o dentro de modal
 */
const RegisterForm = ({ onSuccess, inModal = false }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    } else if (firstName.trim().length < 2) {
      newErrors.firstName = 'El nombre debe tener al menos 2 caracteres';
    }
    
    if (!lastName.trim()) {
      newErrors.lastName = 'Los apellidos son requeridos';
    } else if (lastName.trim().length < 2) {
      newErrors.lastName = 'Los apellidos deben tener al menos 2 caracteres';
    }
    
    if (!email) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirmar contraseña es requerido';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const fullName = `${firstName.trim()} ${lastName.trim()}`;
      const success = await register(fullName, email, password);
      if (success) {
        if (onSuccess) {
          onSuccess();
        } else if (!inModal) {
          navigate('/login?registered=true');
        }
      }
    } catch (error) {
      setErrors({ submit: error.message || 'Error al registrarse' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {errors.submit && (
        <div className="form-error-message">{errors.submit}</div>
      )}

      <div className="form-group">
        <label htmlFor="firstName">Nombre</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Tu nombre"
          className={errors.firstName ? 'input-error' : ''}
          disabled={loading}
        />
        {errors.firstName && <span className="field-error">{errors.firstName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Apellidos</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Tus apellidos"
          className={errors.lastName ? 'input-error' : ''}
          disabled={loading}
        />
        {errors.lastName && <span className="field-error">{errors.lastName}</span>}
      </div>

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
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <div className="password-input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
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

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
        <div className="password-input-wrapper">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className={errors.confirmPassword ? 'input-error' : ''}
            disabled={loading}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
      </div>

      <button type="submit" className="btn-primary-form" disabled={loading}>
        {loading ? '🔄 Registrando...' : '📝 Crear Cuenta'}
      </button>
    </form>
  );
};

export default RegisterForm;
