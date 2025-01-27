import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../../assets/images/seucursodigital.png';
import Navbar from '../Navbar';
import LanguageSwitcher from '../../LanguageSwitcher';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/">
          <img 
            src={logo} 
            alt="Seu Curso Digital" 
            className="header-logo"
          />
        </Link>
        <Navbar />
        <div className="header-right">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header; 