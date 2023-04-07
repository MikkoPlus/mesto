export default class Card {
    constructor({name, link, likes, _id}, userId, templateSelector, handleCardClick, handleLikeClick) {
        this._imagePath = link;
        this._imageDescription = name;
        this._likes = likes;
        this._id = _id;
        this._userId = userId;
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
            this._handleLikeClick(this);
        });
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._imagePath, this._imageDescription);
        });
    }

    getCardId() {
        return this._id;
    }

    isLiked() {
        return this._cardLikes.some(like => like._id === this._userId);
    }

    updateLikes(likesArray) {
        this._cardLikes = likesArray;

        if(this.isLiked()) {
            this._setLike();
        } else {
            this._removeLike();
        }
        this._updateLikeCounter(likesArray);
        this._changeLikesCounterVisibility();
        
    }

    _updateLikeCounter(likes) {
        this._likes = likes;
        this._likesCounter.textContent = likes.length;
    }

    _setLike() {
        this._heartElement.classList.add('place-card__heart_like');
    }

    _removeLike() {
        this._heartElement.classList.remove('place-card__heart_like');
    }

    _changeLikesCounterVisibility() {
        if(this._likes.length === 0) {
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

    _toggleTrashBagVisibility() {
        this._hideTrashBagIcon();
    }

    _hideTrashBagIcon() {
        this._trashBagIcon.classList.add('place-card__trash-bag_hidden');
    }
    
    generateCard() {
        this._element = this._getTemplate();

        this._searchCardComponents();
        this._toggleTrashBagVisibility();
        this._setEventListenersToCard();
        this.updateLikes(this._likes);

        this._cardImage.src = this._imagePath;
        this._cardImage.alt = this._imageDescription;
        this._cardDescription.textContent = this._imageDescription;

        return this._element;
    }
}