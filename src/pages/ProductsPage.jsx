/**
 * Página de Productos - ProductsPage
 * Listado completo de productos con búsqueda y gestión
 */

import { useState } from 'react';
import { ProductList } from '../components/ProductList';
import { ProductForm } from '../components/ProductForm';
import { useProductStore } from '../store/productStore';
import { Toast } from '../components/Toast';
import './ProductsPage.css';

export const ProductsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const { createProduct, updateProduct, loading } = useProductStore();

  const handleFormSubmit = async (formData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
        setToast({ type: 'success', message: 'Producto actualizado correctamente' });
      } else {
        await createProduct(formData);
        setToast({ type: 'success', message: 'Producto creado correctamente' });
      }
      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      setToast({ type: 'danger', message: error.message || 'Error al guardar el producto' });
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="products-page">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <div className="page-header">
        <h1>Nuestros Productos</h1>
      </div>

      <div className="page-content">
        {showForm ? (
          <div className="form-container">
            <h2>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
            <ProductForm
              initialData={editingProduct}
              onSubmit={handleFormSubmit}
              onCancel={handleCancel}
              isLoading={loading}
            />
          </div>
        ) : (
          <>
            <ProductList showActions={true} />
          </>
        )}
      </div>

      {/* Botón flotante para agregar producto */}
      {!showForm && (
        <button
          className="floating-btn"
          onClick={() => setShowForm(true)}
          title="Agregar nuevo producto"
          aria-label="Agregar nuevo producto"
        >
          ➕
        </button>
      )}
    </div>
  );
};

export default ProductsPage;
