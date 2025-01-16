import React, { useState } from 'react';
import './CategoryFilter.css';

const CategoryFilter = ({ categories, selectedCategories, onCategoryChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleCheckboxChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoryChange(selectedCategories.filter(id => id !== categoryId));
    } else {
      onCategoryChange([...selectedCategories, categoryId]);
    }
  };

  return (
    <>
      <button className="filter-button-mobile" onClick={toggleModal}>
        <i className="fas fa-filter"></i> Filtrar por Categoria
      </button>

      <div className="category-filter desktop">
        <h3>Categorias</h3>
        <div className="categories-list">
          {categories.map(category => (
            <label key={category.id} className="category-item">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCheckboxChange(category.id)}
              />
              <span>{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="category-filter-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Categorias</h3>
              <button onClick={toggleModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="categories-list">
              {categories.map(category => (
                <label key={category.id} className="category-item">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCheckboxChange(category.id)}
                  />
                  <span>{category.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryFilter; 