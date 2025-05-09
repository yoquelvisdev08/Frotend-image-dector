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
import Docs from './pages/Docs';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Header from './components/Header';

interface ScanState {
  isLoading: boolean;
  error: string | null;
  images: ImageData[];
}

function HomePage() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
      Hello World
        </h1>
        <p className="text-neutral-500 text-lg">
          Bienvenido a tu detector de imágenes
        </p>
      </div>
    </main>
  );
}

function ImageExtractorPage() {
  const [scanState, setScanState] = useState<ScanState>({
    isLoading: false,
    error: null,
    images: []
  });
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());

  const handleScan = async (url: string) => {
    try {
      setScanState(prev => ({ ...prev, isLoading: true, error: null }));
      const response = await api.scanImages(url);
      setScanState({
        isLoading: false,
        error: null,
        images: response.images
      });
    } catch (error) {
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
        <Route path="/docs" element={<Docs />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
