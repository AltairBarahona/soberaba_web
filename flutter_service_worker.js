'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "26ca099b18aeb6ed4b3e937fcbb0f4fd",
"assets/assets/icons/whatsapp.png": "ec69d1fab1d1b2bd76ab53aab8e982e2",
"assets/assets/img/arverjaRosada.jpeg": "1806f5dde7ab4fb2f27dc199f9e2b4f6",
"assets/assets/img/arverjaVerde.jpeg": "33362cd5fe0bc4c49c0d9540aaed92e5",
"assets/assets/img/avena.jpeg": "7f1e9dc73ce1f3267035e56f2324019b",
"assets/assets/img/azucar.jpeg": "ccf86304cdc184151082737068906351",
"assets/assets/img/canguil.jpeg": "37bdd8529e13d5b29da6fc92c002076a",
"assets/assets/img/frejolCanario.jpeg": "5503efbc8568c3d09ce257290a24e156",
"assets/assets/img/frejolNegro.jpeg": "3bf5f420f3a5cdfe2a83ef5a61bf4e77",
"assets/assets/img/frejolRojo.jpeg": "6878c0f5d67fd62a66fd95ebf984218c",
"assets/assets/img/garbanzo.jpeg": "55cf516c0e5bbe9993cd78ba7965962e",
"assets/assets/img/lenteja.jpeg": "b17247af0aa35b3dc94f2b4717f70f54",
"assets/assets/img/maicena.jpeg": "c0734a90702666c2cf98793ec13cfd2b",
"assets/assets/img/panelaMolida.jpeg": "dedbf46fc7eac04c7a7f30d4bd56608f",
"assets/assets/img/panelaRedonda.jpeg": "9840529bec9839f7414c236b5ef06391",
"assets/assets/products/ARVERJA%2520ROSADA.jpg": "9f6aba3964e8af6194e34813388646ad",
"assets/assets/products/ARVERJA%2520VERDE.jpg": "b70546977726d7100dac0d8a6c0174ab",
"assets/assets/products/ARVERJA%2520VERDE1.jpg": "4cee691c988c1a617ecccc4d174d304b",
"assets/assets/products/avena.jpeg": "7f1e9dc73ce1f3267035e56f2324019b",
"assets/assets/products/azucar1.jpg": "c2402ecb0d08dc91793c4d1657782337",
"assets/assets/products/banner1.png": "541492041884215e47a4ed198c2cba84",
"assets/assets/products/banner2.png": "3b0cf6719666acfe2d75c23fc3dcdac4",
"assets/assets/products/canguil.jpeg": "37bdd8529e13d5b29da6fc92c002076a",
"assets/assets/products/frejol%2520Canario.jpg": "13d178e9e1e6671092795d46d98b7dfe",
"assets/assets/products/frejol%2520rojo.jpg": "324692ec45ff166fc6e48596b9d30874",
"assets/assets/products/frejolNegro.jpeg": "3bf5f420f3a5cdfe2a83ef5a61bf4e77",
"assets/assets/products/garbanzo.jpg": "807cb2decb6cf618524f627bba2a429d",
"assets/assets/products/lenteja1.jpg": "874713060384e9724c0840c861c3be99",
"assets/assets/products/maicena.jpg": "8fa1da942f7a35f2b9792dca02d5ec8d",
"assets/assets/products/panelamolida.jpg": "4069a6a7c414adc0b4f747e565939f41",
"assets/assets/products/panelamolida2.jpg": "378adacca8d84051fd22f028a55b24de",
"assets/assets/products/panelaredonda.jpg": "64f6f192f76d0d990c575d612f691cbb",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "11fc2f2e83192a8c0c47a6369475227c",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "443414d7c404e16bd6608481d241e1da",
"/": "443414d7c404e16bd6608481d241e1da",
"main.dart.js": "b6115e715305efbbc34fe4c3c2141477",
"manifest.json": "a990e29d5cb59f6159601fee5e5e1cb1",
"version.json": "ecba12b21b5018b2d8343692b419f10c"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
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
