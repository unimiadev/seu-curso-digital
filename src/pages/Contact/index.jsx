import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      // Here you would typically make an API call to your backend
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setStatus('error');
    }
  };

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

              <p className="form-intro">
                Ou preencha o formulário abaixo e retornaremos o mais rápido possível.
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Assunto</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensagem</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`submit-button ${status === 'sending' ? 'sending' : ''}`}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Enviando...' : 'Enviar Mensagem'}
              </button>

              {status === 'success' && (
                <div className="status-message success">
                  Mensagem enviada com sucesso! Retornaremos em breve.
                </div>
              )}

              {status === 'error' && (
                <div className="status-message error">
                  Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.
                </div>
              )}
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Contact; 