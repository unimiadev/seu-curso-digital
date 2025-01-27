import React, { useState, useEffect, useRef } from 'react';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'pt-br', name: 'Português', flag: '🇧🇷', url: window.location.href },
    { code: 'en', name: 'English', flag: '🇺🇸', url: 'https://beharv.com' },
    { code: 'es', name: 'Español', flag: '🇪🇸', url: 'https://beharv.com' }
  ];

  const currentLanguage = languages[0]; // Default to Portuguese

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageClick = (url) => {
    if (url !== window.location.href) {
      window.location.href = url;
    }
    setIsOpen(false);
  };

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button 
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Language"
      >
        <span className="flag-only">{currentLanguage.flag}</span>
        <i className={`fas fa-chevron-down ${isOpen ? 'open' : ''}`}></i>
      </button>

      <div className={`language-dropdown ${isOpen ? 'open' : ''}`}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={`language-option ${lang.code === currentLanguage.code ? 'active' : ''}`}
            onClick={() => handleLanguageClick(lang.url)}
          >
            <span>{lang.flag} {lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher; 