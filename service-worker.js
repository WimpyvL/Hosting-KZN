const CACHE_NAME = 'hosting-kzn-v1';
const ASSETS_TO_CACHE = [
  // HTML Files
  '/',
  '/index.html',
  '/web-design.html',
  '/about.html',
  '/cloud-services.html',
  '/hosting.html',
  '/connectivity.html',
  '/email-automation.html',
  '/fibre-prepaid.html',
  '/security-solutions.html',
  '/vpn-services.html',
  '/solar-solutions.html',
  '/Terms & Conditions.html',
  '/Privacy Policy.html',
  '/contact.html',
  // CSS Files
  '/assets/css/styles.css',
  '/assets/css/footer.css',
  '/assets/css/about.css',
  '/assets/css/email-automation.css',
  '/assets/css/connectivity.css',
  '/assets/css/cloud-services.css',
  '/assets/css/contact.css',
  '/assets/css/testimonials.css',
  // JavaScript Files
  '/assets/js/script.js',
  '/assets/js/metrics-animation.js',
  '/assets/js/about-modal.js',
  '/assets/js/modal.js',
  // Images (add or adjust as needed)
  '/assets/images/KZN Logos (1).png',
  '/assets/images/Web Design Icon.png',
  '/assets/images/Connectivity Icon.png',
  '/assets/images/EmailAuto Icon.png',
  '/assets/images/Hosting Icon.png',
  '/assets/images/CloudServices Icon.png',
  '/assets/images/Security Icon.png',
  '/assets/images/Solar S Icon.png',
  '/assets/images/Fiber Icon.png',
  '/assets/images/Everlytic-300x300.png',
  '/assets/images/Vox icon.jpg'
  // ...other assets as needed
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
