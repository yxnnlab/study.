// Study Compass v6 — 네트워크 우선(항상 최신 파일), 오프라인일 때만 캐시 사용
const CACHE="study-compass-v6-2";
const FILES=["./","./index.html","./manifest.webmanifest","./sync-config.js","./icons/icon-192.png","./icons/icon-512.png","./icons/apple-touch-icon.png"];
self.addEventListener("install",e=>e.waitUntil(
  caches.open(CACHE).then(c=>Promise.all(FILES.map(f=>fetch(new Request(f,{cache:"reload"})).then(r=>r.ok?c.put(f,r):null).catch(()=>null)))).then(()=>self.skipWaiting())
));
self.addEventListener("activate",e=>e.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
));
self.addEventListener("fetch",e=>{
  const req=e.request,url=new URL(req.url);
  if(req.method!=="GET"||url.origin!==location.origin)return; // Firebase 등 외부 요청은 건드리지 않음
  e.respondWith(
    fetch(req,{cache:"no-cache"}).then(res=>{
      if(res&&res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy)).catch(()=>{})}
      return res;
    }).catch(()=>caches.match(req,{ignoreSearch:true}).then(r=>r||caches.match("./index.html")))
  );
});
