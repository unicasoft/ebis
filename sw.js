// ═══════════════════════════════════════════════════
// Karekod Doğrulayıcı — Service Worker v6
// ═══════════════════════════════════════════════════
const CACHE = 'karekod-v6';

const ASSETS = [
  './',
  './index.html',
  'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@700;800;900&display=swap',
];

// ── INSTALL: önbelleğe al ──
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      // Harici fontlar CORS hatası verebilir — hepsini zorla değil, sadece kritiği yakala
      cache.addAll(['./', './index.html']).then(() =>
        // Harici CDN varlıklarını arka planda sessizce dene
        Promise.allSettled(
          ['https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js'].map(u =>
            fetch(u, { mode: 'cors' })
              .then(r => r.ok ? cache.put(u, r) : null)
              .catch(() => null)
          )
        )
      )
    ).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: eski önbellekleri temizle ──
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: önce önbellek, yoksa ağ ──
self.addEventListener('fetch', e => {
  // POST istekleri önbelleğe alınmaz
  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;

      return fetch(e.request).then(response => {
        // Geçerli yanıtları önbelleğe ekle
        if (response && response.status === 200 && response.type !== 'opaque') {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return response;
      }).catch(() => {
        // Çevrimdışı durumda ana sayfayı dön
        if (e.request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
