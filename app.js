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