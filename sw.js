var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/main.css',
  '/main.js',
  'https://api.github.com/users/ankushdharkar',
  'https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main/members/ankush/img.png'
];


self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});


self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});



console.log('Service W Waking up ... 😴');

self.addEventListener('activate', function(event) {
  console.log('SW Activated. ⚡️');
});


/*
self.addEventListener('notificationclick', event => {
  const notif = event.notification;
  const action = event.action;

  if (action === 'close') {
    notif.close();
  }
  else {
    clients.openWindow('https://realdevsquad.com');
  }
});

self.addEventListener('notificationclose', event => {
  const notif = event.notification;
  const notifKey = event.data.primaryKey;
  console.log(`Closed Notification ${notifKey}`);
});
*/
