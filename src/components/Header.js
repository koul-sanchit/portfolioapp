import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <div className="logo">
          <Link to="about" smooth={true} duration={500}>Sanchit Koul, SDE</Link>
        </div>

        <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <Link 
                activeClass="active" 
                to="about" 
                spy={true} 
                smooth={true} 
                duration={500}
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
            </li>
            
            <li>
              <Link 
                activeClass="active" 
                to="projects" 
                spy={true} 
                smooth={true} 
                duration={500}
                onClick={() => setMenuOpen(false)}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link 
                activeClass="active" 
                to="codeforces" 
                spy={true} 
                smooth={true} 
                duration={500}
                onClick={() => setMenuOpen(false)}
              >
                Codeforces
              </Link>
            </li>
            <li>
              <Link 
                activeClass="active" 
                to="contact" 
                spy={true} 
                smooth={true} 
                duration={500}
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;