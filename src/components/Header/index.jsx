const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="left-section">
          <Link to="/" className="logo">
            <img src={logo} alt="Logo" />
          </Link>
          <LanguageSwitcher />
        </div>
        
        <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          {}
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