import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaRobot, 
  FaLink, 
  FaExclamationCircle, 
  FaCheckCircle 
} from 'react-icons/fa';

interface SearchFormProps {
  onSubmit: (url: string, mode: 'scan' | 'thanos') => void;
  isLoading: boolean;
}

export const SearchForm = ({ onSubmit, isLoading }: SearchFormProps) => {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [scanMode, setScanMode] = useState<'scan' | 'thanos'>('scan');
  const [showModeTooltip, setShowModeTooltip] = useState(false);
  const urlInputRef = useRef<HTMLInputElement>(null);

  const validateUrl = (value: string): boolean => {
    try {
      new URL(value.startsWith('http') ? value : `https://${value}`);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      console.log('🔍 Iniciando búsqueda:', {
        url: url.trim(),
        mode: scanMode
      });
      onSubmit(url.trim(), scanMode);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    if (value) setIsValid(validateUrl(value));
  };

  const handleQuickSiteSelect = (site: string) => {
    setUrl(site);
    setIsValid(true);
    urlInputRef.current?.focus();
  };

  const scanModeInfo = {
    scan: {
      title: 'Escaneo Simple',
      description: 'Búsqueda rápida de imágenes visibles en la página principal.',
      icon: <FaLink className="text-primary" />
    },
    thanos: {
      title: 'Escaneo Avanzado',
      description: 'Búsqueda profunda con inteligencia artificial, detecta imágenes ocultas.',
      icon: <FaRobot className="text-primary" />
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl px-10 py-12 flex flex-col items-center justify-center -mt-20 z-20 relative shadow-2xl">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col sm:flex-row gap-6 relative">
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400">
              <FaLink />
            </div>
            <input
              ref={urlInputRef}
              type="url"
              value={url}
              onChange={handleUrlChange}
              placeholder="Introduce la URL del sitio web"
              required
              className={`w-full pl-12 pr-5 py-4 rounded-2xl bg-neutral-50 shadow-sm focus:shadow-lg text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 border-none ${
                !isValid && url ? 'ring-2 ring-accent-error' : ''
              }`}
            />
            {!isValid && url && (
              <div className="absolute -bottom-7 left-0 flex items-center text-sm text-accent-error animate-shake">
                <FaExclamationCircle className="mr-2" />
                URL inválida
              </div>
            )}
            {isValid && url && (
              <div className="absolute -bottom-7 left-0 flex items-center text-sm text-green-600">
                <FaCheckCircle className="mr-2" />
                URL válida
              </div>
            )}
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative w-52">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {scanModeInfo[scanMode].icon}
              </div>
              <select
                value={scanMode}
                onChange={(e) => setScanMode(e.target.value as 'scan' | 'thanos')}
                onMouseEnter={() => setShowModeTooltip(true)}
                onMouseLeave={() => setShowModeTooltip(false)}
                className="appearance-none w-full pl-10 pr-8 py-4 rounded-xl border-2 border-neutral-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer text-base"
              >
                <option value="scan">Simple</option>
                <option value="thanos">Avanzado</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <button 
              type="submit" 
              disabled={isLoading || !url || !isValid}
              className={`px-10 py-4 rounded-2xl font-semibold text-white text-lg transition-all duration-200 flex items-center justify-center gap-3 min-w-[220px] shadow-lg bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary focus:outline-none focus:ring-2 focus:ring-primary/30 active:scale-95 ${
                isLoading || !url || !isValid
                  ? 'opacity-60 cursor-not-allowed'
                  : 'hover:shadow-xl'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Escaneando...</span>
                </>
              ) : (
                <>
                  <FaSearch className="text-xl" />
                  <span>Buscar Imágenes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
      <AnimatePresence>
        {showModeTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-10 top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-xl p-4 w-64 text-center"
          >
            <h4 className="font-bold text-lg mb-2">{scanModeInfo[scanMode].title}</h4>
            <p className="text-sm text-neutral-600">{scanModeInfo[scanMode].description}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-neutral-400 text-sm w-full">
        <span className="mr-2 text-neutral-600 font-medium">Sitios populares:</span>
        {['https://unsplash.com', 'https://pexels.com', 'https://pixabay.com'].map((site) => (
          <button 
            key={site}
            onClick={() => handleQuickSiteSelect(site)}
            className="px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 text-neutral-600 border border-neutral-200 text-xs font-medium shadow-sm flex items-center gap-2"
          >
            <FaLink className="text-neutral-400" />
            {site.replace('https://', '')}
          </button>
        ))}
      </div>
    </div>
  );
}; 