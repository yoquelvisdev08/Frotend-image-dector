import React, { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
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
  const [copied, setCopied] = useState(false);
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
              <a href={image.src} target="_blank" rel="noopener noreferrer" className="modal-action-btn primary">Abrir en nueva pestaña</a>
              <a href={`/api/download?url=${encodeURIComponent(image.src)}`} className="modal-action-btn success" download>Descargar</a>
              <button className={`modal-action-btn copy${copied ? ' copied' : ''}`} onClick={handleCopy}>
                <FiCopy style={{marginRight: 8, verticalAlign: 'middle'}} />
                Copiar URL
              </button>
              {copied && <span className="copy-feedback">¡URL copiada!</span>}
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