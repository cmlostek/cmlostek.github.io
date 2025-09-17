import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>&copy; {currentYear} Cole Mlostek. All rights reserved.</p>
          <div className="footer-links">
            <a href="https://github.com/cmlostek" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://linkedin.com/in/colemlostek" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="mailto:your.colerm17@gmail.com">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
