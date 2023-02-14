const validateConfig = {
        formSelector: '.form',
        inputSelector: '.form__input',
        submitButtonSelector: '.form__btn',
        inactiveButtonClass: 'form__btn_disabled',
        inputErrorClass: 'form__input_type_error'
};

function enableValidation (config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach(formElement => {
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });
        setEventListenersToFormInputs(formElement, config);
        toggleButtonState(formElement, config);
    });
}

function isFormInputsValid (inputList) {
    return inputList.every(inputElement => {
        return inputElement.validity.valid;
    });
}

function disableSubmitButton (btn, config) {
    btn.classList.add(config.inactiveButtonClass);
    btn.disabled = true;
}

function enableSubmitButton (btn, config) {
    btn.classList.remove(config.inactiveButtonClass);
    btn.disabled = false;
}

function toggleButtonState (formElement, config) {
    const submitButton = formElement.querySelector(config.submitButtonSelector),
          inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

    if (!isFormInputsValid(inputList)) {
        disableSubmitButton(submitButton, config);
    } else {
        enableSubmitButton(submitButton, config);
    }
}

function setEventListenersToFormInputs (formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(inputElement, formElement);
            toggleButtonState(formElement, config);
        });
    });
}

function showInputError (inputElement, formElement, errorMessage, config) {
    const textErrorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    textErrorElement.textContent = errorMessage;
}

function hideInputError (inputElement, formElement, config) {
    const textErrorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    textErrorElement.textContent = '';
}

const checkInputValidity = (inputElement, formElement) => {
    if (!inputElement.validity.valid) {
        showInputError(inputElement, formElement, inputElement.validationMessage, validateConfig);
    } else {
        hideInputError(inputElement, formElement, validateConfig);
    }
};

enableValidation (validateConfig);


// const showInputError = (formElement, inputElement, errorMessage) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add('form__input_type_error');
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add('form__input-error_active');
// };

// const hideInputError = (formElement, inputElement) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove('form__input_type_error');
//   errorElement.classList.remove('form__input-error_active');
//   errorElement.textContent = '';
// };

// const checkInputValidity = (formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement);
//   }
// };

// const setEventListeners = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll('.form__input'));
//   const buttonElement = formElement.querySelector('.form__submit');
//   toggleButtonState(inputList, buttonElement);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement);
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// };

// const enableValidation = () => {
//   const formList = Array.from(document.querySelectorAll('.form'));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', function (evt) {
//       evt.preventDefault();
//     });
//     const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
//     fieldsetList.forEach(fieldset => {
//       setEventListeners(fieldset);
//     })
//   });
// };

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   })
// }

// const toggleButtonState = (inputList, buttonElement) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add('button_inactive');
//   } else {
//     buttonElement.classList.remove('button_inactive');
//   }
// }

// enableValidation();