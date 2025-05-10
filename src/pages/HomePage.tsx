import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import './HomePage.css';
import { useInView } from 'react-intersection-observer';

// SVGs para iconos
const ScanSVG = () => (
  <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><rect x="8" y="8" width="32" height="32" rx="8" fill="#6366F1"/><path d="M16 24h16M24 16v16" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
);
const DownloadSVG = () => (
  <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><rect x="8" y="8" width="32" height="32" rx="8" fill="#06b6d4"/><path d="M24 16v12m0 0l-5-5m5 5l5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
);
const SpeedSVG = () => (
  <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><rect x="8" y="8" width="32" height="32" rx="8" fill="#a21caf"/><path d="M24 16a8 8 0 100 16 8 8 0 000-16zm0 0v8l4 4" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
);

const Step1SVG = () => (
  <svg width="40" height="40" fill="none" viewBox="0 0 40 40"><rect width="40" height="40" rx="12" fill="#6366F1"/><path d="M12 20h16" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
);
const Step2SVG = () => (
  <svg width="40" height="40" fill="none" viewBox="0 0 40 40"><rect width="40" height="40" rx="12" fill="#06b6d4"/><path d="M20 12v16" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
);
const Step3SVG = () => (
  <svg width="40" height="40" fill="none" viewBox="0 0 40 40"><rect width="40" height="40" rx="12" fill="#a21caf"/><path d="M14 26l6-6 6 6" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
);

const testimonios = [
  {
    nombre: 'Ana Torres',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    texto: 'Snaplyzer me ahorra horas de trabajo cada semana. ¡Es increíblemente rápido y fácil de usar!'
  },
  {
    nombre: 'Carlos Méndez',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    texto: 'La mejor herramienta para extraer imágenes de sitios web. La recomiendo a todos mis colegas.'
  },
  {
    nombre: 'Lucía Fernández',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    texto: 'El diseño es hermoso y la experiencia de usuario es de otro nivel. ¡Snaplyzer es top!'
  }
];

const demoImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=256&h=256',
  'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&h=256',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=256&h=256',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=256&h=256',
];

const HomePage: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Configuración de partículas
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  const [input, setInput] = React.useState('https://ejemplo.com');
  const [showImages, setShowImages] = React.useState(false);
  const handleDemo = (e: React.FormEvent) => {
    e.preventDefault();
    setShowImages(true);
  };

  return (
    <div className="min-h-screen animated-gradient-bg">
      {/* Hero Section con partículas, gradiente intenso, más espacio y animación de entrada */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: 'transparent' },
            fpsLimit: 60,
            particles: {
              color: { value: ['#fff', '#a5b4fc', '#c7d2fe'] },
              links: { enable: true, color: '#fff', distance: 120, opacity: 0.15 },
              move: { enable: true, speed: 1.2 },
              number: { value: 50 },
              opacity: { value: 0.25 },
              shape: { type: 'circle' },
              size: { value: { min: 2, max: 5 } },
            },
            detectRetina: true,
          }}
          className="absolute inset-0 z-0"
        />
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-24 sm:py-32 text-center relative z-10 flex flex-col items-center gap-8"
        >
          <h1 className="text-5xl sm:text-7xl font-extrabold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-lg mb-6">
            Snaplyzer Extractor
          </h1>
          <p className="text-2xl sm:text-3xl text-blue-100 max-w-2xl mx-auto mb-10">
            Extrae y analiza imágenes de cualquier sitio web de manera rápida, eficiente y segura
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              to="/extractor" 
              className="animated-gradient-btn px-10 py-4 rounded-lg font-semibold text-lg"
            >
              Comenzar Ahora
            </Link>
            <Link 
              to="/docs" 
              className="animated-gradient-btn px-10 py-4 rounded-lg font-semibold text-lg"
            >
              Ver Documentación
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Estadísticas con animación de entrada */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="py-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard number="1M+" label="Imágenes Analizadas" />
            <StatCard number="50K+" label="Usuarios Activos" />
            <StatCard number="99.9%" label="Tiempo Activo" />
          </div>
        </div>
      </motion.section>

      {/* Características con animación de entrada */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        className="py-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Características Principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ScanSVG />} title="Escaneo Rápido" description="Analiza sitios web completos en segundos con nuestra tecnología avanzada" />
            <FeatureCard 
              icon={<DownloadSVG />} title="Descarga Simple" description="Guarda las imágenes que necesites con un solo clic" />
            <FeatureCard 
              icon={<SpeedSVG />} title="Rendimiento Óptimo" description="Procesamiento rápido y eficiente incluso con grandes cantidades de imágenes" />
          </div>
        </div>
      </motion.section>

      {/* Cómo funciona con animación de entrada */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        className="py-20"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">¿Cómo funciona?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard icon={<Step1SVG />} title="Pega la URL" description="Introduce la dirección del sitio web que deseas analizar." />
            <StepCard icon={<Step2SVG />} title="Escanea" description="Nuestro sistema analiza y extrae todas las imágenes automáticamente." />
            <StepCard icon={<Step3SVG />} title="Descarga" description="Descarga las imágenes seleccionadas en un solo clic." />
          </div>
        </div>
      </motion.section>

      {/* Demo visual con mini programa simulado */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        className="py-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Prueba Ahora</h2>
            <p className="text-xl text-blue-100">Ve cómo funciona en tiempo real</p>
          </div>
          <div className="rounded-2xl p-8 shadow-xl border border-white/20 flex flex-col items-center bg-white/10">
            <form onSubmit={handleDemo} className="w-full max-w-xl flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Pega la URL aquí..."
                className="flex-1 px-4 py-3 rounded-l-lg border border-white/30 bg-white/10 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white text-lg"
                value={input}
                onChange={e => setInput(e.target.value)}
                required
              />
              <button
                type="submit"
                className="animated-gradient-btn px-6 py-3 rounded-r-lg font-semibold text-lg"
              >
                Pulsa aquí para la demostración
              </button>
            </form>
            <div className="aspect-video w-full max-w-xl bg-gradient-to-br from-blue-800 via-purple-700 to-blue-500 rounded-lg shadow-inner flex items-center justify-center">
              {showImages ? (
                <div className="grid grid-cols-3 gap-4 p-4">
                  {demoImages.map((img, i) => (
                    <motion.img
                      key={img}
                      src={img}
                      alt={`Imagen demo ${i+1}`}
                      className="rounded-lg shadow-lg border border-white/20 w-24 h-24 object-cover"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * i, duration: 0.5 }}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-blue-100">Demo Visual Interactiva</p>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonios con animación de entrada */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
        className="py-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Testimonios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonios.map((t, i) => (
              <div key={i} className="bg-white/30 rounded-xl shadow-lg p-8 flex flex-col items-center border border-white/30">
                <img src={t.avatar} alt={t.nombre} className="w-16 h-16 rounded-full mb-4 border-2 border-white/30" />
                <p className="text-slate-200 text-lg mb-4 text-center">“{t.texto}”</p>
                <span className="font-semibold text-white">{t.nombre}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Final con animación de entrada */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
        className="py-20 relative"
      >
        <div className="absolute -top-8 left-0 w-full h-8 bg-gradient-to-b from-white/10 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-8 text-white">¿Listo para comenzar?</h2>
          <p className="text-xl mb-12 text-blue-100">Únete a miles de usuarios que ya están usando nuestro detector de imágenes</p>
          <Link 
            to="/extractor" 
            className="animated-gradient-btn inline-block px-8 py-4 rounded-lg font-semibold text-lg"
          >
            Comenzar Gratis
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

// Componente de tarjeta de características mejorado
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="p-8 rounded-xl bg-white/30 shadow-lg hover:shadow-xl transition-all border border-white/30 flex flex-col items-center"
  >
    <div className="mb-6">{icon}</div>
    <h3 className="text-2xl font-semibold mb-4 text-white text-center">{title}</h3>
    <p className="text-slate-200 text-lg text-center">{description}</p>
  </motion.div>
);

// Componente de pasos
interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
const StepCard: React.FC<StepCardProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center bg-white/30 rounded-xl shadow-lg p-8 border border-white/30">
    <div className="mb-4">{icon}</div>
    <h4 className="text-xl font-bold mb-2 text-white">{title}</h4>
    <p className="text-slate-200 text-center">{description}</p>
  </div>
);

// Componente de estadísticas
interface StatCardProps {
  number: string;
  label: string;
}
const StatCard: React.FC<StatCardProps> = ({ number, label }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const [display, setDisplay] = React.useState(0);
  React.useEffect(() => {
    if (inView) {
      let start = 0;
      const end = parseInt(number.replace(/\D/g, ''));
      if (isNaN(end)) return;
      const duration = 1200;
      const step = Math.max(1, Math.floor(end / 60));
      let startTime: number | null = null;
      function animate(ts: number) {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        setDisplay(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplay(end);
        }
      }
      requestAnimationFrame(animate);
    }
  }, [inView, number]);
  return (
    <div ref={ref} className="text-center p-6 bg-white/30 rounded-xl shadow-lg border border-white/30">
      <div className="text-4xl font-bold text-white mb-2">
        {number.includes('K') || number.includes('M')
          ? `${display}${number.replace(/\d/g, '')}`
          : display}
      </div>
      <div className="text-slate-200 text-lg">{label}</div>
    </div>
  );
};

export default HomePage; 