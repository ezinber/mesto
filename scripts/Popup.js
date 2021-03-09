export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
  }

  setEventListeners() {
    this._popupElement
    .querySelector('.popup__close-button')
    .addEventListener('click', () => this.close());
  }
}