'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "046aa1779b1f7d5e57dc7563f2b0423e",
"assets/AssetManifest.bin.json": "35eda05bd5a81630a550f1fda9acd8a5",
"assets/AssetManifest.json": "393e0b97116856632497d9d25d0a2412",
"assets/assets/files/Bahromjon-Polats-resume.pdf": "efa9ef5aed90b1ea88fceb3a10cd42c8",
"assets/assets/files/Manthan_Donga_Resume.pdf": "8729cc191c99f46015bfa9f8041a134d",
"assets/assets/fonts/montserrat/Montserrat-Bold.ttf": "d14ad1035ae6da4e5a71eca362a8d696",
"assets/assets/fonts/montserrat/Montserrat-SemiBold.ttf": "7ffeec2b4edb434d393875ffbe633c30",
"assets/assets/fonts/poppins/Poppins-Medium.ttf": "5bfdccef795165b1f9ab9a3193b2aca1",
"assets/assets/fonts/poppins/Poppins-Regular.ttf": "e212f84086965da44a6c84f3d9a683a4",
"assets/assets/fonts/poppins/Poppins-SemiBold.ttf": "f018d93c4bd9b0bbdfb82ae61ebf8da4",
"assets/assets/icons/apple.svg": "b739c88ae82171b55dd52b58b6345197",
"assets/assets/icons/app_store.svg": "b3585491d0c29eb6539856880e56cf59",
"assets/assets/icons/devices.svg": "2dfd12f7a682581c490587e1535abf65",
"assets/assets/icons/facebook.svg": "d1ed5794f198bf1ecc2ec0a33bef32b0",
"assets/assets/icons/git.svg": "1140cd1c0bebac84da16864dfad787a5",
"assets/assets/icons/github.svg": "3940d359d98749b1f2e3a3304511b787",
"assets/assets/icons/instagram.svg": "95987f5281bbf18aa2a7b09183b1ecc3",
"assets/assets/icons/kotlin.svg": "936569dc1a36ee936f7a653101794533",
"assets/assets/icons/linkedin.svg": "672306d0ea8f7bfcba1db3d492c0a87e",
"assets/assets/icons/loading.gif": "ecd45bb89010aeaf60eebb45648cbedb",
"assets/assets/icons/play_store.svg": "d6189119c763da3045991960f0fbe593",
"assets/assets/icons/telegram.svg": "74893127b3eda0e588efb7f86f2f3fe9",
"assets/assets/icons/web.svg": "f5a9698e2e763d88bc485f2acda21519",
"assets/assets/icons/whatsapp.svg": "9c0ec2e16b32b70b4d87c183452879cf",
"assets/assets/icons/windows.svg": "ed55e2d736ec5b554a268e908b092b36",
"assets/assets/images/debug.log": "d41d8cd98f00b204e9800998ecf8427e",
"assets/assets/images/HROPAL.PNG": "9ecc52a002dd247cee72db950413981c",
"assets/assets/images/profile.png": "9acf0288e8f8de58dc13a37640a9b077",
"assets/FontManifest.json": "739d28a220cddaab3c1a1093653dda34",
"assets/fonts/MaterialIcons-Regular.otf": "5dd2b1e16b58482440e30c960cbe86be",
"assets/NOTICES": "35efb261b7e842afac989097754d9251",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "99fbc87e1e60a978569b6ca9b6e256d1",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "7b3d17f66a7cabdafbafd688067f765e",
"flutter.js": "59a12ab9d00ae8f8096fffc417b6e84f",
"icon.PNG": "37461b1af002b51ad123758297137b2b",
"icons/debug.log": "8dfe430168dcf88d57f4d8cd17154222",
"icons/Icon-192.PNG": "4ea0df605ceeec50662ede96368c1985",
"icons/Icon-512.PNG": "9a6cb95874439c4374b8ee4e958e834f",
"icons/Icon-maskable-192.PNG": "3d3c26a9eefcbf7e3f65e72aa4c7b9c6",
"icons/Icon-maskable-512.PNG": "0cf76502946e2a391e22b8791f3c70ca",
"index.html": "40326dc9fb3162d32436f3c6e7bab0f6",
"/": "40326dc9fb3162d32436f3c6e7bab0f6",
"main.dart.js": "e877a839ae481a8e241b54e11a5aaf11",
"manifest.json": "d40c47d1c161f94dbcb13094d37f1f55",
"splash/splash.js": "123c400b58bea74c1305ca3ac966748d",
"splash/style.css": "c00941d6b6a95f03e0c0c3f9230c442a",
"version.json": "009c9e65172e010890f7f65fde438006"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
