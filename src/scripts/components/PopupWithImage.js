import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._imagePopupPhoto = this._popupElement.querySelector('.popup__image');
    this._imagePopupTitle = this._popupElement.querySelector('.popup__image-title');
  }

  open(photo, title) {
    this._imagePopupPhoto.src = photo;
    this._imagePopupTitle.textContent = title;
    super.open();
  }
}