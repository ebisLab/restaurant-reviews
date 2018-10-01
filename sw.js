let cacheVersion = 'restaurant-reviews-v1';
let urlsToCache = [
  'index.html',
  'restaurant.html',
  'data/restaurants.json',
  'js/main.js',
  'js/restaurant_info.js',
  'js/dbhelper.js',
  'css/styles.css',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg'
];

self.addEventListener('install', event => {
console.log("serviceWorker installed");

  event.waitUntil(
    caches.open(cacheVersion).then(cache => {
      console.log("serviceWorker caching files");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', event => {
    console.log('serviceWorker activated');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter(cacheName => cacheName != cacheVersion).map(cacheName => {
                    console.log('serviceWorker clearing old cache');
                    return caches.delete(cacheName);
                })
           );
    }));
});

self.addEventListener('fetch', event => {
    console.log('serviceWorker fetching for offline');
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                console.log(`Found content in cache`);
                return response;
            } else {
                console.log(`Could not find content in cache, fetching now.`);
                return fetch(event.request);
            }
        })
    );
});
