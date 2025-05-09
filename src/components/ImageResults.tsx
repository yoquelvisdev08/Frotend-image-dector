import React, { useState } from 'react';
import { ImageCard } from './ImageCard';
import { ImageModal } from './ImageModal';
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

  // Filtrar imágenes duplicadas basadas en la URL
  const uniqueImages = React.useMemo(() => {
    const seen = new Set<string>();
    return images.filter(img => {
      const normalizedUrl = img.src.toLowerCase().split('?')[0];
      if (seen.has(normalizedUrl)) return false;
      seen.add(normalizedUrl);
      return true;
    });
  }, [images]);

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
      uniqueImages.forEach(img => onImageSelect(img.id)); // Deselecciona todas
      setAllSelected(false);
    } else {
      uniqueImages.forEach(img => {
        if (!selectedImages.has(img.id)) onImageSelect(img.id);
      });
      setAllSelected(true);
    }
  };

  const handleDownloadSelected = async () => {
    const selectedImagesArray = uniqueImages.filter(img => selectedImages.has(img.id));
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

  if (uniqueImages.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      {uniqueImages.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-6">
          <button 
            className={`relative px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 overflow-hidden ${
              downloading || selectedImages.size === 0
                ? 'bg-neutral-300 cursor-not-allowed'
                : 'bg-primary hover:bg-primary-dark shadow-lg hover:shadow-xl hover:-translate-y-0.5'
            }`}
            onClick={handleDownloadSelected} 
            disabled={downloading || selectedImages.size === 0}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center gap-2">
              {downloading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Preparando descarga...</span>
                </>
              ) : (
                <>
                  <span className="text-lg">📥</span>
                  <span>Descargar Seleccionadas ({selectedImages.size})</span>
                </>
              )}
            </div>
          </button>
          <button 
            className="relative px-6 py-3 rounded-lg font-medium text-primary border border-primary hover:bg-primary hover:text-white transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            onClick={toggleSelectAll}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary-dark/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">
            {allSelected ? 'Deseleccionar todo' : 'Seleccionar todo'}
            </span>
          </button>
        </div>
        )}
      <div className="rounded-2xl p-6 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {uniqueImages.slice(0, visibleCount).map(image => (
          <ImageCard
            key={image.id}
            image={image}
            selected={selectedImages.has(image.id)}
            onSelect={() => toggleImageSelection(image.id)}
            onView={() => setModalImage(image)}
          />
        ))}
      </div>
        {visibleCount < uniqueImages.length && (
          <div className="mt-8 text-center">
            <button 
              className="relative px-6 py-3 rounded-lg font-medium text-primary border border-primary hover:bg-primary hover:text-white transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              onClick={() => setVisibleCount(visibleCount + PAGE_SIZE)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary-dark/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Ver más</span>
            </button>
          </div>
        )}
      </div>
      {modalImage && (
        <ImageModal
          image={modalImage}
          onClose={() => setModalImage(null)}
        />
      )}
    </>
  );
}; 