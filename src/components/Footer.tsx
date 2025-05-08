import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-logo">
            <svg width="28" height="28" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="34" height="34" rx="8" fill="#fff" stroke="#6c63ff" strokeWidth="3"/>
              <circle cx="19" cy="19" r="8" fill="#6c63ff" stroke="#fff" strokeWidth="2"/>
              <path d="M10 28 Q19 14 28 28" stroke="#6c63ff" strokeWidth="2.5" fill="none"/>
              <circle cx="19" cy="19" r="2.5" fill="#fff"/>
            </svg>
            <span>Snaplyzer</span>
          </div>
          <p>Herramienta gratuita para extraer imágenes de sitios web</p>
        </div>
        
        <div className="footer-links">
          <Link to="/docs">Documentación</Link>
          <Link to="/privacy">Privacidad</Link>
          <Link to="/terms">Términos</Link>
          <a 
            href="https://github.com/yourusername/imageharvest"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Snaplyzer</p>
        <p>Creado con 💜 para la comunidad</p>
      </div>
    </footer>
  );
}; 