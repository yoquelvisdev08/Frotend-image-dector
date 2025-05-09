import React from 'react';
import { ImageData } from '../services/api';
import '../styles/ImageCard.css';
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
      className={`gallery-card${selected ? ' selected' : ''}`}
      onClick={onView}
      tabIndex={0}
      role="button"
      aria-label="Ver detalles de la imagen"
      style={{ cursor: 'pointer' }}
    >
      <div className="gallery-img-container">
        <img src={image.src} alt={image.alt || 'Imagen'} className="gallery-img" />
        <button 
          className="gallery-download-btn"
          onClick={(e) => {
            stopPropagation(e);
            window.open(`/api/download?url=${encodeURIComponent(image.src)}`, '_blank');
          }}
          title="Descargar"
          aria-label="Descargar imagen"
        >
          <FiDownload size={26} color="#1976d2" />
        </button>
        <button
          className={`gallery-select-btn${selected ? ' selected' : ''}`}
          onClick={e => { stopPropagation(e); onSelect(); }}
          title={selected ? 'Quitar selección' : 'Seleccionar'}
          aria-label={selected ? 'Quitar selección' : 'Seleccionar'}
          type="button"
        >
          {selected ? (
            <MdCheckCircle size={32} color="#fff" />
          ) : (
            <MdAddCircleOutline size={32} color="#1976d2" />
          )}
        </button>
      </div>
      <div className="gallery-card-footer">
        {image.alt && image.alt !== 'Imagen sin descripción' && (
          <div className="gallery-card-alt" title={image.alt}>{image.alt}</div>
        )}
        <div className="gallery-card-meta">
          {domain && <span className="gallery-card-domain">{domain}</span>}
          {image.width && image.height && image.width > 1 && image.height > 1 && (
            <span className="gallery-card-dimensions">{image.width}x{image.height}px</span>
          )}
        </div>
      </div>
    </div>
  );
}; 