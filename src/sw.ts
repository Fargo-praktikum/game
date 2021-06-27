export default null;
declare const self: ServiceWorkerGlobalScope;

// будет заменено веб-паком
const CACHE_NAME = "__SERVICE_WORKER_CACHE_NAME";

const URLS = [
    // будет заменено веб-паком
    "__SERVICE_WORKER_URLS"
];

function checkOnlineAndSendMessage() {
    self.clients.matchAll({ includeUncontrolled: true, type: "window" }).then((clients) => {
        clients.forEach((client) => {
            client.postMessage({ type: "online_checker", payload: self.navigator.onLine });
        });
    });
}

self.addEventListener("install", (event: ExtendableEvent) => {
    console.log("install");
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(URLS);
            })
            .then(() => {
                return self.skipWaiting();
            })
            .catch(err => {
                //console.log(err);
                throw err;
            })
    );
});

self.addEventListener("activate", function(event: ExtendableEvent) {
    console.log("activate");
    event.waitUntil(
        caches.keys().then((names: string[]) => {
            return Promise.all(
                names
                    .filter((name) => { return name !== CACHE_NAME; })
                    .map(name => caches.delete(name))
            );
        })
    );

    checkOnlineAndSendMessage();
    setInterval(checkOnlineAndSendMessage, 15 * 1000);
});

self.addEventListener("fetch", (event: FetchEvent) => {
    event.respondWith(
        fetch(event.request.clone())
            .then((response) => {

                const responseToCache = response.clone();

                if (event.request.method.toLowerCase() === "get" && !event.request.url.includes("chrome-extension")) {

                    // Получаем доступ к кешу по CACHE_NAME
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            // Записываем в кеш ответ, используя в качестве ключа запрос
                            cache.put(event.request, responseToCache);
                        });
                }

                // Отдаём в основной поток ответ
                return response;
            })
            .catch(() => {

                return caches.match(event.request)
                    .then((cacheResponse) => {
                        if (!cacheResponse) {
                            throw new Error("Недоступно оффлайн");
                        }

                        return cacheResponse;
                    });
            })
    );
});
