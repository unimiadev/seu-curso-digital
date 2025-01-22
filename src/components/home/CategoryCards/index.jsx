import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryCards.css';

// Import all category images
import beautyImage from '../../../assets/images/card-beleza.png';
import healthImage from '../../../assets/images/card-saude.jpg';
import itImage from '../../../assets/images/card-informatica.jpg';
import adminImage from '../../../assets/images/card-administracao.jpg';
import languagesImage from '../../../assets/images/card-idiomas.jpg';

const CategoryCards = () => {
  const navigate = useNavigate();

  const categories = [
    {
      image: beautyImage,
      title: 'Beleza',
      slug: 'beleza'
    },
    {
      image: healthImage,
      title: 'Saúde',
      slug: 'saude'
    },
    {
      image: itImage,
      title: 'Informática',
      slug: 'tecnologia'
    },
    {
      image: adminImage,
      title: 'Administração',
      slug: 'administracao'
    },
    {
      image: languagesImage,
      title: 'Idiomas',
      slug: 'idiomas'
    }
  ];

  const handleCategoryClick = (categorySlug) => {
    navigate(`/cursos?category=${categorySlug}`);
  };

  return (
    <section className="category-cards-section">
      <div className="category-cards-container">
        <h2>Explore por Categoria</h2>
        <div className="category-cards-grid">
          {categories.map((category, index) => (
            <div
              key={index}
              className="category-card"
              onClick={() => handleCategoryClick(category.slug)}
            >
              <div className="category-image-container">
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="category-image"
                />
                <div className="category-title-overlay">
                  <h3>{category.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards; 