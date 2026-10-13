/* Service Worker – Cache-First App-Shell (offline-fähig) */
const CACHE = 'ifr-v10';
const ASSETS = [
  './', 'index.html', 'steuer.html', 'basis.html', 'vergleich.html', 'flip.html',
  'xlsx.full.min.js',
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
  // nur eigene Dateien abfangen/cachen (PDF-Leser und Texterkennung liegen unter lib/ und werden beim ersten Import gecacht)
  if (new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(e.request).then((cached) =>
      cached ||
      fetch(e.request).then((resp) => {
        if (resp.ok) { // einen einmaligen Fehler (z. B. 404) nicht dauerhaft cachen
          const copy = resp.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        }
        return resp;
      }).catch(() => (e.request.mode === 'navigate' ? caches.match('index.html') : Response.error())) // Startseite nur als Ersatz für Seitenaufrufe, nicht für Skripte
    )
  );
});
