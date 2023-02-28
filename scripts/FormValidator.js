export default class FormValidator {
    constructor(config, formElement) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._formElement = formElement;
        this._inputList = Array.from(this
            ._formElement
            .querySelectorAll(this._inputSelector));
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    }

    enableValidation() {
        this._formElement.addEventListener('submit', event => {
            event.preventDefault();
            this._disableSubmitButton();
        });
        this._toggleButtonState();
        this._setEventListenersToFormInputs();
    }

    resetValidation() {
        this._disableSubmitButton();
        this._inputList.forEach(inputElement => this._hideInputError(inputElement));
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _disableSubmitButton() {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.disabled = true;
    }

    _enableSubmitButton() {
        this._submitButton.classList.remove(this._inactiveButtonClass);
        this._submitButton.disabled = false;
    }

    _toggleButtonState() {
        if (!this._isFormInputsValid(this._inputList)) {
            this._disableSubmitButton();
        } else {
            this._enableSubmitButton();
        }
    }

    _isFormInputsValid() {
        return this._inputList.every(inputElement => inputElement.validity.valid);
    }
    
    _showInputError(inputElement) {
        const textErrorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        textErrorElement.textContent = inputElement.validationMessage;
    }

    _hideInputError(inputElement) {
        const textErrorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        textErrorElement.textContent = '';
    }

    _setEventListenersToFormInputs() {
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }
}