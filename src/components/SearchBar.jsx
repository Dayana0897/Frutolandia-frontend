/**
 * Componente SearchBar - Barra de búsqueda
 * Permite buscar productos por nombre
 */

import { useState } from 'react';
import './SearchBar.css';

export const SearchBar = ({ onSearch, placeholder = 'Buscar productos...' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          aria-label="Buscar"
          autoComplete="off"
        />
        {searchTerm && (
          <button
            type="button"
            className="search-clear"
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
        <button type="submit" className="search-btn" aria-label="Buscar">
          🔍
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
