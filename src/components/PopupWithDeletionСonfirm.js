import Popup from "./Popup";

export default class PopupWithDeletionСonfirm extends Popup {
    constructor(popupSelector, deleteFunction){
        super(popupSelector);
        this._deleteCardFunction = deleteFunction;
        this._popupBtn = this._popupElement.querySelector('.popup__button');
        this._popupBtnText = this._popupBtn.textContent;
        this.handleTrashBagClick = this.open.bind(this);
        this.handlerCardDelition = this._handlerCardDelition.bind(this);
    }

    open(currentCard, id) {
        super.open();
        this._currentId = id;
        this._currentCard = currentCard;
    }

    _handlerCardDelition() {
        this._deleteCardFunction(this._currentCard, this._currentId, this._popupBtn, this._popupBtnText);
        this.close();
   }

    setEventListeners() {
        super.setEventListeners();
        this._popupBtn.addEventListener('click', this.handlerCardDelition);
    }

    _removeEventListeners() {
        super._removeEventListeners();
        this._popupBtn.removeEventListener('click', this.handlerCardDelition);
    }
}