import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { images } from '../../config/images';

const Header = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <div className="logo-container">
        <img 
          src={darkMode ? "/icons/logo512_dark.png" : "/icons/logo512.png"} 
          alt="Greg Simon Logo" 
          className="header-logo" 
        />
        <div className="logo-text">gregsimon.dev</div>
      </div>
      <div className="social-links">
        <a
          href="https://github.com/gregnomis"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <img src={images.githubLogo} alt="GitHub" />
        </a>
        <a
          href="https://www.linkedin.com/in/gregnomis/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <img src={images.linkedinLogo} alt="LinkedIn" />
        </a>
        <button 
          onClick={toggleTheme} 
          className="theme-toggle social-link"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <img 
            src={darkMode ? images.lightMode : images.darkMode} 
            alt={darkMode ? "Light Mode" : "Dark Mode"} 
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
