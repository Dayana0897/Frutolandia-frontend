/**
 * Página de Perfil de Usuario
 * Muestra información del usuario y sus productos favoritos
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFavoriteStore } from '../store/favoriteStore';
import { ProductCard } from '../components/ProductCard';
import './ProfilePage.css';

export const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { favorites, loadFavorites, loading } = useFavoriteStore();
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    
    // Cargar favoritos al montar el componente
    loadFavorites();
  }, [user, navigate, loadFavorites]);

  if (!user) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Header del perfil */}
        <div className="profile-header">
          <div className="profile-avatar">
            <i className="bi bi-person-circle"></i>
          </div>
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p className="profile-email">{user.email}</p>
            <span className={`profile-role role-${user.role.toLowerCase()}`}>
              {user.role === 'ADMIN' ? 'Administrador' : 'Usuario'}
            </span>
          </div>
        </div>

        {/* Tabs de navegación */}
        <div className="profile-tabs">
          <button
            className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            <i className="bi bi-info-circle"></i>
            Información
          </button>
          <button
            className={`tab-button ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            <i className="bi bi-heart-fill"></i>
            Favoritos ({favorites.length})
          </button>
        </div>

        {/* Contenido de las tabs */}
        <div className="profile-content">
          {activeTab === 'info' && (
            <div className="info-section">
              <h2>Información Personal</h2>
              <div className="info-grid">
                <div className="info-item">
                  <label>Nombre completo</label>
                  <p>{user.name}</p>
                </div>
                <div className="info-item">
                  <label>Correo electrónico</label>
                  <p>{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="favorites-section">
              <h2>Productos Favoritos</h2>
              {loading ? (
                <div className="loading-favorites">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <p>Cargando favoritos...</p>
                </div>
              ) : favorites.length === 0 ? (
                <div className="no-favorites">
                  <i className="bi bi-heart"></i>
                  <p>No tienes productos favoritos aún</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/productos')}
                  >
                    Explorar Productos
                  </button>
                </div>
              ) : (
                <div className="favorites-grid">
                  {favorites.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
