// Escucha el evento 'install'
self.addEventListener("install", (event) => {
  // Realiza tareas de instalación, como la creación de cachés
  console.log("Service Worker instalado");
});

// Escucha el evento 'activate'
self.addEventListener("activate", (event) => {
  // Realiza tareas de activación, como limpiar cachés antiguas
  console.log("Service Worker activado");
});

// Escucha el evento 'fetch'
self.addEventListener("fetch", (event) => {
  // Intercepta solicitudes de red y realiza acciones
  console.log("Interceptando solicitud:", event.request.url);
  event.respondWith(fetch(event.request));
});
