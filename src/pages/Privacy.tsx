import React from 'react';
import '../styles/Pages.css';

const Privacy = () => (
  <div className="page-container">
    <h1>Política de Privacidad</h1>
    <p>
      En <b>ImageHarvest</b> nos tomamos muy en serio tu privacidad. Esta aplicación está diseñada para que puedas buscar y descargar imágenes de sitios web sin que tus datos personales sean almacenados ni compartidos.
    </p>
    <h2>¿Qué información recopilamos?</h2>
    <ul>
      <li>No almacenamos las URLs que introduces ni las imágenes que descargas.</li>
      <li>No solicitamos ni guardamos datos personales como nombre, correo electrónico o ubicación.</li>
    </ul>
    <h2>Cookies y tecnologías similares</h2>
    <p>ImageHarvest no utiliza cookies propias ni de terceros para rastrear tu actividad.</p>
    <h2>Seguridad</h2>
    <p>La comunicación entre tu navegador y nuestros servidores está cifrada mediante HTTPS.</p>
    <h2>Enlaces a sitios externos</h2>
    <p>La app puede mostrar enlaces a sitios externos. No somos responsables de las políticas de privacidad de esos sitios.</p>
    <h2>Cambios en la política</h2>
    <p>Nos reservamos el derecho de modificar esta política. Cualquier cambio será notificado en esta página.</p>
    <h2>Contacto</h2>
    <p>Si tienes dudas sobre nuestra política de privacidad, contáctanos a través del formulario de contacto.</p>
  </div>
);

export default Privacy; 