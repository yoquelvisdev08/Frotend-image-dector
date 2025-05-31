import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface ImageData {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  top: number;
  selected: boolean;
}

export interface ScanResponse {
  images: ImageData[];
  url: string;
}

export const api = {
  // Verificar estado del servidor
  checkHealth: async () => {
    const response = await axios.get(`${API_URL}/health`);
    return response.data;
  },

  // Escanear imágenes de una URL usando el endpoint de Thanos o Scan
  scanImages: async (url: string, mode: 'scan' | 'thanos' = 'scan'): Promise<ScanResponse> => {
    const endpoint = mode === 'scan' ? '/scan' : '/thanos';
    const response = await axios.post(`${API_URL}${endpoint}`, { targetUrl: url });
    
    // Mapear la respuesta según el endpoint
    if (mode === 'scan') {
      // Formato original de /scan
      return response.data;
    } else {
      // Formato de Thanos
      const mappedImages = [
        ...response.data.regular.map((img: any, index: number) => ({
          id: `img-${index}`,
          src: img.src,
          alt: img.alt || '',
          width: img.width,
          height: img.height,
          top: 0,
          selected: false
        })),
        ...response.data.background.map((src: string, index: number) => ({
          id: `bg-${index}`,
          src,
          alt: 'Background Image',
          width: 0,
          height: 0,
          top: 0,
          selected: false
        }))
      ];

      return {
        images: mappedImages,
        url
      };
    }
  },

  // Obtener imagen a través del proxy
  getImage: async (imageUrl: string): Promise<Blob> => {
    const response = await axios.get(`${API_URL}/proxy-image`, {
      params: { url: imageUrl },
      responseType: 'blob'
    });
    return response.data;
  }
}; 