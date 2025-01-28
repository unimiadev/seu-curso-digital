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
            <span className="filter-count">
              {selectedCategoryNames.length} filtro(s) ativo(s):
            </span>
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

      <div className={`category-filter ${isModalOpen ? 'modal-open' : ''}`}>
        <div className="filter-header">
          <h3>Categorias</h3>
          <button className="close-modal mobile-only" onClick={toggleModal}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="categories-list">
          {categories.map((category) => (
            <label key={category.id} className="category-item">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
              <span className="category-name">{category.name}</span>
              <span className="checkmark"></span>
            </label>
          ))}
        </div>
      </div>

      {isModalOpen && <div className="modal-overlay" onClick={toggleModal}></div>}
    </>
  );
};

export default CategoryFilter; 