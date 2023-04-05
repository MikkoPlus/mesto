export default class Card {
    constructor({name, link, likes, _id}, isLiked, templateSelector, handleCardClick, handleLikeClick) {
        this._imagePath = link;
        this._imageDescription = name;
        this._likes = likes;
        this._id = _id;
        this._isCardLiked = isLiked;
        this._trashBagSelector = '.place-card__trash-bag';
        this._heartElementSelector = '.place-card__heart';
        this._imageSelector = '.place-card__image';
        this._cardDescriptionSelector = '.place-card__descr';
        this._likesCounterSelector = '.place-card__counter';
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._templateSelector = templateSelector;
        this.getCardId = this._getCardId.bind(this);
        this.isLiked = this._isLiked.bind(this);
        this.updateLikes = this._updateLikes.bind(this);
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
            this._handleLikeClick(this.getCardId, this.isLiked, this. updateLikes);
        });
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._imagePath, this._imageDescription);
        });
    }

    _setInitialLikes() {
        if (this._isLiked()) {
            this._setLike();
        }
        this._updateLikeCounter(this._likes);
        this._changeLikesCounterVisability();
    }

    _getCardId() {
        return this._id;
    }

    _isLiked() {
        return this._isCardLiked;
    }

    _updateLikeCounter(likes) {
        this._likes = likes;
        this._likesCounter.textContent = likes.length;
    }

    _updateLikes(likesCount) {
        if (!this._isLiked()) {
            this._isCardLiked = true;
            this._setLike();
            this._updateLikeCounter(likesCount);
        } else {
            this._isCardLiked = false;
            this._removeLike();
            this._updateLikeCounter(likesCount);
        }
        console.log(likesCount);
        this._updateLikeCounter(likesCount);
        this._changeLikesCounterVisability();
    }

    _setLike() {
        this._heartElement.classList.add('place-card__heart_like');
    }

    _removeLike() {
        this._heartElement.classList.remove('place-card__heart_like');
    }

    _changeLikesCounterVisability() {
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
        this._setInitialLikes();
        this._toggleTrashBagVisibility();
        this._setEventListenersToCard();

        this._cardImage.src = this._imagePath;
        this._cardImage.alt = this._imageDescription;
        this._cardDescription.textContent = this._imageDescription;

        return this._element;
    }
}