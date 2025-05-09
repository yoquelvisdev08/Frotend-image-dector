import React from 'react';
import { ImageData } from '../services/api';
import { MdCheckCircle, MdAddCircleOutline } from 'react-icons/md';
import { FiDownload } from 'react-icons/fi';

interface ImageCardProps {
  image: ImageData;
  selected: boolean;
  onSelect: () => void;
  onView: () => void;
}

export const ImageCard = ({ image, selected, onSelect, onView }: ImageCardProps) => {
  // Favicon del dominio (opcional, no se usa en este diseño)
  // const favicon = ...

  // Evitar que el click en el selector o el botón de descarga abra el modal
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  const domain = (() => {
    try {
      const u = new URL(image.src);
      return u.hostname.replace(/^www\./, '');
    } catch {
      return '';
    }
  })();

  return (
    <div 
      className={`group relative bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md ${
        selected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onView}
      tabIndex={0}
      role="button"
      aria-label="Ver detalles de la imagen"
    >
      <div className="relative aspect-square">
        <img 
          src={image.src} 
          alt={image.alt || 'Imagen'} 
          className="w-full h-full object-cover"
        />
        <button 
          className="absolute top-2 right-2 p-2 bg-white/90 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
          onClick={(e) => {
            stopPropagation(e);
            window.open(`/api/download?url=${encodeURIComponent(image.src)}`, '_blank');
          }}
          title="Descargar"
          aria-label="Descargar imagen"
        >
          <FiDownload size={20} className="text-primary" />
        </button>
        <button
          className={`absolute top-2 left-2 p-1 rounded-full transition-all duration-200 ${
            selected 
              ? 'bg-primary text-white' 
              : 'bg-white/90 text-primary hover:bg-white'
          }`}
          onClick={e => { stopPropagation(e); onSelect(); }}
          title={selected ? 'Quitar selección' : 'Seleccionar'}
          aria-label={selected ? 'Quitar selección' : 'Seleccionar'}
          type="button"
        >
          {selected ? (
            <MdCheckCircle size={24} />
          ) : (
            <MdAddCircleOutline size={24} />
          )}
        </button>
      </div>
      <div className="p-3">
        {image.alt && image.alt !== 'Imagen sin descripción' && (
          <div 
            className="text-sm text-neutral-700 line-clamp-2 mb-2" 
            title={image.alt}
          >
            {image.alt}
          </div>
        )}
        <div className="flex items-center justify-between text-xs text-neutral-500">
          {domain && (
            <span className="truncate max-w-[60%]" title={domain}>
              {domain}
            </span>
          )}
          {image.width && image.height && image.width > 1 && image.height > 1 && (
            <span className="ml-2 whitespace-nowrap">
              {image.width}x{image.height}px
            </span>
          )}
        </div>
      </div>
    </div>
  );
}; 