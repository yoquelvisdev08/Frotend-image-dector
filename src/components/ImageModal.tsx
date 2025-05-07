import React from 'react';
import './ImageModal.css';

interface ImageModalProps {
  image: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  const domain = (() => {
    try {
      const u = new URL(image.src);
      return u.hostname.replace(/^www\./, '');
    } catch {
      return '';
    }
  })();

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Cerrar">×</button>
        <div className="modal-content">
          <div className="modal-info">
            <h2 className="modal-alt">{image.alt || 'Sin descripción'}</h2>
            <div className="modal-meta">
              {domain && <span className="modal-domain">{domain}</span>}
              {image.width && image.height && image.width > 1 && image.height > 1 && (
                <span className="modal-dimensions">{image.width}x{image.height}px</span>
              )}
            </div>
            <div className="modal-actions">
              <a href={image.src} target="_blank" rel="noopener noreferrer" className="modal-action-btn">Abrir en nueva pestaña</a>
              <a href={`/api/download?url=${encodeURIComponent(image.src)}`} className="modal-action-btn" download>Descargar</a>
              <button className="modal-action-btn" onClick={() => {navigator.clipboard.writeText(image.src)}}>Copiar URL</button>
            </div>
          </div>
          <div className="modal-image-container">
            <img src={image.src} alt={image.alt || 'Imagen'} className="modal-image" />
          </div>
        </div>
      </div>
    </div>
  );
}; 