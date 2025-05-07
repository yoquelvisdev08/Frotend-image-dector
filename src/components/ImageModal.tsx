import React from 'react';
import { ImageData } from '../services/api';
import '../styles/ImageModal.css';

interface ImageModalProps {
  image: ImageData;
  onClose: () => void;
}

export const ImageModal = ({ image, onClose }: ImageModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="modal-image-container">
          <img 
            src={image.src} 
            alt={image.alt}
            className="modal-image"
          />
        </div>
        <div className="modal-info">
          <h3>Información de la imagen</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Dimensiones:</span>
              <span className="value">{image.width} x {image.height}</span>
            </div>
            <div className="info-item">
              <span className="label">Texto alternativo:</span>
              <span className="value">{image.alt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 