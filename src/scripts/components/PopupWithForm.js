import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit, formRestore, formPrefill }) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
    this._handleFormSubmit = handleFormSubmit;
    this._formRestore = formRestore;
    this._formPrefill = formPrefill;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._formElement.reset();
      this.close();
    });

    super.setEventListeners();
  }

  open() {
    this._formPrefill
    && this._formPrefill(this._inputList);
    super.open();
  }

  close() {
    this._formElement.reset();
    this._formRestore();
    super.close();
  }
}