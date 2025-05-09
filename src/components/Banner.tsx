import React from 'react';
import Particles from 'react-tsparticles';
import type { Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';

export const Banner = () => {
  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary to-primary-dark">
      {/* Fondo animado con partículas */}
      <Particles
        id="tsparticles-banner"
        init={particlesInit}
        options={{
          background: { color: { value: 'transparent' } },
          fpsLimit: 60,
          particles: {
            color: { value: '#818CF8' }, // primary-light
            links: {
              enable: true,
              color: '#6366F1', // primary
              opacity: 0.15,
              width: 1.2,
            },
            move: { enable: true, speed: 1.2 },
            number: { value: 35 },
            opacity: { value: 0.18 },
            size: { value: 3.5 },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            {/* Logo SVG temático */}
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 shadow-lg">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="10" width="36" height="28" rx="6" fill="#fff" stroke="#6c63ff" strokeWidth="3"/>
                <rect x="14" y="18" width="20" height="12" rx="3" fill="#a5b4fc" stroke="#6366f1" strokeWidth="2"/>
                <circle cx="24" cy="24" r="4" fill="#6366f1" stroke="#fff" strokeWidth="2"/>
                <rect x="18" y="14" width="4" height="4" rx="2" fill="#6366f1" />
                <rect x="26" y="30" width="8" height="4" rx="2" fill="#6366f1" />
              </svg>
            </span>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">Snaplyzer Extractor</h1>
          </div>
          <p className="text-xl text-neutral-100 drop-shadow">Descubre y extrae imágenes de cualquier sitio web en segundos</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white shadow-md">
            <div className="text-3xl mb-4">⚡</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Rápido</h3>
              <p className="text-neutral-100">Escaneo instantáneo de sitios web</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white shadow-md">
            <div className="text-3xl mb-4">🔒</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Seguro</h3>
              <p className="text-neutral-100">Descarga segura de imágenes</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white shadow-md">
            <div className="text-3xl mb-4">💎</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Alta Calidad</h3>
              <p className="text-neutral-100">Mantiene la calidad original</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 