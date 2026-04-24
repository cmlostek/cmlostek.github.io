import React, { useState, useEffect } from 'react';
import './Header.css';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { label: 'About',    href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <nav className="nav">
        <a href="#home" className="nav-brand" onClick={closeMenu}>
          Cole Mlostek
        </a>

        <div className={`nav-menu${isMenuOpen ? ' nav-menu--open' : ''}`}>
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="nav-link"
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <ThemeToggle />
          <button
            className={`nav-toggle${isMenuOpen ? ' nav-toggle--open' : ''}`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
