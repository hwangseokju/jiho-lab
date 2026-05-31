const CACHE_NAME = 'jiho-lab-v1';
const ASSETS = [
  '/jiho-lab/',
  '/jiho-lab/index.html',
  '/jiho-lab/manifest.json',
  '/jiho-lab/icon-192.png',
  '/jiho-lab/icon-512.png'
];

// 설치 — 캐시 저장
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// 활성화 — 이전 캐시 삭제
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// 요청 — 캐시 우선, 없으면 네트워크
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
