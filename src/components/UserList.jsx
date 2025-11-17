/**
 * Componente UserList - Lista de usuarios
 * Muestra tabla de usuarios con opciones de editar/eliminar
 */

import { useEffect, useState } from 'react';
import { useUserStore } from '../store/userStore';
import { Toast } from './Toast';
import './UserList.css';

export const UserList = ({ onEdit, showActions = false }) => {
  const { users, loading, error, fetchUsers, deleteUser, filterRole, setFilterRole } =
    useUserStore();
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este usuario?')) {
      try {
        await deleteUser(id);
        setToast({ type: 'success', message: 'Usuario eliminado correctamente' });
      } catch (err) {
        setToast({ type: 'danger', message: 'Error al eliminar el usuario' });
      }
    }
  };

  // Filtrar usuarios por rol
  const filteredUsers =
    filterRole === 'ALL' ? users : users.filter((u) => u.role === filterRole);

  // Mostrar loader
  if (loading) {
    return (
      <div className="loader-center">
        <div className="loader"></div>
        <p>Cargando usuarios...</p>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="alert alert-danger">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div className="user-list">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Filtro de rol */}
      <div className="filter-section">
        <label>Filtrar por rol:</label>
        <select
          className="form-control form-select"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          style={{ maxWidth: '200px' }}
        >
          <option value="ALL">Todos</option>
          <option value="USER">Usuario</option>
          <option value="ADMIN">Administrador</option>
        </select>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="empty-state">
          <p>No hay usuarios disponibles</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                {showActions && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge badge-${user.role === 'ADMIN' ? 'danger' : 'info'}`}>
                      {user.role}
                    </span>
                  </td>
                  {showActions && (
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn btn-info btn-sm"
                          onClick={() => onEdit(user)}
                          title="Editar usuario"
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(user.id)}
                          title="Eliminar usuario"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
