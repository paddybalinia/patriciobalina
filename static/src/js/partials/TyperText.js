;(function () {
  "use strict"
  const textos = document.querySelectorAll(".texto-animado")

  for (const element of textos) {
    element.style.opacity = 0
  }

  const velocidadEscritura = 50 // Velocidad en milisegundos por caracter
  const caracteresPorIteracion = 1 // Cantidad de caracteres a agregar en cada iteración
  const retrasoEntreTextos = 500 // Retraso en milisegundos entre textos

  // Constructor
  function Constructor() {}

  function escribirTexto(textoElemento, texto, callback) {
    let i = 0
    textoElemento.textContent = ""
    textoElemento.style.opacity = 1

    // Elimina espacios adicionales antes de comenzar la animación
    texto = texto.replace(/\s+/g, " ")

    function escribirCaracter() {
      if (i < texto.length) {
        const caracteres = texto.substring(i, i + caracteresPorIteracion)
        textoElemento.textContent += caracteres
        i += caracteresPorIteracion
        setTimeout(escribirCaracter, velocidadEscritura)
      } else {
        // Llama al callback cuando termina la animación
        if (callback) {
          callback()
        }
      }
    }
    escribirCaracter()
  }

  // Función para animar secuencialmente los textos
  function animarTextos(textos, index) {
    if (index < textos.length) {
      const textoElemento = textos[index]

      escribirTexto(textoElemento, textoElemento.textContent, () => {
        setTimeout(() => {
          animarTextos(textos, index + 1)
        }, retrasoEntreTextos)
      })
    }
  }

  // Observador de intersección para el primer elemento
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // textos.style.opacity = 0;
      if (entry.isIntersecting) {
        animarTextos(textos, 0)

        observer.disconnect() // Detener la observación después de la primera animación
      }
    })
  })

  observer.observe(textos[0])

  // Export
  window.ScrollIntoView = Constructor()
})()
