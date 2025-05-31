import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaBook, 
  FaCode, 
  FaCloudDownloadAlt, 
  FaQuestionCircle, 
  FaShieldAlt 
} from 'react-icons/fa';

const Documentation: React.FC = () => {
  const sections = [
    {
      title: 'Introducción',
      description: 'Snaplyzer Extractor es una herramienta avanzada para extraer imágenes de cualquier sitio web de manera rápida y segura.',
      icon: <FaBook className="text-4xl text-primary" />
    },
    {
      title: 'Cómo Funciona',
      description: 'Simplemente introduce la URL de un sitio web y selecciona el modo de escaneo. Nuestra tecnología de IA encontrará todas las imágenes disponibles.',
      icon: <FaCode className="text-4xl text-primary" />
    },
    {
      title: 'Modos de Escaneo',
      description: 'Ofrecemos dos modos: Simple (escaneo rápido) y Avanzado (búsqueda profunda con IA para encontrar imágenes ocultas).',
      icon: <FaCloudDownloadAlt className="text-4xl text-primary" />
    }
  ];

  const faqs = [
    {
      question: '¿Es legal usar Snaplyzer?',
      answer: 'Snaplyzer solo extrae imágenes de sitios web públicos. Es responsabilidad del usuario verificar los derechos de uso de las imágenes.',
      icon: <FaQuestionCircle className="text-2xl text-primary" />
    },
    {
      question: '¿Cómo protegen mi privacidad?',
      answer: 'No almacenamos URLs ni imágenes. Todo el procesamiento es temporal y seguro. Respetamos tu privacidad.',
      icon: <FaShieldAlt className="text-2xl text-primary" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Documentación de <span className="text-primary">Snaplyzer</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Guía completa para aprovechar al máximo nuestra herramienta de extracción de imágenes
          </p>
        </motion.div>

        {/* Secciones principales */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex justify-center mb-6">
                {section.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {section.title}
              </h3>
              <p className="text-gray-600">
                {section.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Preguntas Frecuentes */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Preguntas Frecuentes
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-neutral-50 rounded-xl p-6 flex items-start space-x-4"
              >
                <div className="mt-1">
                  {faq.icon}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h4>
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Documentation; 