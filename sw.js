/* Daily Keiko service worker — offline first.
   Bump CACHE_VERSION whenever you change any file in PRECACHE. */
var CACHE_VERSION = "keiko-v1";
var PRECACHE = [
  "/",
  "/index.html",
  "/styles.css",
  "/config.js",
  "/guide.js",
  "/app.js",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-maskable-512.png",
  "/icons/apple-touch-icon.png",
  "/icons/favicon-64.png"
];

self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(CACHE_VERSION).then(function(c){
      // addAll fails the whole install if one file 404s, so add individually
      return Promise.all(PRECACHE.map(function(u){
        return c.add(new Request(u, { cache: "reload" })).catch(function(){});
      }));
    }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){
        return k === CACHE_VERSION ? null : caches.delete(k);
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(e){
  var req = e.request;
  if(req.method !== "GET") return;

  var url;
  try{ url = new URL(req.url); }catch(err){ return; }

  // Never cache Supabase traffic — auth and data must always hit the network.
  if(url.hostname.indexOf("supabase") !== -1) return;

  // App shell: navigations always resolve to index.html so deep links work offline.
  if(req.mode === "navigate"){
    e.respondWith(
      fetch(req).catch(function(){
        return caches.match("/index.html").then(function(r){ return r || caches.match("/"); });
      })
    );
    return;
  }

  // Same-origin assets: cache first, refresh in the background.
  if(url.origin === self.location.origin){
    e.respondWith(
      caches.match(req).then(function(hit){
        var net = fetch(req).then(function(res){
          if(res && res.ok){
            var copy = res.clone();
            caches.open(CACHE_VERSION).then(function(c){ c.put(req, copy); });
          }
          return res;
        }).catch(function(){ return hit; });
        return hit || net;
      })
    );
    return;
  }

  // Cross-origin (the Supabase client library on a CDN): cache after first load
  // so the app still boots with no connection.
  e.respondWith(
    caches.match(req).then(function(hit){
      if(hit) return hit;
      return fetch(req).then(function(res){
        if(res && (res.ok || res.type === "opaque")){
          var copy = res.clone();
          caches.open(CACHE_VERSION).then(function(c){ c.put(req, copy); });
        }
        return res;
      }).catch(function(){ return hit; });
    })
  );
});
