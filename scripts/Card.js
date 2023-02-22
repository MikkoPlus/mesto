export default class Card {
    constructor(data, templateSelector) {
        this._imagePath = data.imagePath;
        this._imageDescription = data.imageDescription;
        this._trashBagSelector = '.place-card__trash-bag';
        this._heartElementSelector = '.place-card__heart';
        this._imageSelector = '.place-card__image';
        this._cardDescriptionSelector = '.place-card__descr';
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.place-card')
        .cloneNode(true);

        return cardElement;
    }

    _setEventListenersToCard() {
        this._heartElement = this._element.querySelector(this._heartElementSelector);
        this._trashBagIcon = this._element.querySelector(this._trashBagSelector);
        this._cardImage = this._element.querySelector(this._imageSelector);

        this._heartElement.addEventListener('click', () => this._changeHeartColor());
        this._trashBagIcon.addEventListener('click', () => this._deleteCard());
        this._cardImage.addEventListener('click', () => this._openFullScreenImage());
    }
    
    _popupHandler(popup) {
        const closeByEscape = (evt) => {
            if (evt.key === 'Escape') {
                const openedPopup = document.querySelector('.popup_active');
                closePopup(openedPopup);
            }
        };
        function openPopup(popup) {
            popup.classList.add('popup_active');
            document.addEventListener('keydown', closeByEscape);
        }
    
        function closePopup(popup) {
            popup.classList.remove('popup_active');
            document.removeEventListener('keydown', closeByEscape);
        }

        openPopup(popup);
    }




    _openFullScreenImage() {
        const popup = document.querySelector('.popup_fullscreen-img'),
              popupImage = popup.querySelector('.popup__fullscreen-image'),
              popupDescription = popup.querySelector('.popup__descr');

        popupImage.setAttribute('src', this._imagePath);
        popupImage.setAttribute('alt', this._imageDescr);
        popupDescription.textContent = this._imageDescr;

        this._popupHandler(popup);

    }

    _deleteCard() {
        this._element.parentElement.removeChild(this._element);
    }

    _changeHeartColor() {
        this._heartElement.classList.toggle('place-card__heart_like');
    }

    generateCard() {
        this._element = this._getTemplate();

        this._setEventListenersToCard();

        this._element
        .querySelector(this._imageSelector)
        .setAttribute('src', this._imagePath);
        this._element
        .querySelector(this._imageSelector)
        .setAttribute('alt', this._imageDescription);
        this._element
        .querySelector(this._cardDescriptionSelector)
        .textContent = this._imageDescription;
        return this._element;
    }
}