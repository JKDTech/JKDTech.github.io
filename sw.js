/**
 * Service Worker para JKD Tech Portfolio
 * Versión: 1.0.0
 *
 * Estrategia de caché híbrida:
 * - Cache First: Assets estáticos (CSS, JS, imágenes, fuentes)
 * - Network First: HTML y contenido dinámico
 */

const CACHE_VERSION = 'jkdtech-v1.0.0';
const CACHE_NAME = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;

// Recursos críticos para cachear en la instalación
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/assets/css/estilos_modernos.css',
  '/assets/css/project-placeholders.css',
  '/assets/js/main_moderno.js',
  '/assets/img/logo.png',
  '/assets/img/favicon.svg',
  '/assets/img/favicon.png',
  '/assets/img/bg-hero.jpg',
  '/assets/img/banner.jpg',
  '/manifest.json'
];

// Recursos externos (CDNs) - opcional
const EXTERNAL_ASSETS = [
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.css',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap'
];

// Recursos que NO deben cachearse
const EXCLUDED_URLS = [
  '/CONFIGURACION_PENDIENTE.md',
  '/GENERAR_ASSETS.md',
  '/generate_icons.py',
  'chrome-extension',
  'googletagmanager.com',
  'analytics.google.com'
];

/**
 * Instalación del Service Worker
 */
self.addEventListener('install', (event) => {
  console.log('🚀 Service Worker: Instalando...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Service Worker: Cacheando assets estáticos...');
        // Cachear assets críticos
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('✅ Service Worker: Instalación completada');
        // Activar inmediatamente
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Service Worker: Error en instalación:', error);
      })
  );
});

/**
 * Activación del Service Worker
 */
self.addEventListener('activate', (event) => {
  console.log('🔄 Service Worker: Activando...');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        // Eliminar cachés antiguas
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName.startsWith('jkdtech-') && cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE;
            })
            .map((cacheName) => {
              console.log('🗑️ Service Worker: Eliminando caché antigua:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Activación completada');
        // Tomar control de todas las páginas
        return self.clients.claim();
      })
  );
});

/**
 * Interceptar peticiones (Fetch)
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar URLs excluidas
  if (EXCLUDED_URLS.some(excluded => request.url.includes(excluded))) {
    return;
  }

  // Ignorar peticiones que no sean GET
  if (request.method !== 'GET') {
    return;
  }

  // Estrategia según el tipo de recurso
  if (request.destination === 'document') {
    // HTML: Network First (siempre contenido fresco)
    event.respondWith(networkFirst(request));
  } else {
    // Assets (CSS, JS, imágenes, etc.): Cache First (performance)
    event.respondWith(cacheFirst(request));
  }
});

/**
 * Estrategia Cache First
 * Intenta servir desde caché, si no hay red se usa caché
 */
async function cacheFirst(request) {
  try {
    // Buscar en caché
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      // console.log('📦 Cache Hit:', request.url);
      return cachedResponse;
    }

    // No está en caché, pedir por red
    const networkResponse = await fetch(request);

    // Si la respuesta es válida, cachearla
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      // console.log('💾 Cacheado:', request.url);
    }

    return networkResponse;
  } catch (error) {
    console.error('❌ Error en cacheFirst:', error);

    // Fallback: intentar buscar en cualquier caché
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Offline fallback para imágenes
    if (request.destination === 'image') {
      return new Response(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="#f0f0f0" width="100" height="100"/><text x="50" y="50" text-anchor="middle" font-size="14" fill="#999">Offline</text></svg>',
        { headers: { 'Content-Type': 'image/svg+xml' } }
      );
    }

    throw error;
  }
}

/**
 * Estrategia Network First
 * Intenta red primero, si falla usa caché
 */
async function networkFirst(request) {
  try {
    // Intentar red primero
    const networkResponse = await fetch(request);

    // Cachear la respuesta
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // Si falla la red, usar caché
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('📦 Usando caché (offline):', request.url);
      return cachedResponse;
    }

    // No hay caché ni red
    console.error('❌ No disponible offline:', request.url);

    // Página de error offline
    return new Response(
      `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sin Conexión - JKD Tech</title>
        <style>
          body {
            font-family: 'Inter', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #00D4FF 0%, #1A1A2E 100%);
            color: white;
            text-align: center;
          }
          .offline-message {
            max-width: 500px;
            padding: 2rem;
          }
          h1 { font-size: 3rem; margin: 0; }
          p { font-size: 1.2rem; margin: 1rem 0; }
          button {
            background: white;
            color: #1A1A2E;
            border: none;
            padding: 1rem 2rem;
            font-size: 1rem;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 1rem;
          }
          button:hover { opacity: 0.9; }
        </style>
      </head>
      <body>
        <div class="offline-message">
          <h1>📡</h1>
          <h2>Sin Conexión</h2>
          <p>Parece que no tienes conexión a internet en este momento.</p>
          <p>Por favor, verifica tu conexión e intenta nuevamente.</p>
          <button onclick="location.reload()">Reintentar</button>
        </div>
      </body>
      </html>
      `,
      {
        headers: {
          'Content-Type': 'text/html; charset=utf-8'
        }
      }
    );
  }
}

/**
 * Mensajes desde la aplicación
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('⏭️ Service Worker: Saltando espera...');
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('🗑️ Service Worker: Limpiando caché...');
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});

/**
 * Sincronización en segundo plano (opcional)
 */
self.addEventListener('sync', (event) => {
  console.log('🔄 Service Worker: Sincronización en segundo plano');
  // Aquí puedes implementar lógica de sincronización
});

console.log('✅ Service Worker JKD Tech cargado correctamente');
