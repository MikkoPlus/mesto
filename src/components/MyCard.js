import Card from "./Card";

export default class MyCard extends Card {
    constructor({name, link, likes, _id}, templateSelector, handleCardClick, handleLikeClick,  handleTrashBagClick) {
        super({name, link, likes, _id}, templateSelector, handleCardClick, handleLikeClick);
        this._handleTrashBagClick = handleTrashBagClick;
    }

    _toggleTrashBagVisability() {
        super._toggleTrashBagVisability();
        this._showTrashBagIcon();
    }

    deleteCard() {
        this._element.remove();
    }

    _showTrashBagIcon() {
        this._trashBagIcon.classList.remove('place-card__trash-bag_hidden');
    }

    _setEventListenersToCard() {
        super._setEventListenersToCard();
        this._trashBagIcon.addEventListener('click', () => {
            this._handleTrashBagClick(this, this._id);
        });
    }
}