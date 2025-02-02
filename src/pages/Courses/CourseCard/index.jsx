import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseCard.css';
import defaultImage from '../../../assets/images/seucursodigital.png';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  // Add list of courses that need "-2" suffix
  const specialCourses = [
    'administracao-em-enfermagem',
    'agente-comunitario-de-saude',
    'atendente-de-farmacia',
    'automaquiagem',
    'auxiliar-de-necropsia',
    'cuidador-infantil',
    'frentista',
    'gestao-de-salao-de-beleza',
    'motorista-de-aplicativo',
    'operador-de-prensa',
    'tecnicas-de-vendas'
  ];

  const handleNavigate = () => {
    let courseSlug = course.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    
    // Check if this course should have "-2" suffix
    if (specialCourses.includes(courseSlug)) {
      courseSlug = `${courseSlug}-2`;
    }
    
    navigate(`/courses/${courseSlug}`, { 
      state: { 
        courseId: course.id,
        fromCourses: true
      } 
    });
  };

  const handleImageError = (e) => {
    setImageError(true);
    e.target.onerror = null;
    e.target.src = defaultImage;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const decimal = rating - fullStars;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={`star-${i}`} className="star full">★</span>);
      } else if (i === fullStars && decimal > 0) {
        stars.push(
          <span key={`star-${i}`} className="star partial">
            <span 
              className="star-fill" 
              style={{ width: `${Math.round(decimal * 100)}%` }}
            >
              ★
            </span>
            <span className="star-empty">☆</span>
          </span>
        );
      } else {
        stars.push(<span key={`star-${i}`} className="star empty">☆</span>);
      }
    }
    
    return stars;
  };

  return (
    <div 
      id={`course-${course.id}`}
      className="course-card"
    >
      <div 
        className="course-image"
        onClick={handleNavigate}
        role="button"
        tabIndex={0}
        style={{ cursor: 'pointer' }}
      >
        <img
          src={course.image || defaultImage}
          alt={course.title}
          onError={handleImageError}
          loading="lazy"
          className={imageError ? 'default-image' : ''}
        />
      </div>
      <div className="course-info">
        <div className="course-details">
          <div className="rating">
            <div className="stars">{renderStars(course.rating)}</div>
            <span className="rating-number">{course.rating.toFixed(2)}</span>
            <span className="rating-count">({course.ratingCount})</span>
          </div>
          <h3 
            className="course-title"
            onClick={handleNavigate}
            role="button"
            tabIndex={0}
          >
            {course.title}
          </h3>
          <div className="course-meta-info">
            <div className="provider-info">
              <img 
                src={course.provider.image} 
                alt={course.provider.name}
                className="provider-avatar"
              />
              <span className="provider-name">{course.provider.name}</span>
            </div>
            <div className="duration">
              <i className="fas fa-clock"></i>
              <span>{course.duration} horas</span>
            </div>
          </div>
        </div>
        <button 
          className="enroll-button"
          onClick={handleNavigate}
        >
          Inscreva-se
        </button>
      </div>
    </div>
  );
};

export default CourseCard; 