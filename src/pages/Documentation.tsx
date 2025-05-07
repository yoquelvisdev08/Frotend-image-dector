import React from 'react';
import '../styles/Pages.css';

export const Documentation = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Documentación</h1>
        
        <section className="doc-section">
          <h2>Introducción</h2>
          <p>
            ImageHarvest es una herramienta que te permite extraer imágenes de cualquier sitio web de forma rápida y sencilla.
            Esta documentación te ayudará a entender cómo usar la herramienta y sacar el máximo provecho de sus funcionalidades.
          </p>
        </section>

        <section className="doc-section">
          <h2>Cómo usar ImageHarvest</h2>
          <ol>
            <li>Ingresa la URL del sitio web del que deseas extraer imágenes</li>
            <li>Haz clic en "Buscar Imágenes" y espera a que se complete el escaneo</li>
            <li>Selecciona las imágenes que deseas descargar</li>
            <li>Usa el botón "Descargar Seleccionadas" para obtener las imágenes</li>
          </ol>
        </section>

        <section className="doc-section">
          <h2>Características</h2>
          <ul>
            <li>Escaneo instantáneo de sitios web</li>
            <li>Descarga segura de imágenes</li>
            <li>Mantiene la calidad original de las imágenes</li>
            <li>Soporte para múltiples formatos (JPG, PNG, GIF, WebP)</li>
            <li>Interfaz intuitiva y fácil de usar</li>
          </ul>
        </section>

        <section className="doc-section">
          <h2>Limitaciones</h2>
          <p>
            Ten en cuenta que algunos sitios web pueden tener restricciones técnicas o legales que impidan la extracción de imágenes.
            Asegúrate de tener los derechos necesarios antes de descargar y usar las imágenes.
          </p>
        </section>
      </div>
    </div>
  );
}; 