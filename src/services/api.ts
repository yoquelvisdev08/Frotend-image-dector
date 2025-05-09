import axios from 'axios';

const API_URL = '/api';

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

  // Escanear imágenes de una URL
  scanImages: async (url: string): Promise<ScanResponse> => {
    const response = await axios.post(`${API_URL}/scan`, { targetUrl: url });
    return response.data;
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