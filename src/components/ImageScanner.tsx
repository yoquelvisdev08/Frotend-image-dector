import React, { useState } from 'react';
import { ImageResults } from './ImageResults';
import { SearchForm } from './SearchForm';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { scanWebsite } from '../services/api';
import '../styles/ImageScanner.css';

export const ImageScanner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [scanId, setScanId] = useState<string | null>(null);

  const handleScan = async (url: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await scanWebsite(url);
      setResults(data.images || []);
      setScanId(data.scanId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al escanear el sitio');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="scanner-container">
      <SearchForm onSubmit={handleScan} disabled={isLoading} />
      
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {results.length > 0 && <ImageResults images={results} scanId={scanId} />}
    </div>
  );
}; 