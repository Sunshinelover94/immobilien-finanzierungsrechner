/* Service Worker – Cache-First App-Shell (offline-fähig) */
const CACHE = 'ifr-v4';
const ASSETS = [
  './', 'index.html', 'steuer.html', 'basis.html', 'vergleich.html',
  'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-180.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.allSettled(ASSETS.map((a) => c.add(a))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  // CDN-Bibliotheken (pdf.js/tesseract) und die Anthropic-API nicht abfangen/cachen
  if (new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(e.request).then((cached) =>
      cached ||
      fetch(e.request).then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return resp;
      }).catch(() => caches.match('index.html'))
    )
  );
});
