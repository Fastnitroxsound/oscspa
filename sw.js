const CACHE = 'oscspa-v2';
const ARCHIVOS = [
  './',
  './index.html',
  './reserva.html',
  './style.css',
  './app.js',
  './logo.png',
  './hero.jpg',
  './manifest.json'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ARCHIVOS))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Solo caché para GET
  if (e.request.method !== 'GET') return;

  // Para HTML, CSS y JS: primero intenta red, si no hay internet usa caché
  if (e.request.url.includes('.html') || e.request.url.includes('.css') || e.request.url.includes('.js')) {
    e.respondWith(
      fetch(e.request).then(respuesta => {
        // Solo guardar si respondió bien
        if (respuesta && respuesta.status === 200) {
          const copia = respuesta.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, copia));
        }
        return respuesta;
      }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('./index.html')))
    );
    return;
  }
  // Para imágenes y resto: caché primero
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(respuesta => respuesta || fetch(e.request).catch(() => caches.match('./logo.png')))
  );
});