import React, { useState } from 'react';
import './CategoryFilter.css';

const CategoryFilter = ({ categories, selectedCategories, onCategoryChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCategoryChange = (categoryId) => {
    onCategoryChange(categoryId);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Get names of selected categories for the indicator
  const getSelectedCategoryNames = () => {
    return categories
      .filter(category => selectedCategories.includes(category.id))
      .map(category => category.name);
  };

  const selectedCategoryNames = getSelectedCategoryNames();

  return (
    <>
      <div className="mobile-filter-section">
        <button className="filter-button-mobile" onClick={toggleModal}>
          <i className="fas fa-filter"></i>
          Filtrar por Categoria
        </button>
        {selectedCategoryNames.length > 0 && (
          <div className="active-filters-indicator">
            <span className="filter-count">{selectedCategoryNames.length} filtro(s) ativo(s):</span>
            <div className="active-filters-tags">
              {selectedCategoryNames.map((name, index) => (
                <span key={index} className="filter-tag">
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Desktop Filter */}
      <div className="category-filter desktop">
        <h3>Categorias</h3>
        <div className="categories-list">
          {categories.map(category => (
            <label key={category.id} className="category-item">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
              <span>{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Mobile Modal */}
      {isModalOpen && (
        <div className="category-filter-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Categorias</h3>
              <button className="close-button" onClick={toggleModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="categories-list">
              {categories.map(category => (
                <label key={category.id} className="category-item">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                  />
                  <span>{category.name}</span>
                </label>
              ))}
            </div>
            <button className="apply-filters-button" onClick={toggleModal}>
              Aplicar Filtros
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryFilter; 