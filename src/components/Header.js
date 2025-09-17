import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-brand">
          <h1>Cole Mlostek</h1>
        </div>
        
        <div className={`nav-menu ${isMenuOpen ? 'nav-menu-active' : ''}`}>
          <a href="#about" onClick={() => scrollToSection('about')} className="nav-link">
            About
          </a>
          <a href="#projects" onClick={() => scrollToSection('projects')} className="nav-link">
            Projects
          </a>
          <a href="#contact" onClick={() => scrollToSection('contact')} className="nav-link">
            Contact
          </a>
        </div>

        <div className="nav-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
