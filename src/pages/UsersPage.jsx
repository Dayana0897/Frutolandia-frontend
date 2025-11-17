/**
 * Página de Usuarios - UsersPage
 * Gestión de usuarios con crear, editar y eliminar
 */

import { useState } from 'react';
import { UserList } from '../components/UserList';
import { UserForm } from '../components/UserForm';
import { useUserStore } from '../store/userStore';
import { Toast } from '../components/Toast';
import './UsersPage.css';

export const UsersPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [toast, setToast] = useState(null);
  const { createUser, updateUser, loading } = useUserStore();

  const handleFormSubmit = async (formData) => {
    try {
      if (editingUser) {
        await updateUser(editingUser.id, formData);
        setToast({ type: 'success', message: 'Usuario actualizado correctamente' });
      } else {
        await createUser(formData);
        setToast({ type: 'success', message: 'Usuario creado correctamente' });
      }
      setShowForm(false);
      setEditingUser(null);
    } catch (error) {
      setToast({ type: 'danger', message: error.message || 'Error al guardar el usuario' });
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  return (
    <div className="users-page">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <div className="page-header">
        <h1>Gestión de Usuarios</h1>
        <p>Administra los usuarios de la plataforma</p>
      </div>

      <div className="page-content">
        {showForm ? (
          <div className="form-container">
            <h2>{editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
            <UserForm
              initialData={editingUser}
              onSubmit={handleFormSubmit}
              onCancel={handleCancel}
              isLoading={loading}
            />
          </div>
        ) : (
          <>
            <UserList onEdit={handleEdit} showActions={true} />
          </>
        )}
      </div>

      {/* Botón flotante para agregar usuario */}
      {!showForm && (
        <button
          className="floating-btn"
          onClick={() => setShowForm(true)}
          title="Agregar nuevo usuario"
          aria-label="Agregar nuevo usuario"
        >
          ➕
        </button>
      )}
    </div>
  );
};

export default UsersPage;
