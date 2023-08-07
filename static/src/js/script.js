(function () {
  "use strict";

  let respuestas = [],
    cantPoints = 0,
    FormNewsletter = document.querySelector(".suscribe"),
    FormEmail = FormNewsletter.querySelector(".suscribe__input");

  //Constructor
  function Constructor() {
    const ButtonAnswer = document.querySelectorAll(".answer__li");
    const ButtonReset = document.querySelector(".button__reset");
    for (let i = 0; i < ButtonAnswer.length; i++) {
      ButtonAnswer[i].addEventListener("click", onButtonAnswer, false);
    }

    const ButtonShare = document.querySelectorAll(".share__a");
    for (let i = 0; i < ButtonShare.length; i++) {
      ButtonShare[i].addEventListener("click", onButtonShare, false);
    }

    ButtonReset.addEventListener("click", onButtonReset, false);

    FormNewsletter.addEventListener("submit", onSubmitNewsltter, false);
    FormEmail.addEventListener("keypress", onTypeEmail, false);
    FormEmail.addEventListener("keyup", onTypeEmail, false);

    getLastButton();
  }

  /**
   *
   * Get the las button
   */
  function getLastButton() {
    const buttons = document.querySelectorAll("button[data-next]");

    // Get the last button.
    const lastButton = buttons[buttons.length - 1];

    // Change the text of the last button.
    lastButton.querySelector(".button__text").textContent = "Ver resultado";
  }

  /**
   * Suscribe
   * @param {*} email
   * @returns
   */
  function isValidEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  function showErrorHint() {
    FormEmail.parentNode.parentNode.classList.add("newsletter-invalid");
    iframeResize();
  }
  function hideErrorHint() {
    FormEmail.parentNode.parentNode.classList.remove("newsletter-invalid");
    iframeResize();
  }
  function showSuccess() {
    FormNewsletter.classList.add("form-succes");

    iframeResize();
  }
  function onTypeEmail() {
    if (isValidEmail(FormEmail.value)) {
      hideErrorHint();
    } else {
      showErrorHint();
    }
    iframeResize();
  }

  function iframeResize() {
    const IframeHeight = document.body.scrollHeight + 3;
    const iframeURL =
      window.location !== window.parent.location
        ? document.referrer
        : document.location.href;
    window.parent.postMessage(IframeHeight, iframeURL);

    setTimeout(() => {
      window.requestAnimationFrame(() => {
        const message = {
          sentinel: "amp",
          type: "embed-size",
          height: IframeHeight,
        };
        window.parent.postMessage(message, "*");
      });
    }, "200");
  }

  /**
   *
   * @param {*} delay1 es el delay del primer intervalo de tiempo
   * @param {*} delay2 es el delay del segundo intervalo de tiempo
   * @param {*} delay3 es el delay del tercero intervalo de tiempo, es falso por default
   * @param {*} elementScroll elemento al que se le hace Scroll, null por dafault
   * @param {*} showConfetti boolean por defecto no se muestra
   * @param {*} ShowElement Elemento a mostrar
   */
  function resizeTrivia({
    delay1 = "800",
    delay2 = "400",
    delay3 = false,
    elementScroll = false,
    showConfetti = false,
    ShowElement = false,
  }) {
    setTimeout(() => {
      if (ShowElement) {
        ShowElement.classList.remove("hide");
      }

      setTimeout(() => {
        iframeResize();

        if (delay3 && elementScroll) {
          setTimeout(() => {
            elementScroll.scrollIntoView();

            if (showConfetti) {
              window.Confetti.initialize();
            }
          }, delay3);
        }
      }, delay2);
    }, delay1);
  }

  /**
   * Mailchimp ajax request
   * @param {*} event
   * @returns response
   */
  function onSubmitNewsltter(event) {
    event.preventDefault();

    if (!isValidEmail(FormEmail.value)) {
      showErrorHint();
      return;
    }

    const params = {
      u: "e4231a24b452b97d090ececc9",
      id: "1412f9067f",
      tags: "414022",
      MERGE0: FormEmail.value,
    };

    fetch(
      "https://debate.us13.list-manage.com/subscribe/post?" +
        new URLSearchParams(params).toString()
    )
      .then(function (response) {
        return response.text();
      })
      .then(function (html) {
        showSuccess();
      })
      .catch(function (error) {
        showSuccess();
      });
  }

  // Events

  /**
   * Event on click Answer
   * @returns
   */
  function onButtonAnswer() {
    const Parent = this.parentNode;

    if (this.classList.contains("answer__li--disabled")) {
      return;
    }
    const Answers = Parent.querySelectorAll("li[data-points]"),
      ButtonNext = document.querySelectorAll("button[data-next]"),
      Reveal = Parent.parentNode.querySelector("[data-reveal]"),
      Alert = Parent.parentNode.querySelector(".alert"),
      AlertTitle = Alert.querySelector(".alert__title");

    for (let i = 0; i < ButtonNext.length; i++) {
      ButtonNext[i].addEventListener("click", showNextItem, false);
    }

    for (let i = 0; i < Answers.length; i++) {
      Answers[i].classList.add("answer__li--disabled");
    }

    resizeTrivia({
      delay1: "100",
      delay2: "200",
      delay3: "300",
      elementScroll: Reveal,
      ShowElement: Reveal,
    });

    let highNumber = getHighNumber(Answers);

    cantPoints = cantPoints + Number(this.dataset.points);
    let answerType = this.dataset.points == highNumber ? true : false;
    addAnswer(answerType);

    if (this.dataset.points == highNumber) {
      this.classList.add("succes");
      Alert.classList.add("alert--succes");
      AlertTitle.innerHTML = "¡Correcto!";

      updateAnswerResult({
        element: this,
      });
      return;
    }

    for (let i = 0; i < Answers.length; i++) {
      if (Answers[i].dataset.points == highNumber) {
        Answers[i].classList.add("succes");

        updateAnswerResult({
          element: Answers[i],
        });
      }
    }

    this.classList.add("error");
    Alert.classList.add("alert--error");
    AlertTitle.innerHTML = "¡Incorrecto!";
  }
  /**
   *
   * @param {*} element Answer succes
   * @returns
   */
  function updateAnswerResult({ element = null }) {
    if (!element) {
      return;
    }
    let image = element.querySelector(".answer__img");
    let src = image.getAttribute("src");
    let title = element.querySelector(".answer__title").textContent;

    const AnswerResultImg = element.parentNode.parentNode.querySelector(
      "[data-reveal] .reveal__img"
    );
    const AnswerResultText = element.parentNode.parentNode.querySelector(
      "[data-reveal] .alert__text strong"
    );
    AnswerResultText.textContent = title;
    AnswerResultImg.src = src;
  }

  /**
   *
   * @param {*} arrayNumbers points from the answers of the active question
   * @returns returns the largest number
   */
  function getHighNumber(arrayNumbers) {
    let higher = null;
    arrayNumbers.forEach((elemento) => {
      const localNumber = parseInt(elemento.getAttribute("data-points"));
      if (higher === null || localNumber > higher) {
        higher = localNumber;
      }
    });
    return higher;
  }

  /**
   *
   * Event on click Buttons de share
   */
  function onButtonShare(e) {
    e.preventDefault();

    const socialPlatform = this.dataset.share;
    const url =
      window.location !== window.parent.location
        ? document.referrer
        : document.location.href;
    const text = "¿Te atreves a jugar a esta trivia?";

    switch (socialPlatform) {
      case "whatsapp":
        openInNewWindow(
          `whatsapp://send?text=${encodeURIComponent(
            text
          )}%20${encodeURIComponent(url)}`
        );
        break;
      case "facebook":
        openInNewWindow(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`
        );
        break;
      case "twitter":
        openInNewWindow(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            text
          )}&url=${encodeURIComponent(url)}`
        );
        break;
      case "mail":
        openInNewWindow(
          `mailto:?subject=¡Participa en la trivia!&body=${encodeURIComponent(
            `${text} ${url}`
          )}`
        );
        break;
      default:
        console.error("Unsupported social platform:", socialPlatform);
    }
  }

  function openInNewWindow(url) {
    window.open(
      url,
      "_blank",
      "height=368,width=600,left=100,top=100,menubar=0"
    );
  }

  /**
   *
   * Event on click Buttons Next item
   */
  function showNextItem() {
    const parent = this.parentElement.parentElement;
    const nextQuestion = parent.nextElementSibling;

    if (nextQuestion) {
      resizeTrivia({
        delay1: "100",
        delay2: "200",
        delay3: "300",
        elementScroll: nextQuestion,
        ShowElement: nextQuestion,
      });
      return;
    }

    if (this.classList.contains("showresult")) {
      return;
    }

    this.classList.add("showresult");

    const Header = document.querySelector(".header"),
      triviaLi = document.querySelectorAll(".trivia__li");

    // Hide all questions
    for (let i = 0; i < triviaLi.length; i++) {
      triviaLi[i].classList.add("hide");
    }
    Header.scrollIntoView();
    showResult();
  }

  /**
   *
   * @param {*} type boolean
   * @returns array respuestas
   */
  function addAnswer(type) {
    respuestas.push(type);
  }

  /**
   *
   * Event on click last question Button
   * and show de results
   */
  function showResult() {
    const Results = document.querySelector(".results");
    Results.classList.remove("hide");

    const ulRespuestas = document.querySelector(".points__ul");

    let indice = 0;
    for (const respuesta of respuestas) {
      const liRespuesta = document.createElement("li");
      liRespuesta.className = "points__li";

      liRespuesta.classList.add(respuesta ? "succes" : "error");

      const divText = document.createElement("div");
      divText.className = "points__text";
      divText.textContent = `Pregunta ${indice + 1}`;

      const divBadge = document.createElement("div");
      divBadge.className = "badge badge--small";

      liRespuesta.appendChild(divText);
      liRespuesta.appendChild(divBadge);
      ulRespuestas.appendChild(liRespuesta);
      indice++;

      const boxResult = document.querySelectorAll(".points__result");

      boxResult.forEach((div) => {
        const min = parseInt(div.getAttribute("data-min"));
        const max = parseInt(div.getAttribute("data-max"));

        if (cantPoints >= min && cantPoints <= max) {
          div.classList.remove("hide");
        }
      });
    }

    resizeTrivia({
      delay1: "100",
      delay2: "200",
      delay3: "300",
      elementScroll: Results,
      showConfetti: true,
      ShowElement: Results,
    });

    countSuccess();
  }

  /**
   * Show the text according to the correct answers
   */
  function countSuccess() {
    let textResult = document.querySelector(".points__texto"),
      liElements = document.querySelectorAll(".points__li"),
      succesCount = 0;

    for (let liElement of liElements) {
      if (liElement.classList.contains("succes")) {
        succesCount++;
      }
    }

    textResult.textContent =
      succesCount == 0
        ? (textResult.textContent =
            "No respondiste correctamente ninguna pregunta")
        : succesCount == 1
        ? "Respondiste correctamente " + succesCount + " pregunta"
        : "Respondiste correctamente " + succesCount + " preguntas";
  }

  /**
   *
   * Event on click reset Button
   * Reset all items of the trivia
   */
  function onButtonReset() {
    const Header = document.querySelector(".header"),
      Results = document.querySelector(".results"),
      BtnResult = document.querySelector(".showresult"),
      answerElement = document.querySelectorAll(".answer__li"),
      revealElement = document.querySelectorAll(".container-reveal"),
      alertElement = document.querySelectorAll(".alert"),
      triviaLi = document.querySelectorAll(".trivia__li"),
      triviaLiFirst = triviaLi[0];

    Header.scrollIntoView();
    const Confetti = document.querySelector("body > div:last-child");

    // Reset Confetti on Fade
    Confetti.style.opacity = 0;
    Confetti.style.transition = "opacity .3s linear";
    Confetti.remove();

    // Hide table result
    Results.classList.add("hide");

    // Reset all answers
    for (let e = 0; e < answerElement.length; e++) {
      answerElement[e].classList.remove("succes");
      answerElement[e].classList.remove("error");
      answerElement[e].classList.remove("answer__li--disabled");
    }

    // Reset result table
    const pointsUlElements = document.querySelectorAll(".points__ul > li");

    for (const pointsUlElement of pointsUlElements) {
      pointsUlElement.remove();
    }

    // Hide all questions
    for (let i = 0; i < triviaLi.length; i++) {
      triviaLi[i].classList.add("hide");
    }

    // Hide all answers
    for (let i = 0; i < revealElement.length; i++) {
      revealElement[i].classList.add("hide");
    }

    // Reset alerts
    for (let i = 0; i < alertElement.length; i++) {
      alertElement[i].classList.remove("alert--error");
      alertElement[i].classList.remove("alert--succes");
    }

    // Reset suscribe
    const formValidator = document.querySelector(".suscribe__validator");
    const emailInput = document.querySelector(".suscribe__input");
    emailInput.value = "";
    FormNewsletter.classList.remove("form-succes");
    formValidator.classList.remove("newsletter-invalid");

    // Show first question
    triviaLiFirst.classList.remove("hide");

    // Reset Button result
    BtnResult.classList.remove("showresult");

    respuestas = [];

    cantPoints = 0;

    // Hide text point result
    const pointsResult = document.querySelectorAll(".points__result");
    pointsResult.forEach((div) => {
      div.classList.add("hide");
    });

    // Resize de iframe
    iframeResize();
  }

  window.onload = function () {
    iframeResize();
  };

  //Export
  window.Trivia = new Constructor();
})(window, document);
