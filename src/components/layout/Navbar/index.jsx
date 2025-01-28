import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <button 
          className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-content">
            <ul className="mobile-nav-items">
              <li><Link to="/" onClick={closeMenu}>Início</Link></li>
              <li><Link to="/courses" onClick={closeMenu}>Cursos</Link></li>
              <li><Link to="/sobre-nos" onClick={closeMenu}>Quem Somos</Link></li>
              <li><Link to="/fale-conosco" onClick={closeMenu}>Contato</Link></li>
              <li>
                <Link to="/" className="cta-button" onClick={closeMenu}>
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="nav-menu">
          <li><Link to="/">Início</Link></li>
          <li><Link to="/courses">Cursos</Link></li>
          <li><Link to="/sobre-nos">Quem Somos</Link></li>
          <li><Link to="/fale-conosco">Contato</Link></li>
        </ul>

        <div className="nav-buttons">
          <Link to="/" className="cta-button">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 