import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormFunction) {
        super(popupSelector);
        this._formSubmitFunction = submitFormFunction;
        this._popupForm = this._popupElement.querySelector('.form');
        this._inputList = Array.from(this._popupForm.querySelectorAll('.form__input'));
        this.handlerFormSubmit = this._handlerFormSubmit.bind(this);
        this._popupButton = this._popupForm.querySelector('.popup__button');
        this._popupButtonText = this._popupButton.textContent;
    }
    
    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        });
        
        return this._inputValues;
    }

    setInputValues(data) {
        this._inputList.forEach(input => {
            input.value = data[input.name];
        });
    }

    _handlerFormSubmit(evt) {
        evt.preventDefault();
        this._formSubmitFunction(this._getInputValues(), this._popupButton, this._popupButtonText);
        this.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', this.handlerFormSubmit);
    }
    _removeEventListeners() {
        super._removeEventListeners();
        this._popupForm.removeEventListener('submit', this.handlerFormSubmit);
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}