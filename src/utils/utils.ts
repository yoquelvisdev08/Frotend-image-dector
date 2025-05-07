import { ImageInfo, ImageFormat, FilterOption, SortOption } from '../types/types';

// Validación de URLs
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url.startsWith('http') ? url : `https://${url}`);
    return true;
  } catch {
    return false;
  }
};

// Formateo de tamaños de archivo
export const formatFileSize = (bytes: number): string => {
  if (!bytes) return 'N/A';
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(1)} ${units[unitIndex]}`;
};

// Formateo de dimensiones
export const formatDimensions = (width: number, height: number): string => {
  return `${width.toLocaleString()} × ${height.toLocaleString()}px`;
};

// Manejo de descargas
export const downloadImage = async (image: ImageInfo): Promise<void> => {
  try {
    const response = await fetch(image.url);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = getImageFileName(image);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading image:', error);
    throw new Error('Failed to download image');
  }
};

export const downloadMultipleImages = async (images: ImageInfo[]): Promise<void> => {
  try {
    const zip = new JSZip();
    const downloads = images.map(async (image) => {
      const response = await fetch(image.url);
      const blob = await response.blob();
      zip.file(getImageFileName(image), blob);
    });

    await Promise.all(downloads);
    const content = await zip.generateAsync({ type: 'blob' });
    const url = window.URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'images.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading images:', error);
    throw new Error('Failed to download images');
  }
};

// Funciones de filtrado y ordenamiento
export const filterImages = (images: ImageInfo[], filters: FilterOption): ImageInfo[] => {
  return images.filter(image => {
    if (filters.format && !filters.format.includes(image.format as ImageFormat)) {
      return false;
    }
    if (filters.minWidth && image.width < filters.minWidth) {
      return false;
    }
    if (filters.minHeight && image.height < filters.minHeight) {
      return false;
    }
    if (filters.maxSize && image.size && image.size > filters.maxSize) {
      return false;
    }
    return true;
  });
};

export const sortImages = (images: ImageInfo[], sortBy: SortOption): ImageInfo[] => {
  const sortedImages = [...images];
  
  switch (sortBy) {
    case 'size':
      return sortedImages.sort((a, b) => (b.size || 0) - (a.size || 0));
    case 'dimensions':
      return sortedImages.sort((a, b) => (b.width * b.height) - (a.width * a.height));
    case 'format':
      return sortedImages.sort((a, b) => (a.format || '').localeCompare(b.format || ''));
    case 'name':
      return sortedImages.sort((a, b) => a.url.localeCompare(b.url));
    default:
      return sortedImages;
  }
};

// Funciones auxiliares
const getImageFileName = (image: ImageInfo): string => {
  const url = new URL(image.url);
  const pathSegments = url.pathname.split('/');
  const originalName = pathSegments[pathSegments.length - 1];
  
  if (originalName && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(originalName)) {
    return originalName;
  }
  
  const format = image.format || 'jpg';
  const timestamp = Date.now();
  return `image-${timestamp}.${format}`;
};

// Funciones de debounce y throttle
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}; 