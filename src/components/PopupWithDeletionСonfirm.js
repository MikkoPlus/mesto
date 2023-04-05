import Popup from "./Popup";

export default class PopupWithDeletionСonfirm extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._popupButton = this._popupElement.querySelector('.popup__button');
        this._popupButtonText = this._popupButton.textContent;
        this.handleTrashBagClick = this.open.bind(this);
    }

    open(currentCard, id) {
        super.open();
        this._currentId = id;
        this._currentCard = currentCard;
    }
    
    //  Публичная функция возвращает обьект с сылкой на экземпляр класса карточки и её id
    getCardData() {
        return {
            card: this._currentCard,
            cardId: this._currentId
        };
    }

    setDefaultButtonText() {
        this._popupButton.textContent = this._popupButtonText;
    }

    setCustomButtonText(text) {
        this._popupButton.textContent = text;
    }

    setCallback(submitCb) {
        this._handleSubmit = submitCb;
    }

    _setEventListeners() {
        super._setEventListeners();
        this._popupButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
        });
    }
}