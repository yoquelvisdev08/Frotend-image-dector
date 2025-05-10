import React from 'react';
import '../styles/Pages.css';

const Docs = () => (
  <div className="page-container">
    <h1>Documentación de Snaplyzer</h1>
    <p>
      <b>Snaplyzer</b> es una herramienta web moderna que te permite descubrir y extraer imágenes de cualquier sitio web de forma rápida, eficiente y segura.
    </p>
    <h2>¿Cómo funciona?</h2>
    <ol>
      <li>Introduce la URL del sitio web que deseas analizar en el campo de búsqueda.</li>
      <li>Pulsa el botón <b>Buscar Imágenes</b>.</li>
      <li>Nuestro sistema analizará la web y mostrará una galería con todas las imágenes encontradas.</li>
      <li>Selecciona las imágenes que necesites y descárgalas individualmente o en lote.</li>
    </ol>
    <h2>Características principales</h2>
    <ul>
      <li>Escaneo rápido y seguro de cualquier sitio web público.</li>
      <li>Descarga de imágenes en su calidad original.</li>
      <li>Interfaz moderna, intuitiva y responsive.</li>
      <li>No almacenamos tus imágenes ni URLs: tu privacidad es lo primero.</li>
      <li>Soporte para múltiples formatos (JPG, PNG, GIF, WebP).</li>
    </ul>
    <h2>Preguntas frecuentes</h2>
    <b>¿Qué sitios puedo analizar?</b>
    <p>Puedes analizar cualquier sitio web público que no requiera autenticación. La herramienta es compatible con la mayoría de los sitios web modernos.</p>
    <b>¿Se guardan mis datos?</b>
    <p>No, Snaplyzer no almacena tus imágenes ni tus URLs. Todo el procesamiento se realiza en tiempo real y de forma segura.</p>
    <b>¿Por qué algunas imágenes no se pueden descargar?</b>
    <p>Algunos sitios pueden tener restricciones técnicas o de derechos de autor. En estos casos, te mostraremos un mensaje explicativo.</p>
    <h2>Soporte</h2>
    <p>¿Tienes dudas o sugerencias? Contáctanos a través del formulario de contacto en la web. Estamos aquí para ayudarte.</p>
  </div>
);

export default Docs; 