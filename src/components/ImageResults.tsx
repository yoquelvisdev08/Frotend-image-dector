import React, { useState } from 'react';
import { ImageCard } from './ImageCard';
import { ImageModal } from './ImageModal';
import '../styles/ImageResults.css';
import { EmptyState } from './EmptyState';
import { LoadingSpinner } from './LoadingSpinner';
import { ImageData } from '../services/api';

interface ImageResultsProps {
  images: ImageData[];
  isLoading: boolean;
  onImageSelect: (imageId: string) => void;
  selectedImages: Set<string>;
}

const PAGE_SIZE = 30;

export const ImageResults = ({ images, isLoading, onImageSelect, selectedImages }: ImageResultsProps) => {
  const [modalImage, setModalImage] = useState<ImageData | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const toggleImageSelection = (imageId: string) => {
    const newSelection = new Set(selectedImages);
    if (newSelection.has(imageId)) {
      newSelection.delete(imageId);
    } else {
      newSelection.add(imageId);
    }
    onImageSelect(imageId);
  };

  const handleDownloadSelected = async () => {
    const selectedImagesArray = images.filter(img => selectedImages.has(img.id));
    // Implementar lógica de descarga
  };

  if (isLoading) {
    return <LoadingSpinner message="Buscando imágenes..." />;
  }

  if (images.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="gallery-bg">
      <div className="images-grid">
        {images.slice(0, visibleCount).map(image => (
          <ImageCard
            key={image.id}
            image={image}
            selected={selectedImages.has(image.id)}
            onSelect={() => toggleImageSelection(image.id)}
            onView={() => setModalImage(image)}
          />
        ))}
      </div>
      {visibleCount < images.length && (
        <div className="see-more-container">
          <button className="see-more-btn" onClick={() => setVisibleCount(visibleCount + PAGE_SIZE)}>
            Ver más
          </button>
        </div>
      )}
      {modalImage && (
        <ImageModal
          image={modalImage}
          onClose={() => setModalImage(null)}
        />
      )}
    </div>
  );
}; 