import React from 'react';
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="relative min-h-[80px] w-full p-0 box-border bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white overflow-hidden shadow-lg">
      {/* Fondo gradiente y patrón de puntos */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark opacity-95"></div>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
        }}></div>
      </div>
      <div className="relative z-10 max-w-[1440px] mx-auto w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 h-[80px]">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="transform group-hover:scale-110 transition-transform duration-300">
            <svg width="32" height="32" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
            <rect x="2" y="2" width="34" height="34" rx="8" fill="#fff" stroke="#6c63ff" strokeWidth="3"/>
            <circle cx="19" cy="19" r="8" fill="#6c63ff" stroke="#fff" strokeWidth="2"/>
            <path d="M10 28 Q19 14 28 28" stroke="#6c63ff" strokeWidth="2.5" fill="none"/>
            <circle cx="19" cy="19" r="2.5" fill="#fff"/>
            </svg>
          </div>
          <span className="font-extrabold text-[1.35rem] tracking-wider text-white group-hover:text-neutral-100 transition-colors duration-300">
            Snaplyzer Extractor
          </span>
        </div>
        <nav className="flex items-center gap-6">
          <button 
            className="relative px-4 py-2 font-semibold text-white hover:text-neutral-100 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            onClick={() => navigate('/')}
          >
            Homepage
          </button>
          <button 
            className="relative px-4 py-2 font-semibold text-white hover:text-neutral-100 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            onClick={() => navigate('/extractor')}
          >
            Image Extractor
          </button>
        </nav>
      </div>
    </header>
  );
}; 

export default AppHeader; 