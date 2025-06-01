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
    console.log('🚀 Preparando petición:', { 
      url, 
      mode, 
      endpoint: mode === 'scan' ? '/scan' : '/thanos' 
    });

    const endpoint = mode === 'thanos' ? '/thanos' : '/scan';
    const payload = { 
      targetUrl: url,
      ...(mode === 'thanos' && { depth: 2, concurrent: 3, priority: 'high' }) 
    };

    console.log('📤 Payload de la petición:', payload);

    try {
      const response = await axios.post(`${API_URL}${endpoint}`, payload);
      
      console.log('📥 Respuesta recibida:', {
        status: response.status,
        data: response.data
      });
      
      // Mapear la respuesta según el endpoint
      if (mode === 'scan') {
        // Formato original de /scan
        return response.data;
      } else {
        // Formato de Thanos
        const mappedImages = response.data.images.map((img: any, index: number) => ({
          id: `img-${index}`,
          src: img.src,
          alt: img.alt || '',
          width: img.width || 0,
          height: img.height || 0,
          top: 0,
          selected: false
        }));

        console.log('🖼️ Imágenes mapeadas:', mappedImages);

        return {
          images: mappedImages,
          url
        };
      }
    } catch (error) {
      console.error('❌ Error en la petición:', error);
      throw error;
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