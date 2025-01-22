import React from 'react';
import './CoursesFilter.css';

const CoursesFilter = ({ searchTerm, onSearchChange, sortOption, onSortChange }) => {
  return (
    <div className="courses-filter">
      <div className="search-container">
        <i className="fas fa-search search-icon"></i>
        <input
          type="text"
          placeholder="Buscar cursos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="sort-container">
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
          className="sort-select"
        >
          <option value="default">Ordenar por</option>
          <option value="name-asc">Nome (A-Z)</option>
          <option value="name-desc">Nome (Z-A)</option>
          <option value="rating-desc">Melhor Avaliação</option>
          <option value="rating-asc">Menor Avaliação</option>
          <option value="duration-asc">Menor Duração</option>
          <option value="duration-desc">Maior Duração</option>
        </select>
      </div>
    </div>
  );
};

export default CoursesFilter; 