// OscSpa - app.js para index.html SIN formulario
// El formulario ahora vive solo en reserva.html

function elegir(servicio){
  // Te lleva a reserva.html con el servicio ya elegido
  // Ej: elegir('Masaje Relajante') -> reserva.html?servicio=Masaje Relajante
  window.location.href = 'reserva.html?servicio=' + encodeURIComponent(servicio);
}

// Registrar Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('SW OscSpa activo'))
      .catch(err => console.log('Error SW:', err));
  });
}
// Lightbox para ampliar fotos de la galeria
const fotos = document.querySelectorAll('.galeria-grid img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const cerrar = document.getElementById('lightbox-cerrar');

if (lightbox && fotos.length) {
  fotos.forEach(foto => {
    foto.addEventListener('click', () => {
      lightboxImg.src = foto.src;
      lightbox.classList.add('activo');
    });
  });

  const cerrarLightbox = () => lightbox.classList.remove('activo');
  cerrar.addEventListener('click', cerrarLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) cerrarLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarLightbox();
  });
}