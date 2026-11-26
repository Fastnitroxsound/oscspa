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

// ===== VER MAS / VER MENOS GALERIA =====
const galeriaItems = document.querySelectorAll('.galeria-grid > *');
const btnVerMas = document.getElementById('btn-ver-mas');
let galeriaExpandida = false;

function actualizarGaleria() {
  const limite = window.innerWidth <= 750 ? 4 : 6;
  galeriaItems.forEach((item, i) => {
    item.style.display = (!galeriaExpandida && i >= limite) ? 'none' : '';
  });
  if (btnVerMas) btnVerMas.textContent = galeriaExpandida ? 'Ver menos' : 'Ver más';
}

if (btnVerMas) {
  btnVerMas.addEventListener('click', () => {
    galeriaExpandida = !galeriaExpandida;
    actualizarGaleria();
  });
  actualizarGaleria();
  window.addEventListener('resize', () => {
    if (!galeriaExpandida) actualizarGaleria();
  });
}