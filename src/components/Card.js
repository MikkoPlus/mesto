export default class Card {
    constructor({name, link, likes, _id}, templateSelector, handleCardClick, handleLikeClick) {
        this._imagePath = link;
        this._imageDescription = name;
        this._likes = likes;
        this._id = _id;
        this._trashBagSelector = '.place-card__trash-bag';
        this._heartElementSelector = '.place-card__heart';
        this._imageSelector = '.place-card__image';
        this._cardDescriptionSelector = '.place-card__descr';
        this._likesCounterSelector = '.place-card__counter';
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
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
        this._heartElement.addEventListener('click', () => {
            this._handleLikeClick(this, this._heartElement, this._likesCounter, this._id);
        });
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._imagePath, this._imageDescription);
        });
    }

    setLike() {
        this._heartElement.classList.add('place-card__heart_like');
    }

    removeLike() {
        this._heartElement.classList.remove('place-card__heart_like');
    }

    changeLikeCounterVisability() {
        if (+this._likesCounter.textContent === 0 ) {
            this._likesCounter.classList.add('place-card__counter_hidden');
        } else {
            this._likesCounter.classList.remove('place-card__counter_hidden');
        }
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
        this._likesCounter.textContent = this._likes.length;
        this.changeLikeCounterVisability();
        return this._element;
    }
}