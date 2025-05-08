import React from 'react';
import '../styles/Header.css';

export const Banner = () => {
  return (
    <section className="header" style={{position: 'relative', overflow: 'hidden'}}>
      <div className="header-background">
        <div className="gradient-overlay"></div>
        <div className="pattern-overlay"></div>
      </div>
      <div className="header-content">
        <div className="brand-container">
          <div className="logo-wrapper">
            <svg className="logo-icon" viewBox="0 0 24 24">
              <path className="logo-path-1" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <h1 className="brand-name">Snaplyzer Extractor</h1>
          </div>
          <p className="brand-tagline">Descubre y extrae imágenes de cualquier sitio web en segundos</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <div className="feature-content">
              <h3>Rápido</h3>
              <p>Escaneo instantáneo de sitios web</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <div className="feature-content">
              <h3>Seguro</h3>
              <p>Descarga segura de imágenes</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💎</div>
            <div className="feature-content">
              <h3>Alta Calidad</h3>
              <p>Mantiene la calidad original</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 