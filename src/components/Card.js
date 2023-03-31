export default class Card {
    constructor({name, link, likes}, templateSelector, handleCardClick) {
        this._imagePath = link;
        this._imageDescription = name;
        this._likes = likes;
        this._trashBagSelector = '.place-card__trash-bag';
        this._heartElementSelector = '.place-card__heart';
        this._imageSelector = '.place-card__image';
        this._cardDescriptionSelector = '.place-card__descr';
        this._likesCounterSelector = '.place-card__counter';
        this._handleCardClick = handleCardClick;
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
        this._heartElement.addEventListener('click', () => this._changeHeartColor());
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._imagePath, this._imageDescription);
        });
    }

    _changeHeartColor() {
        this._heartElement.classList.toggle('place-card__heart_like');
    }

    _searchCardComponents() {
        this._cardImage = this._element.querySelector(this._imageSelector);
        this._cardDescription = this._element.querySelector(this._cardDescriptionSelector);
        this._likesCounter = this._element.querySelector(this._likesCounterSelector);
        this._heartElement = this._element.querySelector(this._heartElementSelector);
        this._trashBagIcon = this._element.querySelector(this._trashBagSelector);
    }

    _toggleTrashBagVisability() {
        this._hideTrashBagIcon();
    }

    _hideTrashBagIcon() {
        this._trashBagIcon.classList.add('place-card__trash-bag_hidden');
    }
    

    generateCard() {
        this._element = this._getTemplate();

        this._searchCardComponents();
        this._toggleTrashBagVisability();
        this._setEventListenersToCard();

        this._cardImage.setAttribute('src', this._imagePath);
        this._cardImage.setAttribute('alt', this._imageDescription);
        this._cardDescription.textContent = this._imageDescription;
        this._likesCounter.textContent = this._likes.length + 1;
        return this._element;
    }
}