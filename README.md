# Frontend Image Detector

Aplicación web moderna para escanear, visualizar y descargar imágenes de sitios web.

## Características

- Interfaz moderna y responsiva
- Galería de imágenes con vista en cuadrícula
- Selección múltiple de imágenes
- Descarga individual y en lote (ZIP)
- Previsualización de imágenes en modal
- Diseño adaptable a dispositivos móviles
- Animaciones suaves y transiciones
- Tema claro/oscuro

## Tecnologías

- React 18
- TypeScript
- Vite
- React Icons
- JSZip para descargas múltiples
- CSS Modules
- ESLint + Prettier

## Requisitos

- Node.js >= 14.x
- npm >= 6.x

## Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd Frotend-image-dector
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```
Editar el archivo `.env` con la URL del backend.

## Desarrollo

Iniciar servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Construcción

Generar build de producción:
```bash
npm run build
```

Los archivos se generarán en el directorio `dist/`

## Estructura del Proyecto

```
src/
├── components/     # Componentes React
├── services/      # Servicios y API
├── styles/        # Estilos CSS
├── types/         # Definiciones TypeScript
├── utils/         # Utilidades
└── App.tsx        # Componente principal
```

## Componentes Principales

- `ImageScanner`: Formulario de búsqueda de imágenes
- `ImageResults`: Galería de resultados
- `ImageCard`: Tarjeta individual de imagen
- `ImageModal`: Modal de previsualización
- `DownloadButton`: Botón de descarga

## Características de la UI

- Diseño tipo "bento" para las tarjetas
- Animaciones suaves al seleccionar
- Efectos hover en imágenes
- Botones flotantes para acciones
- Modal con zoom y navegación
- Indicadores de carga
- Mensajes de error amigables

## Personalización

### Temas
Los colores principales se pueden modificar en:
```css
:root {
  --primary-color: #1976d2;
  --success-color: #43a047;
  --error-color: #d32f2f;
}
```

### Estilos
Los estilos principales están en:
- `ImageCard.css`: Estilos de las tarjetas
- `ImageResults.css`: Estilos de la galería
- `ImageModal.css`: Estilos del modal

## Contribuir

1. Fork el repositorio
2. Crear una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abrir un Pull Request

## Licencia

MIT
