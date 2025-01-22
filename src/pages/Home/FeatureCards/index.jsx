import React from 'react';
import './FeatureCards.css';

const FeatureCards = () => {
  const features = [
    {
      icon: 'fa-graduation-cap',
      title: '+300 Cursos Disponíveis',
      description: 'Uma ampla variedade de cursos gratuitos em diversas áreas do conhecimento'
    },
    {
      icon: 'fa-certificate',
      title: 'Certificado Registrado',
      description: 'Receba um certificado de conclusão registrado ao finalizar seus cursos'
    },
    {
      icon: 'fa-headset',
      title: 'Suporte Exclusivo',
      description: 'Nossa equipe dedicada está pronta para ajudar em sua jornada de aprendizado'
    }
  ];

  return (
    <section className="features-section">
      <div className="features-container">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">
              <i className={`fas ${feature.icon}`}></i>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards; 