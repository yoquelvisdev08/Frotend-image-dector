import React from 'react';
import { Link } from 'react-router-dom';
// import '../styles/Footer.css';

export const Footer = () => {
  return (
    <footer className="relative w-full bg-gradient-to-r from-primary to-primary-dark text-white overflow-hidden">
      {/* Fondo con patrón de puntos */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
      }}></div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 group">
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                <svg width="28" height="28" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
                  <rect x="2" y="2" width="34" height="34" rx="8" fill="#fff" stroke="#6c63ff" strokeWidth="3"/>
                  <circle cx="19" cy="19" r="8" fill="#6c63ff" stroke="#fff" strokeWidth="2"/>
                  <path d="M10 28 Q19 14 28 28" stroke="#6c63ff" strokeWidth="2.5" fill="none"/>
                  <circle cx="19" cy="19" r="2.5" fill="#fff"/>
                </svg>
              </div>
              <span className="font-extrabold text-xl tracking-wider text-white group-hover:text-neutral-100 transition-colors duration-300">
                Snaplyzer
              </span>
            </div>
            <p className="text-neutral-200 text-xs">
              Herramienta gratuita para extraer imágenes de sitios web
            </p>
          </div>
          <div className="w-full flex justify-center md:justify-end">
            <nav className="flex flex-row gap-6 text-sm font-medium">
              <Link to="/documentation" className="text-neutral-200 hover:text-white transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Documentación</Link>
              <Link to="/privacy" className="text-neutral-200 hover:text-white transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Privacidad</Link>
              <Link to="/terms" className="text-neutral-200 hover:text-white transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Términos</Link>
            </nav>
          </div>
        </div>
      
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-neutral-200 text-xs">
            © {new Date().getFullYear()} Snaplyzer
          </p>
          <p className="text-neutral-200 text-xs flex items-center gap-1">
            Creado con <span className="text-base animate-pulse">💜</span> para la comunidad
          </p>
        </div>
      </div>
    </footer>
  );
}; 