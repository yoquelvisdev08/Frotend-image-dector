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

  return (
    <div
      className={`gallery-card${selected ? ' selected' : ''}`}
      onClick={onView}
      tabIndex={0}
      role="button"
      aria-label="Ver detalles de la imagen"
      style={{ cursor: 'pointer' }}
    >
      <img src={image.src} alt={image.alt || 'Imagen'} className="gallery-img" />
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
      <a
        className="gallery-download-btn"
        title="Descargar"
        href={image.src}
        download
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Descargar imagen"
        onClick={stopPropagation}
      >
        <FiDownload size={22} />
      </a>
    </div>
  );
}; 