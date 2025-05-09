import React from 'react';
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="main-header app-header" style={{position: 'relative', minHeight: 80, width: '100%', padding: '0', boxSizing: 'border-box', background: 'linear-gradient(135deg, #6c63ff 0%, #5145cd 100%)', color: '#fff', overflow: 'hidden'}}>
      {/* Fondo gradiente y patrón de puntos */}
      <div style={{position: 'absolute', inset: 0, zIndex: 0}}>
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #6c63ff 0%, #5145cd 100%)', opacity: 0.97}}></div>
        <div style={{position: 'absolute', inset: 0, backgroundImage: "url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')", opacity: 1}}></div>
      </div>
      <div style={{position: 'relative', zIndex: 1, maxWidth: 1440, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: 80}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <svg width="32" height="32" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="34" height="34" rx="8" fill="#fff" stroke="#6c63ff" strokeWidth="3"/>
            <circle cx="19" cy="19" r="8" fill="#6c63ff" stroke="#fff" strokeWidth="2"/>
            <path d="M10 28 Q19 14 28 28" stroke="#6c63ff" strokeWidth="2.5" fill="none"/>
            <circle cx="19" cy="19" r="2.5" fill="#fff"/>
            </svg>
          <span style={{fontWeight: 800, fontSize: '1.35rem', letterSpacing: '1px', color: '#fff'}}>Snaplyzer Extractor</span>
        </div>
        <nav style={{display: 'flex', alignItems: 'center', gap: 16}}>
          <button className="toolbar-btn nav-btn" style={{background: 'none', color: '#fff', border: 'none', fontWeight: 600}} onClick={() => navigate('/')}>Homepage</button>
          <button className="toolbar-btn nav-btn" style={{background: 'none', color: '#fff', border: 'none', fontWeight: 600}} onClick={() => navigate('/extractor')}>Image Extractor</button>
        </nav>
      </div>
    </header>
  );
}; 

export default AppHeader; 