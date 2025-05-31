import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCheck, 
  FaTimes, 
  FaRocket, 
  FaShieldAlt, 
  FaCloudDownloadAlt 
} from 'react-icons/fa';

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Básico',
      price: {
        monthly: 9.99,
        annual: 99.99
      },
      features: [
        'Hasta 100 escaneos al mes',
        'Extracción básica de imágenes',
        'Soporte por correo electrónico',
        'Almacenamiento de 5GB'
      ],
      recommended: false,
      icon: <FaCloudDownloadAlt className="text-4xl text-primary" />
    },
    {
      name: 'Pro',
      price: {
        monthly: 29.99,
        annual: 299.99
      },
      features: [
        'Hasta 1000 escaneos al mes',
        'Extracción avanzada con IA',
        'Soporte prioritario',
        'Almacenamiento de 50GB',
        'API ilimitada',
        'Filtrado inteligente'
      ],
      recommended: true,
      icon: <FaRocket className="text-4xl text-white" />
    },
    {
      name: 'Enterprise',
      price: {
        monthly: 99.99,
        annual: 999.99
      },
      features: [
        'Escaneos ilimitados',
        'Extracción personalizada',
        'Soporte dedicado 24/7',
        'Almacenamiento ilimitado',
        'API empresarial',
        'Informes detallados',
        'Seguridad avanzada'
      ],
      recommended: false,
      icon: <FaShieldAlt className="text-4xl text-primary" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Planes de <span className="text-primary">Snaplyzer</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades de extracción de imágenes
          </p>

          {/* Selector de ciclo de facturación */}
          <div className="flex justify-center mt-8">
            <div className="bg-white rounded-full p-1 flex items-center shadow-md">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  billingCycle === 'monthly' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 hover:bg-neutral-100'
                }`}
              >
                Mensual
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  billingCycle === 'annual' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 hover:bg-neutral-100'
                }`}
              >
                Anual
                <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                  -20%
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tarjetas de Precios */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 ${
                plan.recommended 
                  ? 'scale-105 border-4 border-primary' 
                  : 'hover:scale-105 hover:shadow-2xl'
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                  {plan.icon}
                  <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
                </div>
                {plan.recommended && (
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-xs">
                    Más Popular
                  </span>
                )}
              </div>

              <div className="text-center mb-8">
                <p className="text-4xl font-extrabold text-primary">
                  ${plan.price[billingCycle].toFixed(2)}
                  <span className="text-base text-gray-600">
                    {billingCycle === 'monthly' ? ' /mes' : ' /año'}
                  </span>
                </p>
                <p className="text-gray-500 mt-2">
                  {billingCycle === 'annual' ? 'Facturación anual' : 'Facturación mensual'}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <FaCheck className="text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-4 rounded-full font-semibold transition-all duration-300 ${
                  plan.recommended
                    ? 'bg-primary text-white hover:bg-primary-dark'
                    : 'bg-neutral-100 text-gray-900 hover:bg-neutral-200'
                }`}
              >
                Comenzar
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage; 