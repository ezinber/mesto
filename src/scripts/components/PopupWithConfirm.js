import { Popup } from '../components/Popup';

export class PopupWithConfirm extends Popup {
  constructor({ popupSelector, handleConfirm }) {
    super(popupSelector);
    this._confirmButton = this._popupElement.querySelector('.popup__button');
    this._handleConfirm = handleConfirm;
  }

  open(element, elementId) {
    this._element = element;
    this._elementId = elementId;
    super.open();
  }

  close() {
    this._element = '';
    this._elementId = '';
    super.close();
  }

  setEventListeners() {
    this._confirmButton.addEventListener('click', evt => {
      evt.preventDefault();
      this._handleConfirm(this._element, this._elementId);
      this.close();
    });
    super.setEventListeners();
  }
}