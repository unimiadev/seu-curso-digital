import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/images/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    window.location.href = 'https://cursosap.seucursodigital.com';
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="left-section">
          <Link to="/" className="logo">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        
        <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/courses">Cursos</Link>
          <Link to="/about">Sobre</Link>
          <Link to="/contact">Contato</Link>
          <button onClick={handleLogin} className="login-button">
            Entrar
          </button>
        </nav>
        
        <button 
          className="menu-button" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <i className={`fas fa-${isMenuOpen ? 'times' : 'bars'}`}></i>
        </button>
      </div>
    </header>
  );
};

export default Header; 