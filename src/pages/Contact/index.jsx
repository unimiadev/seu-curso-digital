import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import './Contact.css';

const Contact = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5554996825784', '_blank');
  };

  return (
    <div>
      <Header />
      <div className="contact-page">
        <div className="contact-container">
          <div className="contact-header">
            <h1>Fale Conosco</h1>
            <div className="header-underline"></div>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <p>
                Se você tiver dúvidas, sugestões ou precisar de qualquer assistência, 
                não hesite em nos contatar. Nossa equipe está disponível para responder 
                a todas as suas perguntas e garantir que você tenha a melhor experiência 
                possível com nossos cursos.
              </p>

              <p className="contact-methods">
                Entre em contato conosco pelos seguintes meios:
              </p>

              <div className="contact-email">
                <strong>E-mail:</strong> contato@seucursodigital.com
              </div>

              <button 
                className="whatsapp-button"
                onClick={handleWhatsAppClick}
              >
                <i className="fab fa-whatsapp"></i>
                Contatar via WhatsApp
              </button>
            </div>

            
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Contact; 