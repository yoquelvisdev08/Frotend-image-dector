// Interfaces para las imágenes
export type ImageInfo = {
  id: string;
  url: string;
  width: number;
  height: number;
  size?: number;
  format?: string;
  alt?: string;
  source?: string;
};

// Interfaces para las respuestas de la API
export type ScanResponse = {
  scanId: string;
  images: ImageInfo[];
  totalImages: number;
  url: string;
  timestamp: string;
};

export type ErrorResponse = {
  error: string;
  code: string;
  details?: string;
};

// Interfaces para los estados de los componentes
export type ScanState = {
  isLoading: boolean;
  error: string | null;
  images: ImageInfo[];
  scanId: string | null;
};

// Props para los componentes
export interface SearchFormProps {
  onSubmit: (url: string) => Promise<void>;
  isLoading: boolean;
}

export interface ImageResultsProps {
  images: ImageInfo[];
  isLoading: boolean;
  onImageSelect: (imageId: string) => void;
  selectedImages: Set<string>;
}

export interface ImageCardProps {
  image: ImageInfo;
  selected: boolean;
  onSelect: () => void;
  onClick: () => void;
}

export interface ImageModalProps {
  image: ImageInfo;
  onClose: () => void;
}

export interface LoadingSpinnerProps {
  message?: string;
}

export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

// Tipos de utilidad
export type ImageFormat = 'jpg' | 'jpeg' | 'png' | 'gif' | 'webp' | 'svg' | 'other';

export type SortOption = 'size' | 'dimensions' | 'format' | 'name';

export type FilterOption = {
  format?: ImageFormat[];
  minWidth?: number;
  minHeight?: number;
  maxSize?: number;
};

// Enums
export enum ScanStatus {
  IDLE = 'idle',
  SCANNING = 'scanning',
  COMPLETED = 'completed',
  ERROR = 'error'
}

export enum DownloadStatus {
  PENDING = 'pending',
  DOWNLOADING = 'downloading',
  COMPLETED = 'completed',
  ERROR = 'error'
} 