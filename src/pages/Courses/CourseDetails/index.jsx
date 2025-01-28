import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCourseDetails } from '../../../hooks/useCourseDetails';
import { useModules } from '../../../hooks/useModules';
import './CourseDetails.css';
import CourseReviews from '../CourseReviews/index';
import defaultImage from '../../../assets/images/seucursodigital.png';
import LoadingSkeletons from './LoadingSkeletons';

const CourseDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [activeModule, setActiveModule] = useState(null);
  
  const courseId = location.state?.courseId;
  const { course, loading, error } = useCourseDetails(courseId);
  const { modules, loading: modulesLoading } = useModules(courseId);

  const handleBack = () => {
    if (location.state?.fromCourses) {
      navigate(-1);
    } else {
      navigate('/courses');
    }
  };

  const handleCategoryClick = (category) => {
    const categorySlug = category
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    navigate(`/courses?category=${categorySlug}`);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (loading || modulesLoading) {
    return <LoadingSkeletons />;
  }

  if (error || !course) {
    return (
      <section className="course-details-section">
        <div className="error-container">
          <h2>Curso não encontrado</h2>
          <button onClick={handleBack} className="back-button">
            <i className="fas fa-arrow-left"></i> Voltar
          </button>
        </div>
      </section>
    );
  }

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
        // Empty star
        stars.push(<span key={`star-${i}`} className="star empty">☆</span>);
      }
    }
    
    return stars;
  };

  const handleRatingClick = () => {
    setActiveTab('reviews');
    
    const reviewsSection = document.querySelector('.course-reviews');
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="course-details-section">
      <div className="course-details-header">
        <button onClick={handleBack} className="back-button">
          <i className="fas fa-arrow-left"></i> Voltar
        </button>
        {course.categoria && (
          <div className="course-categories">
            {course.categoria.split(',').map((category, index) => (
              <button
                key={index}
                className="category-bubble"
                onClick={() => handleCategoryClick(category.trim())}
              >
                {category.trim()}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="course-details-container">
        <div className="course-content-wrapper">
          <div className="course-main-content">
            <div className="course-header">
              <h1>{course.title}</h1>
              <div className="course-meta">
                <div className="categories">
                  {course.categories.map((category) => (
                    <span
                      key={category.id}
                      className="category-tag"
                      onClick={() => handleCategoryClick(category.name)}
                      role="button"
                      tabIndex={0}
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
                <div className="rating-container" onClick={handleRatingClick}>
                  <span className="stars">{renderStars(course.rating)}</span>
                  <span className="rating-number">{course.rating.toFixed(2)}</span>
                  <span className="rating-count">({course.ratingCount} avaliações)</span>
                </div>
              </div>
            </div>

            <div className="course-image-container">
              <img
                src={imageError ? defaultImage : course.image}
                alt={course.title}
                className={`course-detail-image ${imageError ? 'default-image' : ''}`}
                onError={handleImageError}
                loading="lazy"
              />
              <div className="course-duration">
                <i className="fas fa-clock"></i>
                <span>{course.duration} horas</span>
              </div>
            </div>

            <div className="course-info-mobile">
              <button className="enroll-button-large">Inscreva-se Agora</button>
              
              <div className="course-info-wrapper">
                <div className="course-info-list">
                  <div className="info-item">
                    <i className="fas fa-signal"></i>
                    <div>
                      <h4>Nível</h4>
                      <p>{course.level}</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <i className="fas fa-clock"></i>
                    <div>
                      <h4>Duração</h4>
                      <p>{course.duration} horas</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <i className="fas fa-language"></i>
                    <div>
                      <h4>Idioma</h4>
                      <p>{course.language}</p>
                    </div>
                  </div>
                </div>

                <div className="features-section">
                  <h3>O que está incluído</h3>
                  <ul>
                    {course.features.map((feature, index) => (
                      <li key={index}>
                        <i className="fas fa-check"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="course-provider">
              <img
                src={course.provider.image}
                alt={course.provider.name}
                className="provider-avatar-large"
              />
              <div className="provider-details">
                <div className="provider-name-large">{course.provider.name}</div>
                <div className="provider-description">
                  {course.provider.description}
                </div>
              </div>
            </div>

            <div className="course-tabs">
              <button
                className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Descrição
              </button>
              <button
                className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Avaliações ({course.ratingCount})
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'description' && (
                <div className="course-description">
                  <p>{course.description}</p>
                  
                  <div className="course-modules">
                    <h2>Conteúdo do Curso</h2>
                    {modulesLoading ? (
                      <div className="loading-message">Carregando módulos...</div>
                    ) : (
                      <div className="modules-list">
                        {modules.map((module) => (
                          <div
                            key={module.id}
                            className={`module-item ${activeModule === module.id ? 'active' : ''}`}
                            onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                          >
                            <div className="module-header">
                              <h3>{module.title}</h3>
                              <i className={`fas fa-chevron-${activeModule === module.id ? 'up' : 'down'}`}></i>
                            </div>
                            {activeModule === module.id && (
                              <div className="module-lessons">
                                {/* Module lessons content */}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <CourseReviews reviews={course.reviews} />
              )}
            </div>
          </div>

          <div className="course-sidebar desktop-only">
            <div className="sidebar-card">
              <button className="enroll-button-large">Inscreva-se Agora</button>
              
              <div className="course-info-list">
                <div className="info-item">
                  <i className="fas fa-signal"></i>
                  <div>
                    <h4>Nível</h4>
                    <p>{course.level}</p>
                  </div>
                </div>

                <div className="info-item">
                  <i className="fas fa-clock"></i>
                  <div>
                    <h4>Duração</h4>
                    <p>{course.duration} horas</p>
                  </div>
                </div>

                <div className="info-item">
                  <i className="fas fa-language"></i>
                  <div>
                    <h4>Idioma</h4>
                    <p>{course.language}</p>
                  </div>
                </div>
              </div>

              <div className="features-section">
                <h3>O que está incluído</h3>
                <ul>
                  {course.features.map((feature, index) => (
                    <li key={index}>
                      <i className="fas fa-check"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails; 