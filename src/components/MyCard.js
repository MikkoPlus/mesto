import Card from "./Card";

export default class MyCard extends Card {
    constructor({name, link, likes, _id}, templateSelector, handleCardClick, handleTrashBagClick) {
        super({name, link, likes}, templateSelector, handleCardClick);
        this._id = _id;
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

    _searchCardComponents() {
        super._searchCardComponents();
        this._element.id = this._id;
    }
}