/**
 * Nuevo header con logo SVG único a la izquierda y dos botones de navegación a la derecha.
 * Homepage muestra 'Hello World', Image Extractor muestra la app actual.
 */
import React, { useState, useEffect } from 'react';
import { Banner } from './components/Banner';
import { SearchForm } from './components/SearchForm';
import { ImageResults } from './components/ImageResults';
import { Footer } from './components/Footer';
import { ErrorMessage } from './components/ErrorMessage';
import { api, type ImageData } from './services/api';
import { Routes, Route } from 'react-router-dom';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import Documentation from './pages/Documentation';

interface ScanState {
  isLoading: boolean;
  error: string | null;
  images: ImageData[];
}

function ImageExtractorPage() {
  const [scanState, setScanState] = useState<ScanState>({
    isLoading: false,
    error: null,
    images: []
  });
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());

  const handleScan = async (url: string, mode: 'scan' | 'thanos' = 'scan') => {
    try {
      console.log('🔬 Iniciando escaneo:', { url, mode });
      setScanState(prev => ({ ...prev, isLoading: true, error: null }));
      const response = await api.scanImages(url, mode);
      console.log('✅ Escaneo completado:', { 
        imageCount: response.images.length,
        mode
      });
      setScanState({
        isLoading: false,
        error: null,
        images: response.images
      });
    } catch (error) {
      console.error('❌ Error en el escaneo:', error);
      setScanState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error al escanear el sitio'
      }));
    }
  };

  const handleImageSelect = (imageId: string) => {
    setSelectedImages(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(imageId)) {
        newSelection.delete(imageId);
      } else {
        newSelection.add(imageId);
      }
      return newSelection;
    });
  };

  const handleRetry = () => {
    setScanState(prev => ({ ...prev, error: null }));
  };

  return (
    <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      <div className="rounded-2xl p-0">
        <SearchForm 
          onSubmit={handleScan}
          isLoading={scanState.isLoading}
        />
      </div>
        {scanState.error ? (
        <div className="animate-fade-in">
          <ErrorMessage 
            message={scanState.error}
            onRetry={handleRetry}
          />
        </div>
        ) : (
        <div className="rounded-2xl p-0">
          <ImageResults
            images={scanState.images}
            isLoading={scanState.isLoading}
            onImageSelect={handleImageSelect}
            selectedImages={selectedImages}
          />
        </div>
        )}
      </main>
  );
}

function App() {
  useEffect(() => {
    console.log('Tailwind está funcionando correctamente 🎨');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-neutral-50 to-white">
      <Header />
      <div className="flex-1">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/extractor" element={<><Banner /><ImageExtractorPage /></>} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
