import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaBalanceScale, 
  FaHandshake, 
  FaExclamationTriangle, 
  FaCheckCircle 
} from 'react-icons/fa';

export const TermsPage = () => {
  const termsSections = [
    {
      icon: <FaBalanceScale className="text-primary text-4xl" />,
      title: 'Uso Aceptable',
      description: 'Snaplyzer se compromete a proporcionar una herramienta ética para la extracción de imágenes. Queda prohibido el uso de nuestra plataforma para fines ilegales o que violen derechos de autor.'
    },
    {
      icon: <FaHandshake className="text-primary text-4xl" />,
      title: 'Responsabilidad del Usuario',
      description: 'El usuario es responsable de garantizar que tiene los derechos necesarios para extraer y utilizar las imágenes. Snaplyzer no se hace responsable del uso indebido de la herramienta.'
    },
    {
      icon: <FaExclamationTriangle className="text-primary text-4xl" />,
      title: 'Limitaciones',
      description: 'No nos hacemos responsables de contenido ofensivo, ilegal o inapropiado que pueda ser extraído. Los usuarios deben actuar con responsabilidad y ética.'
    },
    {
      icon: <FaCheckCircle className="text-primary text-4xl" />,
      title: 'Derechos de Autor',
      description: 'Respetamos los derechos de autor. Si eres propietario de contenido y deseas que sea removido, contáctanos y tomaremos las medidas correspondientes.'
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
            Términos de Servicio
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Condiciones y responsabilidades para el uso de Snaplyzer
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {termsSections.map((section, index) => (
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
            Nos reservamos el derecho de modificar estos términos de servicio en cualquier momento. 
            Te recomendamos revisarlos periódicamente para estar informado.
          </p>
        </motion.div>
      </div>
    </div>
  );
}; 