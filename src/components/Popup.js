export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._closeByEsc = this._handleEscClose.bind(this);
        this._closeByOverlayClick = this._handleOverlayClose.bind(this);
        this._closeByCloseIconClick = this._handleCloseIcon.bind(this);
    }

    _handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup_active')) {
            this.close();
        }
    }

    _handleCloseIcon(evt) {
        if (evt.target.classList.contains('popup__close')) {
            this.close();
        }
    }
    
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _removeEventListeners() {
        document.removeEventListener('keydown', this._closeByEsc);
    }

    open() {
        this._popupElement.classList.add('popup_active');
        this._setEventListeners();
    }

    close() {
        this._popupElement.classList.remove('popup_active');
        this._removeEventListeners();
    }

    _setEventListeners() {    
        document.addEventListener('keydown', this._closeByEsc);
    }

    // Я правильно понял ваш коментарий на счет того, чтобы повесить один раз обработчики закрытия попапов при создании экземпляра класса?
    // Метод _removeEventListeners используется, т.к. нужно же убирать обработчик события закрытия попапа при нажатии esc
    setClickCloseEventListeners() {
        this._popupElement.addEventListener('mousedown', this._closeByOverlayClick);
        this._popupElement.addEventListener('click', this._closeByCloseIconClick);
    }
}