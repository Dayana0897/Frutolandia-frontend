/**
 * Página de Administración - AdminPage
 * Dashboard con resumen e información de administrador
 */

import { useEffect, useState } from 'react';
import { useProductStore } from '../store/productStore';
import { useUserStore } from '../store/userStore';
import './AdminPage.css';

export const AdminPage = () => {
  const { products, fetchProducts } = useProductStore();
  const { users, fetchUsers } = useUserStore();
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStockProducts: 0,
    totalUsers: 0,
    adminUsers: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, [fetchProducts, fetchUsers]);

  // Calcular estadísticas
  useEffect(() => {
    const lowStock = products.filter((p) => p.stock < 10).length;
    const admins = users.filter((u) => u.role === 'ADMIN').length;
    const revenue = products.reduce((sum, p) => sum + (p.price || 0), 0);

    setStats({
      totalProducts: products.length,
      lowStockProducts: lowStock,
      totalUsers: users.length,
      adminUsers: admins,
      totalRevenue: revenue.toFixed(2),
    });
  }, [products, users]);

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Panel de Administración</h1>
        <p>Dashboard y resumen de estadísticas</p>
      </div>

      <div className="page-content">
        {/* Grid de estadísticas */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-content">
              <h3>Productos Total</h3>
              <p className="stat-value">{stats.totalProducts}</p>
            </div>
          </div>

          <div className="stat-card stat-warning">
            <div className="stat-icon">⚠️</div>
            <div className="stat-content">
              <h3>Stock Bajo</h3>
              <p className="stat-value">{stats.lowStockProducts}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>Usuarios Total</h3>
              <p className="stat-value">{stats.totalUsers}</p>
            </div>
          </div>

          <div className="stat-card stat-success">
            <div className="stat-icon">👑</div>
            <div className="stat-content">
              <h3>Administradores</h3>
              <p className="stat-value">{stats.adminUsers}</p>
            </div>
          </div>

          <div className="stat-card stat-info">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>Suma de Precios</h3>
              <p className="stat-value">${stats.totalRevenue}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>Estado</h3>
              <p className="stat-value status-online">En línea</p>
            </div>
          </div>
        </div>

        {/* Sección de acciones rápidas */}
        <div className="quick-actions">
          <h2>Acciones Rápidas</h2>
          <div className="actions-grid">
            <a href="/productos" className="action-card">
              <div className="action-icon">📦</div>
              <h4>Gestionar Productos</h4>
              <p>Ver, crear y editar productos</p>
            </a>
            <a href="/usuarios" className="action-card">
              <div className="action-icon">👥</div>
              <h4>Gestionar Usuarios</h4>
              <p>Administrar usuarios del sistema</p>
            </a>
            <div className="action-card">
              <div className="action-icon">📈</div>
              <h4>Reportes</h4>
              <p>Ver reportes y análisis</p>
            </div>
            <div className="action-card">
              <div className="action-icon">⚙️</div>
              <h4>Configuración</h4>
              <p>Ajustes del sistema</p>
            </div>
          </div>
        </div>

        {/* Sección de información */}
        <div className="info-section">
          <h2>Información del Sistema</h2>
          <div className="info-grid">
            <div className="info-card">
              <h4>Versión</h4>
              <p>1.0.0</p>
            </div>
            <div className="info-card">
              <h4>Última actualización</h4>
              <p>{new Date().toLocaleDateString('es-ES')}</p>
            </div>
            <div className="info-card">
              <h4>API Base URL</h4>
              <p>http://localhost:8080/api</p>
            </div>
            <div className="info-card">
              <h4>Estado</h4>
              <p style={{ color: 'var(--color-success)' }}>✓ Sistema operativo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
