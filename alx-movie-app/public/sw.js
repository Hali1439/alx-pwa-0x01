const CACHE_NAME = "cine-seek-cache-v1";
const ASSETS_TO_CACHE = [
  "/", // homepage
  "/index.html",
  "/manifest.json",
  "/default-poster.png" // <-- add this if you need it
];

// Install event → cache files
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installed ✅");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate event → cleanup old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activated ✅");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }))
    )
  );
});

// Fetch event → cache first
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() =>
          caches.match("/offline.html") // fallback
        )
      );
    })
  );
});
