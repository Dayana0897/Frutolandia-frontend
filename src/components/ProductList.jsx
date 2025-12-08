/**
 * Componente ProductList - Lista de productos
 * Muestra grid de tarjetas de productos con búsqueda
 */

import { useEffect, useState } from 'react';
import { useProductStore } from '../store/productStore';
import { useAuth } from '../context/AuthContext';
import { SearchBar } from './SearchBar';
import { ProductCard } from './ProductCard';
import { ProductForm } from './ProductForm';
import { Modal } from './Modal';
import { Toast } from './Toast';
import './ProductList.css';

export const ProductList = ({ showActions = false }) => {
  const { products, loading, error, fetchProducts, searchProducts, deleteProduct, updateProduct } =
    useProductStore();
  const { isAdmin } = useAuth();
  const [toast, setToast] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim()) {
      await searchProducts(searchTerm);
    } else {
      await fetchProducts();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este producto?')) {
      try {
        await deleteProduct(id);
        setToast({ type: 'success', message: 'Producto eliminado correctamente' });
      } catch (err) {
        setToast({ type: 'danger', message: 'Error al eliminar el producto' });
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (formData) => {
    try {
      await updateProduct(editingProduct.id, formData);
      setToast({ type: 'success', message: 'Producto actualizado correctamente' });
      setShowEditModal(false);
      setEditingProduct(null);
      await fetchProducts();
    } catch (err) {
      setToast({ type: 'danger', message: 'Error al actualizar el producto' });
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingProduct(null);
  };

  // Mostrar loader
  if (loading) {
    return (
      <div className="loader-center">
        <div className="loader"></div>
        <p>Cargando productos...</p>
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
    <div className="product-list">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <SearchBar onSearch={handleSearch} />

      {products.length === 0 ? (
        <div className="empty-state">
          <p>No hay productos disponibles</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={isAdmin ? handleEdit : null}
              onDelete={isAdmin ? handleDelete : null}
            />
          ))}
        </div>
      )}

      {/* Modal de edición */}
      {showEditModal && editingProduct && (
        <Modal isOpen={showEditModal} onClose={handleCancelEdit} title="Editar Producto">
          <ProductForm
            initialData={editingProduct}
            onSubmit={handleEditSubmit}
            onCancel={handleCancelEdit}
            isLoading={loading}
          />
        </Modal>
      )}
    </div>
  );
};

export default ProductList;
