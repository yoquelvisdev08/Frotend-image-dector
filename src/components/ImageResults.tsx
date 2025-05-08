import React, { useState } from 'react';
import { ImageCard } from './ImageCard';
import { ImageModal } from './ImageModal';
import '../styles/ImageResults.css';
import { EmptyState } from './EmptyState';
import { LoadingSpinner } from './LoadingSpinner';
import { ImageData } from '../services/api';
import JSZip from 'jszip';

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
  const [downloading, setDownloading] = useState(false);
  const [allSelected, setAllSelected] = useState(false);

  const toggleImageSelection = (imageId: string) => {
    const newSelection = new Set(selectedImages);
    if (newSelection.has(imageId)) {
      newSelection.delete(imageId);
    } else {
      newSelection.add(imageId);
    }
    onImageSelect(imageId);
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      images.forEach(img => onImageSelect(img.id)); // Deselecciona todas
      setAllSelected(false);
    } else {
      images.forEach(img => {
        if (!selectedImages.has(img.id)) onImageSelect(img.id);
      });
      setAllSelected(true);
    }
  };

  const handleDownloadSelected = async () => {
    const selectedImagesArray = images.filter(img => selectedImages.has(img.id));
    if (selectedImagesArray.length === 0) return;
    setDownloading(true);
    try {
      if (selectedImagesArray.length === 1) {
        // Descargar una sola imagen usando el endpoint backend
        const url = `/api/download?url=${encodeURIComponent(selectedImagesArray[0].src)}`;
        window.open(url, '_blank');
      } else {
        // Descargar varias como ZIP
        const zip = new JSZip();
        const domain = (() => {
          try {
            const u = new URL(selectedImagesArray[0].src);
            return u.hostname.replace(/^www\./, '');
          } catch {
            return 'imagenes';
          }
        })();
        await Promise.all(selectedImagesArray.map(async (img, i) => {
          const response = await fetch(`/api/download?url=${encodeURIComponent(img.src)}`);
          if (!response.ok) return;
          const blob = await response.blob();
          let ext = '';
          try {
            ext = img.src.split('.').pop()?.split('?')[0] || 'jpg';
            if (ext.length > 5) ext = 'jpg';
          } catch { ext = 'jpg'; }
          zip.file(`imagen_${i + 1}.${ext}`, blob);
        }));
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(zipBlob);
        a.download = `${domain}.zip`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          URL.revokeObjectURL(a.href);
          a.remove();
        }, 2000);
      }
    } finally {
      setDownloading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Buscando imágenes..." />;
  }

  if (images.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      {images.length > 0 && (
        <div className="gallery-toolbar">
          <button className="toolbar-btn download" onClick={handleDownloadSelected} disabled={downloading || selectedImages.size === 0}>
            {downloading ? 'Preparando descarga...' : `Descargar Seleccionadas (${selectedImages.size})`}
          </button>
          <button className="toolbar-btn select-all" onClick={toggleSelectAll}>
            {allSelected ? 'Deseleccionar todo' : 'Seleccionar todo'}
          </button>
        </div>
      )}
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
    </>
  );
}; 