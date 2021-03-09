import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit, formValidate }) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
    this._formValidate = formValidate;
    this._formValidate(this._formElement);
  }

  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    console.log(this._formValues);
    return this._formValues;
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      // добавим вызов функции _handleFormSubmit
      // передадим ей объект — результат работы _getInputValues
      this._handleFormSubmit(this._getInputValues());
      this._formElement.reset();
      this.close();
    });

    super.setEventListeners();
  }

  close() {
    super.close();
  }
}