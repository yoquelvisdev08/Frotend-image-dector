import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-logo">
            <span>🖼️</span>
            <span>ImageHarvest</span>
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
        <p>© {new Date().getFullYear()} ImageHarvest</p>
        <p>Creado con 💜 para la comunidad</p>
      </div>
    </footer>
  );
}; 