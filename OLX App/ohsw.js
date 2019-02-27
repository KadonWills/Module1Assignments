const cacheName = 'hackathon-assets';
const staticAssets = [
    './',
    './css/animate.css',
    './css/panel.css',
    './css/style.css',
    './fonts/oswald.css',
    './fonts/poppins.css',
    './html/panel.html',
    './html/signin.html',
    './html/signup.html',
    './index.html',
    './script/app.js',
    './script/home.js',
    './script/panel.js',
    './script/sweetalert.js',
    './background/wallpaper.jpg',
    './icon/icon.png',
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
          console.log('[ServiceWorker] Caching app shell');
          return cache.addAll(staticAssets);
        })
      );
})

self.addEventListener('fetch', event => {
    const req = event.request;
    const url = new URL(req.url);
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(req))
    } else {
        event.respondWith(networkFirst(req))
    }
})

async function cacheFirst(req) {
    const cacheResponse = await caches.match(req);
    return cacheResponse || fetch(req);
}

async function networkFirst(req) {
    const cache = await caches.open(cacheName);
    try {
        const res = await fetch(req);
        cache.put(req, res.clone())
        return res
    } catch (error) {
        return await cache.match(req)
    }
}

importScripts('https://www.gstatic.com/firebasejs/5.8.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.8.3/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyD5JIYhq8f9vlcC45HhF1uQHF3rbiZZnXo",
    authDomain: "olx-hackathon-19.firebaseapp.com",
    databaseURL: "https://olx-hackathon-19.firebaseio.com",
    projectId: "olx-hackathon-19",
    storageBucket: "olx-hackathon-19.appspot.com",
    messagingSenderId: "275237670184"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
