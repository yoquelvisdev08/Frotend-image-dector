import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaLock, FaUserSecret, FaClipboardCheck } from 'react-icons/fa';

const PrivacyPage = () => {
  const privacySections = [
    {
      icon: <FaShieldAlt className="text-primary text-4xl" />,
      title: 'Protección de Datos',
      description: 'En Snaplyzer, tu privacidad es nuestra prioridad. Nos comprometemos a proteger tu información personal con los más altos estándares de seguridad.'
    },
    {
      icon: <FaLock className="text-primary text-4xl" />,
      title: 'Recopilación de Información',
      description: 'Solo recopilamos la información estrictamente necesaria para proporcionar nuestro servicio de extracción de imágenes. No almacenamos URLs ni imágenes de forma permanente.'
    },
    {
      icon: <FaUserSecret className="text-primary text-4xl" />,
      title: 'Anonimato y Confidencialidad',
      description: 'Tus búsquedas son completamente anónimas. No vinculamos ninguna búsqueda a una identidad específica y no compartimos información con terceros.'
    },
    {
      icon: <FaClipboardCheck className="text-primary text-4xl" />,
      title: 'Consentimiento y Control',
      description: 'Tienes control total sobre tus datos. Puedes solicitar la eliminación de cualquier información en cualquier momento contactándonos.'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">
            Política de Privacidad
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Transparencia, seguridad y respeto por tu información personal
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {privacySections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {section.icon}
                <h3 className="ml-4 text-xl font-bold text-neutral-800">
                  {section.title}
                </h3>
              </div>
              <p className="text-neutral-600">
                {section.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 bg-primary/10 rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-primary mb-4">
            Última Actualización: {new Date().toLocaleDateString()}
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. 
            Te recomendamos revisarla periódicamente para estar informado.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPage; 