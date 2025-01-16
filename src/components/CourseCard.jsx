import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseCard.css';
import defaultImage from '../assets/images/seucursodigital.png';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleNavigate = () => {
    const card = document.getElementById(`course-${course.id}`);
    const rect = card.getBoundingClientRect();
    
    sessionStorage.setItem('courseCardPosition', JSON.stringify({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }));

    navigate(`/course/${course.id}`);
  };

  const handleImageError = (e) => {
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