import { Card } from './Card.js';
import { initialCards } from './initialCards.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

export const popupObject = {
  popupSelector: '.popup',
  popupClass: 'popup',
  activePopupClass: 'popup_opened',
  popupCloseButtonSelector: '.popup__close-button',
  popupCloseButtonClass: 'popup__close-button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const formObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.board');

const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userJobSelector: '.profile__subtitle'
});

const editingPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (inputValues) => {
    userInfo.setUserInfo(inputValues);
  },
  formValidate: (formElement) => {
    window.editingFormValidator = new FormValidator(formObject, formElement);
    editingFormValidator.enableValidation();
  },
  formRestore: () => {
    editingFormValidator.restoreForm();
  },
  formPrefill: (inputs) => {
    const inputValues = userInfo.getUserInfo();
    inputs.forEach(input => input.value = inputValues[input.name]);
  }
});

const addingPopup = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (inputValues) => {
    const card = new Card(inputValues, '#card', {
      handleCardClick: (photo, title) => {
        imagePopup.open(photo, title);
      }
    });
    const cardElement = card.generateCard();

    cardList.addItem(cardElement);
  },
  formValidate: (formElement) => {
    window.addingFormValidator = new FormValidator(formObject, formElement);
    addingFormValidator.enableValidation();
  },
  formRestore: () => {
    addingFormValidator.restoreForm();
  }
});

const imagePopup = new PopupWithImage({ 
  popupSelector: '.popup_type_image',
});

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card', {
      handleCardClick: (photo, title) => {
        imagePopup.open(photo, title);
      }
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, cardsContainer);

cardList.renderItems();

editingPopup.setEventListeners();
addingPopup.setEventListeners();
imagePopup.setEventListeners();

editButton.addEventListener('click', () => editingPopup.open());
addButton.addEventListener('click', () => addingPopup.open());