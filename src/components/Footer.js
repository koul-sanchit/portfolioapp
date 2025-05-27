import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-text">
            <p>© {currentYear} Sanchit | Designed & Built with ❤️</p>
          </div>
          
          <div className="footer-links">
            <a href="https://github.com/koul-sanchit" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://in.linkedin.com/in/sanchitkoul03" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="mailto:koulsanchit@gmail.com">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;