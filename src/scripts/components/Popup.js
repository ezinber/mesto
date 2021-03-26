export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._boundHandleEscClose = this._handleEscClose.bind(this);
    this._boundHandleScrollPrevent = this._handleScrollPrevent.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._boundHandleEscClose);
    document.addEventListener('wheel', this._boundHandleScrollPrevent, {passive: false});
    document.addEventListener('touchmove', this._boundHandleScrollPrevent, {passive: false});
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._boundHandleEscClose);
    document.removeEventListener('wheel', this._boundHandleScrollPrevent);
    document.removeEventListener('touchmove', this._boundHandleScrollPrevent);
  }

  _handleScrollPrevent(evt) {
    evt.preventDefault();
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement
    .querySelector('.popup__close-button')
    .addEventListener('click', () => this.close());

    this._popupElement
    .addEventListener('click', evt => {
      evt.target.classList.contains('popup_opened')
      && this.close();
    });
  }
}