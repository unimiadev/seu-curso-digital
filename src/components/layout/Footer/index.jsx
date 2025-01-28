import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../../../assets/images/seucursodigital.png';

const Footer = () => {
  return ( 
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column brand-column">
          <img src={logo} alt="Logo" className="footer-logo" />
          <p className="brand-description">
            Sua plataforma gratuita de cursos online. Aprenda, desenvolva-se e alcance seus objetivos profissionais.
          </p>
        </div>

        <div className="footer-column">
          <h3>Links Institucionais</h3>
          <ul className="footer-links">
            <li>
              <Link to="/sobre-nos">Sobre Nós</Link>
            </li>
            <li>
              <Link to="/termos-de-uso">Termos e Condições</Link>
            </li>
            <li>
              <Link to="/politica-de-privacidade">Política de Privacidade</Link>
            </li>
            <li>
              <Link to="/fale-conosco">Fale Conosco</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Links Úteis</h3>
          <ul className="footer-links">
            <li>
              <Link to="/">Painel do Usuário</Link>
            </li>
            <li>
              <Link to="/cursos">Lista de Cursos</Link>
            </li>
            <li>
              <div className="social-links">
                <h3>Redes Sociais</h3>
                <div className="social-icons">
                  <a href="https://www.facebook.com/seucursodigital10" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="https://www.instagram.com/seucursodigital_/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Seu Curso Digital. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer; 