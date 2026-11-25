function elegir(servicio){
  document.getElementById('servicio').value = servicio;
  document.getElementById('reserva').scrollIntoView({behavior:'smooth'});
}

function reservar(){
  let nombre = document.getElementById('nombre').value.trim();
  let telefono = document.getElementById('telefono').value.trim();
  let servicio = document.getElementById('servicio').value;
  let fecha = document.getElementById('fecha').value;
  let hora = document.getElementById('hora').value;

  if(!nombre || !telefono || !fecha){
    alert('Completá nombre, teléfono y fecha');
    return;
  }

  let fechaLinda = fecha;
  if(fecha.includes('-')){
    let partes = fecha.split('-');
    fechaLinda = partes[2] + '/' + partes[1] + '/' + partes[0];
  }

  let horaTexto = hora ? hora : 'A coordinar';

  let mensaje = `Hola OscSpa! Quiero reservar:\n- Nombre: ${nombre}\n- Teléfono: ${telefono}\n- Servicio: ${servicio}\n- Fecha: ${fechaLinda}\n- Hora: ${horaTexto}`;

  window.open(`https://wa.me/5493804899377?text=${encodeURIComponent(mensaje)}`, '_blank');
}

// Registrar Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('SW OscSpa activo'))
      .catch(err => console.log('Error SW:', err));
  });
}