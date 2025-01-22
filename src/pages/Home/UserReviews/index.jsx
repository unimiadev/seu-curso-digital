import React from 'react';
import './UserReviews.css';

const UserReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Clarinha",
      role: "Designer",
      image: "https://cursos.seucursodigital.com/wp-content/uploads/2023/09/avaliacao01.jpg",
      text: "É o lugar perfeito para quem quer investir no seu futuro profissional com confiança.",
      rating: 5,
      highlightColor: "#FF6B6B"
    },
    {
      id: 2,
      name: "Nelson",
      role: "Músico",
      image: "https://cursos.seucursodigital.com/wp-content/uploads/2023/09/3cb4198a3e5657175dac22d9639c73e3.jpg",
      text: "Já fiz 8 Cursos no Seu Curso Digital, e ja estou pensando no próximo!",
      rating: 5,
      highlightColor: "#4ECDC4"
    },
    {
      id: 3,
      name: "Aline",
      role: "Enfermeira",
      image: "https://cursos.seucursodigital.com/wp-content/uploads/2020/08/lab-customer-testimonial-13.jpg",
      text: "Precisava me especializar e obter a certificação, aqui me ajudou muito.",
      rating: 5,
      highlightColor: "#45B7D1"
    }
  ];

  const renderStars = (rating) => {
    return "★".repeat(rating);
  };

  return (
    <section className="user-reviews">
      <div className="reviews-background"></div>
      <div className="user-reviews-container">
        <div className="reviews-header">
          <h2>O que nossos alunos dizem</h2>
          <p className="reviews-subtitle">Histórias reais de alunos que transformaram suas carreiras</p>
        </div>
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="review-card"
              style={{ '--highlight-color': review.highlightColor }}
            >
              <div className="review-content">
                <div className="quote-icon">
                  <i className="fas fa-quote-right"></i>
                </div>
                <p className="review-text">{review.text}</p>
                <div className="review-stars">{renderStars(review.rating)}</div>
              </div>
              <div className="review-footer">
                <img src={review.image} alt={review.name} className="reviewer-image" />
                <div className="reviewer-info">
                  <h3>{review.name}</h3>
                  <span className="reviewer-role">{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserReviews; 