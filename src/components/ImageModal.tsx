import React, { useState } from 'react';
import { FiCopy, FiX, FiDownload, FiExternalLink } from 'react-icons/fi';

interface ImageModalProps {
  image: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    top?: number;
    selected?: boolean;
  };
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrResult, setOcrResult] = useState<any>(null);
  const [ocrError, setOcrError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('spa');

  const domain = (() => {
    try {
      const u = new URL(image.src);
      return u.hostname.replace(/^www\./, '');
    } catch {
      return '';
    }
  })();

  const handleCopy = () => {
    navigator.clipboard.writeText(image.src);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleOcr = async () => {
    setOcrLoading(true);
    setOcrError(null);
    setOcrResult(null);
    try {
      const res = await fetch('/api/ocr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          imageUrl: image.src,
          language: selectedLanguage 
        })
      });
      const data = await res.json();
      if (data.success) {
        setOcrResult(data);
      } else {
        setOcrError(data.error || 'Error al obtener el texto');
      }
    } catch (err) {
      setOcrError('Error de red o del servidor');
    } finally {
      setOcrLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative bg-white border border-neutral-200 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex-1 bg-neutral-50 flex items-center justify-center p-6 min-w-[200px]">
          <img 
            src={image.src} 
            alt={image.alt || 'Imagen'} 
            className="max-w-full max-h-[70vh] object-contain rounded-2xl border border-neutral-200 bg-white"
          />
        </div>
        <div className="flex-1 p-8 flex flex-col min-w-[260px] max-w-md relative overflow-y-auto">
          <button 
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-2xl text-neutral-400 hover:text-primary bg-white rounded-full transition-colors z-20 border border-neutral-200"
            onClick={onClose} 
            aria-label="Cerrar"
          >
            <FiX />
          </button>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            {image.alt || 'Imagen sin descripción'}
          </h2>
          <div className="flex items-center gap-3 text-sm text-neutral-500 mb-2">
            {domain && (
              <span className="truncate max-w-[200px]" title={domain}>
                {domain}
              </span>
            )}
              {image.width && image.height && image.width > 1 && image.height > 1 && (
              <span className="whitespace-nowrap bg-neutral-100 rounded px-2 py-0.5 text-xs font-medium">
                {image.width}x{image.height}px
              </span>
            )}
          </div>
          <div className="text-xs text-neutral-400 mb-4">
            {typeof image.top === 'number' && <span>Posición vertical: {image.top}px</span>}
            {typeof image.selected === 'boolean' && (
              <span className="ml-2">{image.selected ? 'Seleccionada' : 'No seleccionada'}</span>
              )}
            </div>
          <div className="flex flex-wrap gap-3 mb-4">
            <a 
              href={image.src} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors flex items-center gap-2"
            >
              <FiExternalLink />
              Abrir imagen
            </a>
            <a 
              href={`/api/download?url=${encodeURIComponent(image.src)}`} 
              className="px-4 py-2 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors flex items-center gap-2"
              download
            >
              <FiDownload />
              Descargar
            </a>
            <button 
              className={`px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition-colors border border-neutral-200 ${
                copied 
                  ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
              onClick={handleCopy}
            >
              <FiCopy />
                Copiar URL
              </button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Idioma para OCR:
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-xl text-base transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="spa">Español</option>
              <option value="eng">Inglés</option>
              <option value="fra">Francés</option>
              <option value="deu">Alemán</option>
              <option value="ita">Italiano</option>
              <option value="por">Portugués</option>
            </select>
          </div>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            onClick={handleOcr}
            disabled={ocrLoading}
          >
            {ocrLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Procesando...
              </>
            ) : (
              'Extraer texto'
            )}
          </button>
          {ocrLoading && (
            <div className="mt-4 text-sm text-neutral-500">
              <p className="mb-2">Procesando la imagen...</p>
              <ul className="list-disc ml-5 text-xs">
                <li>Descargando y comprimiendo la imagen</li>
                <li>Enviando a OCR.space</li>
                <li>Procesando el resultado</li>
              </ul>
            </div>
          )}
          {ocrError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              <p className="font-semibold mb-1">Error al procesar la imagen:</p>
              <p>{ocrError}</p>
            </div>
          )}
          {ocrResult && (
            <div className="mt-4 bg-neutral-50 rounded-xl p-4 text-sm text-neutral-800 max-h-60 overflow-y-auto border border-neutral-200">
              <div className="mb-3 font-bold text-indigo-700 flex items-center justify-between">
                <span>Texto extraído:</span>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 bg-white hover:bg-neutral-100 rounded-lg text-xs font-semibold text-neutral-700 border border-neutral-300 transition-colors flex items-center gap-1"
                    onClick={() => {
                      navigator.clipboard.writeText(ocrResult.text || '');
                    }}
                  >
                    <FiCopy className="text-xs" />
                    Copiar
                  </button>
                  <button
                    className="px-3 py-1 bg-white hover:bg-neutral-100 rounded-lg text-xs font-semibold text-neutral-700 border border-neutral-300 transition-colors flex items-center gap-1"
                    onClick={() => {
                      const blob = new Blob([ocrResult.text || ''], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'texto-extraido.txt';
                      document.body.appendChild(a);
                      a.click();
                      setTimeout(() => {
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                      }, 100);
                    }}
                  >
                    <FiDownload className="text-xs" />
                    TXT
                  </button>
                </div>
              </div>
              <div className="whitespace-pre-line mb-3 p-3 bg-white rounded-lg border border-neutral-200">
                {ocrResult.text}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div className="bg-white p-2 rounded-lg border border-neutral-200">
                  <span className="font-semibold text-neutral-600">Idioma:</span>
                  <span className="ml-1">{ocrResult.language}</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-neutral-200">
                  <span className="font-semibold text-neutral-600">Confianza:</span>
                  <span className="ml-1">{ocrResult.confidence}%</span>
                </div>
              </div>
              <div className="mb-3">
                <p className="font-semibold text-neutral-600 mb-2">Líneas detectadas:</p>
                <ul className="list-disc ml-5 space-y-1">
                  {ocrResult.lines && ocrResult.lines.map((line: string, idx: number) => (
                    <li key={idx} className="text-xs">{line}</li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-white p-2 rounded-lg border border-neutral-200 text-center">
                  <span className="font-semibold text-neutral-600">Líneas</span>
                  <p className="text-lg font-bold text-primary">{ocrResult.stats?.lineCount}</p>
                </div>
                <div className="bg-white p-2 rounded-lg border border-neutral-200 text-center">
                  <span className="font-semibold text-neutral-600">Palabras</span>
                  <p className="text-lg font-bold text-primary">{ocrResult.stats?.wordCount}</p>
                </div>
                <div className="bg-white p-2 rounded-lg border border-neutral-200 text-center">
                  <span className="font-semibold text-neutral-600">Caracteres</span>
                  <p className="text-lg font-bold text-primary">{ocrResult.stats?.characterCount}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 