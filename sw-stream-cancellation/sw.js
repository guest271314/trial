let readable;

self.addEventListener('message', async (event) => {
  readable = event.data;
  console.log(event);
  event.source.postMessage('ServiceWorker ready to serve download');
});

self.addEventListener('fetch', (event) => {
  console.log(event);
  let url = new URL(event.request.url);
  if (url.pathname.includes('get-file')) {
    console.log({ readable });
    const headers = {
      'content-disposition': 'attachment; filename="filename.txt"',
    };
    event.respondWith(
      new Response(readable, {
        headers,
      })
    );
  }
});

self.addEventListener('install', (event) => {
  console.log(event);
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  console.log(event);
  event.waitUntil(self.clients.claim());
});
