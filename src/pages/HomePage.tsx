import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaRocket, 
  FaImage, 
  FaDownload, 
  FaSearch, 
  FaRobot, 
  FaCloudDownloadAlt,
  FaCode,
  FaShieldAlt,
  FaChartLine,
  FaDatabase,
  FaMagic,
  FaTools
} from 'react-icons/fa';
import './HomePage.css';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <FaSearch className="text-5xl text-primary-light" />,
      title: 'Búsqueda Inteligente',
      description: 'Extrae imágenes de cualquier sitio web con un solo clic',
    },
    {
      icon: <FaRobot className="text-5xl text-primary-light" />,
      title: 'Escaneo Avanzado',
      description: 'Usa inteligencia artificial para encontrar las mejores imágenes',
    },
    {
      icon: <FaDownload className="text-5xl text-primary-light" />,
      title: 'Descarga Fácil',
      description: 'Descarga todas las imágenes en un solo paquete ZIP',
    }
  ];

  const advancedFeatures = [
    {
      icon: <FaCode className="text-4xl text-primary" />,
      title: 'API Potente',
      description: 'Integra nuestra tecnología en tus propios proyectos con nuestra API REST'
    },
    {
      icon: <FaShieldAlt className="text-4xl text-primary" />,
      title: 'Seguridad',
      description: 'Protección de datos y escaneo seguro de sitios web'
    },
    {
      icon: <FaChartLine className="text-4xl text-primary" />,
      title: 'Análisis Avanzado',
      description: 'Obtén estadísticas detalladas sobre las imágenes extraídas'
    },
    {
      icon: <FaDatabase className="text-4xl text-primary" />,
      title: 'Almacenamiento',
      description: 'Guarda y gestiona tus colecciones de imágenes'
    },
    {
      icon: <FaMagic className="text-4xl text-primary" />,
      title: 'Filtrado Inteligente',
      description: 'Filtra imágenes por tamaño, tipo y calidad'
    },
    {
      icon: <FaTools className="text-4xl text-primary" />,
      title: 'Personalización',
      description: 'Configura el extractor según tus necesidades específicas'
    }
  ];

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          className="text-center"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight"
          >
            Snaplyzer <span className="text-primary">Extractor</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12"
          >
            La herramienta definitiva para descubrir, extraer y gestionar imágenes de cualquier sitio web con inteligencia artificial de última generación
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16"
          >
            <Link 
              to="/extractor" 
              className="px-10 py-4 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors flex items-center justify-center space-x-2"
            >
              <FaRocket />
              <span>Comenzar Ahora</span>
            </Link>
            <Link 
              to="/docs" 
              className="px-10 py-4 border border-primary text-primary rounded-full hover:bg-primary/10 transition-colors flex items-center justify-center space-x-2"
            >
              <FaCloudDownloadAlt />
              <span>Documentación</span>
            </Link>
          </motion.div>

          {/* Características Principales */}
          <motion.div 
            variants={itemVariants}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-24"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Características Avanzadas */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-12">
              Características Avanzadas
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {advancedFeatures.map((feature, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl"
                >
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Llamada a la Acción Final */}
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl p-12 max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6 text-center">
              Transforma tu Flujo de Trabajo
            </h2>
            <p className="text-xl text-center mb-8">
              Descubre el poder de Snaplyzer Extractor y lleva tu gestión de imágenes al siguiente nivel
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                to="/extractor" 
                className="px-10 py-4 bg-white text-primary rounded-full hover:bg-neutral-100 transition-colors flex items-center space-x-2"
              >
                <FaRocket />
                <span>Prueba Gratis</span>
              </Link>
              <Link 
                to="/pricing" 
                className="px-10 py-4 border border-white text-white rounded-full hover:bg-white/20 transition-colors flex items-center space-x-2"
              >
                <FaTools />
                <span>Planes</span>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage; 