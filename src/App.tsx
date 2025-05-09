/**
 * Nuevo header con logo SVG único a la izquierda y dos botones de navegación a la derecha.
 * Homepage muestra 'Hello World', Image Extractor muestra la app actual.
 */
import React, { useState } from 'react';
import { Banner } from './components/Banner';
import { SearchForm } from './components/SearchForm';
import { ImageResults } from './components/ImageResults';
import { Footer } from './components/Footer';
import { ErrorMessage } from './components/ErrorMessage';
import { api, type ImageData } from './services/api';
import './styles/App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
    <main className="main-content" style={{minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700}}>
      Hello World
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
      <main className="main-content">
        <SearchForm 
          onSubmit={handleScan}
          isLoading={scanState.isLoading}
        />
        {scanState.error ? (
          <ErrorMessage 
            message={scanState.error}
            onRetry={handleRetry}
          />
        ) : (
          <ImageResults
            images={scanState.images}
            isLoading={scanState.isLoading}
            onImageSelect={handleImageSelect}
            selectedImages={selectedImages}
          />
        )}
      </main>
  );
}

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/extractor" element={<><Banner /><ImageExtractorPage /></>} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
