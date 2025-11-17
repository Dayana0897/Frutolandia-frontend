import { useState } from 'react';
import { Modal } from './Modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './AuthModal.css';

/**
 * Modal de Autenticación - Envuelve Login y Register
 * Permite cambiar entre login y registro dentro del modal
 */
export const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);

  const handleToggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  const handleSuccessfulAuth = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="auth-modal">
        {/* Tabs de Login/Register */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => setMode('login')}
          >
            🔑 Iniciar Sesión
          </button>
          <button
            className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => setMode('register')}
          >
            📝 Registrarse
          </button>
        </div>

        {/* Contenido */}
        <div className="auth-content">
          {mode === 'login' ? (
            <>
              <LoginForm onSuccess={handleSuccessfulAuth} />
              <p className="auth-toggle">
                ¿No tienes cuenta?{' '}
                <button
                  onClick={handleToggleMode}
                  className="auth-toggle-btn"
                >
                  Regístrate aquí
                </button>
              </p>
            </>
          ) : (
            <>
              <RegisterForm onSuccess={handleSuccessfulAuth} />
              <p className="auth-toggle">
                ¿Ya tienes cuenta?{' '}
                <button
                  onClick={handleToggleMode}
                  className="auth-toggle-btn"
                >
                  Inicia sesión aquí
                </button>
              </p>
            </>
          )}
        </div>

        {/* Demo Info */}
        {mode === 'login' && (
          <div className="auth-demo">
            <p className="demo-title">👤 Demo Credentials</p>
            <div className="demo-accounts">
              <div className="demo-account">
                <strong>Admin:</strong> admin@frutolandia.com / admin123
              </div>
              <div className="demo-account">
                <strong>User:</strong> cliente@frutolandia.com / user123
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AuthModal;
