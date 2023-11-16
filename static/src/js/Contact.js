(function (window, document) {
  "use strcit";

  var FormContacto = document.querySelector("[data-formbox]");

  if (!FormContacto) {
    return;
  }

  var FormErrorsBox = FormContacto.querySelector(".form--box__error"),
    inputFirstName = FormContacto.querySelector("#from_firstname"),
    inputLastName = FormContacto.querySelector("#from_lastname"),
    inputEmail = FormContacto.querySelector("#from_email"),
    inputMessage = FormContacto.querySelector("#from_message"),
    hasErrors = false;
  formErrors = [];

  function Constructor() {
    FormContacto.addEventListener("submit", onSubmit, false);
  }

  //Functions
  function isEmpty(input) {
    return input.value == "";
  }
  function isInvalidEmail(input) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(input.value);
  }
  function resetFormErrors() {
    FormErrors = [];
    hasErrors = false;

    FormErrorsBox.innerHTML = "";

    var fieldsets = FormContacto.querySelectorAll("form__field");
    for (var i = 0, k = fieldsets.length; i < k; i++) {
      fieldsets[i].classList.remove("form__field__error");
    }
  }
  function addError(input, ErrorText) {
    input.parentNode.classList.add("field__error");
    FormErrors.push(ErrorText);
  }
  function removeError(input) {
    input.parentNode.classList.remove("field__error");
  }
  function showGenericError(ErrorText) {
    if (ErrorText) {
      var pNode = document.createElement("p");
      var pText = document.createTextNode(ErrorText);
      pNode.appendChild(pText);
      FormErrorsBox.appendChild(pNode);
    } else {
      for (var i = 0, k = FormErrors.length; i < k; i++) {
        var pNode = document.createElement("p");
        pNode.className = "text";
        var pText = document.createTextNode(FormErrors[i]);
        pNode.appendChild(pText);
        FormErrorsBox.appendChild(pNode);
      }
    }
    FormErrorsBox.style.display = "block";
  }
  function showSuccess() {
    //window.scrollTo(0, 0);
    FormErrorsBox.parentNode.removeChild(FormErrorsBox);
    document.querySelector(".contact__form").style.display = "none";
    document.querySelector(".contact__succces").style.display = "block";
  }

  //Events
  function onSubmit() {
    event.preventDefault();
    resetFormErrors();

    inputFirstName.value = inputFirstName.value.replaceAll("http://", "");
    inputLastName.value = inputLastName.value.replaceAll("http://", "");
    inputEmail.value = inputEmail.value.replaceAll("http://", "");
    inputMessage.value = inputMessage.value.replaceAll("http://", "");

    if (isEmpty(inputFirstName)) {
      hasErrors = true;
      addError(inputFirstName, "You must complete a Name.");
    } else {
      removeError(inputFirstName);
    }

    if (isEmpty(inputLastName)) {
      hasErrors = true;
      addError(inputLastName, "You must complete a Last Name.");
    } else {
      removeError(inputLastName);
    }

    if (isEmpty(inputEmail)) {
      hasErrors = true;
      addError(inputEmail, "You must complete an Email Address.");
    } else if (isInvalidEmail(inputEmail)) {
      hasErrors = true;
      addError(inputEmail, "You must complete an Email Address valid.");
    } else {
      removeError(inputEmail);
    }

    if (isEmpty(inputMessage)) {
      hasErrors = true;
      addError(inputMessage, "You must complete a Query.");
    } else {
      removeError(inputMessage);
    }

    if (hasErrors == false) {
      emailjs.init("SM5NeiavHxv2s3Vgt");

      const btn = document.getElementById("button");

      btn.value = "Sending...";

      const serviceID = "service_1p7myvm";
      const templateID = "form_contacto_web";

      emailjs.sendForm(serviceID, templateID, this).then(
        () => {
          btn.value = "Send Email";
          // alert("Sent!");
        },
        (err) => {
          btn.value = "Send Email";
          // alert(JSON.stringify(err));
        }
      );
      showSuccess();
    } else {
      showGenericError();
      // window.scrollTo(0, 0);
    }
  }

  window.Contacto = new Constructor();
})(window, document);
