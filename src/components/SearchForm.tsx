import React, { useState } from 'react';

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
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl px-8 py-10 flex flex-col items-center justify-center -mt-20 z-20 relative">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="url"
              value={url}
              onChange={handleUrlChange}
              placeholder="https://example.com"
              required
              className={`w-full px-5 py-4 rounded-2xl bg-neutral-50 shadow focus:shadow-lg text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 border-none ${
                !isValid ? 'ring-2 ring-accent-error' : ''
              }`}
            />
            {!isValid && (
              <span className="absolute -bottom-6 left-0 text-sm text-accent-error animate-shake">
                URL inválida
              </span>
            )}
          </div>
          <button 
            type="submit" 
            disabled={isLoading || !url || !isValid}
            className={`px-8 py-4 rounded-2xl font-semibold text-white text-lg transition-all duration-200 flex items-center justify-center gap-2 min-w-[170px] shadow bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary focus:outline-none focus:ring-2 focus:ring-primary/30 active:scale-95 ${
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
                <span className="text-lg">🔍</span>
                <span>Buscar Imágenes</span>
              </>
            )}
          </button>
        </div>
      </form>
      <div className="mt-7 flex flex-wrap items-center gap-2 text-neutral-400 text-sm w-full">
        <span className="mr-2">Sitios populares:</span>
        {['https://unsplash.com', 'https://pexels.com', 'https://pixabay.com'].map((site) => (
          <button 
            key={site}
            onClick={() => setUrl(site)}
            className="px-3 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 text-neutral-600 border border-neutral-200 text-xs font-medium shadow-sm"
          >
            {site}
          </button>
        ))}
      </div>
    </div>
  );
}; 