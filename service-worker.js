const CACHE_NAME = "streamcore-cache-v1";
const urlsToCache = [
  "./",
  "./manifest.json",
  "./asset/icon.png",
];

// Install: Cache important files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Opened cache ✅");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate: Cleanup old caches if needed
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Fetch: Serve cached files when offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
