import { useState } from 'react';

/**
 * Componente para mostrar notificaciones/toasts
 * Se usa para mensajes de éxito, error, advertencia e información
 */

export const Toast = ({ type = 'info', message, onClose, autoClose = true }) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  // Auto-cerrar después de 5 segundos si autoClose es true
  if (autoClose && visible) {
    setTimeout(handleClose, 5000);
  }

  if (!visible) return null;

  const typeStyles = {
    success: { background: '#d4edda', color: '#155724', border: '#28a745' },
    danger: { background: '#f8d7da', color: '#721c24', border: '#dc3545' },
    warning: { background: '#fff3cd', color: '#856404', border: '#ffc107' },
    info: { background: '#d1ecf1', color: '#0c5460', border: '#17a2b8' },
  };

  const style = typeStyles[type] || typeStyles.info;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '16px 20px',
        backgroundColor: style.background,
        color: style.color,
        border: `1px solid ${style.border}`,
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: 2000,
        maxWidth: '400px',
        animation: 'slideIn 0.3s ease-in-out',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{message}</span>
        <button
          onClick={handleClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'inherit',
            cursor: 'pointer',
            fontSize: '20px',
            marginLeft: '10px',
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
