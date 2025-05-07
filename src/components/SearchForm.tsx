import React, { useState } from 'react';
import '../styles/SearchForm.css';

interface SearchFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export const SearchForm = ({ onSubmit, isLoading }: SearchFormProps) => {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(true);

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
      onSubmit(url.trim());
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    if (value) setIsValid(validateUrl(value));
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <div className="url-field">
            <span className="protocol-prefix">https://</span>
            <input
              type="url"
              value={url}
              onChange={handleUrlChange}
              placeholder="https://example.com"
              required
              className={!isValid ? 'invalid' : ''}
            />
            {!isValid && <span className="error-message">URL inválida</span>}
          </div>
          <button 
            type="submit" 
            className="scan-button"
            disabled={isLoading || !url || !isValid}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                <span>Escaneando...</span>
              </>
            ) : (
              <>
                <span className="icon">🔍</span>
                <span>Buscar Imágenes</span>
              </>
            )}
          </button>
        </div>
      </form>
      <div className="popular-sites">
        <span>Sitios populares:</span>
        <button onClick={() => setUrl('unsplash.com')}>unsplash.com</button>
        <button onClick={() => setUrl('pexels.com')}>pexels.com</button>
        <button onClick={() => setUrl('pixabay.com')}>pixabay.com</button>
      </div>
    </div>
  );
}; 