import React, { useState } from 'react';
import { ImageResults } from './ImageResults';
import { SearchForm } from './SearchForm';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { api, ImageData } from '../services/api';
import '../styles/ImageScanner.css';

export const ImageScanner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ImageData[]>([]);
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [scanMode, setScanMode] = useState<'scan' | 'thanos'>('scan');

  const handleScan = async (url: string, mode: 'scan' | 'thanos') => {
    try {
      setIsLoading(true);
      setError(null);
      setSelectedImages(new Set());
      
      // Usar el método de escaneo basado en el modo seleccionado
      const data = await api.scanImages(url, mode);
      
      setResults(data.images || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al escanear el sitio');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelect = (imageId: string) => {
    const newSelectedImages = new Set(selectedImages);
    if (newSelectedImages.has(imageId)) {
      newSelectedImages.delete(imageId);
    } else {
      newSelectedImages.add(imageId);
    }
    setSelectedImages(newSelectedImages);
  };

  return (
    <div className="scanner-container">
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-grow flex items-center space-x-4">
          <div className="flex-grow">
            <SearchForm 
              onSubmit={handleScan} 
              isLoading={isLoading}
            />
          </div>
          <div>
            <select 
              value={scanMode}
              onChange={(e) => setScanMode(e.target.value as 'scan' | 'thanos')}
              className="border rounded px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="scan">Escaneo Simple</option>
              <option value="thanos">Escaneo Avanzado</option>
            </select>
          </div>
        </div>
      </div>
      
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {results.length > 0 && (
        <ImageResults 
          images={results} 
          isLoading={isLoading} 
          onImageSelect={handleImageSelect}
          selectedImages={selectedImages}
        />
      )}
    </div>
  );
}; 