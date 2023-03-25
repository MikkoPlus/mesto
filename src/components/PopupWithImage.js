import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popupElement.querySelector('.popup__fullscreen-image');
        this._popupDescr = this._popupElement.querySelector('.popup__descr');
        this.setImageDataInPopup = this._setImageData.bind(this);
        this.handleCardClick = this.open.bind(this);
    }
    open(imagePath, imageDescription) {
        super.open();
        this.setImageDataInPopup(imagePath, imageDescription);
    }
    _setImageData(imagePath, imageDescription) {
        this._popupImage.src = imagePath;
        this._popupImage.alt = imageDescription;
        this._popupDescr.textContent = imageDescription;
    }

}